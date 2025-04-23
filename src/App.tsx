import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import SelectedFiles from './components/SelectedFiles';
import UploadedFiles from './components/UploadedFiles';
import DescriptionModal from './components/DescriptionModal';
import { FileData, FileWithDescription } from './types/types';
import './App.css';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileWithDescription[]>([]);
  const [descriptions, setDescriptions] = useState<{ [key: string]: string }>({});
  const [loadingFileKey, setLoadingFileKey] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditingNewFile, setIsEditingNewFile] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get<FileData[]>(`${process.env.REACT_APP_BACKEND_URL}/files`);
      const sortedFiles = response.data.sort(
        (a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      );
      setFiles(sortedFiles);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFilesSelect = (files: File[]) => {
    const filesWithDescription = files.map((file) => ({
      file,
      description: ''
    }));
    setSelectedFiles(filesWithDescription);
  };

  const handleAddDescription = (fileKey: string, isNewFile: boolean = false) => {
    setSelectedFile(fileKey);
    setIsEditingNewFile(isNewFile);

    if (!isNewFile) {
      const file = files.find(f => f.key === fileKey);
      const currentDescription = file?.description || '';
      setDescriptions(prev => ({
        ...prev,
        [fileKey]: currentDescription
      }));
    }

    setModalOpen(true);
  };

  const handleSaveDescription = async (description: string) => {
    if (!selectedFile) return;

    if (isEditingNewFile) {
      setDescriptions(prev => ({
        ...prev,
        [selectedFile]: description
      }));
    } else {
      try {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/files/${selectedFile}/description`, {
          description
        });
        await fetchFiles();
      } catch (error) {
        console.error('Error updating description:', error);
      }
    }
    setModalOpen(false);
    setIsEditingNewFile(false);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setIsUploading(true);

      for (const fileObj of selectedFiles) {
        const formData = new FormData();
        formData.append('file', fileObj.file);
        const description = descriptions[fileObj.file.name];
        if (description) {
          formData.append('description', description);
        }

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData);
      }

      setSelectedFiles([]);
      setDescriptions({});
      await fetchFiles();

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (key: string) => {
    setLoadingFileKey(key);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/files/${key}`);
      await fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    } finally {
      setLoadingFileKey(null);
    }
  };

  const handleDiscardFile = (fileName: string) => {
    setSelectedFiles(prev => prev.filter(file => file.file.name !== fileName));
    // Also remove description if exists
    setDescriptions(prev => {
      const newDescriptions = { ...prev };
      delete newDescriptions[fileName];
      return newDescriptions;
    });
  };

  return (
    <div className="App">
      <h1>File Upload</h1>
      
      <FileUpload onFilesSelect={handleFilesSelect} />
      
      <SelectedFiles
        selectedFiles={selectedFiles}
        descriptions={descriptions}
        onAddDescription={handleAddDescription}
        onCancel={() => setSelectedFiles([])}
        onUpload={handleUpload}
        isUploading={isUploading}
        onDiscardFile={handleDiscardFile}
      />
      
      <UploadedFiles
        files={files}
        loadingFileKey={loadingFileKey}
        onAddDescription={handleAddDescription}
        onDelete={handleDelete}
      />

      <DescriptionModal
        isOpen={modalOpen}
        fileName={selectedFile || ''}
        description={selectedFile ? descriptions[selectedFile] || '' : ''}
        onSave={handleSaveDescription}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default App;
