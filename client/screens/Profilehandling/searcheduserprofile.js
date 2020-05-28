import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

const SearchedUserProfile = ({ navigation, route }) => {
  const { particularuser } = route.params;

  return (
    <View>
      <Text>{particularuser.name}</Text>
    </View>
  );
};

export default SearchedUserProfile;

const styles = StyleSheet.create({});
