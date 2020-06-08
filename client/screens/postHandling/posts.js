import React from 'react';
import { View } from 'react-native';
import { Text, Card, Button, Icon, Avatar } from 'react-native-elements';

const Posts = ({ item }) => {
  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderTopColor: 'gray',
        borderTopWidth: 1,
        borderBottomColor: 'gray',
        padding: 2,
        marginBottom: 5,
      }}
    >
      <View style={{ flexDirection: 'row', marginVertical: 4 }}>
        <Avatar
          size={40}
          rounded
          overlayContainerStyle={{ backgroundColor: 'black' }}
          icon={{ name: 'user', type: 'font-awesome-5' }}
          onPress={() => console.log('Works!')}
          activeOpacity={1}
          containerStyle={{
            marginHorizontal: 2,
          }}
        />
        <View style={{ justifyContent: 'center', marginLeft: 5 }}>
          <Text style={{ fontSize: 20 }}>{item[0].name}</Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 22 }}>{item[0].text}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{`${item[0].likes.length}  likes`}</Text>
        <Text>{`${item[0].comments.length}  comments`}</Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          marginHorizontal: 16,
          marginVertical: 1,
        }}
      ></View>
      <View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    </View>
  );
};

export default Posts;
