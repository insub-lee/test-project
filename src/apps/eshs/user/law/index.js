import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import { Modal } from 'antd';
import List from './List';

class law extends Component {
  state = {
    isLoading: true,
    isOpenModal: false,
    selectedTaskSeq: 0,
  };

  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  isOpenModalChange = taskSeq => {
    this.setState({ isOpenModal: true });
    this.setState({ selectedTaskSeq: taskSeq });
  };

  onCancel = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  onShowModalTemplate = () => (
    <BizBuilderBase
      sagaKey="law_M"
      workSeq={1081}
      taskSeq={this.state.selectedTaskSeq}
      viewType="MODIFY"
      loadingComplete={this.loadingComplete}
      CustomListPage={List}
      onCloseModleHandler={this.onCancel}
    />
  );

  render() {
    /* const {
      match: { params },
      item,
    } = this.props;
    const { ID } = params; */
    return (
      <>
        <BizBuilderBase
          sagaKey="law"
          workSeq={1081}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          CustomListPage={List}
          isOpenModalChange={this.isOpenModalChange}
        />
        <Modal visible={this.state.isOpenModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          <div>{this.state.isOpenModal && this.onShowModalTemplate()}</div>
        </Modal>
      </>
    );
  }
}

law.propTypes = {};

law.defaultProps = {};

export default law;
