const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';
const URL_PREFIX = 'https://api.themoviedb.org/3/movie';
const NOW_PLAYING_URL = `${URL_PREFIX}/now_playing?api_key=${API_KEY}`;

function fetchMovies() {
  return fetch(NOW_PLAYING_URL)
    .then(response => response.json())
    .then(response => response.results);
}

export {
  fetchMovies,
}
