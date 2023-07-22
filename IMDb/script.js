
const apiKey = 'aebf9a85'; // OMDb API key
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesContainer = document.getElementById('moviesContainer');

async function searchMovies() {
    const query = searchInput.value.trim();
    if (!query) return;

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
        const data = await response.json();
        if (data.Response === 'True') {
            displayMovies(data.Search);
        } else {
            moviesContainer.innerHTML = `<p>No results found.</p>`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const poster = movie.Poster === 'N/A' ? 'no-image.png' : movie.Poster;
        // Generate a random rating for demonstration purposes
        const rating = (Math.random() * 10).toFixed(1);
        movieCard.innerHTML = `
            <img src="${poster}" alt="${movie.Title} Poster">
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
            <p>Type: ${movie.Type}</p>
            <p>Total Ratings: ${rating} / 10</p>
            <button onclick="rateMovie('${movie.imdbID}')">Rate</button>
        `;
        moviesContainer.appendChild(movieCard);
    });
}

function rateMovie(imdbID) {
    const rating = prompt('Enter your rating for this movie (1-10):');
    const parsedRating = parseInt(rating);

    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
        alert('Please enter a valid rating between 1 and 10.');
    } else {
        alert(`You rated this movie with a rating of ${parsedRating}.`);
    }
}


searchButton.addEventListener('click', searchMovies);