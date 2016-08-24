import { PropTypes } from 'react';

export default PropTypes.shape({
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  backdrop_path: PropTypes.string.isRequired,
  release_date: PropTypes.instanceOf(Date),
  vote_average: PropTypes.number.isRequired,
});
