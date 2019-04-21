import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const RestrictedRoute = ({
  component: Component,
  isLoggedIn,
  profile,
  ...rest
}) => (
  <div>
    <Route
      {...rest}
      render={
        props => (
          isLoggedIn ? (
            <Component
              {...props}
              profile={profile}
            />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />)
        )
      }
    />
  </div>
);

RestrictedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  component: PropTypes.func, //eslint-disable-line
  location: PropTypes.object, //eslint-disable-line
};

RestrictedRoute.defaultProps = {
  profile: undefined,
};

export default RestrictedRoute;
