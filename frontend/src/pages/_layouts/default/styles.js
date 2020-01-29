import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #0277bd, #00b0ff);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  span.title-contact {
    display: flex;
    align-items: flex-start;
    margin-top: 20px;

    font-size: 18px;
    font-weight: bold;
    color: #fff;
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
      margin: 10px 0 0;
      height: 42px;
      border-radius: 4px;

      background: #fff;
      color: #263238;
      font-size: 15px;
      font-weight: bold;

      transition: background 0.25s ease-in-out;

      &:hover {
        background: ${darken(0.05, '#fff')};
      }
    }

    a {
      color: #fff;
      font-size: 14px;

      transition: opacity 0.25s ease-in-out;
      margin-top: 15px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
