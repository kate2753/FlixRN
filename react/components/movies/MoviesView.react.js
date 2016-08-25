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
  RefreshControl,
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
      ds: ds,
      dataSource: null,
      loading: true,
      refreshing: false,
      error: null,
    }

    this.onRefresh = this.onRefresh.bind(this);
    this.getMovies = this.getMovies.bind(this);
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
  onRefresh() {
    this.setState({
      refreshing: true,
    });
    this.getMovies();
  }
  renderRow(movie) {
    return (
      <TouchableOpacity onPress={() => { this.onRowPress(movie) }}>
        <MovieCellView movie={movie} />
      </TouchableOpacity>
    );
  }
  getMovies() {
    fetchMovies()
      .then(movies => {
        if (movies) {
          this.setState({
            dataSource: this.state.ds.cloneWithRows(movies),
            loading: false,
            refreshing: false,
            error: null,
          });
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          refreshing: false,
          error: error.message,
        });
      });
  }
  componentDidMount() {
    this.getMovies();
  }
  render() {
    let {
      loading,
      refreshing,
      error,
      dataSource,
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
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            tintColor="#DDD"
            progressBackgroundColor="#ffff00"
          />
        }
      >
        {error &&
          <NetworkError />
        }
        {dataSource &&
          <ListView
            dataSource={dataSource}
            renderRow={this.renderRow}
          />
        }
      </ScrollView>
    );
  }
}

MoviesView.propTypes = {
  navigator: PropTypes.object.isRequired,
  movies: PropTypes.arrayOf(MovieShape),
};

export default MoviesView;
