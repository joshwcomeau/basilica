// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../Icon';
import './index.scss';


const Button = ({ children, theme, icon, size, withInnerBorder }) => {
  const classes = classNames('button', size, theme, {
    'with-inner-border': withInnerBorder,
  });

  const iconSquare = icon && (
    <div className="icon-square">
      <Icon value={icon} />
    </div>
  );

  return (
    <div className={classes}>
      {iconSquare}
      {children}
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node,
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
