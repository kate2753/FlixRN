import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';
import MovieShape from '../../shapes/MovieShape';
import { fetchMovieTrailer } from '../../api/MovieDBClient';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayStyles: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
});

class MovieImageWithTrailer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trailerVideo: null,
      overlaySize: {
        width: 0,
        height: 0,
      },
    };

    this.onLayout = this.onLayout.bind(this);
  }
  componentDidMount() {
    fetchMovieTrailer(this.props.movie)
      .then(trailer => this.setState({ trailerVideo: trailer }));
  }
  onLayout(event) {
    const layout = event.nativeEvent.layout;
    this.setState({
      overlaySize: {
        width: layout.width,
        height: layout.height,
      }
    })
  }
  render() {
    const {
      height,
      resizeMode,
      movie,
    } = this.props;
    const {
      trailerVideo,
      overlaySize,
    } = this.state;

    const imageStyles = {
      height: height,
    };

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <Image
          style={imageStyles}
          source={{uri: movie.backdrop_path}}
          resizeMode={resizeMode}
        />
        {trailerVideo &&
          <View style={[overlaySize, styles.overlayStyles]}>
            <Icon name="play" size={30} color="#FFF" />
          </View>
        }
      </View>
    );
  }
}

MovieImageWithTrailer.propTypes = {
  height: PropTypes.number.isRequired,
  movie: MovieShape.isRequired,
  resizeMode: PropTypes.string,
}

MovieImageWithTrailer.defaultProps = {
  resizeMode: 'cover',
};

export default MovieImageWithTrailer;
