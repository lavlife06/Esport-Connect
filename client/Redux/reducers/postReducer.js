import {
  GETMYPOSTS,
  CLEARMYPOSTS,
  GETGLOBALPOSTS,
  CLEARGLOBALPOSTS,
  LIKEHANDLESUCCESS,
  CLEARCHANGEDLIKE,
  CHANGEUIDUETOLIKE,
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
      // This will instantly change the like number in our app
      return {
        ...state,
        changedlike: { id: payload.id, likes: payload.likes },
        globalposts: state.globalposts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case CHANGEUIDUETOLIKE:
      // This will change the like number in users app when anyone like/unlike post
      return {
        ...state,
        globalposts: state.globalposts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case CLEARCHANGEDLIKE:
      return {
        ...state,
        changedlike: null,
      };
    default:
      return state;
  }
};
