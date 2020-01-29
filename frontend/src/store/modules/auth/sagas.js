import { all, takeLatest, call, put } from 'redux-saga/effects';

import { signInSuccess } from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  const { registration, password } = payload;

  const response = yield call(api.post, '/sessions', {
    registration,
    password,
  });

  const { token, professor } = response.data;

  if (!professor.is_coordinator) {
    console.tron.log('Professor não é coordenador.');
    return;
  }

  yield put(signInSuccess(token, professor));

  history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
