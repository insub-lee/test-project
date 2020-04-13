import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import BizBuilderBase from 'components/BizBuilderBase';
import OnlyView from 'apps/eshs/user/law/lawAppraise/OnlyView';
import View from './View';
import Input from './Input';
import Modify from './Modify';

class Suggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewModal: false,
      isInputModal: false,
      isReplyModal: false,
      viewTaskSeq: 0,
      parentTaskSeq: 0,
      replyTitle: '',
      replyType: '',
    };
  }

  componentDidMount() {}

  isOpenViewModal = rowData => {
    this.setState({ isViewModal: true, viewTaskSeq: rowData.TASK_SEQ });
  };

  onInputModalChange = () => {
    this.setState({ isInputModal: true });
  };

  onReplyModalChange = selectedData => {
    this.setState({ isReplyModal: true, parentTaskSeq: selectedData.TASK_SEQ, replyTitle: `RE: ${selectedData.TITLE}`, replyType: selectedData.TYPE });
  };

  onCancel = () => {
    this.setState({ isViewModal: false, isInputModal: false });
  };

  onReplyCancel = () => {
    this.setState({ isReplyModal: false });
  };

  onShowModalTemplate = (modalViewType, ModalTaskSeq) => (
    <>
      <BizBuilderBase
        sagaKey="SuggestView"
        baseid="Suggest"
        workSeq={342}
        taskSeq={ModalTaskSeq}
        viewType={modalViewType}
        loadingComplete={this.loadingComplete}
        CustomViewPage={View}
        CustomInputPage={Input}
        CustomModifyPage={Modify}
        onCloseModalHandler={this.onCancel}
        onReplyChange={this.onReplyModalChange}
      />
      <Modal visible={this.state.isReplyModal} width="1000px" onCancel={this.onReplyCancel} destroyOnClose footer={[]}>
        {this.state.isReplyModal && this.onShowReplyTemplate('INPUT', -1)}
      </Modal>
    </>
  );

  onShowReplyTemplate = (modalViewType, ModalTaskSeq) => (
    <>
      <BizBuilderBase
        sagaKey="SuggestParent"
        workSeq={342}
        taskSeq={this.state.parentTaskSeq}
        viewType="VIEW"
        loadingComplete={this.loadingComplete}
        CustomViewPage={OnlyView}
        onCloseModalHandler={this.onReplyCancel}
      />
      <BizBuilderBase
        sagaKey="SuggestReply"
        baseid="Suggest"
        workSeq={342}
        taskSeq={ModalTaskSeq}
        viewType={modalViewType}
        inputMetaSeq={2782}
        compProps={{ PARENT_TASK_SEQ: this.state.parentTaskSeq, TITLE: this.state.replyTitle, TYPE: this.state.replyType }}
        loadingComplete={this.loadingComplete}
        CustomInputPage={Input}
        onCloseModalHandler={this.onReplyCancel}
      />
    </>
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
          sagaKey="Suggest"
          id="Suggest"
          workSeq={342}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
          isOpenModalChange={this.isOpenViewModal}
          // CustomListPage={List} //버튼 위치 떄문에 custom 만듬
          onInputModalChange={this.onInputModalChange}
        />
        <Modal visible={this.state.isViewModal || this.state.isInputModal} width="1000px" onCancel={this.onCancel} destroyOnClose footer={[]}>
          {this.state.isViewModal && this.onShowModalTemplate('VIEW', this.state.viewTaskSeq)}
          {this.state.isInputModal && this.onShowModalTemplate('INPUT', -1)}
        </Modal>
      </>
    );
  }
}

Suggest.propTypes = {};

Suggest.defaultProps = {};

export default Suggest;
