// hero-page.js

async function fetchAnimeData() {
    try {
        // Fetch the JSON data
        const response = await fetch('hero-page.json');
        const data = await response.json();

        // Access the 'characters' array
        const characterList = data.characters;

        // Get the container where the character data will be displayed
        const characterContainer = document.getElementById('anime-list');
        characterContainer.innerHTML = ''; // Clear any existing content

        // Create and append character items to the container
        characterList.forEach(character => {
            const characterItem = document.createElement('div');
            characterItem.className = 'anime-item';

            const characterImage = document.createElement('img');
            characterImage.src = character.image;
            characterImage.alt = character.name;

            const characterName = document.createElement('h2');
            characterName.textContent = character.name;

            const characterDescription = document.createElement('p');
            characterDescription.textContent = character.description;

            // Create a link for showing additional details
            const detailsLink = document.createElement('a');
            detailsLink.href = '#';
            detailsLink.textContent = 'Click here for more details';
            detailsLink.className = 'details-link'; // Add a class for styling

            // Create a div for additional details
            const characterDetails = document.createElement('div');
            characterDetails.className = 'anime-details';
            characterDetails.innerHTML = `Anime: ${character.anime}, Role: ${character.role}`;
            characterDetails.style.display = 'none'; // Initially hidden

            // Event listener to toggle visibility of additional details on click
            detailsLink.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                characterDetails.style.display = 'block'; // Show details
                detailsLink.style.display = 'none'; // Hide the link
            });

            // Create the like/unlike button container
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';

            const likeButton = document.createElement('button');
            likeButton.innerHTML = '<i class="fas fa-heart"></i>'; // Font Awesome heart icon
            likeButton.className = 'btn like-button';
            likeButton.onclick = () => {
                if (!likeButton.classList.contains('clicked')) {
                    likeButton.classList.add('clicked'); // Mark as liked
                    unlikeButton.classList.remove('clicked'); // Remove unlike state
                }
            };

            const unlikeButton = document.createElement('button');
            unlikeButton.innerHTML = '<i class="fas fa-heart-broken"></i>'; // Font Awesome heart-broken icon
            unlikeButton.className = 'btn unlike-button';
            unlikeButton.onclick = () => {
                if (!unlikeButton.classList.contains('clicked')) {
                    unlikeButton.classList.add('clicked'); // Mark as unliked
                    likeButton.classList.remove('clicked'); // Remove like state
                }
            };

            buttonContainer.appendChild(likeButton);
            buttonContainer.appendChild(unlikeButton);

            characterItem.appendChild(characterImage);
            characterItem.appendChild(characterName);
            characterItem.appendChild(characterDescription);
            characterItem.appendChild(detailsLink); // Append link for details
            characterItem.appendChild(characterDetails); // Append hidden details
            characterItem.appendChild(buttonContainer);

            characterContainer.appendChild(characterItem);
        });
    } catch (error) {
        console.error('Error fetching character data:', error);
    }
}

// Call the function to fetch and display data after the page loads
document.addEventListener('DOMContentLoaded', fetchAnimeData);
