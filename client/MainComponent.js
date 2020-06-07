import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './styles/theme';
import { View } from 'react-native';
import AuthStack from './routes/authStack';
import { globalStyles } from './styles/global';
import { useSelector, useDispatch } from 'react-redux';
import DrawerStack from './routes/drawerStack';
import Alert from './shared/alert';
import { AsyncStorage } from 'react-native';
import setAuthToken from './Redux/setAuthToken';
import { loadUser } from './Redux/actions/auth';
import Loading from './shared/loading';

const MainComponent = () => {
  const dispatch = useDispatch();
  const { auth, loading } = useSelector((state) => ({
    auth: state.auth,
    loading: state.loading,
  }));
  const isAuthenticated = auth.isAuthenticated;
  const [isReady, setIsReady] = useState(true);
  // console.log("AUTH************: ",isAuthenticated)
  useEffect(() => {
    const userLoad = async () => {
      const token = await AsyncStorage.getItem('token');
      setAuthToken(token);
      dispatch(loadUser());
    };
    userLoad();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <View style={globalStyles.container}>
          <Alert />
          {loading ? (
            <Loading />
          ) : !isAuthenticated ? (
            <AuthStack />
          ) : (
            <DrawerStack />
          )}
        </View>
      </ThemeProvider>
    );
  }
};

export default MainComponent;
