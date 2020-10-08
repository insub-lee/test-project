import React from 'react';
import PropTypes from 'prop-types';
import { Select, DatePicker, Modal, Input, Popconfirm } from 'antd';
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
import { saveProcessRule, getProcessRule } from 'apps/eshs/common/workProcessRule';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

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
    const { spinningOn } = this.props;
    spinningOn();
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
      {
        key: 'vGroups',
        url: `/api/eshs/v1/common/vgroupChildrenListByGrpIdHandler`,
        type: 'POST',
        params: { PARAM: { GRP_ID: 88421 } }, // 의료일지 심의권자 가상그룹
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
    const { sagaKey, getCallDataHandler, spinningOn } = this.props;
    const apiUrl = '/api/eshs/v1/common/health-usage-journal-past';
    const queryString = new URLSearchParams(searchValue).toString();
    spinningOn();
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
    const { result, spinningOff } = this.props;
    this.setState(prevState => {
      const tempList = (result.dataSource && result.dataSource.list) || [];
      const useBedPatient = (result.useBedPatient && result.useBedPatient.list) || [];
      const dataObject = {};
      tempList.map(item => Object.assign(dataObject, { [item.KEY]: item.VALUE }));
      return { dataObject, useBedPatient, searchValue: Object.assign(prevState.searchValue, { NOTE: dataObject.NOTE }) };
    }, spinningOff);
  };

  getLatelyDataSource = () => {
    const { searchValue } = this.state;
    const { sagaKey, getCallDataHandler, spinningOn } = this.props;
    const apiUrl = '/api/eshs/v1/common/health-usage-journal-lately';
    const queryString = new URLSearchParams(searchValue).toString();
    spinningOn();
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

  handleAction = type => {
    const { searchValue, isShowLately } = this.state;
    const { sagaKey, submitHandlerBySaga, relKey, prcId, profile, result, spinningOn, spinningOff } = this.props;
    spinningOn();
    switch (type) {
      case 'SAVE':
        submitHandlerBySaga(sagaKey, 'POST', `/api/eshs/v1/common/health/eshs-health-journal`, searchValue, (key, response) =>
          callBackAfterPost(key, response, isShowLately ? this.getLatelyDataSource : this.getPastDataSource),
        );
        break;
      case 'SANGSIN': {
        let siteName = '';
        const vGroupList = (result && result.vGroups && result.vGroups.vGroupList) || [];
        const siteList = (result && result.siteList && result.siteList.categoryMapList) || [];
        siteName = siteList[siteList.findIndex(site => site.NODE_ID === searchValue.SITE_NODE_ID)].NAME_KOR;

        const submitData = {
          TO_DATE: searchValue.JRNL_DT,
          FROM_DATE: searchValue.JRNL_DT,
          USER_ID: profile.USER_ID,
          EMP_NO: profile.EMP_NO,
          SITE_ID: searchValue.SITE_NODE_ID,
          SYSTEM_CD: '1',
          APP1_EMPNO: null,
          APP1_USER_ID: null,
          APP2_EMPNO: null,
          APP2_USER_ID: null,
        };

        // 의료일지 process를 불러온다.
        getProcessRule(prcId, processRule => {
          // GRP_ID === 88422 1차 결재자
          const firstApprovalIdx = vGroupList.findIndex(group => group.GRP_ID === 88422);
          // GRP_ID === 88423 2차 결재자
          const secondApprovalIdx = vGroupList.findIndex(group => group.GRP_ID === 88423);

          // 의료일지 결재자 가상그룹에서 결재자정보를 processRule에 채워줌
          processRule &&
            processRule.DRAFT_PROCESS_STEP &&
            processRule.DRAFT_PROCESS_STEP.forEach((step, index) => {
              switch (step.STEP) {
                case 2:
                  if (vGroupList[firstApprovalIdx].USERS.value !== '[]') {
                    const approvalList = JSON.parse(vGroupList[firstApprovalIdx].USERS.value);
                    submitData.APP1_EMPNO = approvalList[0].EMP_NO;
                    submitData.APP1_USER_ID = approvalList[0].USER_ID;
                    step.APPV_MEMBER = [
                      {
                        USER_ID: approvalList[0].USER_ID,
                        DEPT_ID: approvalList[0].DEPT_ID,
                        NAME_KOR: approvalList[0].NAME_KOR,
                        DEPT_NAME_KOR: approvalList[0].DEPT_NAME_KOR,
                      },
                    ];
                  }
                  break;
                case 3:
                  if (vGroupList[secondApprovalIdx].USERS.value !== '[]') {
                    const approvalList = JSON.parse(vGroupList[secondApprovalIdx].USERS.value);
                    submitData.APP2_EMPNO = approvalList[0].EMP_NO;
                    submitData.APP2_USER_ID = approvalList[0].USER_ID;
                    step.APPV_MEMBER = [
                      {
                        USER_ID: approvalList[0].USER_ID,
                        DEPT_ID: approvalList[0].DEPT_ID,
                        NAME_KOR: approvalList[0].NAME_KOR,
                        DEPT_NAME_KOR: approvalList[0].DEPT_NAME_KOR,
                      },
                    ];
                  }
                  break;
                default:
                  break;
              }
            });

          const submitProcessRule = {
            ...processRule,
            REL_KEY: relKey,
            REL_KEY2: `${searchValue.SITE_NODE_ID}_${searchValue.JRNL_DT}`,
            DRAFT_DATA: {},
            DRAFT_TITLE: `[${siteName}] ${searchValue.JRNL_DT}`,
          };
          // 상신
          return saveProcessRule(
            submitProcessRule,
            () =>
              // 상신후 의료일지 상태값 update
              submitHandlerBySaga(sagaKey, 'POST', '/api/eshs/v1/common/health/eshsHealthJrnlStatusUpdate', { PARAM: submitData }, (id, res) => {
                if (res && res.result > 0) {
                  return this.setState(
                    prevState => ({
                      dataObject: { ...prevState.dataObject, APP_STATUS: '0A' },
                    }),
                    () => this.showMessage(`상신 되었습니다.`),
                  );
                }
                return this.showMessage('상신에 실패하였습니다. 다시 시도해주십시오.');
              }),
            false,
          );
        });

        break;
      }
      default:
        break;
    }
    spinningOff();
  };

  showMessage = text => message.info(<MessageContent>{text}</MessageContent>);

  render() {
    const {
      handleInputChange,
      handleDateChange,
      getPastDataSource,
      handleModalVisible,
      handleModalClose,
      handleTypeChange,
      getLatelyDataSource,
      handleAction,
    } = this;
    const { siteList, dataObject, searchValue, useBedPatient, modalVisible, isShowLately } = this.state;
    const { profile } = this.props;
    const appStatus = (dataObject && dataObject.APP_STATUS) || '';
    const createUserId = (dataObject && dataObject.CREATE_USER_ID) || '';
    /* 
      APP_STATUS  결재상태
      '', null - 미저장 (저장버튼 사용 가능)
      0 - 저장
      0A - 상신
      1A - 1차승인
      2A - 완료 
    */

    console.debug('appStatus ', appStatus);
    console.debug('dataObject ', dataObject);
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
                style={{ width: '10%' }}
              >
                {siteList.map(site => (
                  <Select.Option value={site.NODE_ID}>{site.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">날짜</span>
              <AntdPicker allowClear={false} className="ant-picker-mid mr5" value={moment(searchValue.JRNL_DT)} onChange={handleDateChange} />
              <span className="text-label">구분</span>
              <AntdSelect className="select-mid mr5" defaultValue="L" onChange={handleTypeChange} style={{ width: '13%' }}>
                <Select.Option value="P">과거 일지</Select.Option>
                <Select.Option value="L">최근 일지</Select.Option>
              </AntdSelect>
              <StyledButton className="btn-gray btn-sm mr5" onClick={isShowLately ? getLatelyDataSource : getPastDataSource}>
                검색
              </StyledButton>
              <StyledButton className="btn-gray btn-sm mr5" onClick={handleModalVisible}>
                목록
              </StyledButton>
              {!appStatus && (
                <Popconfirm title="저장하시겠습니까?" onConfirm={() => handleAction('SAVE')} okText="Yes" cancelText="No">
                  <StyledButton className="btn-primary btn-sm mr5">저장</StyledButton>
                </Popconfirm>
              )}
              {appStatus === '0' && String(profile.USER_ID) === createUserId && (
                <Popconfirm title="상신하시겠습니까?" onConfirm={() => handleAction('SANGSIN')} okText="Yes" cancelText="No">
                  <StyledButton className="btn-primary btn-sm mr5">상신</StyledButton>
                </Popconfirm>
              )}
              {/* <StyledButton className="btn-gray btn-sm">완료통보</StyledButton>  현재 미사용 */}
            </div>
          </StyledCustomSearchWrapper>
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
