import React, { Component } from "react";
import { Route, Redirect } from "react-router-native";

export function PrivateRoute({
  isAuthenticated,
  component: Component,
  ...rest
}: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
