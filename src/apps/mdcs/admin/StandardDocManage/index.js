import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Select, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import BizMicroDevBase from 'components/BizMicroDevBase';
import UserSelect from 'components/UserSelect';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
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
      selectedRow: {},
      isShow: false,
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { sagaKey, getCallDataHandler, spinningOn, spinningOff } = this.props;
    const apiAry = [
      {
        key: 'standardDocList',
        url: '/api/mdcs/v1/common/standardDocList',
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
      this.setState({ selectedRowKeys: [] });
    });
  };

  changeDrafter = () => {
    if (this.state.selectedRowKeys.length > 0) {
      this.setState({
        isShow: true,
      });
    } else {
      message.info(<MessageContent>변경할 표준문서를 선택하세요.</MessageContent>);
    }
  };

  onChangeDrafterAfter = result => {
    const { selectedRowKeys } = this.state;
    const { result: resultProps } = this.props;
    const docList = resultProps.standardDocList.list.filter(item => selectedRowKeys.includes(item.TASK_SEQ));

    this.setState({ isShow: false }, () => {
      if (result && result.length > 0) {
        if (result.length === 1) {
          const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;
          const confirmMsg = `선택한 문서의 기안자를 [${result[0].NAME_KOR}](으)로 변경하시겠습니까?`;
          const submitData = {
            PARAM: {
              docList,
              ...result[0],
              APPV_USER_ID: result[0].USER_ID,
            },
          };

          const callBackFunc = this.getList;
          Modal.confirm({
            title: confirmMsg,
            icon: <ExclamationCircleOutlined />,
            okText: '확인',
            cancelText: '취소',
            onOk() {
              spinningOn();
              submitHandlerBySaga(sagaKey, 'PUT', `/api/mdcs/v1/common/standardDocList`, submitData, (id, res) => {
                spinningOff();
                if (res && res.result === selectedRowKeys.length) {
                  message.success(<MessageContent>기안자를 변경하였습니다.</MessageContent>);
                  callBackFunc();
                } else {
                  message.error(<MessageContent>기안자 변경에 실패하였습니다.</MessageContent>);
                }
              });
            },
          });
        } else {
          message.info(<MessageContent>한명만 선택해 주세요.</MessageContent>);
        }
      }
    });
  };

  standardDocObs = () => {
    const { selectedRowKeys } = this.state;
    const { result } = this.props;
    const { sagaKey, submitHandlerBySaga, spinningOn, spinningOff } = this.props;

    if (selectedRowKeys.length === 0) {
      message.info(<MessageContent>폐기할 문서를 선택해 주세요.</MessageContent>);
      return;
    }

    const docList = result.standardDocList.list.filter(item => selectedRowKeys.includes(item.TASK_SEQ));
    const confirmMsg = `폐기된 문서는 되돌릴 수 없습니다.  선택한 문서를 폐기하시겠습니까?[${docList.length}개]`;
    const submitData = {
      PARAM: {
        docList,
      },
    };

    const callBackFunc = this.getList;
    Modal.confirm({
      title: confirmMsg,
      icon: <ExclamationCircleOutlined />,
      okText: '확인',
      cancelText: '취소',
      onOk() {
        spinningOn();
        submitHandlerBySaga(sagaKey, 'DELETE', `/api/mdcs/v1/common/standardDocList`, submitData, (id, res) => {
          spinningOff();
          if (res && res.result === selectedRowKeys.length) {
            message.success(<MessageContent>문서를 폐기하였습니다.</MessageContent>);
            callBackFunc();
          } else {
            message.error(<MessageContent>문서를 폐기처리하는데 실패하였습니다.</MessageContent>);
          }
        });
      },
    });
  };

  onCancelUserSelect = () => {
    this.setState({ isShow: false });
  };

  onRowClick = record =>
    this.handleModal(true, '표준문서 상세', [
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

  onChangeSelect = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

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
      title: '기안부서',
      dataIndex: 'REG_DEPT_NAME',
      key: 'REG_DEPT_NAME',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Effect Date',
      dataIndex: 'END_DTTM',
      key: 'END_DTTM',
      align: 'center',
      width: '10%',
    },
  ];

  render() {
    const { searchInfo, modalObj, selectedRowKeys } = this.state;
    const { result } = this.props;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onChangeSelect,
    };

    return (
      <>
        <AntdModal width={1000} visible={this.state.isShow} title="기안자 변경" onCancel={this.onCancelUserSelect} destroyOnClose footer={null}>
          <UserSelect onUserSelectedComplete={this.onChangeDrafterAfter} onCancel={this.onCancelUserSelect} />
        </AntdModal>
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
              <StyledButton className="btn-gray btn-sm mr5" onClick={this.getList}>
                검색
              </StyledButton>
              <StyledButton className="btn-primary btn-sm mr5" onClick={this.changeDrafter}>
                기안자 변경
              </StyledButton>
              <StyledButton className="btn-primary btn-sm mr5" onClick={this.standardDocObs}>
                표준문서 폐기
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
              result && result.standardDocList && result.standardDocList.list ? result.standardDocList.list.map(item => ({ ...item, key: item.TASK_SEQ })) : []
            }
            columns={this.colunms}
            bordered
            pagination={{ pageSize: this.state.pageSize }}
            onRow={record => ({
              onClick: () => this.onRowClick(record),
            })}
            rowSelection={rowSelection}
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
  submitHandlerBySaga: PropTypes.func,
};

const StandardDocManage = () => <BizMicroDevBase sagaKey="StandardDocManage" component={List} />;

export default StandardDocManage;
