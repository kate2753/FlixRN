import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';
import { fetchMovies } from '../../api/MovieDBClient';
import MovieShape from '../../shapes/MovieShape';
import MovieCellView from './MovieCellView.react';
import NetworkError from '../shared/NetworkError.react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    overflow: 'visible',
  },
  loadingStateContainer: {
    flex: 1,
    justifyContent: 'center',
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
      error: null,
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
            error: null,
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
        <View style={styles.loadingStateContainer}>
          <ActivityIndicator
            animating={true}
            size="large"
            color="#DDD"
          />
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        {error &&
          <NetworkError />
        }
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </ScrollView>
    );
  }
}

MoviesView.propTypes = {
  navigator: PropTypes.object.isRequired,
  movies: PropTypes.arrayOf(MovieShape),
};

export default MoviesView;
