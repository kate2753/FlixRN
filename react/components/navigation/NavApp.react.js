import React from 'react';
import {
  Navigator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackAndroid,
  StatusBar,
} from 'react-native';
import MovieTabs from '../movies/MovieTabs.react';
import MovieView from '../movie_details/MovieView.react';
import TrailerView from '../movie_details/TrailerView.react';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  navBar: {
    borderBottomWidth: 1,
    backgroundColor: '#333',
    borderBottomColor: '#000',
    flexDirection: 'row',
  },
  navBarItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  navBarText: {
    fontWeight: 'bold',
    color: '#DDD',
  },
  navBarTitleText: {
    marginLeft: 0,
  },
  navBarIcon: {
    marginTop: 3,
    marginRight: 5,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  contentContainer: {
    flex: 1,
    marginTop: 60,
    overflow: 'visible',
  },
});

const MOVIES_VIEW_ROUTE = {
  id: 'movies_view',
  title: 'Now Playing',
};
const TRAILER_VIDEO_VIEW_ROUTE = {
  id: 'trailer_video',
};

const routeMapper = {
  // eslint-disable-next-line react/display-name
  LeftButton: (route, navigator) => {
    if (navigator.getCurrentRoutes().length > 1) {
      return (
        <TouchableOpacity onPress={navigator.pop} style={styles.navBarItem}>
          <Icon
            name="chevron-left"
            size={12}
            color="#DDD"
            style={styles.navBarIcon}
          />
          <Text style={styles.navBarText}>Back</Text>
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
          <MovieTabs navigator={navigator} />
        </View>
      );
    } else if (route.id === TRAILER_VIDEO_VIEW_ROUTE.id) {
      return (
        <View style={styles.contentContainer}>
          <TrailerView trailerVideo={route.trailerVideo} />
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
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
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
      </View>
    );
  }
}

export default NavApp;
export {
  MOVIES_VIEW_ROUTE,
  TRAILER_VIDEO_VIEW_ROUTE,
};
