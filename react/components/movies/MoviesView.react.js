import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  TouchableOpacity,
} from 'react-native';
import MovieShape from '../../shapes/MovieShape';
import MovieCellView from './MovieCellView.react';
import { fetchMovies } from '../../api/MovieDBClient';

const styles = StyleSheet.create({
  container: {
  }
});

class MoviesView extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2,
    });

    this.state = {
      dataSource: ds,
      loading: true,
    }

    this.renderRow = this.renderRow.bind(this);
    this.onRowPress = this.onRowPress.bind(this);
  }
  onRowPress(movie) {
    const { navigator } = this.props;
    navigator.push({
      title: movie.title,
      movie: movie,
    })
  }
  renderRow(movie) {
    return (
      <TouchableOpacity onPress={() => { this.onRowPress(movie) }}>
        <MovieCellView movie={movie} />
      </TouchableOpacity>
    );
  }
  componentDidMount() {
    fetchMovies()
      .then(movies => {
        if (movies) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(movies),
            loading: false,
          });
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  }
  render() {
    let {
      loading,
      error,
    } = this.state;

    if (loading) {
      return (
        <Text style={styles.container}>
          Loading ...
        </Text>
      );
    }

    if (error) {
      return (
        <Text style={styles.container}>
          {error}
        </Text>
      );
    }

    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

MoviesView.propTypes = {
  navigator: PropTypes.object.isRequired,
  movies: PropTypes.arrayOf(MovieShape),
};

export default MoviesView;