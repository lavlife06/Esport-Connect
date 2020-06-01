import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { getProfiles } from '../Redux/actions/profile';
import Search from '../screens/search';
import SearchBar from './searchbar';


const Header = ({ navigation, title, type }) => {
  const dispatch = useDispatch();

  const openMenu = () => {
    navigation.openDrawer();
  };

  
  if (type === 'Search') {
    return (
      <View style={styles.header}>
        <Feather name="menu" size={29} onPress={openMenu} style={styles.icon} />
        <SearchBar />
      </View>  
    );
  }

  if (type === 'Userprofile') {
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <Feather name="menu" size={29} onPress={openMenu}  />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 21,
    color: 'black',
    letterSpacing: 1,
    paddingLeft: 17,
  },
  icon: {
    color: 'black',
  },
  logo: {
    width: 26,
    height: 26,
    marginHorizontal: 10,
  },

});

export default Header;
