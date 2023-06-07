import { getCountries, getCountriesDetail } from "../../api/country";
import { setLoading } from "./global";

export const getAllCountries = (value) => async (dispatch) => {
      try {
        setLoading(true)
        const response = await getCountries(value);
        dispatch({type: 'GET_ALL_COUNTRIES', value: response.data});
        setLoading(false)
      } catch (error) {
        console.log(error);
        dispatch({type: 'GET_ALL_COUNTRIES_ERROR', value: []});
        setLoading(false)
      }
  };

export const getDetailCountries = (value) => async (dispatch) => {
      try {
        setLoading(true)
        const response = await getCountriesDetail(value);
        dispatch({type: 'GET_DETAIL_COUNTRIES', value: response.data});
        setLoading(false)
      } catch (error) {
        dispatch({type: 'GET_DETAIL_COUNTRIES_ERROR', value: []});
        setLoading(false)
      }
  };