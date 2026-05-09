import { getCurrency } from '../../api/currency';
import { setLoading } from './global';

export const getAllCurrency = (value) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getCurrency(value);
    dispatch({ type: 'GET_ALL_CURRENCY', value: response.data });
    dispatch(setLoading(false));
  } catch (error) {
    dispatch({ type: 'GET_ALL_CURRENCY_ERROR', value: [] });
    dispatch(setLoading(false));
  }
};
