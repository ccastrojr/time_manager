import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  registration: Yup.string().required('A matrícula é obrigatória.'),
  password: Yup.string().required('A senha é obrigatória.'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ registration, password }) {
    dispatch(signInRequest(registration, password));
  }

  return (
    <>
      <img src={logo} alt="Time manager" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="registration" type="text" placeholder="Sua matrícula" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Entrar</button>
        <Link to="contact">Não tem uma conta? Contate o administrador</Link>
      </Form>
    </>
  );
}
