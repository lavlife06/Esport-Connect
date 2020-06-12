import {
  GETMYPOSTS,
  CLEARMYPOSTS,
  GETGLOBALPOSTS,
  CLEARGLOBALPOSTS,
  LIKEDSUCCESS,
  UNLIKEDSUCCESS,
  LIKEHANDLESUCCESS,
} from '../actions/types';

const initialState = {
  globalposts: [],
  loading: true,
  changedlike: null,
  // error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GETGLOBALPOSTS:
      console.log('GETGLOBALPOSTS-SUCCESSFULL');
      return {
        ...state,
        globalposts: [...payload],
        loading: false,
      };
    case CLEARGLOBALPOSTS:
      return {
        ...state,
        globalposts: [],
        loading: false,
      };
    case LIKEHANDLESUCCESS:
      return {
        changedlike: payload,
        loading: false,
      };
    default:
      return state;
  }
};
