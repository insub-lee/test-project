import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, DatePicker, Table } from 'antd';
import styled from 'styled-components';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);
const AntdDatePicker = StyledDatePicker(DatePicker);

const CustomTableStyled = styled.div`
  .ant-table-column-title {
    font-size: 12px;
  }
`;

class ParticipantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValues: {
        sDate: moment().format('YYYY-MM-DD'),
        eDate: moment().format('YYYY-MM-DD'),
        name: '',
      },
      participantList: [],
      winnerList: [],
    };
  }

  componentDidMount() {
    const { initData, sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    const apiInfo = {
      key: 'getParticipantList',
      type: 'GET',
      url: `/api/mxlife/v1/common/comment?type=participant&brdId=${initData.BRD_ID}&brdSeq=${initData.EVENT_SEQ}`,
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.initCallback);
  }

  // 검색Action Callback
  initCallback = (id, response) => {
    const result = response.list;
    if (result.length > 0) {
      this.setState({
        participantList: result,
      });
    }
  };

  // state searchValue 변경
  handleChangeSearchValue = (field, value) => {
    const { searchValues } = this.state;
    this.setState({
      searchValues: {
        ...searchValues,
        [field]: value,
      },
    });
  };

  onSearch = () => {
    const { result } = this.props;
    const { searchValues } = this.state;
    const { sDate, eDate, name } = searchValues;
    const listData = result.getParticipantList.list;
    const start = moment(sDate, 'YYYY-MM-DD');
    const end = moment(eDate, 'YYYY-MM-DD');
    const regex = new RegExp(`${name}`, 'gi');
    const nextParticipantList = listData.filter(item => {
      const regDate = moment(item.REG_DTTM, 'YYYY-MM-DD');
      const rangeDate = start < regDate && regDate < end;
      const regResult = regex.test(item.REG_USER_NAME);
      if (rangeDate && regResult) return true;
      return false;
    });
    this.setState({
      participantList: nextParticipantList,
    });
  };

  // 당첨자 지정
  submitFormData = () => {
    const { sagaKey: id, submitHandlerBySaga, initData } = this.props;
    const { winnerList } = this.state;
    const submitData = {
      PARAM: {
        type: 'winner',
        winnerList: winnerList || [],
        brdId: initData.BRD_ID,
        brdSeq: initData.EVENT_SEQ,
      },
    };
    submitHandlerBySaga(id, 'PUT', '/api/mxlife/v1/common/comment', submitData, this.submitFormDataCallback);
  };

  submitFormDataCallback = (id, response) => {
    const { participantList, winnerList } = this.state;
    const { result } = response;
    if (result === 'success') {
      const nextParticipantList = participantList.map(item => {
        const isWinner = winnerList.findIndex(winner => winner.COMMENT_SEQ === item.COMMENT_SEQ);
        if (isWinner === -1)
          return {
            ...item,
            WIN_YN: 'N',
          };
        return {
          ...item,
          WIN_YN: 'Y',
        };
      });
      this.setState(
        {
          participantList: nextParticipantList,
        },
        () => message.success(<MessageContent>당첨자 정보를 저장하였습니다.</MessageContent>),
      );
    }
  };

  render() {
    const { participantList, searchValues } = this.state;
    const { sDate, eDate, name } = searchValues;
    const columns = [
      {
        title: 'NO',
        dataIndex: 'COMMENT_SEQ',
        align: 'center',
      },
      {
        title: '부서',
        dataIndex: 'DEPT_NM',
        align: 'center',
      },
      {
        title: '직급',
        dataIndex: 'PRNT_NM',
        align: 'center',
      },
      {
        title: '사번',
        dataIndex: 'EMP_NO',
        align: 'center',
      },
      {
        title: '이름',
        dataIndex: 'REG_USER_NAME',
        align: 'center',
      },
      {
        title: '당첨여부',
        dataIndex: 'WIN_YN',
        align: 'center',
        render: data => <span>{data === 'Y' ? '당첨' : '미당첨'}</span>,
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          winnerList: selectedRows,
        });
      },
    };

    return (
      <>
        <StyledCustomSearchWrapper style={{ marginBottom: '10px' }}>
          <div className="search-input-area">
            <AntdDatePicker
              className="ant-picker-sm"
              defaultValue={moment(sDate, 'YYYY-MM-DD')}
              style={{ width: '110px', marginRight: '10px' }}
              onChange={date => this.handleChangeSearchValue('sDate', date.format('YYYY-MM-DD'))}
            />
            <AntdDatePicker
              className="ant-picker-sm"
              defaultValue={moment(eDate, 'YYYY-MM-DD')}
              style={{ width: '110px', marginRight: '10px' }}
              onChange={date => this.handleChangeSearchValue('eDate', date.format('YYYY-MM-DD'))}
            />
            <AntdInput
              placeholder="이름 검색"
              className="ant-input-sm"
              defaultValue={name || ''}
              style={{ width: '100px', marginRight: '10px' }}
              onChange={e => this.handleChangeSearchValue('name', e.target.value)}
            />
            <StyledButton className="btn-gray btn-sm btn-first" onClick={() => this.onSearch()}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.submitFormData()}>
            당첨자 지정
          </StyledButton>
        </StyledButtonWrapper>
        <ContentsWrapper>
          <CustomTableStyled>
            <AntdTable
              pagination={false}
              columns={columns}
              dataSource={participantList || []}
              rowSelection={rowSelection}
              footer={() => <div style={{ textAlign: 'center' }}>{`TOTAL : ${participantList.length === 0 ? 0 : participantList.length} 명`}</div>}
            />
          </CustomTableStyled>
        </ContentsWrapper>
      </>
    );
  }
}

ParticipantList.propTypes = {
  initData: PropTypes.object,
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandlerReturnRes: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
};

ParticipantList.defaultProps = {};

export default ParticipantList;
