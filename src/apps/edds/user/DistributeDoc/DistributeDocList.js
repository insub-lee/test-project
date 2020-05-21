import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Modal } from 'antd';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad'
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

import DocView from './DocView';
import Redistribute from './Redistribute';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModalPad(Modal);

class DistributeDocList extends Component {
  state = {
    isShow: false,
    isRedistShow: false,
    selectedRow: {},
  };
  
  componentDidMount() {
    this.getList();
  };

  getList = () => {
    const { id, apiAry, getCallDataHandler } = this.props;
    getCallDataHandler(id, apiAry, () => {});
  }

  onClickRow = row => {
    this.setState({
      selectedRow: row,
      isShow: true,
    });
  };

  onCancelPopup = () => {
    this.getList();
    this.setState({
      isShow: false,
      isRedistShow: false,
    });
  };

  onClickMail = row => {
    this.setState({
      selectedRow: row,
      isRedistShow: true,
    });
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
      render: (text, record) => <StyledButton className="btn-link" onClick={() => this.onClickRow(record)}>{text}</StyledButton>
    },
    {
      title: '배포자',
      dataIndex: 'DIST_USER_NAME',
      key: 'DIST_USER_NAME',
      width: '10%',
    },
    {
      title: '배포일',
      dataIndex: 'TRANS_DATE',
      key: 'TRANS_DATE',
      width: '10%',
    },
    {
      title: '다운로드',
      dataIndex: 'STATUS',
      key: 'STATUS',
      width: '10%',
      render: (text, record) => record.STATUS === 0 ? '  In progress' : 'Completed',
    },
    {
      title: '재배포요청',
      dataIndex: 'TRANS_NO',
      key: 'RE_DIST',
      width: '10%',
      align: 'center',
      render: (text, record) => <Icon type="mail" style={{ cursor: 'pointer' }} onClick={() => this.onClickMail(record)} />,
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
        <AntdModal
          width={750}
          visible={this.state.isShow}
          title="배포문서 다운로드"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={[<StyledButton className="btn-light" onClick={this.onCancelPopup}>닫기</StyledButton>]}
        >
          <DocView selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
        </AntdModal>
        <AntdModal
          width={500}
          visible={this.state.isRedistShow}
          title="재배포 요청"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <Redistribute selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
        </AntdModal>
        <StyledContentsWrapper>
          {/* <div className="pageTitle">
            <p>
              <Icon type="form" /> 배포문서 목록
            </p>
          </div> */}
          <AntdTable dataSource={list.map(item => ({ ...item, key: item.TRANS_NO }))} columns={this.columns} />
        </StyledContentsWrapper>
      </>
    );
  }
}

DistributeDocList.propTypes = {
  id: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

DistributeDocList.defaultProps = {
  id: 'distributeDoc',
  apiAry: [
    {
      key: 'distributeDocList',
      url: '/api/edds/v1/common/distributeDocList',
      type: 'POST',
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

export default DistributeDocList;