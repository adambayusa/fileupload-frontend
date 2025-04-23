import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from './App';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock environment variable
process.env.REACT_APP_BACKEND_URL = 'http://localhost:3000';

describe('App Component', () => {
  const mockFiles = [
    { key: 'file1.txt', lastModified: '2024-04-17T10:00:00Z', size: 1024 },
    { key: 'file2.txt', lastModified: '2024-04-17T11:00:00Z', size: 2048 }
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock the GET request for fetching files
    mockedAxios.get.mockResolvedValue({ data: mockFiles });
  });

  test('renders file upload component', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('File Upload')).toBeInTheDocument();
    });
  });

  test('displays uploaded files in table', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('file1.txt')).toBeInTheDocument();
      expect(screen.getByText('file2.txt')).toBeInTheDocument();
    });
  });

  test('deletes file when delete button is clicked', async () => {
    // Mock the DELETE request with a delay to ensure we can check loading state
    mockedAxios.delete.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({}), 100))
    );
    
    render(<App />);
    
    // Wait for files to load and be sorted
    await waitFor(() => {
      expect(screen.getByText('file2.txt')).toBeInTheDocument();
    });

    // Find delete button for file2.txt (first row due to sorting)
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    const firstDeleteButton = deleteButtons[0];
    
    // Click the delete button
    fireEvent.click(firstDeleteButton);

    // Verify the button becomes disabled
    await waitFor(() => {
      const updatedButton = screen.getAllByRole('button', { name: /Delete/i })[0];
      expect(updatedButton).toBeDisabled();
    });

    // Verify delete request was made for file2.txt
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      'http://localhost:3000/files/file2.txt'
    );
  });

  test('sorts files by lastModified in descending order', async () => {
    render(<App />);
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      // First row after header should be the most recent file
      expect(rows[1]).toHaveTextContent('file2.txt');
      expect(rows[2]).toHaveTextContent('file1.txt');
    });
  });
});