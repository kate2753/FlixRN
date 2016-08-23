import { PropTypes } from 'react';

export default PropTypes.shape({
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
});
