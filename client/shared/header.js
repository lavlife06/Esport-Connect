import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../Redux/actions/profile';

const Header = ({ navigation, title, type }) => {
  const dispatch = useDispatch();

  const openMenu = () => {
    navigation.openDrawer();
  };

  const [inputsearch, setInputSearch] = useState('');
  if (type === 'Search') {
    return (
      <View style={styles.header}>
        <Feather name="menu" size={29} onPress={openMenu} style={styles.icon} />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            borderWidth: 1,
            borderColor: 'gray',
            marginLeft: 6,
          }}
        >
          <FontAwesome
            name="search"
            size={25}
            color="black"
            style={{ margin: 4 }}
          />
          {/* <Text style={styles.headerText}>{title}</Text> */}
          <TextInput
            style={{
              fontSize: 22,
              // backgroundColor: 'coral',
              flex: 1,
            }}
            placeholder="Search..."
            onChangeText={(text) => {
              setInputSearch(text);
              dispatch(getProfiles(text));
            }}
            value={inputsearch}
          />
        </View>
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
      <Feather name="menu" size={29} onPress={openMenu} style={styles.icon} />
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
