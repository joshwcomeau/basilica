// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import {
  addToRafThrottle,
  removeFromRafThrottle,
} from '../../utils/raf-throttle';
import './index.scss';


class Heading extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if (this.props.useParallaxEffect) {
      addToRafThrottle(this.handleScroll, 'scroll');
    }
  }

  componentWillUnmount() {
    removeFromRafThrottle(this.handleScroll, 'scroll');
  }

  handleScroll() {
    // We want to figure out where within the viewport the effectHeading
    // is.
    const { parallaxStart, parallaxEnd } = this.props;

    const viewportHeight = window.innerHeight;
    const elementOffset = this.elem.getBoundingClientRect().top;

    const progress = 1 - (elementOffset / viewportHeight);

    const currentPosition = Math.round(
      parallaxStart + (parallaxEnd - parallaxStart) * progress
    );

    this.elem.style.transform = `translateX(${currentPosition}px)`;
  }

  render() {
    const { children, useParallaxEffect } = this.props;

    const classes = classNames(['heading']);

    const effectHeading = useParallaxEffect && (
      <h2 className="effect-heading" ref={elem => this.elem = elem}>
        {children}
      </h2>
    );

    return (
      <div className={classes}>
        <h2>{children}</h2>
        {useParallaxEffect && effectHeading}
      </div>
    );
  }
}

Heading.propTypes = {
  children: PropTypes.string,
  useParallaxEffect: PropTypes.bool,
  parallaxStart: PropTypes.number,
  parallaxEnd: PropTypes.number,
};

Heading.defaultProps = {
  useParallaxEffect: false,
  parallaxStart: -275,
  parallaxEnd: -125,
};

export default Heading;
