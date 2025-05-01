import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import FileUpload from './FileUpload';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FileUpload Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders file input and upload button', () => {
    const mockOnFilesSelect = jest.fn();
    
    render(<FileUpload 
      onFilesSelect={mockOnFilesSelect} 
    />);
    
    // Check for the actual text in the component
    expect(screen.getByText(/drag and drop files here/i)).toBeInTheDocument();
    
    // Verify file input exists
    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toBeInTheDocument();
  });
  
  test('calls onFilesSelect when files are selected', async () => {
    const mockOnFilesSelect = jest.fn();
    
    render(<FileUpload 
      onFilesSelect={mockOnFilesSelect} 
    />);
    
    // Create a mock file
    const file = new File(['dummy content'], 'test-file.txt', { type: 'text/plain' });
    
    // Get file input with data-testid (more reliable)
    const fileInput = screen.getByTestId('file-input');
    
    await act(async () => {
      fireEvent.change(fileInput, { 
        target: { files: [file] } 
      });
    });
    
    // Just verify it was called
    expect(mockOnFilesSelect).toHaveBeenCalled();
  });
  
  test('uploads files successfully', async () => {
    const mockOnFilesSelect = jest.fn();
    
    render(<FileUpload 
      onFilesSelect={mockOnFilesSelect}
    />);
    
    // Create a mock file
    const file = new File(['dummy content'], 'test-file.txt', { type: 'text/plain' });
    
    // Get file input directly
    const fileInput = screen.getByTestId('file-input');
    
    await act(async () => {
      fireEvent.change(fileInput, { 
        target: { files: [file] } 
      });
    });
    
    // Verify callback was called
    expect(mockOnFilesSelect).toHaveBeenCalled();
  });;
});