// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const Input = ({ className, label, name, type, value, onChange }) => {
  const classes = classNames(['input-container', className]);

  return (
    <span className={classes}>
      <label htmlFor={name}>
        {label}

        <span className="input-decorator-wrapper">
          <input
            className="input"
            name={name}
            id={name}
            type={type}
            onChange={onChange}
            value={value}
          />
          <div className="input-decorator" />
        </span>
      </label>
    </span>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
