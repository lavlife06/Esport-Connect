import {
  FETCHEVENTS_SUCCESS,
  FETCHEVENTS_FAIL,
  ADDEVENT_SUCCESS,
  ADDEVENT_FAIL,
} from './types';
import axios from 'axios';
import { ipAddress } from '../ipaddress';
import { setAlert } from './alert';
import { getCurrentProfile } from './profile';

//  Fetch all events to show the users/players
export const fetchallevents = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://${ipAddress}:3000/api/event/allevents`);

    dispatch({
      type: FETCHEVENTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(`error from fetchallevents : ${err.message}`);
  }
};

// Add users Event
export const addmyevent = (eventdata) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(eventdata);
  try {
    const res = await axios.post(
      `http://${ipAddress}:3000/api/event/addevent`,
      body,
      config
    );
    // console.log('signup res.data: ', res.data);
    dispatch({
      type: ADDEVENT_SUCCESS,
    });
    if (res.data) {
      // role of getCurrentProfile here is that it updates the myprofile state and thereby updating myevents
      dispatch(getCurrentProfile());
      // role of fetchallevents here is that it updates the allevents state
      dispatch(fetchallevents());
    }
  } catch (err) {
    const errors = err.response.data.errors;
    // this errors are the errors send form the backend

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    console.log(`error from addmyevent : ${err.message}`);
  }
};
