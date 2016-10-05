/* eslint-disable react/no-danger */
import React, { PropTypes } from 'react';

import iconMap from '../../utils/icon-map';


const Icon = ({ value, size, ...delegated }) => {
  const divStyles = {
    display: 'inline-block',
  };

  if (size) { divStyles.width = `${size}px`; }

  return (
    <div style={divStyles} className="icon">
      <svg
        {...delegated}
        viewBox="0 0 24 24"
        dangerouslySetInnerHTML={{ __html: iconMap[value] }}
      />
    </div>
  );
};

Icon.propTypes = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Icon.defaultProps = {
  size: 24,
};

export default Icon;
