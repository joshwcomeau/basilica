import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Match
} from 'react-router';

import App from './App';
import './index.css';

render(
  <Router>
    <Match exactly pattern="/" component={App} />
  </Router>,
  document.getElementById('root')
);
