import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/home';
import Header from '../../shared/header';

const Stack = createStackNavigator()

const HomeStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title='Home'/>,
        })}
        component={Home}
      />
    </Stack.Navigator>
  );
}
 
export default HomeStack;