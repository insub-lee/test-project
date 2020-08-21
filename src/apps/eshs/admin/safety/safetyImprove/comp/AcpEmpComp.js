import * as PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'antd';
import BizMicroDevBase from 'components/BizMicroDevBase';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

const AntdTable = StyledAntdTable(Table);

const columns = [
  {
    title: '구분',
    align: 'center',
    dataIndex: 'GUBUN',
    width: '10%',
  },
  {
    title: '부서명',
    align: 'center',
    dataIndex: 'DEPT_NAME',
    width: '16%',
  },
  {
    title: '안전 책임자',
    align: 'center',
    dataIndex: '',
    width: '18%',
    children: [
      {
        title: '성명',
        align: 'center',
        dataIndex: 'S1_NAME',
        width: '10%',
        render: (text, record) => (text ? `${text || ''} ${record.S1_POSITION || ''}` : record.S1_EMP_NO ? `${record.S1_EMP_NO} => 존재하지 않는 사번` : ''),
      },
      {
        title: '연락처',
        align: 'center',
        dataIndex: 'S1_TEL',
        width: '8%',
      },
    ],
  },
  {
    title: '안전 유지자',
    align: 'center',
    dataIndex: '',
    width: '18%',
    children: [
      {
        title: '담당자(정)',
        align: 'center',
        dataIndex: 'S2_NAME',
        width: '10%',
        render: (text, record) => (text ? `${text || ''} ${record.S2_POSITION || ''}` : record.S2_EMP_NO ? `${record.S2_EMP_NO} => 존재하지 않는 사번` : ''),
      },
      {
        title: '연락처',
        align: 'center',
        dataIndex: 'S2_TEL',
        width: '8%',
      },
    ],
  },
  {
    title: '안전보건 담당자',
    align: 'center',
    dataIndex: '',
    width: '18%',
    children: [
      {
        title: '담당자(부)',
        align: 'center',
        dataIndex: 'S3_NAME',
        width: '10%',
        render: (text, record) => (text ? `${text || ''} ${record.S3_POSITION || ''}` : record.S3_EMP_NO ? `${record.S3_EMP_NO} => 존재하지 않는 사번` : ''),
      },
      {
        title: '연락처',
        align: 'center',
        dataIndex: 'S3_TEL',
        width: '8%',
      },
    ],
  },
  {
    title: '비고',
    align: 'center',
    dataIndex: 'COMMENTS',
    width: '10%',
  },
];

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;

    spinningOn();
    const apiAry = [
      {
        key: 'list',
        url: `/api/eshs/v1/common/eshsGetAcpEmpList`,
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiAry, spinningOff);
  };

  componentWillUnmount() {
    const { sagaKey: id, removeReduxState } = this.props;
    removeReduxState(id);
  }

  appStart = () => {};

  render() {
    const { result, onClickRow, modalVisible } = this.props;
    const list = (result && result.list && result.list.list) || [];
    return (
      <StyledContentsWrapper>
        <AntdTable
          columns={columns}
          bordered
          footer={() => <span>{`${list.length || 0} 건`}</span>}
          pagination={false}
          scroll={{ y: 500 }}
          dataSource={list || []}
          rowKey="ROWNUM"
          onRow={record => ({
            onClick: () => {
              onClickRow(record);
              modalVisible();
            },
          })}
        />
      </StyledContentsWrapper>
    );
  }
}

const AcpEmpComp = ({ onClickRow, modalVisible }) => (
  <BizMicroDevBase sagaKey="acpEmpComp" onClickRow={onClickRow} modalVisible={modalVisible} component={Comp}></BizMicroDevBase>
);

AcpEmpComp.propTypes = {
  onClickRow: PropTypes.func,
  modalVisible: PropTypes.func,
};

AcpEmpComp.defaultProps = {
  onClickRow: () => {},
  modalVisible: () => {},
};
Comp.propTypes = {
  sagaKey: PropTypes.string,
  onClickRow: PropTypes.func,
  modalVisible: PropTypes.func,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
};

Comp.defaultProps = {
  result: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
};

export default AcpEmpComp;
