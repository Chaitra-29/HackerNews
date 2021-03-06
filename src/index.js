import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Welcome from './Welcome';
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path={"/"} component={Welcome} />
      <Route path={"/:id"} component={App} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
