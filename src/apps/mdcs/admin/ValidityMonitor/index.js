import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Select, Modal } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import View from './view';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInfo: {},
      pageSize: 10,
      modalObj: {
        visible: false,
        title: '',
        content: [],
      },
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'validityList',
        url: '/api/mdcs/v1/common/validityMonitorList',
        type: 'POST',
        params: {
          PARAM: {
            ...this.state.searchInfo,
          },
        },
      },
    ];
    spinningOn();
    getCallDataHandler(sagaKey, apiAry, () => {
      spinningOff();
    });
  };

  onRowClick = (record, rowIndex, e) =>
    this.handleModal(true, '유효성 정검', [
      <View
        {...this.props}
        WORK_SEQ={record?.WORK_SEQ}
        TASK_SEQ={record?.TASK_SEQ}
        TASK_ORIGIN_SEQ={record?.TASK_ORIGIN_SEQ}
        TITLE={record?.TITLE}
        onShowProces={this.state.isShowProcess}
        onValidateProcess={this.onValidateProcess}
        onModalClose={() => this.handleModal()}
      />,
    ]);

  handleModal = (visible = false, title = '', content = []) =>
    this.setState({
      modalObj: {
        visible,
        title,
        content,
      },
    });

  colunms = [
    {
      title: '문서번호',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      align: 'center',
      width: '8%',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      align: 'center',
      width: '5%',
    },
    {
      title: 'Title',
      dataIndex: 'TITLE',
      key: 'TITLE',
      ellipsis: true,
    },
    {
      title: '기안자',
      dataIndex: 'REG_USER_NAME',
      key: 'REG_USER_NAME',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Effect Date',
      dataIndex: 'END_DTTM',
      key: 'END_DTTM',
      align: 'center',
      width: '10%',
    },
    {
      title: '구분',
      dataIndex: 'CHECKTYPE_NAME',
      key: 'CHECKTYPE_NAME',
      align: 'center',
      width: '13%',
      render: (text, record) => {
        if (text) {
          if (record.CHECKTYPE === 'R' && record.REV_DATE) {
            return `${text}(${record.REV_DATE})`;
          }
          return text;
        }
        return '';
      },
    },
    {
      title: '상태',
      dataIndex: 'VALIDITY_STATUS',
      key: 'VALIDITY_STATUS',
      align: 'center',
      width: '6%',
    },
    {
      title: '점검일',
      dataIndex: 'VALIDITY_DATE',
      key: 'VALIDITY_DATE',
      align: 'center',
      width: '10%',
    },
  ];

  render() {
    const { searchInfo, modalObj } = this.state;
    const { result } = this.props;

    return (
      <>
        <AntdModal title={modalObj?.title} visible={modalObj?.visible} width={680} destroyOnClose onCancel={() => this.handleModal()} footer={[]}>
          {modalObj?.content}
        </AntdModal>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <AntdInput
                className="ant-input-sm mr5"
                allowClear
                placeholder="문서번호"
                style={{ width: 120 }}
                onChange={e => this.setState({ searchInfo: { ...searchInfo, DOCNUMBER: e.target.value } })}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5"
                allowClear
                placeholder="Title"
                style={{ width: 150 }}
                onChange={e => this.setState({ searchInfo: { ...searchInfo, TITLE: e.target.value } })}
                onPressEnter={this.getList}
              />
              <AntdInput
                className="ant-input-sm mr5"
                allowClear
                placeholder="기안자"
                style={{ width: 110 }}
                onChange={e => this.setState({ searchInfo: { ...searchInfo, REG_USER_NAME: e.target.value } })}
                onPressEnter={this.getList}
              />
              <AntdSelect
                className="select-sm mr5"
                allowClear
                placeholder="구분"
                style={{ width: 100 }}
                onChange={val => this.setState({ searchInfo: { ...searchInfo, CHECKTYPE: val } })}
              >
                <AntdSelect.Option value="Y">유효</AntdSelect.Option>
                <AntdSelect.Option value="R">개정</AntdSelect.Option>
                <AntdSelect.Option value="O">폐기</AntdSelect.Option>
              </AntdSelect>
              <AntdSelect
                className="select-sm mr5"
                allowClear
                placeholder="상태"
                style={{ width: 100 }}
                onChange={val => this.setState({ searchInfo: { ...searchInfo, VALIDITY_STATUS: val } })}
              >
                <AntdSelect.Option value={0}>진행중</AntdSelect.Option>
                <AntdSelect.Option value={2}>완료</AntdSelect.Option>
              </AntdSelect>
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <div style={{ width: '100%', height: '30px', textAlign: 'right' }}>
            <div style={{ float: 'left', marginBottom: '10px' }}>
              <AntdSelect defaultValue={10} className="select-sm" style={{ width: 100 }} onChange={val => this.setState({ pageSize: val })}>
                <AntdSelect.Option value={10}>10 / page</AntdSelect.Option>
                <AntdSelect.Option value={20}>20 / page</AntdSelect.Option>
                <AntdSelect.Option value={30}>30 / page</AntdSelect.Option>
                <AntdSelect.Option value={40}>40 / page</AntdSelect.Option>
                <AntdSelect.Option value={50}>50 / page</AntdSelect.Option>
              </AntdSelect>
            </div>
          </div>
          <AntdTable
            dataSource={
              result && result.validityList && result.validityList.list ? result.validityList.list.map(item => ({ ...item, key: item.TASK_SEQ })) : []
            }
            columns={this.colunms}
            bordered
            pagination={{ pageSize: this.state?.pageSize }}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
          />
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  spinningOn: PropTypes.func,
  spinningOff: PropTypes.func,
  result: PropTypes.object,
};

const ValidityMonitor = () => <BizMicroDevBase sagaKey="ValidityMonitor" component={List} />;

export default ValidityMonitor;
