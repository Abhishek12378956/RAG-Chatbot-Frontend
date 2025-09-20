# RAG Chatbot Frontend

A modern, responsive React-based frontend for the RAG (Retrieval-Augmented Generation) Chatbot. This interface allows users to interact with the AI assistant, ask questions, and receive answers with relevant sources.

## Features

-  Modern, clean UI with dark mode support
- Real-time message streaming with typing indicators
- Markdown support with syntax highlighting
- Source attribution with confidence scores
-  Fully responsive design
-  Fast and performant with React 18
-  Session persistence
-  Emoji picker for fun interactions
-  Mobile-friendly interface

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Backend API server (see backend setup)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd chatbot-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
  ├── components/         # Reusable UI components
  │   ├── ChatWindow.jsx  # Main chat interface
  │   ├── MessageList.jsx # Message display component
  │   └── InputBox.jsx    # Message input component
  ├── services/          # API service layer
  │   └── api.js         # API client
  ├── styles/            # Global styles
  │   ├── index.scss     # Main styles
  │   └── chat.scss      # Chat-specific styles
  ├── App.jsx            # Root component
  └── index.js           # Application entry point
```

## Styling

This project uses SCSS for styling with CSS custom properties for theming. The main color scheme is defined in `src/styles/index.scss` and can be easily customized by modifying the `:root` variables.

## State Management

The application uses React's built-in state management with the Context API for global state. For larger applications, consider integrating Redux or React Query.

## API Integration

The frontend communicates with the backend REST API. The API client is configured in `src/services/api.js`.

## Environment Variables

- `REACT_APP_API_URL` - Base URL for the API server

## Deployment

To deploy the application to production:

1. Build the production bundle:

   ```bash
   npm run build
   ```

2. Deploy the `build` directory to your preferred hosting service (Netlify, Vercel, AWS S3, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
