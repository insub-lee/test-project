import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';

import { Table, Tooltip } from 'antd';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import moment from 'moment';

const AntdTable = StyledAntdTable(Table);

class HistoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: [],
    };
  }

  componentDidMount = () => {
    this.getHistoryData(res => this.setState({ historyList: res || [] }));
  };

  getHistoryData = async (callBack = undefined) => {
    const { record, spinningOn, spinningOff } = this.props;
    spinningOn();
    await request({
      method: 'POST',
      url: '/api/workflow/v1/common/workprocess/draftQueHistoryList',
      data: { PARAM: { DRAFT_ID: record?.DRAFT_ID } },
      json: true,
    }).then(({ response }) => {
      spinningOff();
      if (typeof callBack === 'function') return callBack(response?.list);
      return response?.result;
    });
  };

  columns = [
    {
      title: '유형',
      dataIndex: 'RULE_CONFIG',
      key: 'RULE_CONFIG',
      width: '20%',
      align: 'center',
      render: (text, record) => text?.Label || '',
    },
    {
      title: '의견',
      dataIndex: 'OPINION',
      key: 'OPINION',
      width: '40%',
      align: 'center',
      render: text => (
        <Tooltip placement="bottom" title={text}>
          <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '250px', whiteSpace: 'nowrap' }}>
            <span>{text}</span>
          </div>
        </Tooltip>
      ),
    },
    {
      title: '결재일',
      dataIndex: 'APPV_DTTM',
      key: 'APPV_DTTM',
      width: '20%',
      align: 'center',
      render: text => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '결재자',
      dataIndex: 'APPV_USER_NAME_KOR',
      key: 'APPV_USER_NAME_KOR',
      width: '10%',
      align: 'center',
    },
    {
      title: '상태',
      dataIndex: 'APPV_STATUS',
      key: 'APPV_STATUS',
      width: '10%',
      align: 'center',
      render: (text, record) => {
        if (text === 2) return <font style={{ color: 'blue' }}>승인</font>;
        return <font style={{ color: 'red' }}>부결</font>;
      },
    },
  ];

  render() {
    const { historyList } = this.state;
    return (
      <StyledContentsWrapper>
        <AntdTable key="HISTORY_ID" columns={this.columns} dataSource={historyList} pagination={false} bordered />
      </StyledContentsWrapper>
    );
  }
}

HistoryModal.propTypes = {
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  record: PropTypes.object,
};

HistoryModal.defaultProps = {
  spinningOn: () => {},
  spinningOff: () => {},
  record: {},
};

export default HistoryModal;
