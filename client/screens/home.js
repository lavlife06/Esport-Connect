import React, { useEffect } from 'react';
import { View, Button, FlatList, RefreshControl } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from '../Redux/actions/auth';
import { AsyncStorage } from 'react-native';
import { fetchallevents } from '../Redux/actions/event';
import Events from './EventHandling/events';
import setAuthToken from '../Redux/setAuthToken';
import Loading from '../shared/loading';
import { CLEAR_PROFILES } from '../Redux/actions/types';
import { getCurrentProfile } from '../Redux/actions/profile';
import { getAllPosts } from '../Redux/actions/post';
import Posts from './postHandling/posts';

const Home = () => {
  const dispatch = useDispatch();
  const eventinfo = useSelector((state) => state.event);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const allevents = eventinfo.allevents;
  let loading = eventinfo.alleventsloading;

  // useEffect(() => {
  //   // let token;
  //   // const userLoad = async () => {
  //   //   const token = await AsyncStorage.getItem('token');
  //   //   setAuthToken(token);
  //   //   // if (!isAuthenticated) {
  //   //   //   // This isAuthenticated says that user didnt logout and now he directly enters home page
  //   //   //   // because of his token stored in phone and that why we need loadUser() to get back his information
  //   //   //   dispatch(loadUser());
  //   //   //   console.log('loadUser from home triggreed');
  //   //   // }
  //   //   console.log('Home Page refreshed');
  //   // };
  //   // userLoad();
  //   // if (token !== null) {
  // dispatch(getAllPosts());
  //   // console.log('token verified by getallposts');
  //   // } else {
  //   //   console.log(
  //   //     'No token found and that why error from home page getallposts, userload and getcurrentprofile'
  //   //   );
  //   // }
  // }, [getAllPosts]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View>
        {allevents && (
          <FlatList
            data={allevents}
            keyExtractor={(item) => item._id}
            // renderItem={({ item }) => <Events item={[item]} />}
            renderItem={({ item }) => <Posts item={[item]} />}
          />
        )}
      </View>
    );
  }
};

export default Home;
