import React from 'react';
import { WebView } from 'react-native';
import TrailerVideoShape from '../../shapes/TrailerVideoShape';

const YOUTUBE_BASE_UTL = 'https://www.youtube.com/embed'

class TrailerView extends React.Component {
  render() {
    const { trailerVideo } = this.props;
    return (
      <WebView source={{uri: `${YOUTUBE_BASE_UTL}/${trailerVideo.key}`}} />
    );
  }
}

TrailerView.propTypes = {
  trailerVideo: TrailerVideoShape.isRequired,
}

export default TrailerView;
