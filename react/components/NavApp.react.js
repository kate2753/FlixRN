import React from 'react';
import {
  Navigator,
} from 'react-native';
import MoviesView from './MoviesView.react';
import MovieView from './MovieView.react'

const MOVIES_VIEW_ROUTE = 'movies_view';

class NavApp extends React.Component {
  constructor(props) {
    super(props);

    this.renderScene = this.renderScene.bind(this);
  }
  renderScene(route, navigator) {
    if (route.id === MOVIES_VIEW_ROUTE) {
      return (
        <MoviesView navigator={navigator} />
      )
    }
    return (
      <MovieView
        navigator={navigator}
        movie={route.movie}
      />
    );
  }
  render() {
    return (
      <Navigator
        initialRoute={{id: MOVIES_VIEW_ROUTE}}
        renderScene={this.renderScene}
      />
    );
  }
}

export default NavApp;
