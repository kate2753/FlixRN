import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MovieShape from '../shapes/MovieShape';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
  }
});

class MovieView extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <View style={styles.container}>
        <Text>
          {movie.title}
        </Text>
      </View>
    );
  }
}

MovieView.propTypes = {
  movie: MovieShape.isRequired,
}

export default MovieView;
