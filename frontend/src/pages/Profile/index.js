import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';

import { updateProfessorRequest } from '~/store/modules/professor/actions';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const professor = useSelector(state => state.professor.professor);

  function handleSubmit(data) {
    dispatch(updateProfessorRequest(data));
  }

  return (
    <Container>
      <h1>
        <FaUserCircle />
        Meu Perfil
      </h1>

      <Form initialData={professor} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />

        <hr />

        <Input
          name="currentPassword"
          type="password"
          placeholder="Sua senha atual"
        />

        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
        />

        <button type="submit">Atualizar Perfil</button>
      </Form>

      <button type="button">Sair do Time Manager</button>
    </Container>
  );
}
