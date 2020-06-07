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
import { fetchallevents } from '../Redux/actions/event';
import Events from './EventHandling/events';

const Home = () => {
  const dispatch = useDispatch();
  const {eventinfo, globalposts} = useSelector((state) => ({
    eventinfo: state.event,
    globalposts: state.post.globalposts
  }));
  const allevents = eventinfo.allevents;
  let loading = eventinfo.alleventsloading;

  useEffect(() => {
    const userLoad = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(getAllPosts());
        // console.log('token verified by fetchallevents');
        dispatch(getCurrentProfile());
        // console.log('token verified by getcurrentprofile set at home');
      }
      console.log('Home Page refreshed');
    };
    // userLoad();

  }, [loadUser, getAllPosts]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View>
        {allevents && (
          <FlatList
            data={globalposts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Posts item={[item]} />}
          />
        )}
      </View>
    );
  }
};

export default Home;
