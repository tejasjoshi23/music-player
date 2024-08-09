# Music Player App

A interactive, simple and responsive music player built with ReactJS, providing a sleek interface to browse, search, and play music. The app features a dynamic background that adapts to the currently playing song, ensuring an immersive user experience.

## Features

- **Dynamic Background Gradient:** The background gradient color changes based on the cover image of the current song.
- **Responsive Design:** The layout adapts to different screen sizes, with specific behavior for mobile views.
- **Music Controls:** Play, pause, skip to the next song, or go back to the previous one.
- **Search Functionality:** Search for songs or artists directly from the search bar.
- **Tabs:** Switch between "For You" and "Top Tracks" to filter songs.
- **Seamless Playback:** Music continues to play even if the user navigates to another tab.

## Components

- **App:** The main component that manages the state and layout of the app.
- **SearchBar:** Provides a search input field to search for songs or artists.
- **ControlButtons:** Toggle between "For You" and "Top Tracks" filters.
- **Logo:** Displays the Spotify logo.
- **UserSection:** Displays user information.
- **SongList:** Renders a list of songs that can be selected to play.
- **Player:** Controls the playback of the selected song, including play/pause, next, and previous functions.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/music-player.git
    cd music-player
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. The app will be available at `http://localhost:3000`.

## Usage

- **Browse Songs:** Use the "For You" and "Top Tracks" buttons to filter songs.
- **Search Songs:** Enter a song or artist name in the search bar to filter the song list.
- **Select a Song:** Click on any song in the list to start playing it.
- **Control Playback:** Use the play/pause, next, and previous buttons in the player to control playback.
- **Mobile View:** On mobile, the player will expand to full screen when a song is selected, with an option to return to the song list.

## API

The app fetches songs from the following API:

- **Endpoint:** `https://cms.samespace.com/items/songs`
- **Cover Images:** Fetched using the `cover` key from the API response.

## Responsive Design

- **Desktop View:** Displays the logo, user section, filter buttons, search bar, and song list on the left and center sections. The player appears on the right when a song is selected.
- **Mobile View:** On smaller screens, the app initially shows the left and center sections. When a song is selected, the player expands to full screen, hiding the other sections. A "Go Back" button allows returning to the song list.

## Customization

- **Background Gradient:** The gradient adapts to the dominant color in the song's cover image.
  
## Future Enhancements

- **Volume Control:** A vertical slider for controlling volume with mute/unmute functionality.
- **Song Duration:** Display the actual duration of each song with a dynamic progress bar.
- **Animations:** Add fluid and interactive animations/transitions for UI elements.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
