import React from 'react';
import PropTypes from 'prop-types';
import { Select, DatePicker, Modal, Input } from 'antd';
import moment from 'moment';

import UsageManagement from 'apps/eshs/user/health/medicalManagement/usageManagement';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import PastTable from './PastTable';
import LatelyTable from './LatelyTable';

const AntdSelect = StyledSelect(Select);
const AntdPicker = StyledPicker(DatePicker.RangePicker);
const AntdModal = StyledAntdModal(Modal);
const AntdTextarea = StyledTextarea(Input.TextArea);
class ViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteList: [],
      searchValue: {
        SYSTEM_CD: '1',
        SITE_NODE_ID: props.SITE_NODE_ID || 317,
        START_DATE: moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        END_DATE: moment().format('YYYY-MM-DD'),
        APP_STATUS: '',
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
      siteList:
        result.siteList &&
        result.siteList.categoryMapList &&
        result.siteList.categoryMapList.filter(site => site.PARENT_NODE_ID === SITE_NODE_ID && site.USE_YN === 'Y'),
    });
  };

  getPastDataSource = () => {
    const { searchValue } = this.state;
    const { sagaKey, getCallDataHandler } = this.props;
    const apiUrl = '/api/eshs/v1/common/health-usage-current-status-past';
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

    getCallDataHandler(sagaKey, apiArr, this.setPastDataSource);
  };

  setPastDataSource = () => {
    const { result } = this.props;
    this.setState(() => {
      const tempList = (result.dataSource && result.dataSource.list) || [];
      const useBedPatient = (result.useBedPatient && result.useBedPatient.list) || [];
      const dataObject = {};
      tempList.map(item => Object.assign(dataObject, { [item.KEY]: item.VALUE }));
      return { dataObject, useBedPatient };
    });
  };

  getLatelyDataSource = () => {
    const { searchValue } = this.state;
    const { sagaKey, getCallDataHandler } = this.props;
    const apiUrl = '/api/eshs/v1/common/health-usage-current-status-lately';
    const queryString = new URLSearchParams(searchValue).toString();
    const apiArr = [
      {
        key: 'dataSource',
        url: `${apiUrl}?${queryString}`,
        type: 'GET',
      },
      {
        key: 'useBedPatient',
        url: `/api/eshs/v1/common/health-usage-current-status-past-bed?${queryString}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(sagaKey, apiArr, this.setLatelyDataSource);
  };

  setLatelyDataSource = () => {
    const { result } = this.props;
    this.setState(() => {
      const tempList = (result.dataSource && result.dataSource.list) || [];
      const useBedPatient = (result.useBedPatient && result.useBedPatient.list) || [];
      const dataObject = {};
      tempList.map(item => Object.assign(dataObject, { [item.nm]: item.val }));
      return { dataObject, useBedPatient };
    });
  };

  handleInputChange = (key, value) => {
    this.setState(prevState => ({
      searchValue: Object.assign(prevState.searchValue, { [key]: value }),
    }));
  };

  handleDateChange = (date, dateString) => {
    this.setState(prevState => {
      const [START_DATE, END_DATE] = dateString;
      return { searchValue: Object.assign(prevState.searchValue, { START_DATE, END_DATE }) };
    });
  };

  handleModalVisible = () => {
    this.setState({ modalVisible: true });
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false });
  };

  handleTypeChange = value =>
    value === 'L' ? this.setState({ isShowLately: true }, this.getLatelyDataSource) : this.setState({ isShowLately: false }, this.getPastDataSource);

  render() {
    const { handleInputChange, handleDateChange, getPastDataSource, handleModalVisible, handleModalClose, handleTypeChange, getLatelyDataSource } = this;
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
              <span className="text-label">기간</span>
              <AntdPicker
                className="ant-picker-mid mr5"
                value={[moment(searchValue.START_DATE), moment(searchValue.END_DATE)]}
                onChange={handleDateChange}
                style={{ width: '20%' }}
              />
              <span className="text-label">결재 구분</span>
              <AntdSelect className="select-mid mr5" defaultValue="" onChange={value => handleInputChange('APP_STATUS', value)} style={{ width: '10%' }}>
                <Select.Option value="">전체</Select.Option>
                <Select.Option value="1A">결재 완료</Select.Option>
              </AntdSelect>
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
          {isShowLately ? (
            <LatelyTable dataObject={dataObject} useBedPatient={useBedPatient} />
          ) : (
            <PastTable dataObject={dataObject} useBedPatient={useBedPatient} />
          )}
          <span className="selSaveWrapper textLabel alignLeft">특기사항/건의사항</span>
          <AntdTextarea onChange={event => handleInputChange('NOTE', event.target.value)} autoSize={{ minRows: 3, maxRows: 6 }} />
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
