const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';
const URL_PREFIX = 'https://api.themoviedb.org/3/movie';
const NOW_PLAYING_URL = `${URL_PREFIX}/now_playing?api_key=${API_KEY}`;
const imageURIPrefix = 'https://image.tmdb.org/t/p/w500/'

function mapMovieResults(movies) {
  if (! movies) {
    return movies;
  }
  return movies.map((movie) => {
    movie.release_date = new Date(movie.release_date);
    movie.poster_path = `${imageURIPrefix}/${movie.poster_path}`;
    movie.backdrop_path = `${imageURIPrefix}/${movie.backdrop_path}`;
    return movie;
  });
}

function fetchMovies() {
  return fetch(NOW_PLAYING_URL)
    .then(response => response.json())
    .then(response => mapMovieResults(response.results));
}

export {
  fetchMovies,
}
