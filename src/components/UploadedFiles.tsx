import React from 'react';
import axios from 'axios';
import { FileData } from '../types/types';

interface UploadedFilesProps {
  files: FileData[];
  loadingFileKey: string | null;
  onAddDescription: (fileKey: string, isNewFile: boolean) => void;
  onDelete: (fileKey: string) => void;
}

interface Adam {
  files : FileData[]
  fileKey : string | number
  descr: (x: number, y: boolean, callback: (result: string) => void) => (z: string) => string;
}
interface Fun{
  var1: number | string;
  var2: string | null;
  fn: (var1: number) => void;
}

type FunArgs = {
  var1: number | string;
  var2?: string | null;
  fn: (var1: string | number) => void;
};

const fun1 = (arg: FunArgs): string => {
  const { var1, var2, fn } = arg;
  const a = fn(var1);
  return (var2 ?? '') + var1;
};
const fun0=(var1:number | string, var2:string | null, fn:(var1:number)=> void):number=>{
  return 1;
}
const fun2=(arg:Fun)=>{
  const { var1, var2, fn } = arg;
 
  return (var2 ?? '') + var1;
}


const DepenFiles: React.FC<Adam> = ({ files, fileKey, descr }) => {
  return (
    <div>
      <p>DepenFiles component is under construction.</p>
    </div>
  );
};

const UploadedFiles: React.FC<UploadedFilesProps> = ({
  files,
  loadingFileKey,
  onAddDescription,
  onDelete,
}) => {
  const handleFileClick = async (fileKey: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/files/${fileKey}/download`);
      
      // Open in new tab
      window.open(response.data.url, '_blank');

    } catch (error) {
      console.error('Error getting download link:', error);
      alert('Failed to generate download link');
    }
  };

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
                      className="file-name"
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
                      data-testid="description-button"
                        className="add-description-button"
                        onClick={() => onAddDescription(file.key, false)}
                      >
                        {file.description ? 'Edit' : 'Add'} Description
                      </button>
                      <button
                      data-testid="delete-button"
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