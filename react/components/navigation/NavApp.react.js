import React from 'react';
import {
  Navigator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MoviesView from '../movies/MoviesView.react';
import MovieView from '../movie_details/MovieView.react'

const styles = StyleSheet.create({
  navBar: {
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: '#CCC',
    flexDirection: 'row',
  },
  navBarItem: {
    justifyContent: 'center',
    flex: 1,
  },
  navBarText: {
    color: 'green',
    marginLeft: 10,
  },
  navBarTitleText: {
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 0,
  },
  contentContainer: {
    flex: 1,
    marginTop: 60,
    backgroundColor: 'green',
    overflow: 'visible'
  }
});

const MOVIES_VIEW_ROUTE = {
  id: 'movies_view',
  title: 'Flix',
};
const routeMapper = {
  LeftButton: (route, navigator) => {
    if (navigator.getCurrentRoutes().length > 1) {
      return (
        <TouchableOpacity onPress={navigator.pop} style={styles.navBarItem}>
          <Text style={styles.navBarText}>{'<'} Back</Text>
        </TouchableOpacity>
      );
    }
  },
  RightButton: () => null,
  Title: route => (
    <View style={styles.navBarItem}>
      <Text style={[styles.navBarText, styles.navBarTitleText]}>{route.title}</Text>
    </View>
  ),
};

class NavApp extends React.Component {
  constructor(props) {
    super(props);

    this.renderScene = this.renderScene.bind(this);
  }
  renderScene(route, navigator) {
    if (route.id === MOVIES_VIEW_ROUTE.id) {
      return (
        <View style={styles.contentContainer}>
          <MoviesView navigator={navigator} />
        </View>
      )
    }
    return (
      <View style={styles.contentContainer}>
        <MovieView
          navigator={navigator}
          movie={route.movie}
        />
      </View>
    );
  }
  render() {
    return (
      <Navigator
        initialRoute={MOVIES_VIEW_ROUTE}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={routeMapper}
            style={styles.navBar}
          />
        }
      />
    );
  }
}

export default NavApp;
