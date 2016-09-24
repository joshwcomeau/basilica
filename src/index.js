import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Match
} from 'react-router';

import Home from './components/Home';

render(
  <Router>
    <Match exactly pattern="/" component={Home} />
  </Router>,
  document.getElementById('root')
);
