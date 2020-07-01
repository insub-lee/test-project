import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

import MdcsAppvView from 'apps/Workflow/components/ApproveBase/viewComponent/MdcsAppvView';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';

const AntdModal = StyledContentsModal(Modal);

class DraftList extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, viewType: 'LIST', taskSeq: -1, draftList: [], draftListCnt: 0 };
  }

  componentDidMount() {
    // const { sagaKey, submitHandlerBySaga } = this.props;
    // submitHandlerBySaga(
    //   sagaKey,
    //   'POST',
    //   '/api/workflow/v1/common/approve/unApproveList',
    //   { PARAM: { relTypes: [1, 99], PAGE: 1, PAGE_CNT: 5 } },
    //   this.initDataBind,
    // );
    this.props.getUnApproveList(undefined, 1, 5);
  }

  initDataBind = (sagaKey, response) => {
    if (response && response.list && response.list.length > 0) {
      this.setState({ draftList: response.list, draftListCnt: response.listCnt });
    }
  };

  closeBtnFunc = () => this.setState({ visible: false, viewType: 'LIST', taskSeq: -1 });

  onRowClick = record => {
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  onModalClose = () => {
    this.props.setViewVisible(false);
  };

  render() {
    const { visible, viewType, taskSeq, draftList, draftListCnt } = this.state;
    const { unApproveList, unApproveListCnt } = this.props;
    return (
      <>
        <div className="widget-inner widget-approve">
          <div className="widget-title">
            결재 요청건
            <a href="/apps/Workflow/User/UnApprove" className="btn-more">
              <span className="hidden">결재 요청건 게시판으로 이동</span>
            </a>
          </div>
          <p className="widget-number">
            <strong>
              {unApproveListCnt || unApproveList.length}
              <span></span>
            </strong>
            건
          </p>
          <ul className="widget-board">
            {unApproveList.slice(0, 5).map(item => (
              <li key={`mdcs--main-draft-list-${item.QUE_ID}-${item.TASK_SEQ}`}>
                <a onClick={() => this.onRowClick(item)}>
                  <span className="board-txt">
                    <span className="highlight">[{item.APPVGUBUN}]</span>
                    {item.DRAFT_TITLE}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <AntdModal title="표준문서 결재" width={680} visible={this.props.viewVisible} destroyOnClose onCancel={this.onModalClose} footer={[]}>
          <MdcsAppvView {...this.props} />
        </AntdModal>
      </>
    );
  }
}

DraftList.propTypes = {
  unApproveList: PropTypes.array,
  getUnApproveList: PropTypes.func,

  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

DraftList.defaultProps = {
  unApproveList: [],
  getUnApproveList: () => {},

  selectedRow: {},
};

export default DraftList;
