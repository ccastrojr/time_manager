import { combineReducers } from 'redux';

import auth from './auth/reducer';
import professor from './professor/reducer';

export default combineReducers({
  auth,
  professor,
});
