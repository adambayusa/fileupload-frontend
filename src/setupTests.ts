import matchers from '@testing-library/jest-dom/matchers';
import { expect } from '@jest/globals';

expect.extend(matchers);

// Mock environment variables
process.env.REACT_APP_BACKEND_URL = 'http://localhost:3000';

export { expect };