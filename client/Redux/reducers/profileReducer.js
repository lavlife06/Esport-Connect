import {
  GET_PROFILES,
  GET_MYPROFILE,
  PROFILE_ERROR,
  CLEAR_MYPROFILE,
  CLEAR_PROFILES,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  MYPROFILE_ERROR,
  SETPARTICULARUSER,
  CLEARPARTICULARUSER,
  PARTICULARUSER_ERROR,
  GETPARTICULARUSER,
} from '../actions/types';

const initialState = {
  myprofile: null,
  particularuser: null,
  profiles: [],
  myprofileloading: true,
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MYPROFILE:
    case UPDATE_PROFILE:
      console.log('GETMYPROFILE-SUCCESSFULL');
      return {
        ...state,
        myprofile: payload,
        myprofileloading: false,
      };
    case GET_PROFILES:
      console.log('GETPROFILES-SUCCESSFULL');
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case SETPARTICULARUSER:
    case GETPARTICULARUSER:
      return {
        ...state,
        particularuser: payload,
        loading: false,
      };
    case CLEARPARTICULARUSER:
      return {
        ...state,
        particularuser: null,
        loading: false,
      };
    // case PROFILE_ERROR:
    //   return {
    //     ...state,
    //     error: payload,
    //     loading: false,
    //     profile: null,
    //   };
    // case PROFILES_ERROR:
    //   return {
    //     ...state,
    //     error: payload,
    //     loading: false,
    //     profiles: [],
    //   };
    case CLEAR_MYPROFILE:
      console.log('CLEARMYPROFILE - SUCCESSFULL');
      return {
        ...state,
        myprofile: null,
        // loading: false,
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        profiles: [],
        loading: false,
      };
    default:
      return state;
  }
};
