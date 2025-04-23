# File Upload Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environment Setup

Create a `.env` file in the root directory:

```env
REACT_APP_BACKEND_URL=http://localhost:3000
```

**Note:** All environment variables must start with `REACT_APP_` to be accessible in React applications.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx           # Main application component
│   ├── components/       # React components
│   ├── styles/          # CSS styles
│   └── tests/           # Test files
├── .env                 # Environment variables
└── tsconfig.json        # TypeScript configuration
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | Backend API URL | `http://localhost:3000` |

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
