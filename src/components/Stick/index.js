// eslint-disable-next-line no-unused-vars
import React, { Children, Component, PropTypes } from 'react';

import { getElementOffset } from '../../utils/misc.utils';


class Stick extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStuck: false,
    };
  }

  componentDidMount() {
    // If the element ref didn't come through, it likely means we're
    // running in a test environment.
    if (!this.elem) {
      return;
    }
    // Let's figure out the component's original mounting distance from
    // the top of the window.
    const originalTop = getElementOffset(this.elem).top;

    // Register a scroll listener, so that we can check if we need to
    window.addEventListener('scroll', () => {
      const { scrollY } = window;

      if (!this.state.stuck && scrollY > originalTop) {
        this.setState({ stuck: true });
      } else if (this.state.stuck && scrollY <= originalTop) {
        this.setState({ stuck: false });
      }
    });
  }

  render() {
    const { children, className, style, stuckStyle } = this.props;

    const classes = [
      className,
      this.state.stuck ? 'is-stuck' : 'is-not-stuck',
    ].join(' ');

    let newStyle;
    if (this.state.stuck) {
      newStyle = {
        ...style,
        position: 'fixed',
        top: 0,
        bottom: 'auto',
        ...stuckStyle,
      };
    } else {
      newStyle = style;
    }

    return (
      <div
        className={classes}
        ref={elem => this.elem = elem}
        style={newStyle}
      >
        {children}
      </div>
    );
  }
}

Stick.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  stuckStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

Stick.defaultProps = {
  stuckStyle: {},
};

export default Stick;
