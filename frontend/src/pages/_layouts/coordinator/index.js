import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function Coordinator({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Coordinator.propTypes = {
  children: PropTypes.element.isRequired,
};
