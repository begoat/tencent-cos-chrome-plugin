import React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { Env } from './Env';
import './index.less';

const Main = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App}></Route>
        <Route path="/env" component={Env}></Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<Main />, document.getElementById('app'));
