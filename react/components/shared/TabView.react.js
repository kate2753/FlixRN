import React, {
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  contentContainer: {
    flex: 1,
  },
  tabsContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#333',
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  tabText: {
    color: '#666',
    marginTop: 8,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  tabTextSelected: {
    color: '#DDD',
  }
})

class TabView extends React.Component {
  render() {
    const { children } = this.props;
    const selectedTab = children.find( tab => tab.props.selected );

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
         {selectedTab.props.children}
        </View>
        <View style={styles.tabsContainer}>
          {children}
        </View>
      </View>
    );
  }
}

class Tab extends React.Component {
  render() {
    const {
      title,
      icon,
      selected,
      onPress,
    } = this.props;
    const tabTextStyles = [styles.tabText];
    let iconColor = '#666';
    if (selected) {
      tabTextStyles.push(styles.tabTextSelected);
      iconColor = '#DDD';
    }

    return (
      <TouchableOpacity style={styles.tabContainer} onPress={onPress}>
        <Icon name={icon} size={20} color={iconColor} />
        <Text style={tabTextStyles}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

TabView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
Tab.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
TabView.Tab = Tab;

export default TabView;
