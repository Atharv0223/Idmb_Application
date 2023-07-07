const apiKey = 'cb90deeb';
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
let favoriteMovies = [];

// Fetch search results from the OMDB API
async function fetchSearchResults(query) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Search;
}

// Render search results on the frontend
function renderSearchResults(results) {

    searchResults.innerHTML = '';
try
    {
results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const imageElement = document.createElement('img');
        imageElement.src = movie.Poster;
        movieElement.appendChild(imageElement);

        const titleElement = document.createElement('h3');
        titleElement.textContent = movie.Title;
        movieElement.appendChild(titleElement);

        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('favorite-btn');
        favoriteButton.textContent = 'Add to Favorites';
        favoriteButton.addEventListener('click', () => {
            addMovieToFavorites(movie);
        });
        movieElement.appendChild(favoriteButton);

        searchResults.appendChild(movieElement);
    });
}
catch
{

}
}

// Add movie to favorites
function addMovieToFavorites(movie) {
    favoriteMovies.push(movie);
    console.log(favoriteMovies);
}

// Event listener for search input
searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
        const searchResults = await fetchSearchResults(query);
        renderSearchResults(searchResults);
    } else {
        searchResults.innerHTML = '';
    }
});
