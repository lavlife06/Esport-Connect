import React from 'react';
import { View } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';

const Posts = ({ item }) => {
  return (
    <View>
      <Text>{item.text}</Text>
    </View>
  );
};

export default Posts;
