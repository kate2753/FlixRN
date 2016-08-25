const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';
const URL_PREFIX = 'https://api.themoviedb.org/3/movie';
const NOW_PLAYING_URL = `${URL_PREFIX}/now_playing?api_key=${API_KEY}`;
const TOP_RATED_URL = `${URL_PREFIX}/top_rated?api_key=${API_KEY}`;
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

function fetchFromAPI(url) {
  return fetch(url)
    .then(response => response.json());
}

function fetchMovies(url) {
  return fetchFromAPI(url)
    .then(response => mapMovieResults(response.results));
}

function fetchNowPlayingMovies() {
  return fetchMovies(NOW_PLAYING_URL);
}

function fetchTopRatedMovies() {
  return fetchMovies(TOP_RATED_URL);
}

function fetchMovieTrailer(movie) {
  const URL = `${URL_PREFIX}/${movie.id}/videos?api_key=${API_KEY}`;
  return fetchFromAPI(URL)
    .then( response => response.results.find( video => video.type === 'Trailer'));
}

export {
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchMovieTrailer,
}
