import {
  GETMYPOSTS,
  CLEARMYPOSTS,
  GETGLOBALPOSTS,
  CLEARGLOBALPOSTS,
} from '../actions/types';

const initialState = {
  globalposts: [],
  globalpostsloading: true,
  // error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GETGLOBALPOSTS:
      console.log('GETGLOBALPOSTS-SUCCESSFULL');
      return {
        ...state,
        globalposts: payload,
        globalpostsloading: false,
      };
    case CLEARGLOBALPOSTS:
      return {
        ...state,
        globalposts: [],
        globalpostsloading: false,
      };
    default:
      return state;
  }
};
