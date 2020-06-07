import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProfiles } from '../Redux/actions/profile';
import { StyleSheet, View ,TextInput} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [inputsearch, setInputSearch] = useState('');
  const [showCancelBtn, setShowCancelBtn] = useState(false)

  const handleCancel = () => {
    setInputSearch(''); 
    dispatch(getProfiles(''));
    setShowCancelBtn(false)
  }

  return (
    <View style={styles.searchSection}>
      <AntDesign name="search1" style={styles.searchIcon} size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={(val) => {
          setInputSearch(val);
          dispatch(getProfiles(val));
          if(inputsearch.length > 0){
            setShowCancelBtn(true)
          }
        }}
        value={inputsearch}
      />
      {showCancelBtn && 
        <Icon onPress={handleCancel} name="clear" style={styles.searchIcon} size={24} color="black" />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    
    },
    searchIcon:{
      marginRight: 5,
    },  
    input: {
      flex: 1,
      fontSize: 16,
      padding: 4,
      borderBottomWidth: 0.7,
    },
  
});

export default SearchBar;