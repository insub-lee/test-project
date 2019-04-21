import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { intlObj } from 'utils/commonUtils';
import messages from '../../../components/Page/messages';
import { QuickMenuStyle } from './quickmenuStyle.js';

class onApply extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { title, isAuth, apply } = this.props;

    if (!isAuth && !apply) {
      return (
        <QuickMenuStyle>
          <div className="carouselWrapper noCentent">
            <p>{title}</p><br />
            <p>{intlObj.get(messages.noApply)}</p><br />
            <button onClick={this.props.onApply}>{intlObj.get(messages.useApply)}</button>
          </div>
        </QuickMenuStyle>
      );
    } else {
      return (
        <QuickMenuStyle>
          <div className="carouselWrapper noCentent">
            <p>{title}</p><br />
            <p>{intlObj.get(messages.saveApply)}</p><br />
            <button onClick={this.props.onNoneApply}>{intlObj.get(messages.cancelApply)}</button>
          </div>
        </QuickMenuStyle>
      );
    }
  }
}

onApply.propTypes = {

};

export default onApply;
