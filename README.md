# Pomodoro Timer

A React-based Pomodoro Timer application to help you manage your work and break sessions effectively.

## Features

- 25-minute work sessions
- 5-minute break sessions
- Visual timer display
- Work/Break session indicators
- Sound notifications
- Session counter
- Start/Stop functionality
- Reset timer option
- Switch between work and break modes

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Usage

1. Click "Start" to begin the timer
2. The timer will count down from 25 minutes for work sessions
3. When the work session ends, a sound will play
4. After 4 work sessions, a longer break will be provided
5. Use the "Reset" button to restart the current session
6. Use "Switch to Break/Work" to manually toggle between modes

## Tech Stack

- React
- Vite
- TailwindCSS
- Radix UI Components
- FFmpeg Audio
