import React from 'react';
import { Feather } from '@expo/vector-icons'; 
import { View, StyleSheet,Text, Image, ImageBackground } from 'react-native';

const Header = ({navigation, title}) => {
  const openMenu = () =>{
    navigation.openDrawer()
  }

  return (
    <View style={styles.header}> 
      <Feather name='menu' size={29} onPress={openMenu} style={styles.icon}/>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  headerText:{
    fontWeight: '700',
    fontSize: 21,
    color: 'black',
    letterSpacing: 1,
    paddingLeft: 17
  },
  icon: {
    color: 'black'
  },
  logo: {
    width:26,
    height: 26,
    marginHorizontal: 10
  }
})

export default Header;