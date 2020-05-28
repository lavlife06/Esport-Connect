import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

const Profiles = ({ item, navigation }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Userprofile', {
            particularuser: item[0],
          });
        }}
      >
        <Text>{item[0].name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profiles;
