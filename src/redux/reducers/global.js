const initGlobalState = {
    isLoading: false,
  };
  
  export const globalReducer = (state = initGlobalState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'SET_LOADING': {
        return { ...state, isLoading: action.value };
      }
    }
    return state;
  };