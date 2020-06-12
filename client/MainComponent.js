import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './styles/theme';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import AuthStack from './routes/authStack';
import { globalStyles } from './styles/global';
import { useSelector, useDispatch } from 'react-redux';
import DrawerStack from './routes/drawerStack';
import Alert from './shared/alert';
import { AsyncStorage } from 'react-native';
import setAuthToken from './Redux/setAuthToken';
import { loadUser } from './Redux/actions/auth';
import Loading from './shared/loading';
import { fetchallevents } from './Redux/actions/event';
import { getCurrentProfile } from './Redux/actions/profile';
import io from 'socket.io-client';
import { ipAddress } from './Redux/ipaddress';

let socket;

const MainComponent = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const [isReady, setIsReady] = useState(true);
  // console.log('AUTH************: ', isAuthenticated);
  useEffect(() => {
    // Connect socket
    socket = io(`http://${ipAddress}:3000`);

    socket.emit('hello', 'hello lav kaise ho app');

    socket.on('hello', (data) => {
      console.log(data);
    });

    const userLoad = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        setAuthToken(token);
        dispatch(loadUser());
        dispatch(getCurrentProfile());
      }
    };
    userLoad();
    console.log('Maincomponent page refreshed');
  }, []);

  if (!isReady) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <View style={globalStyles.container}>
          <Alert />
          {!isAuthenticated ? <AuthStack /> : <DrawerStack />}
        </View>
      </ThemeProvider>
    );
  }
};

export { MainComponent, socket };
