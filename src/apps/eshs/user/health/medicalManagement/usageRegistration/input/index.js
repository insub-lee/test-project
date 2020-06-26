import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { debounce } from 'lodash';
import { Radio, Select, Input, Checkbox, Table, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
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
      requestValue: {},
    };
  }

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
        result.cooperatorList.categoryMapList.filter(cooperator => cooperator.PARENT_NODE_ID === cooperatorNodeId),
    });
  };

  setSiteList = siteMapId => {
    const { result } = this.props;
    this.setState({
      siteList: result.siteList && result.siteList.categoryMapList && result.siteList.categoryMapList.filter(site => site.PARENT_NODE_ID === siteMapId),
    });
  };

  checkCooperator = value => {
    this.setState({ isCooperator: value === 'Y' });
  };

  handleRadioChange = (key, value) => {
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, { [key]: value }),
    }));
  };

  handleCheckboxChange = (key, value) => {
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, { [key]: value }),
    }));
  };

  checkUserGender = value => {
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, { GENDER: value }),
    }));
  };

  handleSelectChange = (key, value) => {
    this.setState(prevState => ({
      requestValue: Object.assign(prevState.requestValue, { [key]: value }),
    }));
  };

  render() {
    const { checkCooperator, handleRadioChange, handleCheckboxChange, checkUserGender, handleSelectChange } = this;
    const { diseaseList, treatmentList, cooperatorList, siteList, isCooperator } = this.state;
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
                    <Radio.Group onChange={event => checkCooperator(event.target.value)}>
                      <Radio value="N">매그나칩</Radio>
                      <Radio value="Y">협력업체</Radio>
                    </Radio.Group>
                  </td>
                  <th>검진지역</th>
                  <td>
                    <AntdSelect className="select-sm" defaultValue={317} style={{ width: '50%' }} onChange={value => handleSelectChange('SITE_ID', value)}>
                      {siteList.map(site => (
                        <Select.Option value={site.NODE_ID}>{site.NAME_KOR}</Select.Option>
                      ))}
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>사번</th>
                  <td colSpan={3}>
                    {isCooperator ? (
                      <>
                        <AntdSelect className="select-sm mr5" style={{ width: '15%' }} onChange={value => handleSelectChange('COOPERATOR_ID', value)}>
                          {cooperatorList.map(cooperator => (
                            <Select.Option value={cooperator.NODE_ID}>{cooperator.NAME_KOR}</Select.Option>
                          ))}
                        </AntdSelect>
                        {' / '}
                        <AntdSearch className="input-search-sm mr5" placeholder="사번을 입력하세요" style={{ width: '20%' }} />
                        <Radio.Group onChange={event => checkUserGender(event.target.value)}>
                          <Radio value="M">남</Radio>
                          <Radio value="F">여</Radio>
                        </Radio.Group>
                        <StyledButton className="btn-gray btn-sm mr5">검색</StyledButton>
                      </>
                    ) : (
                      <>
                        <AntdSearch className="input-search-sm mr5" placeholder="사번을 입력하세요" style={{ width: '20%' }} />
                        <StyledButton className="btn-gray btn-sm">검색</StyledButton>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>일시</th>
                  <td>{moment().format('YYYY-MM-DD HH시 mm분')}</td>
                </tr>
                <tr>
                  <th>업무관련성 구분</th>
                  <td colSpan={3}>
                    <Radio.Group onChange={event => handleRadioChange('IS_RELATED_WORK', event.target.value)}>
                      <Radio value="Y">직업성</Radio>
                      <Radio value="N">비직업성</Radio>
                    </Radio.Group>
                  </td>
                </tr>
                <tr>
                  <th>질환</th>
                  <td colSpan={3}>
                    <Radio.Group onChange={event => handleRadioChange('DISEASE', event.target.value)}>
                      {diseaseList.map(disease => (
                        <Radio value={disease.NODE_ID}>{disease.NAME_KOR}</Radio>
                      ))}
                    </Radio.Group>
                  </td>
                </tr>
                <tr>
                  <th>치료구분</th>
                  <td colSpan={3}>
                    <Checkbox.Group onChange={value => handleCheckboxChange('TREATMENT', value)}>
                      {treatmentList.map(treatment => (
                        <Checkbox value={treatment.NODE_ID}>{treatment.NAME_KOR}</Checkbox>
                      ))}
                    </Checkbox.Group>
                  </td>
                </tr>
                <tr>
                  <th>세부증상</th>
                  <td>
                    <AntdTextarea autoSize={{ minRows: 6, maxRows: 6 }} />
                  </td>
                  <th>조치내용</th>
                  <td>
                    <AntdTextarea autoSize={{ minRows: 6, maxRows: 6 }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10 btn-wrap-mt-10">
            <StyledButton className="btn-primary btn-sm">저장</StyledButton>
          </StyledButtonWrapper>
        </StyledContentsWrapper>
      </>
    );
  }
}

InputPage.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
};
InputPage.defaultProps = {};

export default InputPage;
