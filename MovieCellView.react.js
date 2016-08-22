import React, {
  PropTypes,
} from 'react';
import {
  View,
  Text,
} from 'react-native';

class MovieCellView extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}

MovieCellView.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MovieCellView;
