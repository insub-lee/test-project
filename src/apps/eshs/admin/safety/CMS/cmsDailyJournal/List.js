import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Table, Input, DatePicker, Select, Popover, Checkbox, message, Popconfirm } from 'antd';
import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

const { TextArea } = Input;
const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdLineTable = StyledAntdTable(Table);
const AntdDatePicker = StyledDatePicker(DatePicker);

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journalDate: moment(),
      otherArr: [{ CONTANTS: '', CONTANTS_TYPE: 1, UNIQUENESS: -1 }],
      planArr: [{ CONTANTS: '', CONTANTS_TYPE: 2, UNIQUENESS: -1 }],
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
    const {
      result: { initData, listData, detailData },
    } = this.props;
    const fixedTeam = initData && initData.categoryMapList && initData.categoryMapList.filter(item => item.PARENT_NODE_ID === 2010);
    const timedTeam = initData && initData.categoryMapList && initData.categoryMapList.filter(item => item.PARENT_NODE_ID === 2011);
    const workerStatus = (detailData && detailData.worker && detailData.worker.WORKER_STATUS) || '';
    const vacationer = (detailData && detailData.worker && detailData.worker.VACATIONER) || '';
    let otherArr = detailData && detailData.list && detailData.list.filter(item => item.CONTANTS_TYPE === 1);
    let planArr = detailData && detailData.list && detailData.list.filter(item => item.CONTANTS_TYPE === 2);
    if (otherArr.length < 1) {
      otherArr = [{ CONTANTS: '', CONTANTS_TYPE: 1, UNIQUENESS: -1 }];
    }
    if (planArr.length < 1) {
      planArr = [{ CONTANTS: '', CONTANTS_TYPE: 2, UNIQUENESS: -1 }];
    }
    this.setState({ fixedTeam, timedTeam, listData: (listData && listData.list) || [], workerStatus, vacationer, otherArr, planArr });
  };

  searchList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { fixedTeamSelected, timedTeamSelected, journalDate } = this.state;
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
        url: `/api/eshs/v1/common/eshsCMS?JOURNAL_DATE=${moment(journalDate).format('YYYY-MM-DD')}`,
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
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
      submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsCMS', submitData, this.callBackApi);
    } else {
      message.warning('입력정보가 옳바르지 않습니다.');
    }
  };

  callBackApi = (id, response) => {
    const { journalDate } = this.state;
    if (response.result === 1) {
      this.searchList();
      message.success(`${moment(journalDate || '').format('YYYY-MM-DD')}일지가 저장되었습니다.`);
    } else {
      message.warning(`폐이지에 오류가 있습니다. 잠시 후 다시 시도해주세요`);
    }
  };

  // 기타사항 및 업무계획 Array 추가
  handlePlusArr = type => {
    const { otherArr, planArr } = this.state;
    const nOtherArr = { CONTANTS: '', CONTANTS_TYPE: type, UNIQUENESS: -1 };
    if (type === 1) {
      this.setState({ otherArr: otherArr.concat(nOtherArr) });
    } else {
      this.setState({ planArr: planArr.concat(nOtherArr) });
    }
  };

  // 기타사항 및 업무계획에 TextArea 값 변경
  onChangeContants = (text, record, index) => {
    const { otherArr, planArr } = this.state;
    if (record.CONTANTS_TYPE === 1) {
      const nOtherArr = otherArr;
      otherArr.splice(index, 1, { CONTANTS: text, CONTANTS_TYPE: record.CONTANTS_TYPE, UNIQUENESS: record.UNIQUENESS });
      this.setState({ otherArr: nOtherArr });
    } else {
      const nPlanArr = planArr;
      nPlanArr.splice(index, 1, { CONTANTS: text, CONTANTS_TYPE: record.CONTANTS_TYPE, UNIQUENESS: record.UNIQUENESS });
      this.setState({ planArr: nPlanArr });
    }
  };

  // 기타사항에 Checkbox 값 변경
  onChangeCheck = (checked, record, index) => {
    const { otherArr } = this.state;
    const nOtherArr = otherArr;
    nOtherArr.splice(index, 1, { CONTANTS: record.CONTANTS, CONTANTS_TYPE: record.CONTANTS_TYPE, UNIQUENESS: checked ? 1 : -1 });
    this.setState({ otherArr: nOtherArr });
  };

  // 기타사항 및 업무계획 Array 제거
  onDeleteArr = (record, index) => {
    const { otherArr, planArr } = this.state;
    if (record.CONTANTS_TYPE === 1) {
      const nOtherArr = otherArr;
      nOtherArr.splice(index, 1);
      this.setState({ otherArr: nOtherArr });
    } else {
      const nPlanArr = planArr;
      nPlanArr.splice(index, 1);
      this.setState({ planArr: nPlanArr });
    }
  };

  render() {
    const { listData, planArr, otherArr, fixedTeam, timedTeam, fixedTeamSelected, timedTeamSelected } = this.state;
    const { journalCol } = this.props;
    const otherArrCol = [
      {
        title: `삭제`,
        align: 'center',
        dataIndex: 'CONTANTS',
        width: '10%',
        render: (text, record, index) => (
          <Popconfirm title="삭제 하시겠습니까?" onConfirm={() => this.onDeleteArr(record, index)} okText="Yes" cancelText="No">
            <StyledButton className="btn-light btn-first btn-xs">삭제</StyledButton>
          </Popconfirm>
        ),
      },
      {
        title: `내용`,
        dataIndex: 'CONTANTS',
        align: 'center',
        width: '80%',
        render: (text, record, index) => <TextArea value={text} onChange={e => this.onChangeContants(e.target.value, record, index)} />,
      },
      {
        title: `일일 특이사항`,
        dataIndex: 'UNIQUENESS',
        align: 'center',
        width: '10%',
        render: (text, record, index) => <Checkbox checked={Number(text) === 1} onChange={e => this.onChangeCheck(e.target.checked, record, index)} />,
      },
    ];
    const planArrCol = [
      {
        title: `삭제`,
        align: 'center',
        dataIndex: 'CONTANTS',
        width: '10%',
        render: (text, record, index) => (
          <Popconfirm title="삭제 하시겠습니까?" onConfirm={() => this.onDeleteArr(record, index)} okText="Yes" cancelText="No">
            <StyledButton className="btn-light btn-first btn-xs">삭제</StyledButton>
          </Popconfirm>
        ),
      },
      {
        title: `내용`,
        dataIndex: 'CONTANTS',
        width: '90%',
        align: 'center',
        render: (text, record, index) => <TextArea value={text} onChange={e => this.onChangeContants(e.target.value, record, index)} />,
      },
    ];
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
              {fixedTeam && fixedTeam.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
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
              {timedTeam && timedTeam.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
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
          <StyledButton className="btn-gray btn-sm" onClick={() => message.warning('개발중입니다.')}>
            출력
          </StyledButton>
        </div>
        <AntdLineTable
          rowKey={listData && listData.TASK_SEQ}
          columns={journalCol}
          dataSource={listData}
          footer={() => <span>{`${(listData && listData.length) || 0} 건`}</span>}
        />
        <div className="table-title" style={{ margin: '20px 5px 4px 0', display: 'inline-block' }}>
          기타사항
        </div>
        <StyledButton className="btn-primary btn-first btn-sm" style={{ float: 'right', margin: '20px 5px 4px 0' }} onClick={() => this.handlePlusArr(1)}>
          추가
        </StyledButton>
        <AntdLineTable columns={otherArrCol} dataSource={otherArr} pagination={false} footer={null} />

        <div className="table-title" style={{ margin: '20px 5px 4px 0', display: 'inline-block' }}>
          업무계획
        </div>
        <StyledButton className="btn-primary btn-first btn-sm" style={{ float: 'right', margin: '20px 5px 4px 0' }} onClick={() => this.handlePlusArr(2)}>
          추가
        </StyledButton>
        <AntdLineTable columns={planArrCol} dataSource={planArr} pagination={false} footer={null} />
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
      title: `추가사항 비고`,
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
