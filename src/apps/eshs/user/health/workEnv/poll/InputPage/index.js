import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PollInput from 'apps/eshs/user/health/workEnv/poll/InputPage/PollInput';
import PropTypes from 'prop-types';

class InputPage extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={PollInput} />;
  }
}

InputPage.propTypes = {
  sagaKey: PropTypes.string,
};
InputPage.defaultProps = {
  sagaKey: 'PollInput',
};
export default InputPage;
