import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import MovieShape from '../../shapes/MovieShape';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  container: {
    flexDirection: 'row',
  },
});

class MovieRatingStars extends React.Component {
  constructor(props) {
    super(props);

    this.renderStar = this.renderStar.bind(this);
  }
  renderStar(item, index) {
    const { movie } = this.props;
    const starIndex = index + 1;
    // convert from 10 point to 5 point score, since we
    // want to display only 5 stars
    const movieRating = movie.vote_average / 2;
    const hasHalfStar = movieRating - Math.floor(movieRating) > 0.45;
    let icon = "star";
    if (movieRating < starIndex && movieRating > starIndex - 1 && hasHalfStar) {
      icon = "star-half-o";
    } else if (movieRating < starIndex) {
      icon = "star-o";
    }
    return (
      <Icon
        key={starIndex}
        name={icon}
        size={20}
        color="yellow"
      />
    );
  }
  render() {
    const { style } = this.props;
    const containerStyles = [styles.container];
    if (style) {
      containerStyles.push(style);
    }

    let stars = Array.from(Array(5)).map(this.renderStar)

    return (
      <View style={containerStyles}>
        {stars}
      </View>
    );
  }
}

MovieRatingStars.propTypes = {
  movie: MovieShape.isRequired,
  style: React.PropTypes.number,
};

export default MovieRatingStars;
