# The Video Game Organizer

For a video DEMO of this project please visit: https://www.youtube.com/watch?v=6fDqxkDeVvU 

A retro-styled video game organization tool with authentic NES/SNES aesthetics and 80s arcade atmosphere.

## Features

- 🎮 Search and browse video games and consoles using the RAWG API
- 📋 Create unlimited custom lists (favorites, rankings, collections)
- 🎬 View game information, trailers, and screenshots
- 🕹️ Retro NES/SNES inspired UI with neon 80s arcade aesthetics
- 💾 Persistent storage for all your lists

## Tech Stack

- React 18
- Vite
- RAWG API
- LocalStorage for data persistence

## Setup

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```
3. Create a `.env` file in the root directory and add your RAWG API key:
```
   VITE_RAWG_API_KEY=your_api_key_here
```
4. Start the development server:
```bash
   npm run dev
```

## Getting a RAWG API Key

1. Visit [RAWG.io](https://rawg.io/apidocs)
2. Create a free account
3. Generate your API key
4. Add it to your `.env` file

## Build for Production
```bash
npm run build
```

## License

© 1981 Neural Node & Code - Justin's Video GAMES