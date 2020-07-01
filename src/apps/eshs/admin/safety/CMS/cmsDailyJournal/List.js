import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BizBuilderBase from 'components/BizBuilderBase';

import { Table, Input, DatePicker, Select, Popover, Popconfirm, Modal } from 'antd';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled//Modal/StyledAntdModal';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

const { TextArea } = Input;
const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdModal = StyledAntdModal(Modal);
const AntdLineTable = StyledAntdTable(Table);
const AntdDatePicker = StyledDatePicker(DatePicker);

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journalDate: moment(),
      selectedOhterRowKeys: [],
      selectedPlanRowKeys: [],
    };
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'initData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 1985 } },
      },
      {
        key: 'listData',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsBuilderCustomSearch//5781',
        params: {
          PARAM: {
            whereString: [`AND W.JOURNAL_DATE = '${moment().format('YYYY-MM-DD')}'`],
          },
        },
      },
      {
        key: 'detailData',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsCMS?JOURNAL_DATE=${moment().format('YYYY-MM-DD')}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  };

  initData = () => {
    const { result } = this.props;
    const {
      listData,
      initData: { categoryMapList },
      detailData: { worker, list },
    } = result;
    const fixedTeam = categoryMapList && categoryMapList.filter(item => item.PARENT_NODE_ID === 2010);
    const timedTeam = categoryMapList && categoryMapList.filter(item => item.PARENT_NODE_ID === 2011);
    const workerStatus = (worker && worker.WORKER_STATUS) || '';
    const vacationer = (worker && worker.VACATIONER) || '';
    const otherArr = (list && list.filter(item => item.CONTANTS_TYPE === 1)) || [];
    const planArr = (list && list.filter(item => item.CONTANTS_TYPE === 2)) || [];
    this.setState({ fixedTeam, timedTeam, listData: (listData && listData.list) || [], workerStatus, vacationer, otherArr, planArr });
  };

  searchList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { fixedTeamSelected, timedTeamSelected, journalDate } = this.state;
    const fixTemp = fixedTeamSelected ? `FIXED_TEAM=${fixedTeamSelected}` : '';
    const timeTemp = timedTeamSelected ? `TIME_TEAM=${timedTeamSelected}` : '';
    const apiAry = [
      {
        key: 'listData',
        type: 'POST',
        url: '/api/eshs/v1/common/eshsBuilderCustomSearch/5781',
        params: {
          PARAM: {
            whereString: [
              `AND W.JOURNAL_DATE = '${moment(journalDate).format('YYYY-MM-DD')}'`,
              fixedTeamSelected ? `AND W.FIXED_TEAM::INTEGER = '${fixedTeamSelected}'` : '',
              timedTeamSelected ? `AND W.TIME_TEAM::INTEGER = '${timedTeamSelected}'` : '',
            ],
          },
        },
      },
      {
        key: 'detailData',
        type: 'GET',
        url: `/api/eshs/v1/common/eshsCMS?JOURNAL_DATE=${moment(journalDate).format('YYYY-MM-DD')}&&${fixTemp}&&${timeTemp}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.searchData);
  };

  searchData = () => {
    const { result } = this.props;
    const {
      listData,
      detailData: { worker, list },
    } = result;
    if ((listData.list && listData.list.length > 0) || (list && list.length > 0)) {
      const workerStatus = (worker && worker.WORKER_STATUS) || '';
      const vacationer = (worker && worker.VACATIONER) || '';
      const otherArr = (list && list.filter(item => item.CONTANTS_TYPE === 1)) || [];
      const planArr = (list && list.filter(item => item.CONTANTS_TYPE === 2)) || [];
      this.setState({ listData: (listData && listData.list) || [], workerStatus, vacationer, otherArr, planArr });
    } else {
      message.info(<MessageContent>검색된 데이터가 없습니다.</MessageContent>);
    }
  };

  onChangeData = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { journalDate, workerStatus, vacationer, otherArr, planArr } = this.state;
    if (Array.isArray(otherArr) && Array.isArray(planArr)) {
      const submitData = {
        PARAM: {
          JOURNAL_DATE: `${moment(journalDate || '').format()}`,
          WORKER_STATUS: workerStatus,
          VACATIONER: vacationer,
          CONTANTS_ARRAY: [...otherArr, ...planArr],
        },
      };
      submitHandlerBySaga(id, 'PUT', '/api/eshs/v1/common/eshsCMS', submitData, this.callBackApi);
    } else {
      message.info(<MessageContent>입력정보가 옳바르지 않습니다.</MessageContent>);
    }
  };

  callBackApi = (id, response) => {
    const { journalDate } = this.state;
    if (response.result === 1) {
      this.searchList();
      message.success(<MessageContent>{moment(journalDate || '').format('YYYY-MM-DD')} 일지가 저장되었습니다.</MessageContent>);
    } else {
      message.info(<MessageContent>폐이지에 오류가 있습니다. 잠시 후 다시 시도해주세요</MessageContent>);
    }
  };

  handlePlusArr = type => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { journalDate, fixedTeamSelected, timedTeamSelected } = this.state;
    const submitData = {
      PARAM: {
        JOURNAL_DATE: `${moment(journalDate || '').format()}`,
        CONTANTS: '',
        CONTANTS_TYPE: type,
        UNIQUENESS: type === 1 ? -1 : undefined,
        FIXED_TEAM: fixedTeamSelected || undefined,
        TIME_TEAM: timedTeamSelected || undefined,
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsCMS', submitData, this.searchList);
  };

  onChangeTableData = (type, name, value, seq) => {
    const { otherArr, planArr } = this.state;
    if (type === 1) {
      this.setState({ otherArr: otherArr.map(changeItem => (changeItem.SEQ === seq ? { ...changeItem, [name]: value } : { ...changeItem })) });
    } else {
      this.setState({ planArr: planArr.map(changeItem => (changeItem.SEQ === seq ? { ...changeItem, [name]: value } : { ...changeItem })) });
    }
  };

  onDeleteArr = DELETE_LIST => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    if (DELETE_LIST && DELETE_LIST.length) {
      const submitData = { PARAM: { DELETE_LIST } };
      submitHandlerBySaga(id, 'DELETE', '/api/eshs/v1/common/eshsCMS', submitData, this.deletaCallBackApi);
    } else {
      message.info(<MessageContent>삭제할 항목을 선택해주세요.</MessageContent>);
    }
  };

  deletaCallBackApi = (id, response) => {
    const { selectedOhterRowKeys, selectedPlanRowKeys } = this.state;
    if (response.result === selectedOhterRowKeys.length || response.result === selectedPlanRowKeys.length) {
      this.searchList();
      this.setState({ selectedOhterRowKeys: [], selectedPlanRowKeys: [] });
      message.success(<MessageContent>삭제되었습니다.</MessageContent>);
    } else {
      message.info(<MessageContent>폐이지에 오류가 있습니다. 잠시 후 다시 시도해주세요</MessageContent>);
    }
  };

  // 상세 모달 페이지
  onChangeModal = seq => {
    const { isModal } = this.state;
    if (isModal) this.searchList();
    this.setState({ isModal: !isModal, taskSeq: seq });
  };

  onSelectedOhterRowKeys = selectedRowKey => {
    this.setState({ selectedOhterRowKeys: selectedRowKey });
  };

  onSelectedPlanRowKeys = selectedRowKey => {
    this.setState({ selectedPlanRowKeys: selectedRowKey });
  };

  render() {
    const {
      listData,
      planArr,
      otherArr,
      fixedTeam,
      timedTeam,
      fixedTeamSelected,
      timedTeamSelected,
      taskSeq,
      isModal,
      selectedOhterRowKeys,
      selectedPlanRowKeys,
    } = this.state;
    const { journalCol } = this.props;
    const otherArrCol = [
      {
        title: `고정조`,
        dataIndex: 'FIXED_TEAM',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <AntdSelect
            style={{ width: '100%' }}
            className="select-sm"
            onChange={value => this.onChangeTableData(1, 'FIXED_TEAM', value, record.SEQ)}
            value={text}
            allowClear
            placeholder="전체"
          >
            {fixedTeam &&
              fixedTeam.map(itme => (
                <Option key={itme.NODE_ID} value={itme.NODE_ID}>
                  {itme.NAME_KOR}
                </Option>
              ))}
          </AntdSelect>
        ),
      },
      {
        title: `시간조`,
        dataIndex: 'TIME_TEAM',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <AntdSelect
            style={{ width: '100%' }}
            className="select-sm"
            onChange={value => this.onChangeTableData(1, 'TIME_TEAM', value, record.SEQ)}
            value={text}
            allowClear
            placeholder="전체"
          >
            {timedTeam &&
              timedTeam.map(itme => (
                <Option key={itme.NODE_ID} value={itme.NODE_ID}>
                  {itme.NAME_KOR}
                </Option>
              ))}
          </AntdSelect>
        ),
      },
      {
        title: `일일 특이사항`,
        dataIndex: 'UNIQUENESS',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <AntdSelect
            style={{ width: '100%' }}
            className="select-sm"
            onChange={value => this.onChangeTableData(1, 'UNIQUENESS', value, record.SEQ)}
            value={text}
            allowClear
            placeholder="전체"
          >
            <Option value={1}>Y</Option>
            <Option value={-1}>N</Option>
          </AntdSelect>
        ),
      },
      {
        title: `내용`,
        dataIndex: 'CONTANTS',
        align: 'center',
        render: (text, record) => <TextArea value={text} onChange={e => this.onChangeTableData(1, 'CONTANTS', e.target.value, record.SEQ)} />,
      },
    ];
    const planArrCol = [
      {
        title: `고정조`,
        dataIndex: 'FIXED_TEAM',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <AntdSelect
            style={{ width: '100%' }}
            className="select-sm"
            onChange={value => this.onChangeTableData(2, 'FIXED_TEAM', value, record.SEQ)}
            value={text}
            allowClear
            placeholder="전체"
          >
            {fixedTeam &&
              fixedTeam.map(itme => (
                <Option key={itme.NODE_ID} value={itme.NODE_ID}>
                  {itme.NAME_KOR}
                </Option>
              ))}
          </AntdSelect>
        ),
      },
      {
        title: `시간조`,
        dataIndex: 'TIME_TEAM',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <AntdSelect
            style={{ width: '100%' }}
            className="select-sm"
            onChange={value => this.onChangeTableData(2, 'TIME_TEAM', value, record.SEQ)}
            value={text}
            allowClear
            placeholder="전체"
          >
            {timedTeam &&
              timedTeam.map(itme => (
                <Option key={itme.NODE_ID} value={itme.NODE_ID}>
                  {itme.NAME_KOR}
                </Option>
              ))}
          </AntdSelect>
        ),
      },
      {
        title: `내용`,
        dataIndex: 'CONTANTS',
        align: 'center',
        render: (text, record) => <TextArea value={text} onChange={e => this.onChangeTableData(2, 'CONTANTS', e.target.value, record.SEQ)} />,
      },
    ];

    const rowOhterSelection = {
      selectedOhterRowKeys,
      onChange: this.onSelectedOhterRowKeys,
    };
    const rowPlanSelection = {
      selectedPlanRowKeys,
      onChange: this.onSelectedPlanRowKeys,
    };
    return (
      <StyledContentsWrapper>
        <StyledCustomSearch className="search-wrapper-inline">
          <div className="search-input-area">
            <span className="text-label">날짜 선택</span>
            <AntdDatePicker
              className="ant-picker-sm mr5"
              defaultValue={this.state.journalDate}
              format="YYYY-MM-DD"
              onChange={date => this.onChangeValue('journalDate', date)}
            />
            <span className="text-label">고정조 구분</span>
            <AntdSelect
              style={{ width: '200px' }}
              className="select-sm mr5"
              onChange={value => this.onChangeValue('fixedTeamSelected', value)}
              value={fixedTeamSelected}
              allowClear
              placeholder="전체"
            >
              {fixedTeam &&
                fixedTeam.map(itme => (
                  <Option key={itme.NODE_ID} value={itme.NODE_ID}>
                    {itme.NAME_KOR}
                  </Option>
                ))}
            </AntdSelect>
            <span className="text-label">시간조 구분</span>
            <AntdSelect
              style={{ width: '200px' }}
              className="select-sm mr5"
              onChange={value => this.onChangeValue('timedTeamSelected', value)}
              value={timedTeamSelected}
              allowClear
              placeholder="전체"
            >
              {timedTeam &&
                timedTeam.map(itme => (
                  <Option key={itme.NODE_ID} value={itme.NODE_ID}>
                    {itme.NAME_KOR}
                  </Option>
                ))}
            </AntdSelect>
          </div>
          <div className="btn-area">
            <StyledButton className="btn-gray btn-first btn-sm" onClick={this.searchList}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearch>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">근무자 현황</span>
          <AntdInput
            style={{ width: '35%' }}
            className="ant-input-inline ant-input-sm mr5"
            value={this.state.workerStatus}
            onChange={e => this.onChangeValue('workerStatus', e.target.value)}
          />
          <span className="textLabel">휴가자</span>
          <AntdInput
            style={{ width: '35%' }}
            className="ant-input-inline ant-input-sm mr5"
            value={this.state.vacationer}
            onChange={e => this.onChangeValue('vacationer', e.target.value)}
          />
          <StyledButton className="btn-primary btn-first btn-sm" onClick={this.onChangeData}>
            저장
          </StyledButton>
          <StyledButton className="btn-gray btn-sm" onClick={() => message.warning(<MessageContent>개발중입니다.</MessageContent>)}>
            출력
          </StyledButton>
        </div>
        <AntdLineTable
          rowKey={listData && listData.TASK_SEQ}
          columns={journalCol}
          dataSource={listData}
          footer={() => <span>{`${(listData && listData.length) || 0} 건`}</span>}
          onRow={record => ({
            onClick: () => {
              this.onChangeModal(record.TASK_SEQ);
            },
          })}
        />
        <div className="table-title" style={{ margin: '20px 5px 4px 0', display: 'inline-block' }}>
          기타사항
        </div>
        <StyledButtonWrapper className="btn-wrap-inline btn-wrap-mb-10 btn-wrap-mt-10 btn-wrap-right" style={{ float: 'right' }}>
          {/* <StyledButton className="btn-primary btn-first btn-sm" style={{ float: 'right', margin: '20px 5px 4px 0' }} onClick={() => this.handlePlusArr(1)}> */}
          <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handlePlusArr(1)}>
            추가
          </StyledButton>
          <Popconfirm title="삭제 하시겠습니까?" onConfirm={() => this.onDeleteArr(selectedOhterRowKeys)} okText="Yes" cancelText="No">
            <StyledButton className="btn-light btn-sm">삭제</StyledButton>
          </Popconfirm>
        </StyledButtonWrapper>
        {otherArr && otherArr.length > 0 && (
          <AntdLineTable
            rowKey="SEQ"
            columns={otherArrCol}
            dataSource={otherArr}
            pagination={false}
            footer={null}
            rowSelection={rowOhterSelection}
            scroll={{ y: 400 }}
          />
        )}
        <hr />
        <div className="table-title" style={{ margin: '20px 5px 4px 0', display: 'inline-block' }}>
          업무계획
        </div>
        <StyledButtonWrapper className="btn-wrap-inline btn-wrap-mb-10 btn-wrap-mt-10 btn-wrap-right" style={{ float: 'right' }}>
          {/* <StyledButton className="btn-primary btn-first btn-sm" style={{ float: 'right', margin: '20px 5px 4px 0' }} onClick={() => this.handlePlusArr(2)}> */}
          <StyledButton className="btn-primary btn-first btn-sm" onClick={() => this.handlePlusArr(2)}>
            추가
          </StyledButton>
          <Popconfirm title="삭제 하시겠습니까?" onConfirm={() => this.onDeleteArr(selectedPlanRowKeys)} okText="Yes" cancelText="No">
            <StyledButton className="btn-light btn-sm">삭제</StyledButton>
          </Popconfirm>
        </StyledButtonWrapper>
        {planArr && planArr.length > 0 && (
          <AntdLineTable
            rowKey="SEQ"
            columns={planArrCol}
            dataSource={planArr}
            pagination={false}
            footer={null}
            rowSelection={rowPlanSelection}
            scroll={{ y: 400 }}
          />
        )}
        <AntdModal width={1000} visible={isModal} title="이벤트 상세보기" onCancel={this.onChangeModal} destroyOnClose footer={null}>
          {isModal && <BizBuilderBase sagaKey="cmsDetailJournal" workSeq={5781} taskSeq={taskSeq} viewType="MODIFY" onCloseModalHandler={this.onChangeModal} />}
        </AntdModal>
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  submitHandlerBySaga: PropTypes.func,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
  journalCol: PropTypes.array,
};

List.defaultProps = {
  getCallDataHandler: () => {},
  journalCol: [
    {
      title: `구분`,
      dataIndex: 'PARENT_CLASSIFICATION_NM',
      align: 'center',
    },
    {
      title: `분류3`,
      dataIndex: 'CLASSIFICATION_NAME',
      align: 'center',
    },
    {
      title: `발생시간`,
      dataIndex: 'TIME',
      align: 'center',
    },
    {
      title: `조`,
      dataIndex: 'FIXED_TEAM_NAME',
      align: 'center',
      render: (text, record) => <span>{`${text}(${record.TIME_TEAM_NAME})`}</span>,
    },
    {
      title: `AREA`,
      children: [
        {
          title: `건물`,
          className: 'th-form',
          dataIndex: 'FAB_NM',
          align: 'center',
        },
        {
          title: `층`,
          className: 'th-form',
          dataIndex: 'RAYER_NM',
          align: 'center',
        },
      ],
    },
    {
      title: `이벤트명`,
      dataIndex: 'TITLE',
      align: 'center',
      render: (text, record) => (
        <Popover placement="topLeft" title={text} trigger="hover">
          <span
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '100px',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              fontWeight: `${record.IMPORTANT === 1 ? 'bold' : ''}`,
            }}
          >
            {text}
          </span>
        </Popover>
      ),
    },
    {
      title: `원인 및 조치사항`,
      dataIndex: 'REMARK',
      align: 'center',
      render: (text, record) => (
        <Popover placement="topLeft" title={text} trigger="hover">
          <span
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '100px',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              fontWeight: `${record.IMPORTANT === 1 ? 'bold' : ''}`,
            }}
          >
            {text}
          </span>
        </Popover>
      ),
    },
    {
      title: `관리번호`,
      dataIndex: 'MANAGE_NUMBER',
      align: 'center',
    },
  ],
};

export default List;
