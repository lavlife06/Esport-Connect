import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Event from '../screens/EventHandling/event';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventStack from './otherStack/eventStack';
import ProfileStack from './otherStack/profileStack';
import HomeStack from './otherStack/homeStack';
import DrawerStack from './drawerStack';
import { Icon } from 'react-native-elements';
const Tab = createBottomTabNavigator();

export default function TabStack() {
  const showTabIcons = (route, focused, color, size) => {
    if (route.name === 'Home') {
      return (
        <AntDesign name="home" size={24} color={focused ? '#4ecca3' : 'gray'} />
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
      tabBarOptions={{
        activeTintColor: '#4ecca3',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Event" component={EventStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
