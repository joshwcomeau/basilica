// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../Icon';
import './index.scss';


const Button = ({
  children,
  className,
  theme,
  icon,
  size,
  disabled,
  withInnerBorder,
  onClick,
}) => {
  const classes = classNames('button', className, size, theme, {
    'with-inner-border': withInnerBorder,
  });

  const iconSquare = icon && (
    <div className="icon-square">
      <Icon value={icon} />
    </div>
  );

  const buttonText = children && (
    <div className="button-text">
      {children}
    </div>
  );

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {iconSquare}
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark', 'primary']),
  icon: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  withInnerBorder: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  theme: 'light',
  size: 'small',
  disabled: false,
};

export default Button;
