import React, { Component } from 'react';
import { Table, Modal, Button } from 'antd';
import moment from 'moment';

import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import StyledModalWrapper from 'commonStyled/MdcsStyled/Modal/StyleModalWrapper';

import BizBuilderBase from 'components/BizBuilderBase';
import CoverViewer from '../CoverViewer';

const AntdModal = StyledModalWrapper(Modal);
const AntdLineTable = StyledLineTable(Table);
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

  clickCoverView = () => {
    this.setState({
      coverView: {
        visible: true,
      },
    });
  };

  render() {
    const { listData } = this.props;
    const { SearchView, coverView } = this.state;
    return (
      <>
        <AntdLineTable
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
          className="modalWrapper modalTechDoc modalCustom"
          visible={SearchView.visible}
          footer={null}
          width={800}
          onCancel={this.closeBtnFunc}
          onOk={this.closeBtnFunc}
          okButtonProps={null}
          destroyOnClose
        >
          <div className="pop_tit">검색 내용 보기</div>
          <div className="SearchContentLayer">
            <BizBuilderBase
              sagaKey="SearchView"
              viewType="VIEW"
              workSeq={SearchView.workSeq}
              // CustomButtons={() => <Button>수정</Button>}
              taskSeq={SearchView.taskSeq}
              draftId={SearchView.draftId}
              closeBtnFunc={this.closeBtnFunc}
              clickCoverView={this.clickCoverView}
            />
          </div>
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          visible={coverView.visible}
          footer={null}
          width={1080}
          onCancel={() => {
            this.setState({ coverView: { ...coverView, visible: false } });
          }}
          onOk={() => {
            this.setState({ coverView: { ...coverView, visible: false } });
          }}
          okButtonProps={null}
          destroyOnClose
        >
          <>
            <div className="pop_tit">검색 내용 보기</div>
            <div className="pop_con">
              <CoverViewer nodeId={SearchView.nodeId} taskSeq={SearchView.taskSeq} workSeq={SearchView.workSeq} />
            </div>
          </>
        </AntdModal>
      </>
    );
  }
}

export default SearchList;
