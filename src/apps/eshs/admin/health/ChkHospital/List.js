import React, { Component } from 'react';
import { Table, Input, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

import View from './View';

const AntdInput = StyledInput(Input);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  state = {
    list: [],
    isShow: false,
    selectedRow: {},
    hospitalName: '',
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'hospitalList',
        url: `/api/eshs/v1/common/health/healthChkHospital?CODE=N&hospitalName=${this.state.hospitalName}`,
        type: 'GET',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry, this.initState);
  }

  initState = () => {
    const { result: { hospitalList } } = this.props;
    this.setState({ list: hospitalList && hospitalList.list ? hospitalList.list : [] });
  };

  onClickRow = row => {
    this.setState({
      selectedRow: row,
      isShow: true,
    });
  };

  onClickAdd = () => {
    this.setState({ isShow: true });
  };

  onCancelPopup = () => {
    this.setState({
      isShow: false,
      selectedRow: {}
    });
  };

  onSaveAfter = () => {
    this.setState({
      isShow: false,
      selectedRow: {}
    });
    this.getList();
  }

  columns = [
    {
      title: '검진기관코드',
      dataIndex: 'HOSPITAL_CODE',
      key: 'HOSPITAL_CODE',
      align: 'center',
      width: '15%',
    },
    {
      title: '지역',
      dataIndex: 'HOSPITAL_SITE',
      key: 'HOSPITAL_SITE',
      align: 'center',
      width: '15%',
    },
    {
      title: '검진기관명',
      dataIndex: 'HOSPITAL_NAME',
      key: 'HOSPITAL_NAME',
      align: 'center',
    },
    {
      title: '담당자명',
      dataIndex: 'MANAGER_NAME',
      key: 'MANAGER_NAME',
      align: 'center',
      width: '15%',
    },
    {
      title: '담당자 연락처',
      dataIndex: 'MANAGER_TEL',
      key: 'MANAGER_TEL',
      align: 'center',
      width: '20%',
    },
    {
      title: '사용여부',
      dataIndex: 'USE_YN',
      key: 'USE_YN',
      align: 'center',
      width: '20%',
    },
  ];

  render() {
    return (
      <>
        <AntdModal
          width={700}
          visible={this.state.isShow}
          title="검진기관"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <View selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} onSaveAfter={this.onSaveAfter} />
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdInput
                className="ant-input-sm ant-input-inline mr5" style={{ width: 200 }}
                onChange={e => this.setState({ hospitalName: e.target.value })}
                onPressEnter={this.getList}
                allowClear placeholder="검진기관명"
              />
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>검색</StyledButton>
              <StyledButton className="btn-primary btn-sm" onClick={this.onClickAdd}>등록</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable
            columns={this.columns}
            dataSource={this.state.list}
            bordered={true}
            onRow={(record, rowIndex) => ({
              onClick: event => {
                this.onClickRow(record, rowIndex);
              }
            })}
            pagination={false}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;