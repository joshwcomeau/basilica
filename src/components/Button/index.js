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
    <button className={classes} onClick={onClick}>
      {iconSquare}
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  icon: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  withInnerBorder: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  theme: 'light',
  size: 'small',
};

export default Button;
