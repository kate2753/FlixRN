import React, {
  PropTypes,
} from 'react';
import TabView from '../shared/TabView.react';
import MoviesView from './MoviesView.react';
import {
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
} from '../../api/MovieDBClient';

const TAB_NOW_PLAYING = 'now_playing';
const TAB_TOP_RATED = 'top_rated';

class MovieTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: TAB_NOW_PLAYING,
    };
  }
  render() {
    const { navigator } = this.props;
    const { currentTab } = this.state;

    return (
      <TabView>
        <TabView.Tab
          icon="ticket"
          title="Now Playing"
          selected={currentTab === TAB_NOW_PLAYING}
          onPress={() => this.setState({currentTab: TAB_NOW_PLAYING})}
        >
          <MoviesView
            key={TAB_NOW_PLAYING}
            navigator={navigator}
            fetchMovies={fetchNowPlayingMovies}
          />
        </TabView.Tab>
        <TabView.Tab
          icon="star"
          title="Top Rated"
          selected={currentTab === TAB_TOP_RATED}
          onPress={() => this.setState({currentTab: TAB_TOP_RATED})}
        >
          <MoviesView
            key={TAB_TOP_RATED}
            navigator={navigator}
            fetchMovies={fetchTopRatedMovies}
          />
        </TabView.Tab>
      </TabView>
    );
  }
}

MovieTabs.propTypes = {
  navigator: PropTypes.object.isRequired,
}

export default MovieTabs;
