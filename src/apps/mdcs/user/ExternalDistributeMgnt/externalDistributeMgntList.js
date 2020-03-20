import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Input } from 'antd';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

class ExternalDistributeMgntList extends Component {
  state = {};

  componentDidMount() {
    const { id, apiAry, getCallDataHandler } = this.props;
    getCallDataHandler(id, apiAry, () => {});
  };

  onClickMail = () => {
    window.alert('개발중');
  };

  onClickNew = () => {
    window.alert('개발중');
  };

  columns = [
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
      title: '업체명',
      dataIndex: 'RECV_DEPT_NAME',
      key: 'RECV_DEPT_NAME',
      width: '10%',
      ellipsis: true,
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
      width: '12%',
      render: (text, record) => `${record.REG_DATE}(${record.DISTRIBUTE_CNT})`,
    },
    {
      title: '구매담당자',
      dataIndex: 'STATUS',
      key: 'STATUS',
      width: '15%',
    },
    {
      title: 'New',
      dataIndex: 'DOCNUMBER',
      key: 'new',
      width: '5%',
      align: 'center',
      render: (text, record) => <Button type="default" size="small" onClick={this.onClickNew}>추가</Button>,
    },
    {
      title: 'Mail',
      dataIndex: 'DOCNUMBER',
      key: 'mail',
      width: '5%',
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