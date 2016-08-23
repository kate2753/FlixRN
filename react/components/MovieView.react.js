import React from 'react';
import {
  Text,
} from 'react-native';
import MovieShape from '../shapes/MovieShape';

class MovieView extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Text>
        {movie.title}
      </Text>
    );
  }
}

MovieView.propTypes = {
  movie: MovieShape.isRequired,
}

export default MovieView;
