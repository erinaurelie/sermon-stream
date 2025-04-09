import { API_KEY, UPLOADS_PLAYLIST_ID } from "../config.js";

async function fetchVideo() {
    try {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=${UPLOADS_PLAYLIST_ID}&key=${API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return {
            message: "Videos fetched successfully!", // did not need to but wanted to resolve a msg
            videos: data.items, // return the video array
        };
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}

export default fetchVideo;