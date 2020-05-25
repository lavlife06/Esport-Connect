import {  GOOGLE_LOGIN } from '../actions/types';

const initialState = []

export default function(state = [], action){
  const {type, payload} = action
  switch(type){
    case GOOGLE_LOGIN:
      return payload
    default: 
      return state
  }
}
