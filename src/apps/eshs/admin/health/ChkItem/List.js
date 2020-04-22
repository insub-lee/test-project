import React, { Component } from 'react';
import { Table, Input, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';

import View from './View';

const AntdInput = StyledInput(Input);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModalPad(Modal);

class List extends Component {
  state = {
    itemList: [],
    isShow: false,
    selectedRow: {},
    searchText: '',
  }

  componentDidMount() {
    this.getHealthChkItemList();
  }

  getHealthChkItemList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'itemList',
        url: `/api/eshs/v1/common/health/healthChkItem?searchText=${this.state.searchText}`,
        type: 'GET',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry, this.initState);
  }

  initState = () => {
    const { result: { itemList } } = this.props;
    this.setState({ itemList: itemList && itemList.list ? itemList.list : [] });
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
    this.getHealthChkItemList();
  }

  columns = [
    {
      title: '항목코드',
      dataIndex: 'ITEM_CODE',
      key: 'ITEM_CODE',
      width: '10%',
      align: 'center',
    },
    {
      title: '항목명',
      dataIndex: 'ITEM_NAME',
      key: 'ITEM_NAME',
      width: '20%',
    },
    {
      title: '항목분류',
      dataIndex: 'ITEM_CLASS',
      key: 'ITEM_CLASS',
      width: '15%',
      align: 'center',
    },
    {
      title: '비고',
      dataIndex: 'ITEM_DESC',
      key: 'ITEM_DESC',
    },
    {
      title: '검진 성별',
      dataIndex: 'ITEM_GENDER',
      key: 'ITEM_GENDER',
      width: '10%',
      align: 'center',
      render: (text, record) => text === 'C' ? '공통' : text === 'M' ? '남자만' : '여자만'
    },
    {
      title: '필수검진여부',
      dataIndex: 'ITEM_REQUIRE',
      key: 'ITEM_REQUIRE',
      width: '10%',
      align: 'center',
      render: (text, record) => text === 'Y' ? '필수검진' : '추가검진'
    },
  ];

  render() {
    return (
      <>
        <StyledContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <span className="textLabel">항목명</span>
            <AntdInput
              className="ant-input-sm ant-input-inline mr5"
              style={{ width: 200 }}
              onChange={e => this.setState({ searchText: e.target.value })}
              onPressEnter={this.getHealthChkItemList}
              allowClear
            />
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-primary btn-sm" onClick={this.getHealthChkItemList}>검색</StyledButton>
            </StyledButtonWrapper>
          </div>
          <AntdTable
            columns={this.columns}
            dataSource={this.state.itemList}
            bordered={true}
            onRow={(record, rowIndex) => ({
              onClick: event => {
                this.onClickRow(record, rowIndex);
              }
            })}
            className="tableWrapper"
          />
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mr-20">
            <StyledButton className="btn-primary btn-sm" onClick={this.onClickAdd}>등록</StyledButton>
          </StyledButtonWrapper>
        </StyledContentsWrapper>
        <AntdModal
          width={500}
          visible={this.state.isShow}
          title="검진항목"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <View selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} onSaveAfter={this.onSaveAfter} />
        </AntdModal>
      </>
    );
  }
}

export default List;