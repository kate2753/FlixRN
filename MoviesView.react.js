import React from 'react';
import {
  StyleSheet,
  ListView,
  Text,
} from 'react-native';
import MovieCellView from './MovieCellView.react';
import { fetchMovies } from './api';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
  }
  renderRow(movie) {
    return (
      <MovieCellView movie={movie} />
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

export default MoviesView;
