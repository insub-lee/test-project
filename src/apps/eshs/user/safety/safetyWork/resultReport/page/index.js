import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, Button, Select } from 'antd';
import styled from 'styled-components';
import BizMicroDevBase from 'components/BizMicroDevBase';
import EshsCmpnyComp from 'components/BizBuilder/Field/EshsCmpnyComp';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrapper from 'commonStyled/Wrapper/StyledSearchWrapper';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';
import IngCheckViewer from '../../ingCheck';
import SafetyWorkReport from '../safetyWorkReport';
import Styled from './Styled';

const AntdModal = StyledModalWrapper(Modal);
const StyledButton = StyledAntdButton(Button);
const AntdSelect = StyledSelect(Select);

const { Option } = Select;

const CustomTableStyled = styled.div`
  .ant-table-column-title {
    font-size: 12px;
  }
`;

class ResultReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalTitle: '',
      modalVisible: false,
      selectedWork: '',
      searchValues: {
        SITE: '청주',
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

  // 모달 핸들러
  handleModal = (type, visible, workNo) => {
    let title = '';
    const selectedWork = workNo || '';
    switch (type) {
      case 'supervisor':
        title = '감독자 선택';
        break;
      case 'cmpny':
        title = '작업업체 선택';
        break;
      case 'ingCheckView':
        title = '안전작업 점검 상세정보';
        break;
      default:
        break;
    }

    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: visible,
      selectedWork,
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
      <AntdSelect className="select-xs mr5" style={{ width: '100px' }} value={searchValues.YEAR} onChange={e => this.handleChangeSearchValue('YEAR', e)}>
        {options.map(YYYY => (
          <Option value={`${YYYY}`}>{YYYY}</Option>
        ))}
      </AntdSelect>
    );
  };

  render() {
    const { modalType, modalTitle, modalVisible, searchValues, selectedWork, reportData } = this.state;
    console.debug('리포트화면 - 스탯', this.state);
    console.debug('리포트화면 - 프롭스', this.props);
    return (
      <Styled>
        <StyledSearchWrapper>
          <div className="search-group-layer">
            <AntdSelect className="select-xs" value={searchValues.SITE} onChange={value => this.handleChangeSearchValue('SITE', value)}>
              <Option value="청주">청주</Option>
              <Option value="구미">구미</Option>
            </AntdSelect>
            <span>년도</span>
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
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => this.onSearch()} style={{ marginBottom: '5px' }}>
              검색
            </StyledButton>
          </div>
        </StyledSearchWrapper>
        <ContentsWrapper>
          <CustomTableStyled>
            <SafetyWorkReport searchValues={searchValues} reportData={reportData} />
          </CustomTableStyled>
        </ContentsWrapper>
        <AntdModal
          title={modalTitle}
          width={modalType === 'cmpny' || modalType === 'equip' ? '790px' : '70%'}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModal('', false)}
          onCancel={() => this.handleModal('', false)}
        >
          {modalType === 'cmpny' && (
            <EshsCmpnyComp
              sagaKey={this.props.sagaKey}
              getExtraApiData={this.props.getCallDataHandler}
              extraApiData={this.props.result}
              colData={searchValues.WRK_CMPNY_CD}
              directSearchTable
              visible
              CONFIG={{ property: { isRequired: false, GUBUN: 'SW' } }}
              changeFormData={() => false}
              COMP_FIELD="WRK_CMPNY_CD"
              eshsCmpnyCompResult={(cmpnyInfo, field) => this.handleCmpnySelect(cmpnyInfo, field)}
            />
          )}
          {modalType === 'safetyWork' && <BizMicroDevBase component={SearchSafetyWork} sagaKey="safetyWork_search" rowSelect={this.handleSafetyWorkSelect} />}
          {modalType === 'ingCheckView' && <IngCheckViewer workNo={selectedWork} pageType="modal" />}
        </AntdModal>
      </Styled>
    );
  }
}

ResultReportPage.propTypes = {
  sagaKey: PropTypes.string,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  getCallDataHandlerReturnRes: PropTypes.func,
};

ResultReportPage.defaultProps = {};

export default ResultReportPage;
