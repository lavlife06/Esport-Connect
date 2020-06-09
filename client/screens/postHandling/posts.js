import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text, Card, Button, Icon, Avatar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { likeHandler } from '../../Redux/actions/post';

const Posts = ({ item }) => {
  const [like, setlike] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.myprofile.user);

  useEffect(() => {
    if (
      item[0].likes.filter((like) => like.user === user).length > 0 &&
      !like
    ) {
      setlike(true);
    } else {
      setlike(false);
    }
  }, []);

  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderTopColor: 'gray',
        borderTopWidth: 1,
        borderBottomColor: 'gray',
        padding: 2,
        marginBottom: 5,
        marginHorizontal: 1,
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            size={27}
            name="favorite-border"
            type="material"
            containerStyle={{ width: 30 }}
            color={like ? 'red' : 'black'}
            onPress={() => {
              dispatch(likeHandler(item[0]._id));
              setlike(!like);
            }}
          />
          <Text style={{ fontSize: 15 }}>Like</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="comment"
            type="material"
            containerStyle={{ width: 30 }}
            onPress={() => console.log('hello')}
          />
          <Text style={{ fontSize: 15 }}>Comment</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="share"
            type="material"
            containerStyle={{ width: 30 }}
            onPress={() => console.log('hello')}
          />
          <Text style={{ fontSize: 15 }}>Share</Text>
        </View>
      </View>
    </View>
  );
};

export default Posts;
