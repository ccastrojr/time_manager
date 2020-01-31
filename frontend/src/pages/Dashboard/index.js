import React, { useState, useEffect } from 'react';
import { FaUsers, FaCog, FaBook } from 'react-icons/fa';

import api from '~/services/api';

import { Container, TableData, InitialInfo } from './styles';

export default function Dashboard() {
  const [professors, setProfessors] = useState([]);
  const [academicSubjects, setAcademicSubjects] = useState([]);

  useEffect(() => {
    async function loadProfessors() {
      const response = await api.get('/professor');

      setProfessors(response.data.professors);
    }

    loadProfessors();
  }, []);

  useEffect(() => {
    async function loadAcademicSubjects() {
      const response = await api.get('/academicsubjects');

      setAcademicSubjects(response.data.academicSubjects);
    }

    loadAcademicSubjects();
  }, []);

  return (
    <Container>
      <InitialInfo>
        <h1>
          <FaCog />
          Time Manager
        </h1>

        <hr />
      </InitialInfo>

      <TableData>
        <div>
          <FaUsers />
          Professores
        </div>
        <table cellSpacing="0">
          <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>E-mail</th>
          </tr>

          {professors.map(professor => (
            <tr>
              <td>{professor.name}</td>
              <td>{professor.registration}</td>
              <td>{professor.email}</td>
            </tr>
          ))}
        </table>
      </TableData>

      <TableData>
        <div>
          <FaBook />
          Disciplinas
        </div>

        <table cellSpacing="0">
          <tr>
            <th>Nome</th>
            <th>Carga Horária</th>
            <th>Semestre</th>
          </tr>

          {academicSubjects.map(academicSubject => (
            <tr>
              <td>{academicSubject.name}</td>
              <td>{academicSubject.workload}h</td>
              <td>{academicSubject.semester}</td>
            </tr>
          ))}
        </table>
      </TableData>
    </Container>
  );
}
