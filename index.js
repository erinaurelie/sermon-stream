import fetchVideos from "./data/videos.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';



async function renderPlaylistVideos() {
    const { videos, message } = await fetchVideos();

    console.log(message);

    let videoHTML = '<h1>Playlist</h1>';
    
    videos.forEach(video => {
        const thumbnail = video.snippet.thumbnails.high.url;
        const title = video.snippet.title;
        const datePublished = dayjs(video.snippet.publishedAt);

        // calculating the day/month/year since published
        const daysSincePublished = dayjs().diff(datePublished, 'day'); 
        const monthsSincePublished = dayjs().diff(datePublished, 'month');
        const yearsSincePublished = dayjs().diff(datePublished, 'year');

        const timeSincePublished = yearsSincePublished >= 1
        ? `${yearsSincePublished} year${yearsSincePublished > 1 ? 's' : ''} ago`
        : monthsSincePublished >= 1
        ? `${monthsSincePublished} month${monthsSincePublished > 1 ? 's' : ''} ago`
        : `${daysSincePublished} day${daysSincePublished > 1 ? 's' : ''} ago`;

        videoHTML += `
            <div class="playlist-item js-playlist-item" data-video-id="${video.snippet.resourceId.videoId}">
                <img src="${thumbnail}">
                <div>
                    <span>${title}</span>
                    <span>${datePublished.format('dddd, MMMM D')}</span>
                    <span>${timeSincePublished}</span>
                </div>
            </div>
        `
    });

    document.querySelector('.playlist')
        .innerHTML = videoHTML;


    // attach event listeners to the playlist Items
    document.querySelectorAll('.js-playlist-item')
        .forEach(item => {
            item.addEventListener('click', () => {
                const { videoId } = item.dataset;

                // Hide the "Grad video" msg
                document.querySelector('.video-player p').style.display = 'none';

                // Update the iframe source
                const iframe = document.querySelector('iframe');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?`);


                // Find the video id of the current video playing
                const currentVideoElement = document.querySelector(`.js-playlist-item[data-video-id="${videoId}"]`);

                // Remove the "playing-now" class from all items
                document.querySelectorAll('.js-playlist-item').forEach(item => {
                    item.classList.remove('playing-now');
                });

                // Add the "playing-now" class to the current video element's img
                if (currentVideoElement) {
                    currentVideoElement.classList.add('playing-now');
                }
                console.log(currentVideoElement)
                console.log(currentVideoImg);
                
            });
        });
};

renderPlaylistVideos();



