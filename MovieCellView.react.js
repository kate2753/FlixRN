import React, {
  PropTypes,
} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
const imageURIPrefix = 'https://image.tmdb.org/t/p/w500/'
const getPosterURI = movie => `${imageURIPrefix}/${movie.poster_path}`

const styles = StyleSheet.create({
  rowConainer: {
    flexDirection: 'row',
  },
  textContainer: {
    padding: 10,
    flex: 1,
  },
  text: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  posterImage: {
    height: 100,
    width: 100,
  }
});

class MovieCellView extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <View style={styles.rowConainer}>
        <Image
          style={styles.posterImage}
          source={{uri: getPosterURI(movie)}}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text
            style={[styles.text, styles.title]}
            numberOfLines={1}
          >
            {movie.title}
          </Text>
          <Text
            style={styles.text}
            numberOfLines={4}
          >
            {movie.overview}
          </Text>
        </View>
      </View>
    );
  }
}

MovieCellView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCellView;
