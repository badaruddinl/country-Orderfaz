import { getCallingCode } from "../../api/callingCode";
import { setLoading } from "./global";

export const getAllCallingCode = (value) => async (dispatch) => {
      try {
        setLoading(true)
        const response = await getCallingCode(value);
        dispatch({type: 'GET_ALL_CALLINGCODE', value: response.data});
        setLoading(false)
      } catch (error) {
        dispatch({type: 'GET_ALL_CALLINGCODE_ERROR', value: []});
        setLoading(false)
      }
  };
