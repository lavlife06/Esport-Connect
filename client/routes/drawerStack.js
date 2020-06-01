import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TabStack from './tabStack';
import SettingStack from './otherStack/settingStack';
import { Button, Avatar } from 'react-native-elements';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/actions/auth';
import Profile from '../routes/otherStack/profileStack';

const Drawer = createDrawerNavigator();

const LogoutContentComponent = (props) => {
  const dispatch = useDispatch();
  const myprofileinfo = useSelector((state) => state.profile);
  const loading = myprofileinfo.myprofileloading;

  return (
    <DrawerContentScrollView {...props}>
      {!loading && (
        <DrawerItem
          label=""
          onPress={() => {
            props.navigation.navigate('Profile');
          }}
          icon={() => {
            return (
              <View>
                <View
                  style={{
                    margin: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ alignItems: 'center' }}>
                    <Avatar
                      size={50}
                      rounded
                      overlayContainerStyle={{ backgroundColor: 'black' }}
                      icon={{ name: 'user', type: 'font-awesome-5' }}
                      // onPress={() => console.log('Works!')}
                      activeOpacity={1}
                      containerStyle={{
                        margin: 5,
                        // position: 'absolute',
                      }}
                    />

                    <Text style={{ fontSize: 17 }}>
                      {myprofileinfo.myprofile.name || 'Your name here'}
                    </Text>
                  </View>
                  <Text style={{ margin: 5 }}>
                    Followers:
                    {myprofileinfo.myprofile.followers
                      ? myprofileinfo.myprofile.followers.length
                      : 0}
                  </Text>
                  <Text style={{ margin: 5 }}>
                    Following:
                    {myprofileinfo.myprofile.following
                      ? myprofileinfo.myprofile.following.length
                      : 0}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
      <DrawerItemList {...props} />
      <DrawerItem
        style={{ marginHorizontal: 70 }}
        label=""
        onPress={() => {
          props.navigation.navigate('Home');
        }}
        icon={() => (
          <Button
            icon={
              <AntDesign
                name="logout"
                style={{ marginHorizontal: 5 }}
                size={24}
                color="white"
              />
            }
            buttonStyle={{ padding: 10 }}
            title="Sign Out"
            onPress={() => {
              dispatch(logout());
            }}
          />
        )}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function DrawerStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <LogoutContentComponent {...props} />}
      >
        <Drawer.Screen name="Home" component={TabStack} />
        <Drawer.Screen name="Setting" component={SettingStack} />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ drawerLabel: () => null }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
