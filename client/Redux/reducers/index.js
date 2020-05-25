import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import alertReducer from './alertReducer';
import loadingReducer from './loadingReducer';
import eventReducer from './eventReducer';

export default combineReducers({
  sample: sampleReducer,
  auth: authReducer,
  profile: profileReducer,
  alert: alertReducer,
  loading: loadingReducer,
  event: eventReducer,
});
