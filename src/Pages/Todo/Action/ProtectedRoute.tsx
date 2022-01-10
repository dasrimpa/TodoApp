import React from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {

const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props: JSX.IntrinsicAttributes) => {
        if (auth) return <Component {...props} />;
        if (!auth)
          return (
            <navigate to={{ path: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedRoute;