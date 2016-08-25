import { PropTypes } from 'react';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
});
