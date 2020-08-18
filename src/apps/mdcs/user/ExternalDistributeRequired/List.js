import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Input } from 'antd';
import moment from 'moment';
import { ExportOutlined } from '@ant-design/icons';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);

class List extends Component {
  state = {
    isShow: false,
    pubDocInfo: {},
    pubDocList: [],
    taskSeq: 0,
    workSeq: 0,
    selectedRowKeys: [],
    selectedPubDocList: [],
    isExternalDistShow: false,
    searchInfo: {},
  };

  componentDidMount() {
    // this.getList();
  }

  getList = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'externalDistributeRequiredList',
        url: '/api/mdcs/v1/common/externalDistributeRequiredList',
        type: 'POST',
        params: {
          PARAM: {
            ...this.state.searchInfo
          }
        },
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
    });
  }

  onClickExternalDist = () => {
    if (this.state.selectedRowKeys.length > 0) {
      this.setState({ isExternalDistShow: true });
    } else {
      message.info(<MessageContent>외부배포할 문서를 선택해주세요.</MessageContent>);
    }
  };

  columns = [
    {
      title: '문서종류',
      dataIndex: 'FULLPATH_NM',
      key: 'FULLPATH_NM',
      align: 'center',
      width: '15%',
      ellipsis: true,
    },
    {
      title: 'No.',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '10%',
      // render: (text, record) => <a onClick={() => this.onOpenDocInfo(record)}>{text}</a>,
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      align: 'center',
      width: '7%',
    },
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
      // render: (text, record) => <a onClick={() => this.onOpenDocInfo(record)}>{text}</a>,
    },
    {
      title: '배포일',
      dataIndex: 'END_DTTM',
      key: 'END_DTTM',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '확인일',
      dataIndex: 'CONFIRM_DTTM',
      key: 'CONFIRM_DTTM',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  render() {
    const { result } = this.props;
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 외부배포 필요함
            </p>
            <div className="btnPositonMid">
              <StyledButton className="btn-primary btn-sm" onClick={this.onClickExternalDist}>
                <ExportOutlined /> 외부배포
              </StyledButton>
            </div>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          {/* <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="문서번호" style={{ width: 130 }}
                onChange={e => this.onChangeSearchInfo('DOCNUMBER', e.target.value)}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="Title" style={{ width: 150 }}
                onChange={e => this.onChangeSearchInfo('TITLE', e.target.value)}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5" allowClear placeholder="업체명" style={{ width: 150 }}
                onChange={e => this.onChangeSearchInfo('RECV_DEPT_NAME', e.target.value)}
                onPressEnter={this.getList}
              />
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>검색</StyledButton>
              <ExcelDownload
                key="excelDownLoad"
                isBuilder={false}
                fileName={`외부배포현황 (${moment().format('YYYYMMDD')})`}
                className="workerExcelBtn"
                title="Excel 파일로 저장"
                btnSize="btn-sm"
                sheetName=""
                columns={this.excelColumns}
                fields={this.fields}
                dataSetBind={list.map(item => ({ ...item, STATUS: item.STATUS === 0 ? '  In progress' : 'Completed' }))}
                style={{ display: 'inline-block'}}
              />
            </div>
          </StyledCustomSearchWrapper> */}
          <AntdTable
            dataSource={result && result.externalDistributeRequiredList && result.externalDistributeRequiredList.list ? result.externalDistributeRequiredList.list.map(item => ({ ...item, key: `${item.TRANS_NO}_${item.RECV_USER_ID}` })) : []}
            columns={this.columns}
            bordered
            rowSelection={rowSelection}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;