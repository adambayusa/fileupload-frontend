import React, { useEffect } from 'react';
import '../styles/DescriptionModal.css';

interface DescriptionModalProps {
  isOpen: boolean;
  fileName: string;
  description: string;
  onSave: (description: string) => void;
  onClose: () => void;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  isOpen,
  fileName,
  description,
  onSave,
  onClose,
}) => {
  const [value, setValue] = React.useState(description);

  // Reset value when fileName changes
  useEffect(() => {
    setValue(description);
  }, [fileName, description]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Description for {fileName}</h3>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter file description..."
          rows={4}
        />
        <div className="modal-buttons">
          <button 
            onClick={() => {
              onSave(value);
              onClose();
            }}
          >
            Save
          </button>
          <button 
            onClick={() => {
              setValue(description); // Reset to original value
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;