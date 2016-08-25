import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import MovieShape from '../../shapes/MovieShape';
import monent from 'moment';
import MovieRatingStars from '../shared/MovieRatingStars.react';

const styles = StyleSheet.create({
  posterImage: {
    height: 200,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DDD',
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
  },
  movieInfo: {
    margin: 10,
  },
  ratingView: {
    marginTop: 8,
  },
});

class MovieView extends React.Component {
    render() {
    const { movie } = this.props;
    return (
      <ScrollView>
        <Image
          style={styles.posterImage}
          source={{uri: movie.backdrop_path}}
          resizeMode="cover"
        />
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>
            {movie.title}
          </Text>
          <Text style={styles.text}>
            Released {monent(movie.release_date).format('MMM YYYY')}
          </Text>
          <MovieRatingStars movie={movie} style={styles.ratingView} />
          <Text style={styles.text}>
            {movie.overview}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

MovieView.propTypes = {
  movie: MovieShape.isRequired,
}

export default MovieView;
