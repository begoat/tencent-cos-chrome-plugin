import React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch, Route, HashRouter } from 'react-router-dom';

import { App } from './App';
import { Env } from './Env';
import './index.less';

const Main = (): JSX.Element => {
  return (
    // https://github.com/ReactTraining/react-router/issues/4309#issuecomment-269556118
    <HashRouter>
      <Switch>
        <Route path="/" exact component={App}></Route>
        <Route path="/env" component={Env}></Route>
      </Switch>
    </HashRouter>
  );
};

ReactDOM.render(<Main />, document.getElementById('app'));
