import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileData } from '../types/types';

interface UploadedFilesProps {
  files: FileData[];
  loadingFileKey: string | null;
  onAddDescription: (fileKey: string, isNewFile: boolean) => void;
  onDelete: (fileKey: string) => void;
}

const UploadedFiles: React.FC<UploadedFilesProps> = ({
  files,
  loadingFileKey,
  onAddDescription,
  onDelete,
}) => {
  const [activeDownloads, setActiveDownloads] = useState<{ [key: string]: boolean }>({});
  const [downloadTimers, setDownloadTimers] = useState<{ [key: string]: NodeJS.Timeout }>({});

  const handleFileClick = async (fileKey: string) => {
    try {
      // Clear existing timer if any
      if (downloadTimers[fileKey]) {
        clearTimeout(downloadTimers[fileKey]);
      }

      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/files/${fileKey}/download`);

      // Set active download and create link
      setActiveDownloads((prev) => ({ ...prev, [fileKey]: true }));

      // Open in new tab
      window.open(response.data.url, '_blank');

      // Set timer to clear active status
      const timer = setTimeout(() => {
        setActiveDownloads((prev) => ({ ...prev, [fileKey]: false }));
      }, 30000);

      setDownloadTimers((prev) => ({ ...prev, [fileKey]: timer }));
    } catch (error) {
      console.error('Error getting download link:', error);
      alert('Failed to generate download link');
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(downloadTimers).forEach((timer) => clearTimeout(timer));
    };
  }, [downloadTimers]);

  return (
    <div className="table-container">
      <div className="uploaded-files-table">
        <h2>Uploaded Files</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size (KB)</th>
                <th>Last Modified</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.key}>
                  <td>
                    <span
                      className={`file-name ${activeDownloads[file.key] ? 'active-download' : ''}`}
                      onClick={() => handleFileClick(file.key)}
                    >
                      {file.key}
                    </span>
                  </td>
                  <td>{(file.size / 1024).toFixed(2)}</td>
                  <td>{new Date(file.lastModified).toLocaleString()}</td>
                  <td>
                    <span>{file.description || 'No description'}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="add-description-button"
                        onClick={() => onAddDescription(file.key, false)}
                      >
                        {file.description ? 'Edit' : 'Add'} Description
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => onDelete(file.key)}
                        disabled={loadingFileKey === file.key}
                      >
                        {loadingFileKey === file.key ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadedFiles;