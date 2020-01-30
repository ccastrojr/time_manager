import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaHome, FaBook, FaUsers } from 'react-icons/fa';

import logo from '~/assets/logo-blue.svg';

import { Container, Content, NavList, Profile } from './styles';

export default function Header() {
  const professor = useSelector(state => state.professor.professor);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Time Manager logo" />
          <NavList>
            <li>
              <Link to="/dashboard">
                <FaHome />
                Home
              </Link>
            </li>

            <li>
              <Link to="/academicSubject">
                <FaBook />
                Disciplinas
              </Link>
            </li>

            <li>
              <Link to="/professor">
                <FaUsers />
                Professores
              </Link>
            </li>
          </NavList>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{professor.name}</strong>
              <Link to="/profile">
                <FaUserAlt />
                Meu Perfil
              </Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
