import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Modal } from 'antd';

import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import StyledModalWrapper from 'commonStyled/Modal/StyledModal';

import DistributeCompany from './DistributeCompany';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledModalWrapper(Modal);

class ExternalDistributeMgntList extends Component {
  state = {
    isShow: false,
    selectedRow: {},
  };

  componentDidMount() {
    const { id, apiAry, getCallDataHandler } = this.props;
    getCallDataHandler(id, apiAry, () => {});
  };

  onClickMail = () => {
    window.alert('개발중');
  };

  onClickNew = row => {
    this.setState({ 
      isShow: true,
      selectedRow: {
        ...row,
        RECV_DEPT_ID: -1,
        RECV_DEPT_NAME: '',
      },
    });
  };

  onClickDept = row => {
    this.setState({ 
      isShow: true,
      selectedRow: row,
    });
  };

  onCancelPopup = () => {
    this.setState({ 
      isShow: false,
      selectedRow: [],
    });
    const { id, apiAry, getCallDataHandler } = this.props;
    getCallDataHandler(id, apiAry, () => {});
  };

  columns = [
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '8%',
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
      title: '업체명',
      dataIndex: 'RECV_DEPT_NAME',
      key: 'RECV_DEPT_NAME',
      width: '15%',
      render: (text, record) => <Button type="link" onClick={() => this.onClickDept(record)}>{text}</Button>
    },
    {
      title: '수신자',
      dataIndex: 'RECV_USER_NAME',
      key: 'RECV_USER_NAME',
      width: '15%',
    },
    {
      title: '배포자',
      dataIndex: 'DIST_USER_NAME',
      key: 'DIST_USER_NAME',
      width: '8%',
    },
    {
      title: '배포일(횟수)',
      dataIndex: 'REG_DATE',
      key: 'REG_DATE',
      width: '10%',
      render: (text, record) => record.REG_DATE && `${record.REG_DATE}(${record.DISTRIBUTE_CNT})`,
    },
    {
      title: '구매담당자',
      dataIndex: 'PURCHASE_USER_NAME',
      key: 'PURCHASE_USER_NAME',
      width: '10%',
      ellipsis: true,
    },
    {
      title: 'New',
      dataIndex: 'DOCNUMBER',
      key: 'new',
      width: '6%',
      align: 'center',
      render: (text, record) => <Button type="default" size="small" onClick={() => this.onClickNew(record)}>추가</Button>,
    },
    {
      title: 'Mail',
      dataIndex: 'DOCNUMBER',
      key: 'mail',
      width: '6%',
      align: 'center',
      render: (text, record) => <Icon type="mail" style={{ cursor: 'pointer' }} onClick={this.onClickMail} />,
    },
  ]

  render() {
    const { result: { externalDistributeMgntList } } = this.props;
    let list = [];
    if (externalDistributeMgntList && externalDistributeMgntList !== undefined) {
      if (externalDistributeMgntList.list !== undefined) {
        list = externalDistributeMgntList.list;
      }
    }

    return (
      <div style={{ padding: '10px 15px', backgroundColor: 'white', height: '100%' }}>
        <div style={{ marginBottom: '10px', clear: 'both', overflow: 'hidden', width: '100%' }}>
          <p style={{ fontSize: '22px', fontWeight: '500', color: '#000', paddingBottom: '10px', float: 'left' }}>
            <Icon type="form" /> 외부배포 관리
          </p>
          {/* <p style={{ float: 'right', marginTop: '5px' }}>
            <Button icon="export" onClick={this.onClickExternalDist}>
              외부배포
            </Button>
          </p> */}
        </div>
        <AntdTable dataSource={list.map(item => ({ ...item, key: `${item.DOCNUMBER}_${item.RECV_DEPT_ID}` }))} columns={this.columns} />
        <AntdModal
          width={700}
          visible={this.state.isShow}
          title="외부배포 회사"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <DistributeCompany selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} />
        </AntdModal>
      </div>
    )
  }
}

ExternalDistributeMgntList.propTypes = {
  id: PropTypes.string,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
};

ExternalDistributeMgntList.defaultProps = {
  id: 'externalDistributeMgnt',
  apiAry: [
    {
      key: 'externalDistributeMgntList',
      url: '/api/mdcs/v1/common/externalDistributeMgntList',
      type: 'POST',
      params: {},
    },
  ],
  result: {
    externalDistributeMgntList: {
      list: [],
    },
  },
  getCallDataHandler: () => {},
};

export default ExternalDistributeMgntList;