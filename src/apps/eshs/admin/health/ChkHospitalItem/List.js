import React, { Component } from 'react';
import { Input, Table, Modal, Tag } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdModalPad from 'components/BizBuilder/styled/Modal/StyledAntdModalPad';
import StyledTagWrapper from 'components/BizBuilder/styled/Tag/StyledTagWrapper';
import StyledTag from 'components/BizBuilder/styled/Tag/StyledTag';

import View from './View';

const AntdInput = StyledInput(Input);
const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModalPad(Modal);
const AntdTag = StyledTag(Tag);

class List extends Component {
  state = {
    list: [],
    isShow: false,
    selectedRow: {},
    hospitalName: '',
  }

  componentWillMount() {
    this.getList();
  }

  getList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'hospitalItemList',
        url: `/api/eshs/v1/common/health/healthChkHospitalItemList`,
        type: 'POST',
        params: {
          PARAM: {
            hospitalName: this.state.hospitalName,
          }
        },
      },
    ];
    getCallDataHandler(id, apiAry, this.initState);
  }

  initState = () => {
    const { result: { hospitalItemList } } = this.props;
    this.setState({ list: hospitalItemList && hospitalItemList.list ? hospitalItemList.list : [] });
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
  };

  onClickType = (hospitalCode, chkType) => {
    this.setState({
      selectedRow: {
        HOSPITAL_CODE: hospitalCode,
        CHK_TYPE: chkType,
      },
      isShow: true,
    });
  };

  columns = [
    {
      title: '코드',
      dataIndex: 'HOSPITAL_CODE',
      key: 'HOSPITAL_CODE',
      align: 'center',
      width: '10%',
    },
    {
      title: '지역',
      dataIndex: 'HOSPITAL_SITE',
      key: 'HOSPITAL_SITE',
      align: 'center',
      width: '10%',
    },
    {
      title: '검진기관명',
      dataIndex: 'HOSPITAL_NAME',
      key: 'HOSPITAL_NAME',
      align: 'center',
      width: '20%',
    },
    {
      title: '검진유형',
      dataIndex: 'CHK_TYPES',
      key: 'CHK_TYPES',
      align: 'center',
      render: (text, record) => (
        <StyledTagWrapper>
          {record.CHK_TYPES && record.CHK_TYPES.length > 0 && (
            record.CHK_TYPES.split(',').map((chkType, idx) => (
              <AntdTag
                className="ant-tag-sm ant-tag-click"
                onClick={() => this.onClickType(record.HOSPITAL_CODE, chkType)}
              >
                {`${chkType}형(${record.CHK_TYPE_NAMES.split(',')[idx]})`}
              </AntdTag>
            ))
          )}
        </StyledTagWrapper>
      )
    },
  ];

  render() {
    return (
      <>
        <AntdModal
          width={`90%`}
          visible={this.state.isShow}
          title="검진기관"
          onCancel={this.onCancelPopup}
          destroyOnClose
          footer={null}
        >
          <View selectedRow={this.state.selectedRow} onCancelPopup={this.onCancelPopup} onSaveAfter={this.onSaveAfter} />
        </AntdModal>
        <StyledContentsWrapper>
          <div className="selSaveWrapper alignLeft">
            <span className="textLabel">검진기관</span>
            <AntdInput
              className="ant-input-sm ant-input-inline mr5"
              style={{ width: 200 }}
              onChange={e => this.setState({ hospitalName: e.target.value })}
              onPressEnter={this.getList}
              allowClear
            />
            <StyledButtonWrapper className="btn-wrap-inline">
              <StyledButton className="btn-primary btn-sm" onClick={this.getList}>검색</StyledButton>
            </StyledButtonWrapper>
          </div>
          <AntdTable
            columns={this.columns}
            dataSource={this.state.list}
            bordered={true}
            className="tableWrapper"
          />
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mr-20">
            <StyledButton className="btn-primary btn-sm" onClick={this.onClickAdd}>등록</StyledButton>
          </StyledButtonWrapper>
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;