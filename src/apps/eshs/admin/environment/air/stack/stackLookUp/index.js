import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import CustomList from './List';
import CustomView from './View';

class stackLookUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      taskSeq: -1,
      isDetailModal: false,
    };
  }

  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  isModalChange = record => {
    console.log(record, 'record');
    this.setState({ isDetailModal: true, taskSeq: record.TASK_SEQ });
  };

  onCancel = () => {
    this.setState({ isDetailModal: false });
  };

  isModalPage = (viewType, taskSeq) => (
    <BizBuilderBase
      sagaKey="stackLookUpModal"
      workSeq={3741}
      taskSeq={taskSeq}
      viewType={viewType}
      compProps={{ sagaKey: 'searchBarData', workSeq: 3741 }}
      CustomViewPage={CustomView}
      isModalChange={this.isModalChange}
      loadingComplete={this.loadingComplete}
    />
  );

  render() {
    return (
      <>
        <BizBuilderBase
          sagaKey="stackLookUp"
          workSeq={3741}
          taskSeq={-1}
          viewType="LIST"
          listMetaSeq={4301}
          CustomListPage={CustomList}
          isModalChange={this.isModalChange}
          loadingComplete={this.loadingComplete}
        />
        <Modal visible={this.state.isDetailModal} width="1500px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          <div>{this.state.isDetailModal && this.isModalPage('VIEW', this.state.taskSeq)}</div>
        </Modal>
      </>
    );
  }
}

stackLookUp.propTypes = {};

stackLookUp.defaultProps = {};

export default stackLookUp;
