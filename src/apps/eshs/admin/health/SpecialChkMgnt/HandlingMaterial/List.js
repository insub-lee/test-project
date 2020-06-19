import React, { Component } from 'react';
import { Input, Table } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable'

const AntdInput = StyledInput(Input);
const AntdTable = StyledAntdTable(Table);

class List extends Component {
  state = {
    searchInfo: {}
  }

  componentDidMount() {
    this.getList();
  };

  getList = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'materialList',
        url: '/api/eshs/v1/common/health/healthSpecialMaterialList',
        type: 'POST',
        params: {
          PARAM: { ...this.state.searchInfo }
        },
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
    });
  }

  columns = [
    {
      title: 'CAS NO.',
      dataIndex: 'CAS_NO',
      key: 'CAS_NO',
      width: '15%',
    },
    {
      title: '분류',
      dataIndex: 'CATEGORY_NAME',
      key: 'CATEGORY_NAME',
      width: '25%',
      ellipsis: true,
    },
    {
      title: '화학물질명(국문)',
      dataIndex: 'MATERIAL_NAME',
      key: 'MATERIAL_NAME',
      width: '30%',
      ellipsis: true,
    },
    {
      title: '화학물질명(영문)',
      dataIndex: 'MATERIAL_NAME_ENG',
      key: 'MATERIAL_NAME_ENG',
      width: '30%',
      ellipsis: true,
    },
  ];

  render() {
    const { result } = this.props;

    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <AntdInput
              className="ant-input-sm mr5" allowClear placeholder="CAS NO." style={{ width: 100 }}
              onChange={e => this.setState({ searchInfo: { ...this.state.searchInfo, CAS_NO: e.target.value } })}
              onPressEnter={this.getList}
            />
            <AntdInput
              className="ant-input-sm mr5" allowClear placeholder="화학물질명" style={{ width: 100 }}
              onChange={e => this.setState({ searchInfo: { ...this.state.searchInfo, MATERIAL_NAME: e.target.value } })}
              onPressEnter={this.getList}
            />
            <StyledButton className="btn-gray btn-sm" onClick={this.getList}>검색</StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <AntdTable
          columns={this.columns}
          dataSource={result && result.materialList && result.materialList.list ? result.materialList.list.map(item => ({ ...item, key: item.HEALTH_ID })) : []}
          bordered
        />
      </StyledContentsWrapper>
    );
  }
}

export default List;
