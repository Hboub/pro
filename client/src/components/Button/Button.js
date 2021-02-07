import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from './Button.styles';
// import Btn from '@material-ui/core/Button';

const Button = ({ disabled, onClick, btnType, type, children, customStyles }) => (
  <ButtonWrapper
    disabled={disabled}
    onClick={onClick}
    className={[btnType].join(' ')}
    type={type}
    style={customStyles}
  >
    {children}
  </ButtonWrapper>
  // <Btn variant="outlined" type={type} onClick={onClick} disabled={disabled}>{children}</Btn>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  btnType: PropTypes.string,
  customStyles: PropTypes.object,
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  type: 'button'
};

export default Button;