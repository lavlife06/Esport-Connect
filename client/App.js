import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { store } from './Redux/store';
import MainComponent from './MainComponent';
import setAuthToken from './Redux/setAuthToken';

const App = () => {;

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default App;
