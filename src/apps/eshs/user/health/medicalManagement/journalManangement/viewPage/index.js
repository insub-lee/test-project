import React from 'react';
import PropTypes from 'prop-types';
import { Select, DatePicker, Modal, Input } from 'antd';
import moment from 'moment';

import UsageManagement from 'apps/eshs/user/health/medicalManagement/usageManagement';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import { callBackAfterPost } from 'apps/eshs/common/submitCallbackFunc';
import PastTable from './PastTable';
import LatelyTable from './LatelyTable';

const AntdSelect = StyledSelect(Select);
const AntdPicker = StyledPicker(DatePicker);
const AntdModal = StyledAntdModal(Modal);
const AntdTextarea = StyledTextarea(Input.TextArea);
class ViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteList: [],
      searchValue: {
        SITE_NODE_ID: props.SITE_NODE_ID || 317,
        JRNL_DT: props.JRNL_DT ? moment(props.JRNL_DT).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        TREATMENT_NODE_ID: 3844,
      },
      dataObject: {},
      useBedPatient: [],
      modalVisible: false,
      isShowLately: true,
    };
  }

  componentDidMount() {
    this.getInitData();
    this.getLatelyDataSource();
  }

  getInitData = () => {
    const { sagaKey, getCallDataHandler } = this.props;
    const SITE_NODE_ID = 316;
    const apiArr = [
      {
        key: 'siteList',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: SITE_NODE_ID } },
      },
    ];

    getCallDataHandler(sagaKey, apiArr, () => this.setInitData(SITE_NODE_ID));
  };

  setInitData = SITE_NODE_ID => {
    const { result } = this.props;
    this.setState({
      siteList: result.siteList && result.siteList.categoryMapList && result.siteList.categoryMapList.filter(site => site.PARENT_NODE_ID === SITE_NODE_ID),
    });
  };

  getPastDataSource = () => {
    const { searchValue } = this.state;
    const { sagaKey, getCallDataHandler } = this.props;
    const apiUrl = '/api/eshs/v1/common/health-usage-journal-past';
    const queryString = new URLSearchParams(searchValue).toString();

    const apiArr = [
      {
        key: 'dataSource',
        url: `${apiUrl}?${queryString}`,
        type: 'GET',
      },
      {
        key: 'useBedPatient',
        url: `${apiUrl}-bed?${queryString}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(sagaKey, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { result } = this.props;
    this.setState(prevState => {
      const tempList = (result.dataSource && result.dataSource.list) || [];
      const useBedPatient = (result.useBedPatient && result.useBedPatient.list) || [];
      const dataObject = {};
      tempList.map(item => Object.assign(dataObject, { [item.KEY]: item.VALUE }));
      return { dataObject, useBedPatient, searchValue: Object.assign(prevState.searchValue, { NOTE: dataObject.NOTE }) };
    });
  };

  getLatelyDataSource = () => {
    const { searchValue } = this.state;
    const { sagaKey, getCallDataHandler } = this.props;
    const apiUrl = '/api/eshs/v1/common/health-usage-journal-lately';
    const queryString = new URLSearchParams(searchValue).toString();
    const apiArr = [
      {
        key: 'dataSource',
        url: `${apiUrl}?${queryString}`,
        type: 'GET',
      },
      {
        key: 'useBedPatient',
        url: `/api/eshs/v1/common/health-usage-journal-past-bed?${queryString}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(sagaKey, apiArr, this.setDataSource);
  };

  handleInputChange = (key, value) => {
    this.setState(prevState => ({
      searchValue: Object.assign(prevState.searchValue, { [key]: value }),
    }));
  };

  handleDateChange = (date, dateString) => {
    this.setState(prevState => ({
      searchValue: Object.assign(prevState.searchValue, { JRNL_DT: dateString }),
    }));
  };

  handleModalVisible = () => {
    this.setState({ modalVisible: true });
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false });
  };

  handleTypeChange = value =>
    value === 'L' ? this.setState({ isShowLately: true }, this.getLatelyDataSource) : this.setState({ isShowLately: false }, this.getPastDataSource);

  handleSaveClick = () => {
    const { searchValue, isShowLately } = this.state;
    const { sagaKey, submitHandlerBySaga } = this.props;

    submitHandlerBySaga(sagaKey, 'POST', `/api/eshs/v1/common/health/eshs-health-journal`, searchValue, (key, response) =>
      callBackAfterPost(key, response, isShowLately ? this.getLatelyDataSource : this.getPastDataSource),
    );
  };

  render() {
    const {
      handleInputChange,
      handleDateChange,
      getPastDataSource,
      handleModalVisible,
      handleModalClose,
      handleTypeChange,
      getLatelyDataSource,
      handleSaveClick,
    } = this;
    const { siteList, dataObject, searchValue, useBedPatient, modalVisible, isShowLately } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <span className="text-label">지역</span>
              <AntdSelect
                className="select-mid mr5"
                value={searchValue.SITE_NODE_ID}
                onChange={value => handleInputChange('SITE_NODE_ID', value)}
                style={{ width: '7%' }}
              >
                {siteList.map(site => (
                  <Select.Option value={site.NODE_ID}>{site.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">날짜</span>
              <AntdPicker allowClear={false} className="ant-picker-mid mr5" value={moment(searchValue.JRNL_DT)} onChange={handleDateChange} />
              <span className="text-label">구분</span>
              <AntdSelect className="select-mid mr5" defaultValue="L" onChange={handleTypeChange} style={{ width: '10%' }}>
                <Select.Option value="P">과거 일지</Select.Option>
                <Select.Option value="L">최근 일지</Select.Option>
              </AntdSelect>
              <StyledButton className="btn-gray btn-sm mr5" onClick={isShowLately ? getLatelyDataSource : getPastDataSource}>
                검색
              </StyledButton>
              <StyledButton className="btn-gray btn-sm mr5" onClick={handleModalVisible}>
                목록
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm mr5" onClick={handleSaveClick}>
              저장
            </StyledButton>
            <StyledButton className="btn-gray btn-sm">완료통보</StyledButton>
          </StyledButtonWrapper>
          {isShowLately ? (
            <LatelyTable dataObject={dataObject} useBedPatient={useBedPatient} />
          ) : (
            <PastTable dataObject={dataObject} useBedPatient={useBedPatient} />
          )}
          <span className="selSaveWrapper textLabel alignLeft">특기사항/건의사항</span>
          <AntdTextarea value={searchValue.NOTE} onChange={event => handleInputChange('NOTE', event.target.value)} autoSize={{ minRows: 3, maxRows: 6 }} />
          <AntdModal title="이용관리" visible={modalVisible} onCancel={handleModalClose} width="90%" destroyOnClose>
            <UsageManagement
              isNew={false}
              sagaKey={this.props.sagaKey}
              getCallDataHandler={this.props.getCallDataHandler}
              result={this.props.result}
              submitHandlerBySaga={this.props.submitHandlerBySaga}
              startDate={searchValue.JRNL_DT}
              endDate={searchValue.JRNL_DT}
            />
          </AntdModal>
        </StyledContentsWrapper>
      </>
    );
  }
}

ViewPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
  SITE_NODE_ID: PropTypes.number,
  JRNL_DT: PropTypes.string,
};

ViewPage.defaultProps = {};

export default ViewPage;
