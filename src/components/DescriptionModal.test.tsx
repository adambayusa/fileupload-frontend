import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DescriptionModal from './DescriptionModal';

describe('DescriptionModal Component', () => {
  test('renders modal with textarea', () => {
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();
    
    render(
      <DescriptionModal 
        isOpen={true}
        onSave={mockOnSave}
        onClose={mockOnClose}
        description=""
        fileName="test.txt"
      />
    );
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/add description/i)).toBeInTheDocument();
  });
  
  test('calls onClose when close button is clicked', () => {
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();
    
    render(
      <DescriptionModal 
        isOpen={true}
        onSave={mockOnSave}
        onClose={mockOnClose}
        description=""
        fileName="test.txt"
      />
    );
    
    const closeButton = screen.getByRole('button', { name: /cancel|close/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  
  test('calls onSave with new description when save button is clicked', async () => {
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();
    
    render(
      <DescriptionModal 
        isOpen={true}
        onSave={mockOnSave}
        onClose={mockOnClose}
        description="Initial"
        fileName="test.txt"
      />
    );
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New description' } });
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    expect(mockOnSave).toHaveBeenCalledWith('New description');
  });
  
  test('modal is not rendered when isOpen is false', () => {
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();
    
    render(
      <DescriptionModal 
        isOpen={false}
        onSave={mockOnSave}
        onClose={mockOnClose}
        description=""
        fileName="test.txt"
      />
    );
    
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});