# National Auto Loan Network - Anam Demo

A modern Next.js application showcasing auto loan refinancing services with integrated AI chat assistant powered by Anam AI.

## Features

- **Modern UI**: Built with Next.js 15 and Tailwind CSS
- **AI Chat Assistant**: Integrated Anam AI persona "Mia" for customer support
- **Responsive Design**: Optimized for all device sizes
- **Real-time Chat**: Full-screen video chat experience with AI assistant
- **Auto Loan Focus**: Specialized for National Auto Loan Network services

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Anam AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd national-auto-loan-network-anam-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   ANAM_API_KEY=YWU0NDVjYTYtNmJkYS00ZGZjLWJkNjMtOTI1NTZiNzcwZGZiOmFiWHE5WmlOUWJTWFdqRC9KZlZWZTgycWp2eTZDamNhek1aOTNLcVoxelU9
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANAM_API_KEY` | Your Anam AI API key for persona authentication | Yes |

## Project Structure

```
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/             # API routes
│   │   │   └── anam-auth/   # Anam authentication endpoint
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/          # React components
│       └── AnamChat.tsx     # AI chat interface
├── public/                  # Static assets
│   ├── left_image.png      # Map visualization
│   ├── right_image.png     # Process illustration
│   └── mia.png             # AI assistant avatar
├── package.json            # Dependencies and scripts
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Connect your Git repository to Vercel
   - Vercel will automatically detect the Next.js project

2. **Environment Variables**
   - In your Vercel dashboard, go to Settings → Environment Variables
   - Add `ANAM_API_KEY` with your API key

3. **Deploy**
   - Push to your main branch to trigger automatic deployment
   - Or use the Vercel CLI: `vercel deploy`

### Manual Build

To test the production build locally:

```bash
npm run build
npm start
```

## Anam AI Integration

This application uses Anam AI SDK v2.1.1 with the following persona:

- **Persona ID**: `172918eb-cde9-4a23-b6cf-8e1d85e76603`
- **Character**: Mia - AI Assistant for National Auto Loan Network
- **Capabilities**: Auto loan refinancing guidance, rate information, process assistance

### Chat Features

- **Pulsating Avatar**: Draws attention to chat availability
- **Hover Interaction**: Shows "Chat with Mia" tooltip
- **Full-screen Experience**: Immersive video chat interface
- **Real-time Controls**: Mute, camera, and end call options
- **Connection Status**: Live indicators for chat state

## UI Components

### Main Page
- Navigation header with NALN branding
- Hero section with company information
- Personal ID input section
- Two-panel content area with map and process visualization
- Prominent "START SIMULATION" button
- Fixed chat button with pulsating Mia avatar

### Chat Interface
- Full-screen overlay with video chat
- Connection status indicators
- Chat timer and controls
- Professional header with company branding
- Error handling and loading states

## Customization

### Branding
Update branding elements in:
- `src/app/layout.tsx` - Page metadata
- `src/app/page.tsx` - Header and content
- `src/components/AnamChat.tsx` - Chat interface

### Styling
Modify styles using Tailwind CSS classes throughout the components.

### Persona
To use a different Anam persona, update the `PERSONA_ID` in `src/components/AnamChat.tsx`.

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Ensure all dependencies are installed: `npm install`
   - Check Node.js version (18+ required)

2. **Anam Connection Issues**
   - Verify `ANAM_API_KEY` is set correctly
   - Check browser console for authentication errors
   - Ensure persona ID is valid

3. **Image Loading Issues**
   - Verify images exist in the `public/` directory
   - Check file names match exactly (case-sensitive)

### Support

For technical support or questions about Anam AI integration, please refer to:
- [Anam AI Documentation](https://docs.anam.ai/)
- [Next.js Documentation](https://nextjs.org/docs)

## License

This project is created as a demonstration application for National Auto Loan Network services with Anam AI integration. 