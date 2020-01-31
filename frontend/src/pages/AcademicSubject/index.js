import React from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { FaBook } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Este campo é obrigatório.'),
  workload: Yup.string().required('Este campo é obrigatório.'),
  semester: Yup.string().required('Este campo é obrigatório.'),
});

export default function AcademicSubject() {
  const department_id = useSelector(
    state => state.professor.professor.department.id
  );

  async function handleSubmit(data) {
    try {
      const { name, workload, semester } = data;
      await api.post('/academicsubjects', {
        name,
        workload,
        semester,
        department_id,
      });

      toast.success('Disciplina criada!');
    } catch (err) {
      toast.error('Erro ao cadastrar dispiciplina. Verifique os dados!');
    }
  }

  return (
    <Container>
      <h1>
        <FaBook />
        Cadastro de Disciplina
      </h1>

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome da disciplina" />
        <Input name="workload" placeholder="Carga horária" />
        <Input name="semester" placeholder="Semestre" />

        <button type="submit">Cadastrar Disciplina</button>
      </Form>
    </Container>
  );
}
