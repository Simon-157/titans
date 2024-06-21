import React from 'react';
import { Route, Switch } from 'react-router-dom';
import concat from 'lodash/concat';
import map from 'lodash/map';
import routes from 'routes';
import NotFound from 'pages/NotFound';

const children = concat(
  map(routes, ({ component, exact, path }) => (
    <Route
      key={path}
      path={path}
      exact={exact}
      component={component}
    />
  )),
  <Route
    key={404}
    component={NotFound}
  />,
);

function Routes() {
  return (
    <Switch>
      {children}
    </Switch>
  );
}

Routes.displayName = 'Routes';

export default Routes;
