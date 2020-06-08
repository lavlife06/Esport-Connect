import React, { useEffect } from 'react';
import { View, Button, FlatList, RefreshControl } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from '../Redux/actions/auth';
import { AsyncStorage } from 'react-native';
import setAuthToken from '../Redux/setAuthToken';
import { getCurrentProfile } from '../Redux/actions/profile';
import { getAllPosts } from '../Redux/actions/post';
import Posts from './postHandling/posts';
import Loading from '../shared/loading';

const Home = () => {
  const dispatch = useDispatch();
  const globalposts = useSelector((state) => state.post.globalposts);
  const myprofile = useSelector((state) => state.profile.myprofile);

  useEffect(() => {
    const userLoad = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuthToken(token);
      }
      console.log('Home Page refreshed');
    };
    userLoad();
    dispatch(getAllPosts());
  }, [getAllPosts]);

  if (globalposts.length <= 0 || !myprofile) {
    return <Loading />;
  } else {
    return (
      <View>
        <FlatList
          data={globalposts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Posts item={[item]} />}
        />
      </View>
    );
  }
};

export default Home;
