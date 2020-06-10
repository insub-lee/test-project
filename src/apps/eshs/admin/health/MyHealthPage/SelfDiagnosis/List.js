import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import BizMicroDevBase from 'components/BizMicroDevBase';

const AntdTable = StyledAntdTable(Table);

class Comp extends Component {
  componentDidMount() {
    const { sagaKey: id, getCallDataHandler, spinningOn, spinningOff } = this.props;
    spinningOn();
    const apiAry = [
      {
        key: 'DiagnosisList',
        type: 'GET',
        url: '/api/eshs/v1/common/health/eshsMyHealthPage',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry, spinningOff);
  }

  columns = [
    {
      title: '등록번호',
      align: 'center',
      dataIndex: 'SE_NO',
      width: '20%',
    },
    {
      title: '등록일자',
      align: 'center',
      dataIndex: 'SE_DT',
      width: '20%',
    },
    {
      title: '고혈압',
      align: 'center',
      dataIndex: 'GRADE_GO',
      width: '10%',
    },
    {
      title: '간장질환',
      align: 'center',
      dataIndex: 'GRADE_GAN',
      width: '10%',
    },
    {
      title: '고지혈',
      align: 'center',
      dataIndex: 'GRADE_GOJI',
      width: '10%',
    },
    {
      title: '당뇨',
      align: 'center',
      dataIndex: 'GRADE_DANG',
      width: '10%',
    },
    {
      title: '빈혈',
      align: 'center',
      dataIndex: 'GRADE_BIN',
      width: '10%',
    },
    {
      title: '비만',
      align: 'center',
      dataIndex: 'GRADE_BIMAN',
      width: '10%',
    },
  ];

  render() {
    const { onClickRow, result } = this.props;
    const list = (result && result.DiagnosisList && result.DiagnosisList.list) || [];

    return (
      <AntdTable
        columns={this.columns}
        bordered
        rowKey="SE_NO"
        dataSource={list || []}
        footer={() => <span>{`${list.length || 0} 건`}</span>}
        onRow={record => ({
          onClick: () => {
            onClickRow(record);
          },
        })}
      />
    );
  }
}

const List = ({ onClickRow }) => <BizMicroDevBase sagaKey="DiagnosisList" onClickRow={onClickRow} component={Comp}></BizMicroDevBase>;

List.propTypes = {
  onClickRow: PropTypes.func,
};

List.defaultProps = {
  onClickRow: () => {},
};

Comp.propTypes = {
  result: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  onClickRow: PropTypes.func,
};

Comp.defaultProps = {
  result: {},
  getCallDataHandler: () => {},
  spinningOn: () => {},
  spinningOff: () => {},
};
export default List;
