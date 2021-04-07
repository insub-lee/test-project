import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Button, Select, Spin } from 'antd';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledSearchWrapper from 'commonStyled/Wrapper/StyledSearchWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import ContentsPrint from 'components/ContentsPrint';
import SafetyWorkReport from '../safetyWorkReport';
import Styled from './Styled';

const StyledButton = StyledAntdButton(Button);
const AntdSelect = StyledSelect(Select);

const { Option } = Select;

class ResultReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchValues: {
        SITE: '구미',
        YEAR: moment().format('YYYY'),
        MONTH: '01',
      },
      reportData: {
        year: '',
        month: '',
        workByMonth: '0',
        penaltyByMonth: '0',
        workerByMonth: '0',
        workResult: [],
        workerResult: {},
        penaltyResult: [],
      },
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
      key: 'getResultReport',
      type: 'POST',
      url: `/api/eshs/v1/common/resultReport`,
      params: { searchValues: { ...searchValues } },
    };
    getCallDataHandlerReturnRes(id, apiInfo, this.onSearchCallback);
  };

  // 검색Action Callback
  onSearchCallback = (id, response) => {
    const { report } = response;
    this.setState({
      isSearching: false,
      reportData: {
        year: report.year,
        month: report.month,
        workByMonth: report.workByMonth,
        penaltyByMonth: report.penaltyByMonth,
        workerByMonth: report.workerByMonth,
        workResult: report.workResult,
        workerResult: report.workerResult,
        penaltyResult: report.penaltyResult,
      },
    });
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

  // 년도 셀렉터
  renderYearSelect = () => {
    const { searchValues } = this.state;
    const endYear = Number(moment().format('YYYY'));
    const options = [];
    for (let year = 2006; year <= endYear; year += 1) {
      options.push(year);
    }
    return (
      <AntdSelect
        className="select-xs mr5"
        style={{ width: '100px' }}
        value={searchValues.YEAR}
        onChange={e => this.handleChangeSearchValue('YEAR', e)}
      >
        {options.map(YYYY => (
          <Option key={`${YYYY}`} value={`${YYYY}`}>
            {YYYY}
          </Option>
        ))}
      </AntdSelect>
    );
  };

  render() {
    const { searchValues, reportData, isSearching } = this.state;
    return (
      <Styled>
        <StyledSearchWrapper>
          <Spin tip="검색중 ..." spinning={isSearching}>
            <div className="search-group-layer">
              <span style={{ fontSize: '12px', margin: '0px 10px 0px 10px' }}>지역</span>
              <AntdSelect
                className="select-xs"
                value={searchValues.SITE}
                onChange={value => this.handleChangeSearchValue('SITE', value)}
              >
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
              </AntdSelect>
              <span style={{ fontSize: '12px', margin: '0px 10px 0px 10px' }}>년도 / 월</span>
              {this.renderYearSelect()}
              <AntdSelect
                className="select-xs"
                style={{ width: '80px' }}
                value={searchValues.MONTH}
                onChange={value => this.handleChangeSearchValue('MONTH', value)}
              >
                <Option value="01">1</Option>
                <Option value="02">2</Option>
                <Option value="03">3</Option>
                <Option value="04">4</Option>
                <Option value="05">5</Option>
                <Option value="06">6</Option>
                <Option value="07">7</Option>
                <Option value="08">8</Option>
                <Option value="09">9</Option>
                <Option value="10">10</Option>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
              </AntdSelect>
              <StyledButton
                className="btn-gray btn-xs btn-first"
                onClick={() => this.onSearch()}
                style={{ marginLeft: '10px' }}
              >
                검색
              </StyledButton>
            </div>
          </Spin>
        </StyledSearchWrapper>
        <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
          <ContentsPrint footerType="magnachip">
            <SafetyWorkReport searchValues={searchValues} reportData={reportData} />
          </ContentsPrint>
        </StyledButtonWrapper>
        <ContentsWrapper>
          <SafetyWorkReport searchValues={searchValues} reportData={reportData} />
        </ContentsWrapper>
      </Styled>
    );
  }
}

ResultReportPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandlerReturnRes: PropTypes.func,
};

ResultReportPage.defaultProps = {};

export default ResultReportPage;
