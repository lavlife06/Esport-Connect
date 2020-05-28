import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../../screens/search';
import Header from '../../shared/header';
import SearchedUserProfile from '../../screens/Profilehandling/searcheduserprofile';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Search" type="Search" />
            // Here i have have used type to help header understand how to change its components
            // according to the active screen
          ),
        })}
        component={Search}
      />
      <Stack.Screen
        name="Userprofile"
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Header
              navigation={navigation}
              title="Userprofile"
              type="Userprofile"
            />
          ),
        })}
        component={SearchedUserProfile}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
