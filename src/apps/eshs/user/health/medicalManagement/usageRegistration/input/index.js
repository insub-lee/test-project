import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { debounce } from 'lodash';
import { Radio, Select, Input, Checkbox, Table, Modal, message } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import { callBackAfterPost } from 'apps/eshs/common/submitCallbackFunc';
import DetailView from './detailView';
import SelectMedicine from './selectMedicine';

const AntdSelect = StyledSelect(Select);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdTextarea = StyledTextarea(Input.TextArea);
const AntdModal = StyledAntdModal(Modal);
const AntdTable = StyledAntdTable(Table);
class InputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diseaseList: [],
      treatmentList: [],
      cooperatorList: [],
      siteList: [],
      requestValue: {
        SITE_ID: 317,
        MEDICINE_LIST: [],
      },
      selectedRecord: {},
      hasUserInfo: false,
      dataSource: [],
      isCooperator: 'N',
      modalVisible: false,
      visitDateTime: moment(),
      isSelectMedicine: false,
    };
    this.handleSearchClick = debounce(this.handleSearchClick, 100);
  }

  columns = [
    {
      title: '일시',
      dataIndex: 'JRNL_DTTM',
      align: 'center',
      width: '15%',
    },
    {
      title: '소속',
      dataIndex: 'DEPT_NAME',
      align: 'center',
      width: '7%',
    },
    {
      title: '사번',
      dataIndex: 'PATIENT_EMP_NO',
      align: 'center',
      width: '7%',
    },
    {
      title: '이름',
      dataIndex: 'PATIENT_NAME',
      align: 'center',
      width: '5%',
    },
    {
      title: '질환',
      dataIndex: 'DISEASE',
      align: 'center',
      width: '9%',
    },
    {
      title: '치료구분',
      dataIndex: 'TREATMENT',
      align: 'center',
      width: '10%',
    },
    {
      title: '증상',
      dataIndex: 'SYMPTOM',
      align: 'center',
      width: '6%',
    },
    {
      title: '의약품:출고수량',
      dataIndex: 'DRUG',
      align: 'center',
      width: '10%',
      render: text => <pre style={{ margin: 'auto' }}>{text}</pre>,
    },
    {
      title: '세부증상',
      dataIndex: 'DETAIL_CONTENT',
      align: 'center',
      width: '10%',
    },
    {
      title: '조치내용',
      dataIndex: 'MEASURE',
      align: 'center',
      width: '11%',
    },
    {
      title: 'ACS 결과',
      dataIndex: 'ACS',
      align: 'center',
      width: '9%',
    },
  ];

  componentDidMount() {
    this.getInitData();
  }

  getInitData = () => {
    const { sagaKey, getCallDataHandler } = this.props;
    const DISEASE_NODE_ID = 694;
    const TREATMENT_NODE_ID = 686;
    const COOPERATOR_NODE_ID = 673;
    const SITE_MAP_ID = 316;
    const apiArr = [
      {
        key: 'diseaseList',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: DISEASE_NODE_ID } },
      },
      {
        key: 'treatmentList',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: TREATMENT_NODE_ID } },
      },
      {
        key: 'cooperatorList',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: COOPERATOR_NODE_ID } },
      },
      {
        key: 'siteList',
        url: `/api/admin/v1/common/categoryMapList`,
        type: 'POST',
        params: { PARAM: { NODE_ID: SITE_MAP_ID } },
      },
    ];

    const getDataAfterFunc = () => {
      this.setDiseaseList(DISEASE_NODE_ID);
      this.setTreatmentList(TREATMENT_NODE_ID);
      this.setPartnerList(COOPERATOR_NODE_ID);
      this.setSiteList(SITE_MAP_ID);
    };

    getCallDataHandler(sagaKey, apiArr, getDataAfterFunc);
  };

  setDiseaseList = diseaseNodeId => {
    const { result } = this.props;
    this.setState({
      diseaseList:
        result.diseaseList &&
        result.diseaseList.categoryMapList &&
        result.diseaseList.categoryMapList.filter(disease => disease.PARENT_NODE_ID === diseaseNodeId),
    });
  };

  setTreatmentList = treatmentNodeId => {
    const { result } = this.props;
    this.setState({
      treatmentList:
        result.treatmentList &&
        result.treatmentList.categoryMapList &&
        result.treatmentList.categoryMapList.filter(treatment => treatment.PARENT_NODE_ID === treatmentNodeId),
    });
  };

  setPartnerList = cooperatorNodeId => {
    const { result } = this.props;
    this.setState({
      cooperatorList:
        result.cooperatorList &&
        result.cooperatorList.categoryMapList &&
        result.cooperatorList.categoryMapList.filter(cooperator => cooperator.PARENT_NODE_ID === cooperatorNodeId && cooperator.USE_YN === 'Y'),
    });
  };

  setSiteList = siteMapId => {
    const { result } = this.props;
    this.setState({
      siteList: result.siteList && result.siteList.categoryMapList && result.siteList.categoryMapList.filter(site => site.PARENT_NODE_ID === siteMapId),
    });
  };

  checkCooperator = value => {
    const DEFAULT_COOPERATOR_ID = 1877;
    this.setState(prevState =>
      value === 'Y'
        ? { isCooperator: value, requestValue: Object.assign(prevState.requestValue, { COOPERATOR_ID: DEFAULT_COOPERATOR_ID }) }
        : { isCooperator: value, requestValue: Object.assign(prevState.requestValue, { COOPERATOR_ID: null }) },
    );
  };

  handleInputChange = (key, value) => {
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, { [key]: value }) }));
  };

  handleSearchClick = () => {
    const { requestValue, isCooperator } = this.state;
    const { sagaKey, getCallDataHandler, submitHandlerBySaga } = this.props;

    if (!requestValue.PATIENT_EMP_NO) {
      return message.warn('사번을 입력해주세요.');
    }

    if (isCooperator === 'N') {
      const submitUrl = `/api/eshs/v1/common/health-usage-vaild?EMP_NO=${requestValue.PATIENT_EMP_NO}`;
      submitHandlerBySaga(sagaKey, 'GET', submitUrl, null, (key, response) => this.userIdValidationCheck(response));
    }

    const apiArr = [
      {
        key: 'userDiagnosisList',
        url: `/api/eshs/v1/common/health-usage?EMP_NO=${requestValue.PATIENT_EMP_NO}`.concat(
          requestValue.COOPERATOR_ID ? `&CO_ID=${requestValue.COOPERATOR_ID}` : '',
        ),
        type: 'GET',
      },
    ];
    return getCallDataHandler(sagaKey, apiArr, this.setDataSource);
  };

  userIdValidationCheck = ({ isValid }) =>
    isValid === 1
      ? this.setState({ hasUserInfo: true }, message.success('검색에 성공했습니다.'))
      : this.setState({ hasUserInfo: false }, message.warn('검색된 사원이 없습니다.'));

  setDataSource = () => {
    const { result } = this.props;
    const patientGender =
      result.userDiagnosisList && result.userDiagnosisList.list && result.userDiagnosisList.list[0] && result.userDiagnosisList.list[0].GENDER;
    this.setState(prevState => ({
      visitDateTime: moment(),
      dataSource: result.userDiagnosisList && result.userDiagnosisList.list,
      requestValue: Object.assign(prevState.requestValue, { GENDER: patientGender }),
    }));
  };

  handleSaveClick = () => {
    const { requestValue, visitDateTime } = this.state;
    const { sagaKey, submitHandlerBySaga } = this.props;
    const COMMON_MEDICINE_NODE_ID = 3842;

    if (!this.validationCheckBeforeSave()) {
      return null;
    }

    if (requestValue.TREATMENT_ID.includes(COMMON_MEDICINE_NODE_ID) && !requestValue.MEDICINE_LIST.length) {
      return this.setState({ isSelectMedicine: true });
    }

    const submitCallbackFunc = () => {
      this.handleSearchClick();
      this.resetRequestValue();
    };

    return submitHandlerBySaga(
      sagaKey,
      'POST',
      '/api/eshs/v1/common/health-usage',
      Object.assign(requestValue, { JRNL_DTTM: moment(visitDateTime).unix() }),
      (key, response) => callBackAfterPost(key, response, submitCallbackFunc),
    );
  };

  validationCheckBeforeSave = () => {
    const { hasUserInfo, isCooperator, requestValue } = this.state;

    if (!hasUserInfo && isCooperator === 'N') {
      message.warn('조회되지 않은 사원입니다.');
      return false;
    }

    if (!requestValue.PATIENT_CATEGORY_ID) {
      message.warn('업무관련성 구분을 선택하세요.');
      return false;
    }

    return true;
  };

  resetRequestValue = () => {
    this.setState(prevState => ({
      requestValue: { PATIENT_EMP_NO: prevState.requestValue.PATIENT_EMP_NO, SITE_ID: 317, MEDICINE_LIST: [] },
    }));
  };

  handleRowClick = record => {
    this.setState({ modalVisible: true, selectedRecord: record });
  };

  handleModalClose = () => {
    this.setState({ modalVisible: false, isSelectMedicine: false, selectedRecord: {} });
  };

  handleSelectMedicineComplete = selectMedicineList => {
    this.setState(
      prevState => ({ isSelectMedicine: false, requestValue: Object.assign(prevState.requestValue, { MEDICINE_LIST: selectMedicineList }) }),
      this.handleSaveClick,
    );
  };

  render() {
    const { columns } = this;
    const { checkCooperator, handleInputChange, handleSearchClick, handleSaveClick, handleRowClick, handleModalClose, handleSelectMedicineComplete } = this;
    const {
      diseaseList,
      treatmentList,
      cooperatorList,
      siteList,
      isCooperator,
      visitDateTime,
      hasUserInfo,
      dataSource,
      modalVisible,
      requestValue,
      selectedRecord,
      isSelectMedicine,
    } = this.state;

    return (
      <>
        <StyledContentsWrapper>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>이용자</th>
                  <td>
                    <Radio.Group onChange={event => checkCooperator(event.target.value)} value={isCooperator}>
                      <Radio value="N">매그나칩</Radio>
                      <Radio value="Y">협력업체</Radio>
                    </Radio.Group>
                  </td>
                  <th>검진지역</th>
                  <td>
                    <AntdSelect
                      className="select-sm"
                      defaultValue={317}
                      value={requestValue.SITE_ID}
                      style={{ width: '50%' }}
                      onChange={value => handleInputChange('SITE_ID', value)}
                    >
                      {siteList.map(site => (
                        <Select.Option value={site.NODE_ID}>{site.NAME_KOR}</Select.Option>
                      ))}
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>사번</th>
                  <td colSpan={3}>
                    {isCooperator === 'Y' ? (
                      <>
                        <AntdSelect
                          className="select-sm mr5"
                          value={requestValue.COOPERATOR_ID}
                          onChange={value => handleInputChange('COOPERATOR_ID', value)}
                          style={{ width: '15%' }}
                        >
                          {cooperatorList.map(cooperator => (
                            <Select.Option value={cooperator.NODE_ID}>{cooperator.NAME_KOR}</Select.Option>
                          ))}
                        </AntdSelect>
                        /
                        <AntdSearch
                          className="input-search-sm mr5"
                          value={requestValue.PATIENT_EMP_NO}
                          onChange={event => handleInputChange('PATIENT_EMP_NO', event.target.value)}
                          onPressEnter={handleSearchClick}
                          placeholder="사번을 입력하세요"
                          style={{ width: '20%', marginLeft: '5px' }}
                        />
                      </>
                    ) : (
                      <>
                        <AntdSearch
                          className="input-search-sm mr5"
                          value={requestValue.PATIENT_EMP_NO}
                          onChange={event => handleInputChange('PATIENT_EMP_NO', event.target.value)}
                          onPressEnter={handleSearchClick}
                          placeholder="사번을 입력하세요"
                          style={{ width: '20%' }}
                        />
                      </>
                    )}
                    <StyledButton className="btn-gray btn-xs mr5" onClick={handleSearchClick}>
                      검색
                    </StyledButton>
                    {hasUserInfo
                      ? `${dataSource[0] && dataSource[0].PATIENT_NAME ? dataSource[0].PATIENT_NAME : ''} / 
                      ${dataSource[0] && dataSource[0].DEPT_NAME ? dataSource[0].DEPT_NAME : ''}`
                      : ''}
                  </td>
                </tr>
                {isCooperator === 'Y' ? (
                  <tr>
                    <th>성별</th>
                    <td colSpan={3}>
                      <Radio.Group value={requestValue.GENDER} onChange={event => handleInputChange('GENDER', event.target.value)}>
                        <Radio value="M">남</Radio>
                        <Radio value="F">여</Radio>
                      </Radio.Group>
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <th>일시</th>
                  <td>{hasUserInfo ? moment(visitDateTime).format('YYYY-MM-DD HH시 mm분') : null}</td>
                </tr>
                <tr>
                  <th>업무관련성 구분</th>
                  <td colSpan={3}>
                    <Radio.Group value={requestValue.PATIENT_CATEGORY_ID} onChange={event => handleInputChange('PATIENT_CATEGORY_ID', event.target.value)}>
                      <Radio value={4}>직업성</Radio>
                      <Radio value={5}>비직업성</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                <tr>
                  <th>질환</th>
                  <td colSpan={3}>
                    <Radio.Group value={requestValue.DISEASE_ID} onChange={event => handleInputChange('DISEASE_ID', event.target.value)}>
                      {diseaseList.map(disease => (
                        <Radio value={disease.NODE_ID}>{disease.NAME_KOR}</Radio>
                      ))}
                    </Radio.Group>
                  </td>
                </tr>
                <tr>
                  <th>치료구분</th>
                  <td colSpan={3}>
                    <Checkbox.Group value={requestValue.TREATMENT_ID} onChange={value => handleInputChange('TREATMENT_ID', value)}>
                      {treatmentList.map(treatment => (
                        <Checkbox value={treatment.NODE_ID}>{treatment.NAME_KOR}</Checkbox>
                      ))}
                    </Checkbox.Group>
                  </td>
                </tr>
                <tr>
                  <th>세부증상</th>
                  <td>
                    <AntdTextarea
                      autoSize={{ minRows: 6, maxRows: 6 }}
                      value={requestValue.DETAIL_CONTENT}
                      onChange={event => handleInputChange('DETAIL_CONTENT', event.target.value)}
                    />
                  </td>
                  <th>조치내용</th>
                  <td>
                    <AntdTextarea
                      autoSize={{ minRows: 6, maxRows: 6 }}
                      value={requestValue.MEASURE}
                      onChange={event => handleInputChange('MEASURE', event.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10 btn-wrap-mt-10">
            <StyledButton className="btn-primary btn-sm" onClick={handleSaveClick}>
              저장
            </StyledButton>
          </StyledButtonWrapper>
          <AntdTable columns={columns} dataSource={dataSource} onRow={record => ({ onClick: () => handleRowClick(record) })} />
          <AntdModal title="건강관리실 이용관리" visible={modalVisible} footer={null} onCancel={handleModalClose} width="70%" destroyOnClose>
            <DetailView
              modalVisible={modalVisible}
              handleModalClose={handleModalClose}
              record={selectedRecord}
              sagaKey={this.props.sagaKey}
              getCallDataHandler={this.props.getCallDataHandler}
              result={this.props.result}
              diseaseList={diseaseList}
              treatmentList={treatmentList}
              submitHandlerBySaga={this.props.submitHandlerBySaga}
            />
          </AntdModal>
          <AntdModal title="일반의약품 선택" visible={isSelectMedicine} footer={null} onCancel={handleModalClose} width="50%" destroyOnClose>
            <SelectMedicine
              sagaKey={this.props.sagaKey}
              getCallDataHandler={this.props.getCallDataHandler}
              result={this.props.result}
              requestValue={requestValue}
              handleInputChange={handleInputChange}
              handleSelectMedicineComplete={handleSelectMedicineComplete}
            />
          </AntdModal>
        </StyledContentsWrapper>
      </>
    );
  }
}

InputPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
  submitHandlerBySaga: PropTypes.func,
};

InputPage.defaultProps = {};

export default InputPage;
