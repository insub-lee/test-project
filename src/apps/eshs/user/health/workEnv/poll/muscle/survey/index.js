import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PollInput from './PollInput';

const InputPage = props => {
  const { sagaKey } = props;
  return <BizMicroDevBase sagaKey={sagaKey} component={PollInput} />;
};

InputPage.propTypes = {
  sagaKey: PropTypes.string,
};
InputPage.defaultProps = {
  sagaKey: 'muscle_poll_survey',
};
export default InputPage;
