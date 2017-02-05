import React from 'react';
import {Route} from 'react-router';

import AppRoot from './components/app-root';
import Endpoint from './components/endpoint';
import Main from './components/main';

export default (
  <Route path="" component={AppRoot}>
    <Route path="/endpoint/:endpoint" component={Endpoint} />
    <Route path="*" component={Main} />
  </Route>
);
