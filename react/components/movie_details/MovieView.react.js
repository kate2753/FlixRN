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
import Icon from 'react-native-vector-icons/FontAwesome';

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
    fontSize: 12,
    color: '#999',
  },
  movieInfo: {
    margin: 10,
  }
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
          <View>
            <Icon name="star" size={30} color="yellow" />
          </View>
          <Text style={styles.text}>
            Released {monent(movie.release_date).format('MMM YYYY')}
          </Text>
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
