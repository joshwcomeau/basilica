// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const Input = ({ className, label, name, type, value, min, max, onChange }) => {
  const classes = classNames(['input-container', className]);

  let input;
  if (type === 'fixed') {
    // This is actually not an input at all, just a bit of static text.
    // It's useful, though, for maintaining consistency between regular
    // inputs and "prefilled", unchangeable fields.
    input = <span className="input-fixed">{value}</span>;
  } else {
    input = (
      <input
        className="input"
        name={name}
        id={name}
        type={type}
        onChange={onChange}
        min={min}
        max={max}
        value={value}
      />
    );
  }

  return (
    <span className={classes}>
      <label htmlFor={name}>
        {label}

        <span className="input-decorator-wrapper">
          {input}
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
  type: PropTypes.oneOf(['text', 'number', 'fixed']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
