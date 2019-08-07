import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';
import 'antd/dist/antd.css';

class SignStep extends Component {
  componentDidMount() {}

  render() {
    const { signline } = this.props;
    const { Step } = Steps;

    let currStep = 0;
    signline.forEach(item => {
      if (item.APPV_STATUS === 1) {
        currStep = item.STEP;
      }
    });

    return (
      <div>
        <Steps current={currStep}>
          {signline.map((item, index) => (
            <Step key={index} />
          ))}
        </Steps>
      </div>
    );
  }
}

SignStep.propTypes = {
  signline: PropTypes.array,
};

SignStep.defaultProps = {
  signline: [],
};

export default SignStep;
