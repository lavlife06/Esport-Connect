import {
  GETMYPOSTS,
  CLEARMYPOSTS,
  GETGLOBALPOSTS,
  CLEARGLOBALPOSTS,
} from './types';
import axios from 'axios';
import setAuthToken from '../setAuthToken';
import { AsyncStorage } from 'react-native';
import { ipAddress } from '../ipaddress';
import { createProfile, getCurrentProfile } from './profile';
import { setAlert } from './alert';
import { loading } from './loading';

//  Get all posts to show on home page
export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch(loading(true));
    const res = await axios.get(`http://${ipAddress}:3000/api/post/allposts`);
    
    dispatch({
      type: GETGLOBALPOSTS,
      payload: res.data,
    });

    dispatch(loading(false));
  } catch (err) {
    dispatch({
      type: CLEARGLOBALPOSTS,
    });
    dispatch(loading(false));
  }
};

// Delete my post
export const deletePost = () => async (dispatch) => {
  try {
    dispatch(loading(true));
    const res = await axios.delete(
      `http://${ipAddress}:3000/api/post/deletepost/:post_id`
    );

    console.log('deleting post....');

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    console.log('delete succes');

    dispatch(loadUser());

    dispatch(createProfile({ name }));

    dispatch(loading(false));
  } catch (err) {
    const errors = err.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch(loading(false));
  }
};
