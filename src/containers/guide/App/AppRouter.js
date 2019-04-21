import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Article from '../components/Article';

const AppRouter = (props) => {
  const { url } = props;

  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${url}/`}
          component={Article}
        />
        <Route
          path={`${url}/:keyUrl`}
          component={Article}
          // title={selectedArticle}
        />
      </Switch>
    </div>
  );
};

AppRouter.propTypes = {
  url: PropTypes.string.isRequired,
  // selectedArticle: PropTypes.string.isRequired,
};
export default AppRouter;
