import axios from 'axios';
import { SAMPLE_DATA_FETCH } from './types';

export const sampleDataFetch = () => async (dispatch) => {
  const res = await axios.get('http://localhost:3000/api/name');
  dispatch({ type: SAMPLE_DATA_FETCH, payload: res.data });
};
