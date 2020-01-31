import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  max-width: 750px;
  margin: 0 auto;
  padding: 40px;
`;

export const TableData = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  margin: 10px auto 25px;
  overflow: hidden;
  width: 700px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    background: #fff;
    padding: 1rem;

    color: #263238;
    font-size: 1.5em;
    font-weight: 700;

    text-transform: uppercase;

    svg {
      margin-right: 10px;
    }
  }

  table {
    width: 100%;

    td,
    th {
      color: ${darken(0.25, '#398B93')};
      padding: 10px;
    }

    td {
      text-align: center;
      vertical-align: middle;

      &:last-child {
        font-size: 0.95em;
        line-height: 1.4;
      }
    }

    th {
      font-weight: 700;
      background: ${lighten(0.45, '#398B93')};
    }

    tr {
      &:nth-child(2n) {
        background-color: white;
      }
      &:nth-child(2n + 1) {
        background-color: ${lighten(0.55, '#398B93')};
      }
    }
  }
`;

export const InitialInfo = styled.div`
  text-align: center;
  margin-bottom: 15px;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    svg {
      margin-right: 10px;
    }
  }

  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 15px 0 18px 0;
  }

  div {
  }
`;
