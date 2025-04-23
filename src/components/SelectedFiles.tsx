import React from 'react';
import { FileWithDescription } from '../types/types';

interface SelectedFilesProps {
  selectedFiles: FileWithDescription[];
  descriptions: { [key: string]: string };
  onAddDescription: (fileName: string, isNewFile: boolean) => void;
  onCancel: () => void;
  onUpload: () => Promise<void>;
  isUploading: boolean;
  onDiscardFile: (fileName: string) => void;  // Add this prop
}

const SelectedFiles: React.FC<SelectedFilesProps> = ({
  selectedFiles,
  descriptions,
  onAddDescription,
  onCancel,
  onUpload,
  isUploading,
  onDiscardFile,  // Add this prop
}) => {
  if (selectedFiles.length === 0) return null;

  return (
    <div className="selected-files-container">
      <h3>Selected Files</h3>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Size (KB)</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedFiles.map((fileObj) => (
            <tr key={fileObj.file.name}>
              <td>{fileObj.file.name}</td>
              <td>{(fileObj.file.size / 1024).toFixed(2)}</td>
              <td>
                <span>{descriptions[fileObj.file.name] || 'No description'}</span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="add-description-button"
                    onClick={() => onAddDescription(fileObj.file.name, true)}
                    disabled={isUploading}
                  >
                    {descriptions[fileObj.file.name] ? 'Edit' : 'Add'} Description
                  </button>
                  <button
                    className="discard-button"
                    onClick={() => onDiscardFile(fileObj.file.name)}
                    disabled={isUploading}
                  >
                    Discard
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-group">
        <button 
          className="cancel-button"
          onClick={onCancel}
          disabled={isUploading}
        >
          Cancel
        </button>
        <button 
          className="upload-button"
          onClick={onUpload}
          disabled={isUploading || selectedFiles.length === 0}
        >
          {isUploading ? 'Uploading...' : 'Upload Files'}
        </button>
      </div>
    </div>
  );
};

export default SelectedFiles;