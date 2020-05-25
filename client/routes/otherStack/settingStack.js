import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Setting from '../../screens/setting';
import Header from '../../shared/header';

const Stack = createStackNavigator()

const SettingStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Setting'
        options={({ navigation, route }) => ({
          headerTitle: () => <Header navigation={navigation} title='Setting'/>,
        })}
        component={Setting}
      />
    </Stack.Navigator>
  );
}
 
export default SettingStack;