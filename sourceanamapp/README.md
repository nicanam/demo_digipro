# AI Avatar Sales Call Practice App

A demonstration app that uses Anam AI to help sales professionals practice for important client calls through an interactive AI video avatar.

## Features

- AI avatar video chat powered by Anam AI
- Practice sales pitches and scenarios with an AI coach
- Real-time speech interaction using browser's speech recognition
- Text-based chat interface with the AI avatar
- Responsive UI for desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An Anam AI API key (see below)
- A browser that supports the SpeechRecognition API (Chrome, Edge, Safari)

### Setting Up Anam AI

1. Create an account at [Anam AI](https://anam.ai)
2. From your Anam AI dashboard, create a new API key
   - Go to the "API Keys" section
   - Click "Create New API Key"
   - Give it a descriptive name (e.g., "Sales Practice App")
   - Copy the generated API key
3. Create a `.env.local` file in the project root with:
   ```
   ANAM_API_KEY=your-anam-api-key
   ```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser

## How It Works

The application integrates with the Anam AI JavaScript SDK to create an interactive AI avatar experience:

1. When the user clicks "Start Practice," the app obtains a secure session token from Anam AI
2. The AI avatar appears in the video feed and can engage in conversation
3. Users can interact with the avatar using text input or voice recognition
4. The AI coach provides feedback and adapts to the conversation

### Troubleshooting

If you encounter issues with the Anam AI integration:

1. Check that your API key is correctly set in `.env.local`
2. Ensure you have a stable internet connection
3. Open your browser's developer console to check for any error messages
4. Make sure you're using a compatible browser
5. If using speech recognition, ensure you've granted microphone permissions

## Technology Stack

- React with Next.js
- TypeScript
- Tailwind CSS for styling
- Anam AI SDK for avatar integration
- Web Speech API for speech recognition

## License

This project is for demonstration purposes only.
