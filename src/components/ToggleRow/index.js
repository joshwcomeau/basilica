// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { capitalize } from '../../utils/misc.utils';
import './index.scss';


const ToggleRow = ({ items, activeItem, onClickItem }) => {
  const classes = classNames(['toggle-row']);

  const itemElements = items.map((item) => {
    const itemClasses = classNames({
      'is-active': item === activeItem,
    });

    return (
      <li className={itemClasses} key={item}>
        {/* Adding a <button> to be a11y-compliant */}
        <button onClick={() => onClickItem(item)}>
          {capitalize(item)}
        </button>
      </li>
    );
  });

  return (
    <div className={classes}>
      <ul>
        {itemElements}
      </ul>
    </div>
  );
};

ToggleRow.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  activeItem: PropTypes.string,
  onClickItem: PropTypes.func,
};

ToggleRow.defaultProps = {

};

export default ToggleRow;
