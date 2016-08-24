import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import MovieShape from '../../shapes/MovieShape';
const imageURIPrefix = 'https://image.tmdb.org/t/p/w500/'
const getPosterURI = movie => `${imageURIPrefix}/${movie.poster_path}`

const styles = StyleSheet.create({
  rowConainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
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
            numberOfLines={5}
          >
            {movie.overview}
          </Text>
        </View>
      </View>
    );
  }
}

MovieCellView.propTypes = {
  movie: MovieShape.isRequired,
};

export default MovieCellView;
