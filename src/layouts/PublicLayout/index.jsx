import React, { Component,Suspense } from "react";
import { Spin } from 'antd';
import { Switch, Route } from "react-router-dom";

import { constantRoutes } from "@conf/routes";

class PublicLayout extends Component {
  renderRoute = (routes) => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={true}
        />
      );
    });
  };

  render() {
    return (
      <Suspense fallback={<Spin size="large" />}>
        <Switch>{this.renderRoute(constantRoutes)}</Switch>;
      </Suspense>
    )
  }
}

export default PublicLayout;
