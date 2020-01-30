import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 64px;
  background: #fff;
  padding: 0 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: center;

  li {
    margin-right: 30px;

    a {
      display: flex;
      justify-content: center;

      text-transform: uppercase;
      font-weight: bold;
      font-size: 12px;
      color: #1565c0;

      transition: color 0.25s;

      svg {
        margin-right: 5px;
      }

      &:hover {
        color: ${darken(0.1, '#1565c0')};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: left;

    strong {
      display: block;
      margin: 0 0 7px;
      font-weight: 400;
      font-size: 16px;
      color: #263238;
    }

    a {
      display: flex;
      align-items: center;

      text-transform: uppercase;
      font-weight: bold;
      font-size: 12px;
      color: #1565c0;

      transition: color 0.25s;

      svg {
        margin-right: 5px;
      }

      &:hover {
        color: ${darken(0.1, '#1565c0')};
      }
    }
  }
`;
