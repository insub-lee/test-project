import React, { Component } from 'react';
import { Table, Modal, Button } from 'antd';
import moment from 'moment';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import BizBuilderBase from 'components/BizBuilderBase';
import CoverViewer from '../CoverViewer';

const AntdModal = StyledAntdModal(Modal);
const AntdTable = StyledAntdTable(Table);
const columns = [
  { title: 'No.', key: 'DOCNUMBER', width: '11%', dataIndex: 'DOCNUMBER' },
  { title: 'REV.', key: 'VERSION', align: 'center', width: '6%', dataIndex: 'VERSION' },
  { title: 'Effect Date', align: 'center', key: 'END_DTTM', width: '10%', dataIndex: 'END_DTTM', render: (text, record) => moment(text).format('YYYY-MM-DD') },
  { title: 'Title', align: 'left', key: 'TITLE', width: '35%', dataIndex: 'TITLE' },
  {
    title: '종류',
    key: 'NODE_FULLNAME',
    dataIndex: 'NODE_FULLNAME',
    width: '21%',
  },
  { title: '기안부서', key: 'REG_DEPT_NAME', width: '10%', dataIndex: 'REG_DEPT_NAME' },
  { title: '기안자', key: 'REG_USER_NAME', width: '7%', dataIndex: 'REG_USER_NAME' },
];

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchView: {
        visible: false,
        taskSeq: -1,
        workSeq: -1,
        nodeId: -1,
      },
      coverView: {
        visible: false,
      },
    };
  }

  // 검색결과 클릭시 발생
  onClickRow = (record, rowIndex) => {
    this.setState({
      SearchView: {
        visible: true,
        taskSeq: record.TASK_SEQ,
        workSeq: record.WORK_SEQ,
        nodeId: record.NODE_ID,
        draftId: record.DRAFT_ID,
      },
    });
  };

  closeBtnFunc = () => {
    this.setState({
      SearchView: {
        visible: false,
        taskSeq: -1,
        workSeq: -1,
        nodeId: -1,
      },
    });
  };

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    this.setState({ coverView: { visible: true, workSeq, taskSeq, viewMetaSeq } });
  };

  onCloseCoverView = () => {
    this.setState({
      coverView: {
        visible: false,
        workSeq: undefined,
        taskSeq: undefined,
        viewMetaSeq: undefined,
      },
    });
  };

  render() {
    const { listData } = this.props;
    const { SearchView, coverView } = this.state;
    return (
      <>
        <AntdTable
          columns={columns}
          size="middle"
          dataSource={listData}
          className="tableCustom"
          onRow={(record, rowIndex) => ({
            onClick: event => {
              this.onClickRow(record, rowIndex);
            },
          })}
        />
        <AntdModal
          className="modalWrapper modalTechDoc"
          title="검색 내용 보기"
          visible={SearchView.visible}
          footer={null}
          width={800}
          onCancel={this.closeBtnFunc}
          onOk={this.closeBtnFunc}
          okButtonProps={null}
          destroyOnClose
        >
          <BizBuilderBase
            sagaKey="SearchView"
            viewType="VIEW"
            workSeq={SearchView.workSeq}
            taskSeq={SearchView.taskSeq}
            draftId={SearchView.draftId}
            closeBtnFunc={this.closeBtnFunc}
            clickCoverView={this.clickCoverView}
          />
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc"
          title="표지 보기"
          visible={coverView.visible}
          footer={null}
          width={800}
          okButtonProps={null}
          onCancel={this.onCloseCoverView}
          destroyOnClose
        >
          <BizBuilderBase
            sagaKey="CoverView"
            viewType="VIEW"
            workSeq={coverView.workSeq}
            taskSeq={coverView.taskSeq}
            viewMetaSeq={coverView.viewMetaSeq}
            onCloseCoverView={this.onCloseCoverView}
            ViewCustomButtons={({ onCloseCoverView }) => (
              <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                <StyledButton className="btn-primary btn-sm" onClick={onCloseCoverView}>
                  닫기
                </StyledButton>
              </StyledButtonWrapper>
            )}
          />
        </AntdModal>
      </>
    );
  }
}

export default SearchList;
