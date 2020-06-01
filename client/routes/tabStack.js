import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventStack from './otherStack/eventStack';
import ProfileStack from './otherStack/profileStack';
import HomeStack from './otherStack/homeStack';
import SearchStack from './otherStack/searchStack';

const Tab = createMaterialBottomTabNavigator();

export default function TabStack() {
  const showTabIcons = (route, focused, color, size) => {
    if (route.name === 'Home') {
      return (
        <AntDesign name="home" size={24} color={focused ? '#4ecca3' : 'gray'} />
      );
    } else if (route.name === 'Search') {
      return (
        <FontAwesome
          name="search"
          size={24}
          color={focused ? '#4ecca3' : 'gray'}
        />
      );
    } else if (route.name === 'Profile') {
      return (
        <MaterialCommunityIcons
          name="face-profile"
          size={24}
          color={focused ? '#4ecca3' : 'gray'}
        />
      );
    } else if (route.name === 'Event') {
      return (
        <MaterialIcons
          name="event"
          size={24}
          color={focused ? '#4ecca3' : 'gray'}
        />
      );
    }
  };

  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          showTabIcons(route, focused, color, size),
      })}
      activeColor="#4ecca3"
      barStyle={{ backgroundColor: '#fff' }}
      tabBarOptions={{
        activeTintColor: '#4ecca3',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Event" component={EventStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
