import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { updateProfessorSuccess, updateProfessorFailure } from './actions';

export function* updateProfessor({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.currentPassword ? rest : {}),
    };
    console.tron.log(profile);

    const response = yield call(api.put, '/professor', profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfessorSuccess(response.data.dataRes));
  } catch (err) {
    toast.error('Erro ao atualizar perfil. Verifique seus dados');
    updateProfessorFailure();
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFESSOR_REQUEST', updateProfessor),
]);
