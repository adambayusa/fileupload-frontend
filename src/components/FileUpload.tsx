import React from 'react';
import { useDropzone } from 'react-dropzone';
import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE } from '../utils/fileConfig';

interface FileUploadProps {
  onFilesSelect: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelect }) => {
  // Get all unique file extensions from MIME_TYPES
  const acceptedExtensions = [...new Set(
    Object.values(ACCEPTED_MIME_TYPES).flat()
  )];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFilesSelect,
    multiple: true,
    maxFiles: 5,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_MIME_TYPES
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      if (filesArray.length > 5) {
        alert('You can only upload up to 5 files at a time.');
        return;
      }
      onFilesSelect(filesArray);
    }
  };

  return (
    <div>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <div>
            <p>Drag and drop files here</p>
            <p className="file-types">
              Accepted files: {acceptedExtensions.join(', ')}
            </p>
            <p>Maximum file size: 1GB</p>
          </div>
        )}
      </div>
      <div className="file-input-container">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="choose-files-button"
          accept={acceptedExtensions.join(',')}
        />
      </div>
    </div>
  );
};

export default FileUpload;