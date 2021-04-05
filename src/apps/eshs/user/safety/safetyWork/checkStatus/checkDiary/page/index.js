import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DatePicker, Table, Spin, Select } from 'antd';
import styled from 'styled-components';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import ContentsPrint from 'components/ContentsPrint';
import PrintCheckStatus from '../PrintContents/printCheckStatus';
import PrintCheckStatusTel from '../PrintContents/printCheckStatusTel';
import Styled from './Styled';
import ExcelDownload from '../Excel';

const AntdTable = StyledAntdTable(Table);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

const currentDate = moment().format('YYYY-MM-DD');

const CustomTableStyled = styled.div`
  .ant-table-column-title {
    font-size: 12px;
  }
`;

class SafetyWorkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchValues: {
        SITE: '구미',
        SDATE: currentDate,
        EDATE: currentDate,
      },
      listData: [],
    };
  }

  // 검색버튼 Action
  onSearch = () => {
    const { searchValues } = this.state;
    const { sagaKey: id, getCallDataHandlerReturnRes } = this.props;
    this.setState({
      isSearching: true,
    });
    const apiInfo = {
      key: 'getCheckDiaryCmpny',
      type: 'POST',
      url: `/api/eshs/v1/common/checkStatus`,
      params: { PARAM: { type: 'GET_CHECK_DIARY', ...searchValues } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.onSearchCallback);
  };

  // 검색Action Callback
  onSearchCallback = (id, response) => {
    const { list } = response;
    if (list.length > 0) {
      this.setState({
        isSearching: false,
        listData: list,
      });
      return;
    }
    this.setState(
      {
        isSearching: false,
        listData: [],
      },
      () => message.error(<MessageContent>검색결과가 없습니다.</MessageContent>),
    );
  };

  // 검색 조건
  onChangeSearchValue = (type, value) => {
    const { searchValues } = this.state;
    this.setState({
      searchValues: {
        ...searchValues,
        [type]: value,
      },
    });
  };

  render() {
    const { listData, isSearching, searchValues } = this.state;
    const columns = [
      {
        title: '작업일',
        dataIndex: 'FROM_DT',
        align: 'center',
        width: '7%',
        ellipsis: true,
      },
      {
        title: '작업번호',
        dataIndex: 'WORK_NO',
        align: 'center',
        width: '10%',
        ellipsis: true,
      },
      {
        title: '업체명',
        dataIndex: 'WRK_CMPNY_NM',
        ellipsis: true,
        width: '10%',
        align: 'center',
      },
      {
        title: '담당ENG',
        dataIndex: 'REQ_EMP_NM',
        width: '5%',
        align: 'center',
      },
      {
        title: '작업동',
        dataIndex: 'DGUBUN',
        ellipsis: true,
        width: '5%',
        align: 'center',
      },
      {
        title: '장소',
        dataIndex: 'WLOC',
        align: 'center',
        width: '10%',
        ellipsis: true,
      },
      {
        title: '주작업',
        dataIndex: 'WCATEGORY',
        align: 'center',
        width: '5%',
        ellipsis: true,
      },
      {
        title: '작업내용',
        dataIndex: 'WORK_DESC',
        width: '15%',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '점검시간',
        dataIndex: '',
        width: '5%',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '점검자',
        dataIndex: 'CHECK_EMP_NM',
        width: '5%',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '점검결과',
        dataIndex: 'CHECK_CONTENT',
        width: '15%',
        align: 'center',
        ellipsis: true,
      },

      {
        title: '시작',
        dataIndex: 'FROM_TIME',
        width: '4%',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '종료',
        dataIndex: 'TO_TIME',
        align: 'center',
        width: '4%',
        ellipsis: true,
      },
      // {
      //   title: '작업인원',
      //   dataIndex: 'WORKER_CNT',
      //   align: 'center',
      //   width: '5%',
      //   render: data => `${data}명`,
      // },
    ];
    return (
      <Styled>
        <StyledCustomSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect
                defaultValue="구미"
                className="select-sm"
                style={{ width: '100px' }}
                onChange={val => this.onChangeSearchValue('SITE', val)}
              >
                <Option value="">전체</Option>
                <Option value="구미">구미</Option>
                <Option value="청주">청주</Option>
                <Option value="서울">서울</Option>
              </AntdSelect>
              <span className="text-label">작업일자</span>
              <AntdDatePicker
                className="ant-picker-sm"
                style={{ width: 125 }}
                defaultValue={moment(currentDate, 'YYYY-MM-DD')}
                onChange={date => this.onChangeSearchValue('SDATE', moment(date).format('YYYY-MM-DD'))}
              />
              <span styled={{ margin: '0px 10px 0px 10px', width: '10%' }}> ~ </span>
              <AntdDatePicker
                className="ant-picker-sm"
                style={{ width: 125 }}
                defaultValue={moment(currentDate, 'YYYY-MM-DD')}
                onChange={date => this.onChangeSearchValue('EDATE', moment(date).format('YYYY-MM-DD'))}
              />
              <StyledButton className="btn-gray btn-sm btn-first ml5" onClick={() => this.onSearch()}>
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledCustomSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <ContentsPrint footerType="magnachip" buttonName="일지인쇄">
            <PrintCheckStatus listData={listData} searchValues={searchValues} />
          </ContentsPrint>
          <ContentsPrint footerType="magnachip" buttonName="연락처인쇄">
            <PrintCheckStatusTel listData={listData} searchValues={searchValues} />
          </ContentsPrint>
          <ExcelDownload listData={listData} />
        </StyledButtonWrapper>
        <ContentsWrapper>
          <CustomTableStyled>
            <AntdTable
              columns={columns}
              dataSource={listData || []}
              pagination={{ pageSize: 50 }}
              footer={() => (
                <div style={{ textAlign: 'center' }}>{`총 ${listData.length === 0 ? 0 : listData.length} 건`}</div>
              )}
            />
          </CustomTableStyled>
        </ContentsWrapper>
      </Styled>
    );
  }
}

SafetyWorkList.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
};

SafetyWorkList.defaultProps = {};

export default SafetyWorkList;
