import React, { useEffect } from 'react';
import { View, Button, FlatList, RefreshControl } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from '../Redux/actions/auth';
import { AsyncStorage } from 'react-native';
import setAuthToken from '../Redux/setAuthToken';
import Loading from '../shared/loading';
import { getCurrentProfile } from '../Redux/actions/profile';
import { getAllPosts } from '../Redux/actions/post';
import Posts from './postHandling/posts';

const Home = () => {
  const dispatch = useDispatch();
  const globalposts = useSelector((state) => state.post.globalposts);
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const userLoad = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        setAuthToken(token);
        dispatch(getAllPosts());
        console.log('token verified by getallposts');
      }
      console.log('Home Page refreshed');
    };
    userLoad();
  }, [getAllPosts]);

  if (loading && !user && globalposts.length <= 0) {
    console.log('Homepage loading is happening');
    return <Loading />;
  } else {
    console.log(globalposts);
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
