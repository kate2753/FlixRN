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

const ORIENTATION_PORTRAIT = 'portrait';
const ORIENTATION_LANDSCAPE = 'landscape';
const styles = StyleSheet.create({
  posterImage: {
    height: 200,
  },
  posterImageLandscape: {
    height: 150,
    flex: 1,
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
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
});

class MovieView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: ORIENTATION_PORTRAIT,
    };

    this.onLayout = this.onLayout.bind(this);
  }
  onLayout({ nativeEvent }) {
    const { layout } = nativeEvent;
    const { width, height } = layout;
    let newOrientation = ORIENTATION_PORTRAIT;
    if (width > height) {
      newOrientation = ORIENTATION_LANDSCAPE;
    }

    if (newOrientation !== this.state.orientation) {
      this.setState({
        orientation: newOrientation,
      })
    }
  }
  render() {
    const { movie } = this.props;
    const { orientation } = this.state;
    return (
      <ScrollView onLayout={this.onLayout}>
        {orientation === ORIENTATION_PORTRAIT &&
          <Image
            style={styles.posterImage}
            source={{uri: movie.backdrop_path}}
            resizeMode="cover"
          />
        }
        <View style={styles.movieInfo}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.movieTitle}>
                {movie.title}
              </Text>
              <Text style={styles.text}>
                Released {monent(movie.release_date).format('MMM YYYY')}
              </Text>
              <MovieRatingStars movie={movie} style={styles.ratingView} />
            </View>
            {orientation === ORIENTATION_LANDSCAPE &&
              <Image
                style={styles.posterImageLandscape}
                source={{ uri: movie.backdrop_path }}
              />
            }
          </View>
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
