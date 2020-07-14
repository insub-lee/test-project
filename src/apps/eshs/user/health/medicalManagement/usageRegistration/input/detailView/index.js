import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Select, Input, DatePicker, message } from 'antd';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import { callBackAfterPost, callBackAfterPut, callBackAfterDelete } from 'apps/eshs/common/submitCallbackFunc';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';

const AntdSelect = StyledSelect(Select);
const AntdTextarea = StyledTextarea(Input.TextArea);
const AntdPicker = StyledPicker(DatePicker);
const AntdSearch = StyledSearchInput(Input.Search);
class DetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailValue: {
        SITE_ID: 317,
        PATIENT_CATEGORY_ID: 4,
        JRNL_DTTM: moment(),
      },
      isCooperator: 'N',
      symptomsByDiseaseIdList: [],
      isDateChange: false,
      hasUserInfo: false,
      userInfo: {},
    };
  }

  componentDidMount() {
    this.getSymptomsByDiseaseId();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.detailValue !== props.record && Object.values(props.record).length) {
      return { detailValue: Object.assign(props.record) };
    }
    return null;
  }

  checkCooperator = value => {
    const DEFAULT_COOPERATOR_ID = 1876;
    this.setState(prevState =>
      value === 'Y'
        ? { isCooperator: value, detailValue: Object.assign(prevState.detailValue, { COOPERATOR_ID: DEFAULT_COOPERATOR_ID }) }
        : { isCooperator: value, detailValue: Object.assign(prevState.detailValue, { COOPERATOR_ID: null }) },
    );
  };

  handleInputChange = (key, value) => {
    this.setState(prevState => ({
      detailValue: Object.assign(prevState.detailValue, { [key]: value }),
    }));
  };

  handleInputChangeAndGetSympoms = (key, value) => {
    this.setState(
      prevState => ({ detailValue: Object.assign(prevState.detailValue, { [key]: value, SYMPTOM_ID: [] }) }),
      () => this.getSymptomsByDiseaseId(value),
    );
  };

  getSymptomsByDiseaseId = (diseaseId = this.props.record.DISEASE_ID) => {
    const { sagaKey, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'symptomsByDisease',
        url: `/api/eshs/v1/common/health-usage-getSymptoms?START_NODE_ID=${this.createSymptomsStartNodeId(diseaseId)}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(sagaKey, apiArr, this.setSymptomsByDiseaseId);
  };

  createSymptomsStartNodeId = diseaseNodeId => {
    switch (diseaseNodeId) {
      case 2107:
        return 13745;
      case 2108:
        return 13753;
      case 2109:
        return 13761;
      case 2110:
        return 13766;
      case 2111:
        return 13769;
      case 2112:
        return 13773;
      case 2113:
        return 13780;
      case 2114:
        return 13785;
      case 2115:
        return 13788;
      case 2116:
        return 13793;
      case 2117:
        return 13800;
      default:
        return null;
    }
  };

  setSymptomsByDiseaseId = () => {
    const { result } = this.props;
    this.setState({
      symptomsByDiseaseIdList: (result.symptomsByDisease && result.symptomsByDisease.list) || [],
    });
  };

  handleModifyClick = () => {
    const { modalCloseAndStateClear } = this;
    const { detailValue, isDateChange, hasUserInfo } = this.state;
    const { sagaKey, submitHandlerBySaga, isNew } = this.props;

    if (!hasUserInfo) {
      return message.warn('사번을 조회해주세요.');
    }

    return isDateChange || isNew
      ? submitHandlerBySaga(
          sagaKey,
          'POST',
          `/api/eshs/v1/common/health-usage`,
          Object.assign(detailValue, { JRNL_DTTM: moment(detailValue.JRNL_DTTM).unix() }),
          (key, response) => callBackAfterPost(key, response, modalCloseAndStateClear),
        )
      : submitHandlerBySaga(sagaKey, 'PUT', `/api/eshs/v1/common/health-usage`, detailValue, (key, response) =>
          callBackAfterPut(key, response, modalCloseAndStateClear),
        );
  };

  handleDeleteClick = () => {
    const { detailValue } = this.state;
    const { sagaKey, submitHandlerBySaga } = this.props;

    submitHandlerBySaga(sagaKey, 'DELETE', `/api/eshs/v1/common/health-usage`, detailValue, (key, response) =>
      callBackAfterDelete(key, response, this.modalCloseAndStateClear),
    );
  };

  handleDateChange = value => {
    this.setState(prevState => ({
      detailValue: Object.assign(prevState.detailValue, { JRNL_DTTM: moment(value) }),
      isDateChange: true,
    }));
  };

  modalCloseAndStateClear = () => {
    const { handleModalClose, handleSearchClick, listReload } = this.props;
    this.setState({ detailValue: {} }, () => {
      handleSearchClick();
      handleModalClose();
      listReload();
    });
  };

  handleUserSearchClick = () => {
    const { detailValue, isCooperator } = this.state;
    const { sagaKey, submitHandlerBySaga } = this.props;

    if (!detailValue.PATIENT_EMP_NO) {
      return message.warn('사번을 입력해주세요.');
    }

    if (isCooperator === 'N') {
      const submitUrl = `/api/eshs/v1/common/health-usage-user-info?EMP_NO=${detailValue.PATIENT_EMP_NO}`;
      return submitHandlerBySaga(sagaKey, 'GET', submitUrl, null, (key, response) => this.userIdValidationCheck(response));
    }

    return null;
  };

  userIdValidationCheck = response =>
    response.userInfo.PATIENT_NAME
      ? this.setState(
          prevState => ({
            hasUserInfo: true,
            userInfo: response.userInfo,
            detailValue: Object.assign(prevState.detailValue, { GENDER: response.userInfo.GENDER }),
          }),
          message.success('검색에 성공했습니다.'),
        )
      : this.setState({ hasUserInfo: false }, message.warn('검색된 사원이 없습니다.'));

  setDataSource = () => {
    const { result } = this.props;
    const patientGender =
      result.userDiagnosisList && result.userDiagnosisList.list && result.userDiagnosisList.list[0] && result.userDiagnosisList.list[0].GENDER;
    this.setState(prevState => ({
      detailValue: Object.assign(prevState.detailValue, { GENDER: patientGender || prevState.userInfo.GENDER }),
    }));
  };

  render() {
    const {
      checkCooperator,
      handleInputChange,
      handleInputChangeAndGetSympoms,
      handleModifyClick,
      handleDeleteClick,
      handleDateChange,
      modalCloseAndStateClear,
      handleUserSearchClick,
    } = this;
    const { detailValue, isCooperator, symptomsByDiseaseIdList, userInfo, hasUserInfo } = this.state;
    const { diseaseList, treatmentList, isNew } = this.props;
    const hasMedicineList = detailValue.TREATMENT && detailValue.TREATMENT.includes('일반의약품');

    return (
      <StyledContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="13%" />
              <col width="20%" />
              <col width="13%" />
              <col width="20%" />
              <col width="13%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th>일시</th>
                <td>
                  <AntdPicker
                    className="ant-picker-sm"
                    showTime={{ format: 'HH:mm' }}
                    onChange={handleDateChange}
                    value={detailValue.JRNL_DTTM ? moment(detailValue.JRNL_DTTM, 'YYYY년 MM월 DD일 HH시 mm분') : moment()}
                    format="YYYY-MM-DD HH:mm"
                    style={{ width: '165px' }}
                  />
                </td>
                <th>이용자 구분</th>
                <td colSpan={3}>
                  <Radio.Group onChange={event => checkCooperator(event.target.value)} value={isCooperator}>
                    <Radio value="N">매그나칩</Radio>
                    <Radio value="Y">협력업체</Radio>
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <th>방문구분</th>
                <td>
                  <Radio.Group value={detailValue.VISIT_CATEGORY_ID || 3} onChange={event => handleInputChange('VISIT_CATEGORY_ID', event.target.value)}>
                    <Radio value={3}>건강관리실</Radio>
                    <Radio value={4}>CMS</Radio>
                  </Radio.Group>
                </td>
                <th>사번</th>
                <td colSpan={isNew ? 3 : 1}>
                  {isNew ? (
                    <>
                      <AntdSearch
                        className="input-search-sm mr5"
                        placeholder="사번을 입력하세요"
                        onChange={event => handleInputChange('PATIENT_EMP_NO', event.target.value)}
                        onSearch={handleUserSearchClick}
                        onPressEnter={handleUserSearchClick}
                        style={{ width: '165px' }}
                      />
                      <span>{hasUserInfo ? `${userInfo.PATIENT_NAME} / ${userInfo.DEPT_NAME} / ${userInfo.GENDER === 'M' ? '남' : '여'}` : null}</span>
                    </>
                  ) : (
                    `${detailValue.PATIENT_EMP_NO} / ${detailValue.PATIENT_NAME} / ${detailValue.DEPT_NAME}`
                  )}
                </td>
                {isNew ? null : (
                  <>
                    <th>성별</th>
                    <td>{detailValue.GENDER === 'M' ? '남' : '여'}</td>
                  </>
                )}
              </tr>
              <tr>
                <th>업무관련성 구분</th>
                <td>
                  <Radio.Group value={detailValue.PATIENT_CATEGORY_ID || 4} onChange={event => handleInputChange('PATIENT_CATEGORY_ID', event.target.value)}>
                    <Radio value={4}>직업성</Radio>
                    <Radio value={5}>비직업성</Radio>
                  </Radio.Group>
                </td>
                <th>질환</th>
                <td colSpan={3}>
                  <AntdSelect
                    className="select-sm"
                    value={detailValue.DISEASE_ID || ''}
                    onChange={value => handleInputChangeAndGetSympoms('DISEASE_ID', value)}
                    style={{ width: '165px' }}
                  >
                    {diseaseList.map(disease => (
                      <Select.Option value={disease.NODE_ID}>{disease.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>증상</th>
                <td colSpan={5}>
                  <AntdSelect
                    className="select-sm"
                    mode="multiple"
                    value={(detailValue.SYMPTOM_ID && detailValue.SYMPTOM_ID.map(symptom => Number(symptom))) || []}
                    onChange={value => handleInputChange('SYMPTOM_ID', value)}
                    style={{ width: '100%' }}
                  >
                    {symptomsByDiseaseIdList.map(symptom => (
                      <Select.Option value={symptom.NODE_ID}>{symptom.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>치료구분</th>
                <td colSpan={5}>
                  <AntdSelect
                    className="select-sm"
                    mode="multiple"
                    value={(detailValue.TREATMENT_ID && detailValue.TREATMENT_ID.map(treatmentId => Number(treatmentId))) || []}
                    onChange={value => handleInputChange('TREATMENT_ID', value)}
                    style={{ width: '100%' }}
                  >
                    {treatmentList.map(treatment => (
                      <Select.Option value={treatment.NODE_ID}>{treatment.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                </td>
              </tr>
              {hasMedicineList ? (
                <tr>
                  <th>약품</th>
                  <td colSpan={5}>{(detailValue.DRUG && detailValue.DRUG.replace('\n', ', ')) || ''}</td>
                </tr>
              ) : null}
              <tr>
                <th>세부증상</th>
                <td>
                  <AntdTextarea
                    value={detailValue.DETAIL_CONTENT || ''}
                    onChange={event => handleInputChange('DETAIL_CONTENT', event.target.value)}
                    autoSize={{ minRows: 3, maxRows: 6 }}
                  />
                </td>
                <th>조치내용</th>
                <td>
                  <AntdTextarea
                    value={detailValue.MEASURE || ''}
                    onChange={event => handleInputChange('MEASURE', event.target.value)}
                    autoSize={{ minRows: 3, maxRows: 6 }}
                  />
                </td>
                <th>ACS 결과</th>
                <td>
                  <AntdTextarea
                    value={detailValue.ACS || ''}
                    onChange={event => handleInputChange('ACS', event.target.value)}
                    autoSize={{ minRows: 3, maxRows: 6 }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20 btn-wrap-mb-10">
          <StyledButton className="btn-primary btn-sm mr5" onClick={handleModifyClick}>
            저장
          </StyledButton>
          <StyledButton className="btn-light btn-sm mr5" onClick={handleDeleteClick}>
            삭제
          </StyledButton>
          <StyledButton className="btn-gray btn-sm" onClick={modalCloseAndStateClear}>
            닫기
          </StyledButton>
        </StyledButtonWrapper>
      </StyledContentsWrapper>
    );
  }
}

DetailView.propTypes = {
  handleModalClose: PropTypes.func,
  record: PropTypes.object,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  submitHandlerBySaga: PropTypes.func,
  result: PropTypes.object,
  diseaseList: PropTypes.arrayOf('object'),
  treatmentList: PropTypes.arrayOf('object'),
  handleSearchClick: PropTypes.func,
  isNew: PropTypes.bool,
  listReload: PropTypes.func,
};

DetailView.defaultProps = {};

export default DetailView;
