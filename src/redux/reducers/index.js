import {combineReducers} from 'redux';

import {globalReducer} from './global';
import {callingCodeReducer} from './callingCode';
import {countryReducer} from './country';
import {currencyReducer} from './currency';

const reducers = combineReducers({
  globalReducer,
  callingCodeReducer,
  countryReducer,
  currencyReducer,
});

export default reducers;
