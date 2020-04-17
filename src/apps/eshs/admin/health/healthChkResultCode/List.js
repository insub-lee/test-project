import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, Modal } from 'antd';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';

import View from './View';

const AntdInputSearch = StyledSearchInput(Input.Search);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModalPad(Modal);

class List extends Component {
  state = {
    codeList: [],
    isShow: false,
    selectedRow: {},
  };

  componentDidMount() {
    this.getHealthChkResultCodeList();
  }

  getHealthChkResultCodeList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'resultCodeList',
        url: `/api/eshs/v1/common/health/healthChkResultCodeList`,
        type: 'POST',
        params: {},
      },
    ];
    getCallDataHandler(id, apiAry, this.initState);
  }

  initState = () => {
    const { result: { resultCodeList } } = this.props;
    this.setState({ codeList: resultCodeList && resultCodeList.list ? resultCodeList.list : [] });
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
    this.getHealthChkResultCodeList();
  }

  columns = [
    {
      title: '코드',
      dataIndex: 'CHK_RESULT_ITEM_CD',
      key: 'CHK_RESULT_ITEM_CD',
      width: '5%',
      align: 'center',
    },
    {
      title: '결과항목구분',
      dataIndex: 'CHK_RESULT_ITEM_NM',
      key: 'CHK_RESULT_ITEM_DESC',
      width: '20%',
      align: 'center',
    },
    {
      title: '결과항목명',
      dataIndex: 'CHK_RESULT_ITEM_DESC',
      key: 'CHK_RESULT_ITEM_DESC',
      align: 'center',
    },
    {
      title: '결과기준값',
      dataIndex: 'BASE_RESULT',
      key: 'BASE_RESULT',
      width: '15%',
    },
    {
      title: '최소기준값',
      dataIndex: 'BASE_LOW',
      key: 'BASE_LOW',
      width: '10%',
      align: 'center',
    },
    {
      title: '최대기준값',
      dataIndex: 'BASE_HIGH',
      key: 'BASE_HIGH',
      width: '10%',
      align: 'center',
    },
    {
      title: '단위',
      dataIndex: 'UNIT',
      key: 'UNIT',
      width: '10%',
      align: 'center',
    },
    {
      title: '순서',
      dataIndex: 'ORDER_SEQ',
      key: 'ORDER_SEQ',
      width: '5%',
      align: 'center',
    }
  ];

  render() {
    return (
      <>
        <StyledContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            {/* <AntdInputSearch className="input-search-mid mr5" style={{ width: 200 }} /> */}
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-primary" onClick={this.onClickAdd}>추가</StyledButton>
              {/* <ExcelDownloader /> */}
            </StyledButtonWrapper>
          </div>
          <AntdTable
            columns={this.columns}
            dataSource={this.state.codeList}
            pagination={false}
            onRow={(record, rowIndex) => ({
              onClick: event => {
                this.onClickRow(record, rowIndex);
              }
            })}
          />
        </StyledContentsWrapper>
        <AntdModal
          width={500}
          visible={this.state.isShow}
          title="검진결과 항목"
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