import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

const Styled = styled.div`
  .answerUser_wrap:hover {
    font-weight: 600;
    color: #2a81da;
  }
`;

// 설문조사 리스트 테이블
class PollListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { listData, handleModal } = this.props;
    const columns = [
      {
        title: '연도',
        key: 'POYEAR',
        dataIndex: 'POYEAR',
        align: 'center',
        render: (data, record) => (
          <div
            role="button"
            tabIndex="0"
            style={{ width: '100%', height: '100%' }}
            onClick={() => handleModal('UPDATE', true, record)}
            onKeyPress={() => handleModal('UPDATE', true, record)}
          >
            <span>{data}</span>
          </div>
        ),
      },
      {
        title: '설문 구분',
        key: 'POTYPE',
        dataIndex: 'POTYPE',
        align: 'center',
        render: (data, record) => (
          <div
            role="button"
            tabIndex="0"
            style={{ width: '100%', height: '100%' }}
            onClick={() => handleModal('UPDATE', true, record)}
            onKeyPress={() => handleModal('UPDATE', true, record)}
          >
            <span>{data}</span>
          </div>
        ),
      },
      {
        title: '설문 일정',
        key: 'POLL_',
        align: 'center',
        render: (data, record) => (
          <div
            role="button"
            tabIndex="0"
            style={{ width: '100%', height: '100%' }}
            onClick={() => handleModal('UPDATE', true, record)}
            onKeyPress={() => handleModal('UPDATE', true, record)}
          >
            <span>{`${record.SDATE} ~ ${record.EDATE}`}</span>
          </div>
        ),
      },
      {
        title: '상태',
        key: 'STATUS',
        dataIndex: 'STATUS',
        align: 'center',
        render: (data, record) => {
          let status = '';
          switch (data) {
            case 'WAIT':
              status = '진행예정';
              break;
            case 'OPEN':
              status = '진행중';
              break;
            case 'CLOSE':
              status = '종료';
              break;
            default:
              break;
          }
          return (
            <div
              role="button"
              tabIndex="0"
              style={{ width: '100%', height: '100%' }}
              onClick={() => handleModal('UPDATE', true, record)}
              onKeyPress={() => handleModal('UPDATE', true, record)}
            >
              <span>{status}</span>
            </div>
          );
        },
      },
      {
        title: '응답인원',
        key: 'RESPONDENTS',
        dataIndex: 'RESPONDENTS',
        align: 'center',
        render: (data, record) => (
          <div
            className="answerUser_wrap"
            role="button"
            tabIndex="0"
            style={{ width: '100%', height: '100%' }}
            onClick={() => handleModal('DETAIL', true, record)}
            onKeyPress={() => handleModal('DETAIL', true, record)}
          >
            <span className="answerUser">{`${data}명`}</span>
          </div>
        ),
      },
    ];
    return (
      <Styled>
        <AntdTable pagination={false} columns={columns} dataSource={listData} />
      </Styled>
    );
  }
}

PollListTable.propTypes = {
  listData: PropTypes.array,
  handleModal: PropTypes.func,
};

PollListTable.defaultProps = {
  listData: [],
  handleModal: () => false,
};

export default PollListTable;
