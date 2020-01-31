import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 20px;
    color: #eee;

    svg {
      margin-right: 10px;
    }
  }

  form {
    display: flex;
    flex-direction: column;

    margin-top: 15px;

    input {
      background: rgba(0, 0, 0, 0.15);
      height: 44px;
      padding: 0 15px;
      margin: 0 0 5px;
      border: none;
      border-radius: 4px;

      font-size: 14px;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      align-self: flex-start;
      margin: 0 0 10px;
      color: #ef5350;
    }

    button {
      border: none;
      margin: 15px 0 0;
      height: 42px;
      border-radius: 4px;

      background: #fff;
      color: #263238;
      font-size: 15px;
      font-weight: bold;

      transition: background 0.25s ease-in-out;

      &:hover {
        background: ${darken(0.075, '#fff')};
      }
    }
  }
`;
