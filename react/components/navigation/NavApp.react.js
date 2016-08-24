import React from 'react';
import {
  Navigator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackAndroid,
} from 'react-native';
import MoviesView from '../movies/MoviesView.react';
import MovieView from '../movie_details/MovieView.react'

const styles = StyleSheet.create({
  navBar: {
    borderBottomWidth: 1,
    backgroundColor: '#333',
    borderBottomColor: '#000',
    flexDirection: 'row',
  },
  navBarItem: {
    justifyContent: 'center',
    flex: 1,
  },
  navBarText: {
    fontWeight: 'bold',
    color: '#DDD',
    marginLeft: 10,
  },
  navBarTitleText: {
    marginLeft: 0,
  },
  contentContainer: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#222',
    overflow: 'visible'
  }
});

const MOVIES_VIEW_ROUTE = {
  id: 'movies_view',
  title: 'Now Playing',
};
const routeMapper = {
  // eslint-disable-next-line react/display-name
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
  // eslint-disable-next-line react/display-name
  Title: route => (
    <View style={styles.navBarItem}>
      <Text style={[styles.navBarText, styles.navBarTitleText]}>{route.title}</Text>
    </View>
  ),
};

class NavApp extends React.Component {
  constructor(props) {
    super(props);

    this.navigator = null;
    this.renderScene = this.renderScene.bind(this);
    this.handleBackButtonAndroid = this.handleBackButtonAndroid.bind(this);
  }
  renderScene(route, navigator) {
    this.navigator = navigator;
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
  handleBackButtonAndroid() {
    if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
      this.navigator.pop();
      return true;
    }
    return false;
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButtonAndroid);
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButtonAndroid);
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
