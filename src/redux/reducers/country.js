const initCountry = {
    dataAllCountry: [],
    dataDetailCountry: [],
  };
  
  export const countryReducer = (state = initCountry, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'GET_ALL_COUNTRIES': {
        return {...state, dataAllCountry: action.value};
      }
      case 'GET_ALL_COUNTRIES_ERROR': {
        return {...state, dataAllCountry: action.value};
      }
      case 'GET_DETAIL_COUNTRIES': {
        return {...state, dataDetailCountry: action.value};
      }
      case 'GET_DETAIL_COUNTRIES_ERROR': {
        return {...state, dataDetailCountry: action.value};
      }
    }
    return state;
  };
  