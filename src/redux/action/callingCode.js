import { getCallingCode } from '../../api/callingCode';
import { setLoading } from './global';

export const getAllCallingCode = (value) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getCallingCode(value);
    dispatch({ type: 'GET_ALL_CALLINGCODE', value: response.data });
    dispatch(setLoading(false));
  } catch (error) {
    dispatch({ type: 'GET_ALL_CALLINGCODE_ERROR', value: [] });
    dispatch(setLoading(false));
  }
};
