import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Profiles from '../screens/Profilehandling/profiles';

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const userprofiles = useSelector((state) => state.profile.profiles);

  return (
    <View>
      {userprofiles.length === 0 ? (
        <Text>
          Hey search for some players or organization and show your gaming skill
          to them
        </Text>
      ) : (
        <FlatList
          data={userprofiles}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Profiles item={[item]} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
