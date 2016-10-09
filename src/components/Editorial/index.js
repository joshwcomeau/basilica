/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import closeupLacAuxCastors from '../../images/closeup-lac-aux-castors-bw.jpg';
import closeupOratoireSaintJoseph from '../../images/closeup-oratoire-saint-joseph-bw.jpg';
import closeupParcSaintPaul from '../../images/closeup-parc-saint-paul-bw.jpg';
import { lightboxOpen } from '../../actions';

import Heading from '../Heading';
import EditorialPhoto from '../EditorialPhoto';
import InnerWrapper from '../InnerWrapper';
import './index.scss';


const Editorial = ({ lightboxOpen }) => {
  const classes = classNames(['editorial']);

  return (
    <div className={classes}>
      <InnerWrapper size="narrow" className="intro">
        <Heading useParallaxEffect>
          Authentic urban plans
        </Heading>

        <p>In September 2016, we procured a set of rare archival documents from the City of Montréal. These large documents are 4 feet long, and were used for decades—from the 60s through to the 90s—to help develop new policies and regulations. It is impossible to say how different the city would look today if not for these documents.</p>

        <p>In the days of Google Maps and Google Earth, it can be hard to appreciate the value of these pieces. Planners have written in precise detail about each lot, painstakingly capturing a city in a set of 1:1000-scale documents.</p>

        <p>These plans were never meant to be hung on a wall. They are pieces of history, and the pencil marks, rough edges, and occasional pieces of worn tape are testament to their years in service.</p>

        <p>They offer an incredible glimpse into the Montréal of the past.</p>
      </InnerWrapper>

      <InnerWrapper>
        <div className="photo-row">
          <EditorialPhoto
            src={closeupLacAuxCastors}
            withShadow
            onClick={lightboxOpen}
          />
          <EditorialPhoto
            src={closeupOratoireSaintJoseph}
            withShadow
            onClick={lightboxOpen}
          />
          <EditorialPhoto
            src={closeupParcSaintPaul}
            withShadow
            onClick={lightboxOpen}
          />
        </div>
      </InnerWrapper>
    </div>
  );
};

Editorial.propTypes = {
  lightboxOpen: PropTypes.func,
};

Editorial.defaultProps = {

};

export default connect(null, { lightboxOpen })(Editorial);
