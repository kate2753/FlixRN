import React from 'react';
import {
  StyleSheet,
  ListView,
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
  renderRow(rowData) {
    return (
      <MovieCellView
        title={rowData.title}
      />
    );
  }
  componentDidMount() {
    fetchMovies().then(movies => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(movies),
        loading: false,
      });
    });
  }
  render() {
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
