import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import MovieRating from '../shared/MovieRating.react';
import MovieShape from '../../shapes/MovieShape';

const styles = StyleSheet.create({
  rowConainer: {
    flexDirection: 'row',
    margin: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 10 ,
  },
  text: {
    fontSize: 12,
    color: '#999',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#DDD',
  },
  rating: {
    marginLeft: 8,
  },
  movieInfo: {
    marginBottom: 8,
    flexDirection: 'row',
  },
  posterImage: {
    width: 65,
  }
});

class MovieCellView extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <View style={styles.rowConainer}>
        <Image
          style={styles.posterImage}
          source={{uri: movie.poster_path}}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text
            style={[styles.text, styles.title]}
            numberOfLines={1}
          >
            {movie.title}
          </Text>
          <View style={styles.movieInfo}>
            <Text style={styles.text}>{movie.release_date.getFullYear()}</Text>
            <View style={styles.rating}>
              <MovieRating movie={movie} />
            </View>
          </View>
          <Text
            style={styles.text}
            numberOfLines={3}
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
