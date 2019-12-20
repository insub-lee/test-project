import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Organization from './Organization';

class App extends React.Component {
  componentDidMount() {}

  render() {
    const { profile } = this.props;
    // query string
    const { lang, deptId, userId } = this.props.match.params;

    const WrappingRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => <Component {...props} show isModal={false} userProfile={profile} isProfile lang={lang} deptId={deptId} userId={userId} />}
      />
    );

    return (
      <div>
        <WrappingRoute exact path="/popup/organization/:lang/:deptId" component={Organization} profile={profile} />
        <WrappingRoute exact path="/popup/organization/:lang/:deptId/:userId" component={Organization} profile={profile} />
      </div>
    );
  }
}

App.propTypes = {
  profile: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default App;
