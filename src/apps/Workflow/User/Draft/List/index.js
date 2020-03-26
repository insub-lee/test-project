import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon, Button } from 'antd';
import moment from 'moment';

import BizBuilderBase from 'components/BizBuilderBase';
import HoldView from 'apps/Workflow/components/ApproveBase/viewComponent/MdcsAppvView/holdview';

import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import ContentsWrapper from 'commonStyled/MdcsStyled/Wrapper/ContentsWrapper';
import StyledModalWrapper from 'commonStyled/MdcsStyled/Modal/StyledSelectModal';
import StyledButton from 'commonStyled/Buttons/StyledButton';

const AntdLineTable = StyledLineTable(Table);
const AntdModal = StyledModalWrapper(Modal);

class DraftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalWidth: 800,
    };
  }

  componentDidMount() {
    this.props.getDraftList();
  }

  getTableColumns = () => [
    {
      title: 'No',
      dataIndex: 'RNUM',
      key: 'rnum',
      width: '5%',
      align: 'center',
    },
    {
      title: '구분',
      dataIndex: 'APPVGUBUN',
      key: 'APPVGUBUN',
      width: '10%',
      align: 'center',
    },
    {
      title: '프로세스상태',
      dataIndex: 'STATUS_NM',
      key: 'STATUS_NM',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'DRAFT_TITLE',
      key: 'title',
      ellipsis: true,
    },

    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'regDttm',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  onRowClick = (record, rowIndex, e) => {
    if (record.STATUS === 3) {
      record.PROC_STATUS = 3;
    }
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  onResizeModal = modalWidth => {
    this.setState({ modalWidth });
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    console.debug(viewMetaSeq);
  };

  closeBtnFunc = () => {
    this.props.setViewVisible(false);
  };

  render() {
    // const { approveList } = this.props;
    const { draftList, selectedRow } = this.props;
    const { modalWidth } = this.state;
    console.debug('draftList', this.props);
    return (
      <>
        <ContentsWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 기안함
            </p>
          </div>
          <AntdLineTable
            columns={this.getTableColumns()}
            dataSource={draftList.map(item => ({
              ...item,
              key: `draftList_${item.RNUM}`,
            }))}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
            className="tableWrapper"
          />
        </ContentsWrapper>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="내용 보기"
          width={modalWidth}
          visible={this.props.viewVisible}
          destroyOnClose
          onCancel={this.closeBtnFunc}
          footer={[]}
        >
          <BizBuilderBase
            sagaKey="approveBase_approveView"
            viewType="VIEW"
            onCloseModal={this.onCloseModal}
            onChangeForm={this.onChangeForm}
            closeBtnFunc={this.closeBtnFunc}
            clickCoverView={this.clickCoverView}
            workSeq={selectedRow && selectedRow.WORK_SEQ}
            taskSeq={selectedRow && selectedRow.TASK_SEQ}
            selectedRow={selectedRow}
            ViewCustomButtons={({ closeBtnFunc }) => (
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <StyledButton className="btn-primary" onClick={closeBtnFunc}>
                  닫기
                </StyledButton>
              </div>
            )}
            // changeWorkflowFormData={this.changeWorkflowFormData}
          />
          {/* <HoldView {...this.props} onResizeModal={this.onResizeModal} /> */}
        </AntdModal>
      </>
    );
  }
}

DraftList.propTypes = {
  draftList: PropTypes.array,
  getDraftList: PropTypes.func,
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

DraftList.defaultProps = {
  draftList: [],
  getDraftList: () => {},
  selectedRow: {},
};

export default DraftList;
