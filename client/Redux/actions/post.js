import {
  GETMYPOSTS,
  CLEARMYPOSTS,
  GETGLOBALPOSTS,
  CLEARGLOBALPOSTS,
  LIKEHANDLESUCCESS,
  CLEARCHANGEDLIKE,
  CHANGEUIDUETOLIKE,
} from './types';
import axios from 'axios';
import { ipAddress } from '../ipaddress';
import { createProfile, getCurrentProfile } from './profile';
import { setAlert } from './alert';

//  Get all posts to show on home page
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://${ipAddress}:3000/api/post/allposts`);

    dispatch({
      type: GETGLOBALPOSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLEARGLOBALPOSTS,
    });
  }
};

//  Like handling of posts
export const likeHandler = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://${ipAddress}:3000/api/post/likehandling/${post_id}`
    );
    dispatch({
      type: LIKEHANDLESUCCESS,
      payload: { id: post_id, likes: res.data },
    });
  } catch (err) {
    console.error('likeHandler error');
  }
};

export const changeUIdueTolike = (data) => (dispatch) => {
  dispatch({ type: CHANGEUIDUETOLIKE, payload: data });
};

export const clearChangedlike = () => (dispatch) => {
  dispatch({ type: CLEARCHANGEDLIKE });
};

// Delete my post
export const deletePost = () => async (dispatch) => {
  try {
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
  } catch (err) {
    const errors = err.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};
