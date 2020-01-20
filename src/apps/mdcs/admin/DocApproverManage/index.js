import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Button, Icon, Popconfirm } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';
class DocApproverManage extends Component {
  render() {
    return (
      <div>
        <BizMicroDevBase sagaKey="distMgntList" component={List} />
      </div>
    );
  }
}
export default DocApproverManage;
