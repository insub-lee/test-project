import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';
// import 'antd/dist/antd.css';

class SignStep extends Component {
  componentDidMount() {}

  render() {
    const { signline } = this.props;
    const { Step } = Steps;

    let currStep = 0;
    const stepArr = [];
    signline.forEach(item => {
      if (item.APPV_STATUS === 1) {
        currStep = item.STEP;
      }
      if (!stepArr.includes(item.STEP)) {
        stepArr.push(item.STEP);
      }
    });

    return (
      <div>
        <Steps current={currStep}>
          {stepArr.map(item => (
            <Step key={item} />
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
