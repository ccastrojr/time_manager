import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import professor from './professor/sagas';

export default function* rootSaga() {
  return yield all([auth, professor]);
}
