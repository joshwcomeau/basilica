// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './index.scss';


const ToggleRow = ({ prefix, className, items, activeItem, onClickItem }) => {
  const classes = classNames(['toggle-row', className]);

  const itemElements = items.map((item) => {
    // If the 'item' is a string, we want to use that string for both
    // the value and the label
    let itemObject;
    if (typeof item === 'string') {
      itemObject = { value: item, label: item };
    } else {
      itemObject = item;
    }

    const itemClasses = classNames({
      'is-active': itemObject.value === activeItem,
    });

    return (
      <li className={itemClasses} key={itemObject.value}>
        {/* Adding a <button> to be a11y-compliant */}
        <button onClick={() => onClickItem(itemObject.value)}>
          {itemObject.label}
        </button>
      </li>
    );
  });

  const prefixElement = prefix && <h4 className="prefix">{prefix}</h4>;

  return (
    <div className={classes}>
      {prefixElement}
      <ul>
        {itemElements}
      </ul>
    </div>
  );
};

ToggleRow.propTypes = {
  className: PropTypes.string,
  prefix: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])),
  activeItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClickItem: PropTypes.func,
};

ToggleRow.defaultProps = {

};

export default ToggleRow;
