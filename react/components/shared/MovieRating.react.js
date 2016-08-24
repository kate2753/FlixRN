import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MovieShape from '../../shapes/MovieShape';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  goodScore: {
    color: 'green',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  averageScore: {
    color: 'orange',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  badScrore: {
    color: 'red',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  voteAverage: {
    fontSize: 12,
  },
  totalRating: {
    fontSize: 9,
    color: '#666',
    alignSelf: 'center',
  },
});

class MovieRating extends React.Component {
  render() {
    const { movie } = this.props;
    const voteAverageStyles = [styles.voteAverage];
    if (movie.vote_average > 5) {
      voteAverageStyles.push(styles.goodScore);
    } else if (movie.vote_average > 3 ) {
      voteAverageStyles.push(styles.averageScore);
    } else {
      voteAverageStyles.push(styles.badScrore);
    }

    return (
      <View style={styles.container}>
        <Text style={voteAverageStyles}>
          {movie.vote_average}
        </Text>
        <Text style={styles.totalRating}>{"/10"}</Text>
      </View>
    );
  }
}

MovieRating.propTypes = {
  movie: MovieShape,
};

export default MovieRating;
