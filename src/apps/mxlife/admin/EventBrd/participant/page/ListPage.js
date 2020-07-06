import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, DatePicker, Table, Select } from 'antd';
import styled from 'styled-components';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import message from 'components/Feedback/message';
import Group from 'components/BizBuilder/Sketch/Group';
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
      participantList: [],
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

  render() {
    const { participantList } = this.state;
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
    ];
    return (
      <>
        <StyledCustomSearchWrapper>
          <div className="search-input-area">
            <AntdDatePicker className="ant-picker-sm" style={{ width: '110px', marginRight: '10px' }} />
            <AntdDatePicker className="ant-picker-sm" style={{ width: '110px', marginRight: '10px' }} />
            <AntdInput
              className="ant-input-sm"
              // value={formData.WORK_NO}
              style={{ width: '100px', marginRight: '10px' }}
            />
            <StyledButton className="btn-gray btn-sm btn-first" onClick={() => console.debug('검색')}>
              검색
            </StyledButton>
          </div>
        </StyledCustomSearchWrapper>
        <ContentsWrapper>
          <CustomTableStyled>
            <AntdTable
              pagination={false}
              columns={columns}
              dataSource={participantList || []}
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
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

ParticipantList.defaultProps = {};

export default ParticipantList;
