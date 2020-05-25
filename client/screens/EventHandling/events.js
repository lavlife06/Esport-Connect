import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
const Events = ({ item }) => {
  return (
    <View>
      <Text>{item[0].title}</Text>
    </View>
  );
};

export default Events;