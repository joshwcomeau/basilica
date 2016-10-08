import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Match } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store';

// eslint-disable-next-line import/no-named-as-default
import Home from './components/Home';
import PhotoLightbox from './components/PhotoLightbox';
import DevTools from './components/DevTools';


// Needed for onTouchTap
// Check this repo: https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <div>
        <Match exactly pattern="/" component={Home} />
        <DevTools />
        <PhotoLightbox />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
