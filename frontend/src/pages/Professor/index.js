import React from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Este campo é obrigatório.'),
  registration: Yup.string().required('Este campo é obrigatório.'),
  email: Yup.string()
    .email()
    .required('Este campo é obrigatório.'),
});

export default function Professor() {
  const department_id = useSelector(
    state => state.professor.professor.department.id
  );

  async function handleSubmit(data) {
    try {
      const password = '123456';
      const { name, registration, email } = data;

      await api.post('/professor', {
        name,
        registration,
        email,
        password,
        department_id,
      });

      toast.success('Professor cadastrado.');
    } catch (err) {
      toast.error('Erro ao cadastrar professor.');
    }
  }

  return (
    <Container>
      <h1>
        <FaUserAlt />
        Cadastro de Professor
      </h1>

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome do professor" />
        <Input name="registration" placeholder="Matrícula do professor" />
        <Input name="email" type="email" placeholder="E-mail do professor" />
        <hr />
        <span className="register-warn">
          * Todo novo professor é cadastrado com a senha padrão{' '}
          <strong>123456</strong>
        </span>
        <button type="submit">Cadastrar Professor</button>
      </Form>
    </Container>
  );
}
