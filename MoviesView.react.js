import React from 'react';
import {
  StyleSheet,
  ListView,
} from 'react-native';
import MovieCellView from './MovieCellView.react';

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
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{title: 'Movie 1'}, {title:'Movie 2'}]),
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
