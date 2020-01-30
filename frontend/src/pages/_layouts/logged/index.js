import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import { Wrapper } from './styles';

export default function Coordinator({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

Coordinator.propTypes = {
  children: PropTypes.element.isRequired,
};
