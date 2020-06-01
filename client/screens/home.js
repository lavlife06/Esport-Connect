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

const Home = () => {
  const dispatch = useDispatch();
  const eventinfo = useSelector((state) => state.event);
  const allevents = eventinfo.allevents;
  let loading = eventinfo.alleventsloading;

  useEffect(() => {
    const userLoad = async () => {
      const token = await AsyncStorage.getItem('token');
      setAuthToken(token);
      // dispatch(loadUser());
      if (token !== null) {
        dispatch(fetchallevents());
        console.log('token verified by fetchallevents');
        dispatch(getCurrentProfile());
        console.log('token verified by getcurrentprofile set at home');
      }
      console.log('Home Page refreshed');
    };
    userLoad();
    dispatch({ type: CLEAR_PROFILES });
  }, [loadUser, fetchallevents]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View>
        {allevents && (
          <FlatList
            data={allevents}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Events item={[item]} />}
          />
        )}
      </View>
    );
  }
};

export default Home;
