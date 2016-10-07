/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import spotlightImg from '../../images/closeup-van-horne-cdn.jpg';
import InnerWrapper from '../InnerWrapper';
import './index.scss';


const Editorial = () => {
  const classes = classNames(['editorial']);

  return (
    <div className={classes}>
      <InnerWrapper>
        <img
          className="editorial-image-spotlight"
          src={spotlightImg}
          alt="Spotlight on urban plans"
        />
        <h2>Authentic urban plans</h2>
        <p>In September 2016, we procured a set of rare archival documents from the City of Montréal. These large documents are 4 feet long, and were used for decades—from the 60s through to the 90s—to help develop new policies and regulations. It is impossible to say how different the city would look today if not for these documents.</p>
      </InnerWrapper>
    </div>
  );
};

Editorial.propTypes = {

};

Editorial.defaultProps = {

};

export default Editorial;
