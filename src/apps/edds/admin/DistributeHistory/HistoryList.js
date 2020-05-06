import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Modal, Button } from 'antd';

import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';
import ContentsWrapper from 'commonStyled/MdcsStyled/Wrapper/ContentsWrapper';

import DocView from './DocView';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledContentsModal(Modal);

class HistoryList extends Component {
  state = {
    isShow: false,
    selectedRow: {},
  }
  
  componentDidMount() {
    const { id, apiAry, getCallDataHandler } = this.props;
    getCallDataHandler(id, apiAry, () => {});
  }

  onClickRow = (row, rowIndex) => {
    this.setState({
      selectedRow: row,
      isShow: true,
    });
  };

  onCancelPopup = () => {
    this.setState({ isShow: false });
  };

  columns = [
    {
      title: '발송번호',
      dataIndex: 'TRANS_NO',
      key: 'TRANS_NO',
      align: 'center',
      width: '10%',
    },
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      align: 'center',
      width: '5%',
    },
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
    },
    {
      title: '배포자',
      dataIndex: 'DIST_USER_NAME',
      key: 'DIST_USER_NAME',
      width: '7%',
      align: 'center',
    },
    {
      title: '수신자',
      dataIndex: 'EMAIL',
      key: 'EMAIL',
      width: '13%',
      align: 'center',
    },
    {
      title: '배포일',
      dataIndex: 'TRANS_DATE',
      key: 'TRANS_DATE',
      width: '10%',
      align: 'center',
    },
    {
      title: '다운로드',
      dataIndex: 'STATUS',
      key: 'STATUS',
      width: '10%',
      align: 'center',
      render: (text, record) => record.STATUS === 0 ? '  In progress' : 'Completed',
    },
  ]

  render() {
    const { result: { distributeDocList } } = this.props;
    let list = [];
    if (distributeDocList && distributeDocList !== undefined) {
      if (distributeDocList.list !== undefined) {
        list = distributeDocList.list;
      }
    }

    return (
      <>
        <ContentsWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 배포 이력
            </p>
          </div>
          <AntdTable
            dataSource={list.map(item => ({ ...item, key: item.TRANS_NO }))}
            columns={this.columns}
            onRow={(record, rowIndex) => ({
              onClick: event => {
                this.onClickRow(record, rowIndex);
              }
            })}
          />
        </ContentsWrapper>
        <AntdModal
          width={700}
          visible={this.state.isShow}
          title="배포문서 상세"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={[<Button onClick={this.onCancelPopup}>닫기</Button>]}
        >
          <DocView selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
        </AntdModal>
      </>
    );
  }
}

HistoryList.propTypes = {
  id: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

HistoryList.defaultProps = {
  id: 'distributeHistory',
  apiAry: [
    {
      key: 'distributeDocList',
      url: '/api/edds/v1/common/distributeDocList',
      type: 'GET',
      params: {},
    },
  ],
  result: {
    distributeDoc: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
};

export default HistoryList;