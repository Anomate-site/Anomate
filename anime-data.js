// anime-data.js

async function fetchAnimeData() {
    try {
        // Fetch the JSON data
        const response = await fetch('anime-data.json');
        const data = await response.json();

        // Access the 'top_20_anime' array
        const animeList = data.top_20_anime;

        // Get the container where the anime data will be displayed
        const animeContainer = document.getElementById('anime-list');
        animeContainer.innerHTML = ''; // Clear any existing content

        // Create and append anime items to the container
        animeList.forEach(anime => {
            const animeItem = document.createElement('div');
            animeItem.className = 'anime-item';

            const animeImage = document.createElement('img');
            animeImage.src = anime.image;
            animeImage.alt = anime.name;

            const animeTitle = document.createElement('h2');
            animeTitle.textContent = anime.name;

            const animeDescription = document.createElement('p');
            animeDescription.textContent = anime.description;

            // Hidden element for displaying seasons and episodes
            const animeDetails = document.createElement('p');
            animeDetails.className = 'anime-details';
            animeDetails.textContent = `Seasons: ${anime.seasons}, Episodes: ${anime.episodes}`;
            animeDetails.style.display = 'none'; // Initially hidden

            // Event listener to toggle visibility of details on click
            animeImage.addEventListener('click', () => {
                if (animeDetails.style.display === 'none') {
                    animeDetails.style.display = 'block'; // Show details
                } else {
                    animeDetails.style.display = 'none'; // Hide details
                }
            });

   // Create the like/unlike button container
const buttonContainer = document.createElement('div');
buttonContainer.className = 'button-container';

const likeButton = document.createElement('button');
likeButton.innerHTML = '<i class="fas fa-heart"></i>'; // Font Awesome heart icon
likeButton.className = 'btn like-button';

const unlikeButton = document.createElement('button');
unlikeButton.innerHTML = '<i class="fas fa-heart-broken"></i>'; // Font Awesome heart-broken icon
unlikeButton.className = 'btn unlike-button';

// Initially hide the unlike button
unlikeButton.style.display = 'none';

// Like button click event
likeButton.onclick = () => {
    likeButton.classList.add('clicked'); // Mark as liked
    unlikeButton.classList.remove('clicked'); // Remove unlike state
    unlikeButton.style.display = 'block'; // Show unlike button
    likeButton.style.display = 'none'; // Hide like button
    playSound('like-sound.mp3'); // Play sound on click
};

// Unlike button click event
unlikeButton.onclick = () => {
    unlikeButton.classList.add('clicked'); // Mark as unliked
    likeButton.classList.remove('clicked'); // Remove like state
    likeButton.style.display = 'block'; // Show like button
    unlikeButton.style.display = 'none'; // Hide unlike button
    playSound('unlike-sound.mp3'); // Play sound on click
};

buttonContainer.appendChild(likeButton);
buttonContainer.appendChild(unlikeButton);

            animeItem.appendChild(animeImage);
            animeItem.appendChild(animeTitle);
            animeItem.appendChild(animeDescription);
            animeItem.appendChild(animeDetails); // Append hidden details
            animeItem.appendChild(buttonContainer);

            animeContainer.appendChild(animeItem);
        });
    } catch (error) {
        console.error('Error fetching anime data:', error);
    }
}

// Function to play sound
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}

// Call the function to fetch and display data after the page loads
document.addEventListener('DOMContentLoaded', fetchAnimeData);
