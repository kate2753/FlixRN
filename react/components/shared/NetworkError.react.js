import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f2dede',
  },
  text: {
    color: '#a94442',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  icon: {
    alignSelf: 'flex-end',
  },
});

class NetworkError extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon
          name="exclamation-triangle"
          size={14}
          color="#a94442"
          style={styles.icon}
        />
        <Text style={styles.text}>
          Network Error
        </Text>
      </View>
    );
  }
}

export default NetworkError;
