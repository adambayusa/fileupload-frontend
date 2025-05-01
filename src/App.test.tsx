import React from 'react';
import { render, act, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from './App';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock environment variable
process.env.REACT_APP_BACKEND_URL = 'http://localhost:3000';

describe('App Integration', () => {
  const mockFiles = [
    { key: 'file1.txt', lastModified: '2024-04-17T10:00:00Z', size: 1024, description: 'First test file' },
    { key: 'file2.txt', lastModified: '2024-04-17T11:00:00Z', size: 2048, description: '' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValue({ data: mockFiles });
  });

  test('loads and displays uploaded files', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('file1.txt')).toBeInTheDocument();
      expect(screen.getByText('file2.txt')).toBeInTheDocument();
    });
    
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/files');
  });
  
  test('end-to-end file upload workflow', async () => {
    mockedAxios.post.mockResolvedValue({});
    
    render(<App />);
    
    // Select a file
    const file = new File(['content'], 'new-file.txt', { type: 'text/plain' });
    const fileInput = document.querySelector('input[type="file"]');
    
    await act(async () => {
      fireEvent.change(fileInput!, { target: { files: [file] } });
    });
    
    // Upload the file
    const uploadButton = screen.getByRole('button', { name: /upload/i });
    fireEvent.click(uploadButton);
    
    // Verify API call and refresh
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.get).toHaveBeenCalledTimes(2); // Initial + after upload
    });
  });
});