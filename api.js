
function fetchMovies() {
  return new Promise((resolve) => {
    resolve([{title: 'Movie 1'}, {title:'Movie 2'}])
  });
}

export {
  fetchMovies,
}
