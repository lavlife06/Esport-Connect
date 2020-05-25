import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TabStack from './tabStack';
import SettingStack from './otherStack/settingStack';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/actions/auth';

const Drawer = createDrawerNavigator();

const LogoutContentComponent = (props) => {
  const dispatch = useDispatch()
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        style={{marginHorizontal: 70}}
        label=""
        icon={() => (
        <Button
          icon={
            <AntDesign name="logout" style={{marginHorizontal: 5}} size={24} color="white" />
          }
          buttonStyle={{padding: 10}}
          title="Sign Out"
          onPress={() => {
            dispatch(logout());
          }}
        />)
        }
      />
    </DrawerContentScrollView>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function DrawerStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <LogoutContentComponent {...props}/>}
      >
        <Drawer.Screen name="Home" component={TabStack} />
        <Drawer.Screen name="Setting" component={SettingStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
