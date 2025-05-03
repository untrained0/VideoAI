# YouTube AI - Chrome Extension

A browser extension that uses AI to generate summaries from YouTube video transcripts.

## Overview

YouTube AI enhances your YouTube experience by providing AI-powered summaries and transcript analysis for any video. The extension extracts video transcripts and processes them using AI models to generate concise summaries, key points, and explanations of important concepts.

## Features

- **AI-Powered Video Summaries**: Generate concise summaries of YouTube videos
- **Transcript Viewer**: Browse through the complete video transcript
- **Search Functionality**: Search within video transcripts
- **Multiple AI Models**: Choose between different AI models for summary generation
- **Customizable Prompts**: Select from different prompt templates or create your own
- **Copy to Clipboard**: Easily copy generated summaries
- **Dark Mode Support**: Integrates with YouTube's dark mode

## Technical Stack

- [Plasmo Framework](https://docs.plasmo.com/) for browser extension development
- React and TypeScript
- Tailwind CSS for styling
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- OpenAI API for summary generation

## Installation

### Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
4. Load the extension in your browser:
   - For Chrome: Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the chrome-mv3-dev directory

### Building for Production

```bash
pnpm build
# or
npm run build
```

This creates a production bundle ready for submission to browser extension stores.

## Usage

1. Navigate to any YouTube video
2. Click on the extension icon to open the panel
3. Select your preferred AI model and prompt
4. Click "Generate Summary" to analyze the video
5. View and interact with the generated summary
6. Use the transcript viewer to search through the video content
7. Copy the summary to your clipboard for use elsewhere

## Configuration

The extension provides several options to customize your experience:

- Choose between different AI models for varying levels of detail
- Select from pre-defined prompt templates for different summary styles
- Toggle between light and dark modes for comfortable viewing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

---

This project was bootstrapped with [Plasmo](https://docs.plasmo.com/), a browser extension development framework.