import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Table, Input, DatePicker, Select, Popover, Checkbox, message } from 'antd';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';

const { TextArea } = Input;
const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdLineTable = StyledLineTable(Table);

moment.locale('ko');

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journalDate: moment(),
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
    const otherArr = detailData && detailData.list && detailData.list.filter(item => item.CONTANTS_TYPE === 1);
    const planArr = detailData && detailData.list && detailData.list.filter(item => item.CONTANTS_TYPE === 2);
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

  callBackApi = () => {
    this.searchList();
  };

  onChangeData = () => {
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    const { journalDate, workerStatus, vacationer, otherArr, planArr } = this.state;
    const submitData = {
      PARAM: {
        JOURNAL_DATE: `${moment(journalDate || '').format()}`,
        WORKER_STATUS: workerStatus,
        VACATIONER: vacationer,
        CONTANTS_ARRAY: [...otherArr, ...planArr],
      },
    };
    submitHandlerBySaga(id, 'POST', '/api/eshs/v1/common/eshsCMS', submitData, this.callBackApi);
  };

  // 기타사항 및 업무계획 Array 추가
  handlePlusArr = type => {
    const { otherArr, planArr } = this.state;
    const nOtherArr = { CONTANTS: '', CONTANTS_TYPE: type };
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
      otherArr.splice(index, 1, { CONTANTS: text, CONTANTS_TYPE: record.CONTANTS_TYPE });
      this.setState({ otherArr: nOtherArr });
    } else {
      const nPlanArr = planArr;
      nPlanArr.splice(index, 1, { CONTANTS: text, CONTANTS_TYPE: record.CONTANTS_TYPE });
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
        width: '5%',
        render: (text, record, index) => <StyledButton onClick={() => this.onDeleteArr(record, index)}>[-]</StyledButton>,
      },
      {
        title: `내용`,
        dataIndex: 'CONTANTS',
        align: 'center',
        width: '85%',
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
        width: '5%',
        render: (text, record, index) => <StyledButton onClick={() => this.onDeleteArr(record, index)}>[-]</StyledButton>,
      },
      {
        title: `내용`,
        dataIndex: 'CONTANTS',
        width: '95%',
        align: 'center',
        render: (text, record, index) => <TextArea value={text} onChange={e => this.onChangeContants(e.target.value, record, index)} />,
      },
    ];
    return (
      <ContentsWrapper>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">날짜 선택</span>
          {/* datePiker CSS 없음 대체용으로 사용 */}
          <div style={{ margin: '0 5px', display: 'inline-block' }}>
            <DatePicker defaultValue={this.state.journalDate} format="YYYY-MM-DD" onChange={date => this.onChangeValue('journalDate', date)} />
          </div>
          <span className="textLabel">고정조 구분</span>
          <AntdSelect
            style={{ width: '200px' }}
            className="select-mid mr5"
            onChange={value => this.onChangeValue('fixedTeamSelected', value)}
            value={fixedTeamSelected}
          >
            <Option value="">전체</Option>
            {fixedTeam && fixedTeam.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
          </AntdSelect>
          <span className="textLabel">시간조 구분</span>
          <AntdSelect
            style={{ width: '200px' }}
            className="select-mid mr5"
            onChange={value => this.onChangeValue('timedTeamSelected', value)}
            value={timedTeamSelected}
          >
            <Option value="">전체</Option>
            {timedTeam && timedTeam.map(itme => <Option value={itme.NODE_ID}>{itme.NAME_KOR}</Option>)}
          </AntdSelect>
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-first" onClick={this.searchList}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={this.onChangeData}>
              저장
            </StyledButton>
            <StyledButton className="btn-primary btn-first" onClick={() => message.warning('개발중입니다.')}>
              출력
            </StyledButton>
          </StyledButtonWrapper>
        </div>
        <div className="selSaveWrapper alignLeft">
          <span className="textLabel">근무자 현황</span>
          <AntdInput
            style={{ width: '600px' }}
            className="ant-input-inline ant-input-mid mr5"
            value={this.state.workerStatus}
            onChange={e => this.onChangeValue('workerStatus', e.target.value)}
          />
          <span className="textLabel">휴가자</span>
          <AntdInput
            style={{ width: '600px' }}
            className="ant-input-inline ant-input-mid mr5"
            value={this.state.vacationer}
            onChange={e => this.onChangeValue('vacationer', e.target.value)}
          />
        </div>
        <AntdLineTable
          className="tableWrapper"
          rowKey={listData && listData.TASK_SEQ}
          columns={journalCol}
          dataSource={listData}
          footer={() => <span>{`${(listData && listData.length) || 0} 건`}</span>}
        />
        <div className="selSaveWrapper alignLeft">
          <span>기타사항</span>
          <StyledButton onClick={() => this.handlePlusArr(1)}>[+1]</StyledButton>
        </div>
        <AntdLineTable
          className="tableWrapper"
          columns={otherArrCol}
          dataSource={otherArr && otherArr.length > 0 ? otherArr : [{ CONTANTS: '', CONTANTS_TYPE: 1 }]}
          pagination={false}
          footer={null}
        />

        <div className="selSaveWrapper alignLeft">
          <span>업무계획</span>
          <StyledButton onClick={() => this.handlePlusArr(2)}>[+1]</StyledButton>
        </div>
        <AntdLineTable
          className="tableWrapper"
          columns={planArrCol}
          dataSource={planArr && planArr.length > 0 ? planArr : [{ CONTANTS: '', CONTANTS_TYPE: 2 }]}
          pagination={false}
          footer={null}
        />
      </ContentsWrapper>
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
      dataIndex: 'TIME_TEAM_NAME',
      align: 'center',
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
      title: `상세내용`,
      dataIndex: 'DETAIL_CONTANT',
      align: 'center',
      render: (text, record) => (
        <Popover placement="topLeft" title={text} trigger="hover">
          <div
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '100px',
              whiteSpace: 'nowrap',
              fontWeight: `${record.IMPORTANT === 1 ? 'bold' : ''}`,
            }}
          >
            {text}
          </div>
        </Popover>
      ),
    },
    {
      title: `추가사항 비고`,
      dataIndex: 'REMARK',
      align: 'center',
      render: (text, record) => (
        <Popover placement="topLeft" title={text} trigger="hover">
          <div
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '100px',
              whiteSpace: 'nowrap',
              fontWeight: `${record.IMPORTANT === 1 ? 'bold' : ''}`,
            }}
          >
            {text}
          </div>
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
