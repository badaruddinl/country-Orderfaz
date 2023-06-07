const initCurrency = {
    dataAllCurrency: [],
  };
  
  export const currencyReducer = (state = initCurrency, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'GET_ALL_CURRENCY': {
        return {...state, dataAllCurrency: action.value};
      }
      case 'GET_ALL_CURRENCY_ERROR': {
        return {...state, dataAllCurrency: action.value};
      }
    }
    return state;
  };
  