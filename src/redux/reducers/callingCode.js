const initCallingCode = {
    dataCallingCode: [],
  };
  
  export const callingCodeReducer = (state = initCallingCode, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'GET_ALL_CALLINGCODE': {
        return {...state, dataCallingCode: action.value};
      }
      case 'GET_ALL_CALLINGCODE_ERROR': {
        return {...state, dataCallingCode: action.value};
      }
    }
    return state;
  };
  