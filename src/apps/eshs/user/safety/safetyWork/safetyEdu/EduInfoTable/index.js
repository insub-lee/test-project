import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, DatePicker, Select, Modal, Radio } from 'antd';
import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/EshsStyled/Select/StyledSelect';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import UserSelect from 'components/UserSelect';
import SearchSafetyWork from '../../commonComponents/safetyWorkSearch';

const AntdModal = StyledModalWrapper(Modal);
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);
const { Option } = Select;

const EduInfoTableStyled = styled.div`
  .hstCmpnyCd {
    margin-left: 5px;
  }
`;

class EduInfoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      modalTitle: '',
      modalVisible: false,
    };
  }

  handleModalVisible = (type, bool) => {
    let title = '';
    switch (type) {
      case 'userSelect':
        title = '내부강사 선택';
        break;
      case 'safetyWork':
        title = '안전작업 선택';
        break;
      default:
        break;
    }
    this.setState({
      modalType: type,
      modalTitle: title,
      modalVisible: bool,
    });
  };

  // FormData OnChange - 모달컨트롤
  handleFormDataOnchange = (field, value, modal) => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, field, value);
    if (modal || false) {
      this.handleModalVisible('', false);
    }
  };

  // 내부강사 선택
  onSelectedComplete = result => {
    const { sagaKey: id, setFormData, formData } = this.props;
    if (result.length > 0) {
      const userInfo = result[0];
      this.setState(
        {
          modalTitle: '',
          modalType: '',
          modalVisible: false,
        },
        () =>
          setFormData(id, {
            ...formData,
            LECT_CMPNY_CD: userInfo.COMP_CD.replace('COMP_', ''),
            LECT_CMPNY_NM: userInfo.DEPT_NAME_KOR,
            LECT_EMP_NO: userInfo.EMP_NO,
            LECT_EMP_NM: userInfo.NAME_KOR,
          }),
      );
      return;
    }
    this.setState({
      modalTitle: '',
      modalType: '',
      modalVisible: false,
    });
  };

  // 작업번호 선택
  handleSafetyWorkSelect = record => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'WORK_NO', record.WORK_NO);
    this.handleModalVisible('', false);
  };

  // 2006 - 현재년도 까지 Select 생성
  renderEduYearSelect = () => {
    const { formData } = this.props;
    const endYear = Number(moment().format('YYYY'));
    const options = [];
    for (let year = 2006; year <= endYear; year += 1) {
      options.push(year);
    }
    return (
      <StyledSelect>
        <Select style={{ width: '200px' }} value={(formData.EDU_YEAR && formData.EDU_YEAR) || ''} onChange={e => this.handleFormDataOnchange('EDU_YEAR', e)}>
          {options.map(YYYY => (
            <Option value={`${YYYY}`}>{YYYY}</Option>
          ))}
        </Select>
      </StyledSelect>
    );
  };

  render() {
    const { formData } = this.props;
    const { modalType, modalVisible, modalTitle } = this.state;
    return (
      <EduInfoTableStyled>
        <ContentsWrapper>
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan={3}>
                    <span>* 교육일자</span>
                  </th>
                  <td colSpan={7}>
                    <DatePicker
                      className="ant-input-inline"
                      value={(formData.EDU_DT && moment(formData.EDU_DT)) || undefined}
                      onChange={date => this.handleFormDataOnchange('EDU_DT', date.format('YYYY-MM-DD'))}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={3}>
                    <span>* 지역</span>
                  </th>
                  <td colSpan={2}>
                    <StyledSelect>
                      <Select
                        style={{ width: '100%' }}
                        defaultValue={(formData.SITE && formData.SITE) || '청주'}
                        onChange={e => this.handleFormDataOnchange('SITE', e)}
                      >
                        <Option value="청주">청주</Option>
                        <Option value="구미">구미</Option>
                      </Select>
                    </StyledSelect>
                  </td>
                  <th colSpan={2}>
                    <span>교육장소</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput
                      className="ant-input-sm"
                      style={{ width: '200px' }}
                      defaultValue={(formData.EDU_LOC && formData.EDU_LOC) || ''}
                      onChange={e => this.handleFormDataOnchange('EDU_LOC', e.target.value)}
                      onClick={this.toggleModal}
                    />
                  </td>
                </tr>
                <tr>
                  <th rowSpan={3} colSpan={1}>
                    <span>강사구분</span>
                  </th>
                  <th colSpan={1}>
                    <Radio checked={formData.LECT_HOST_GB && formData.LECT_HOST_GB === 1} onClick={() => this.handleFormDataOnchange('LECT_HOST_GB', 1)} />
                    <span>내부강사</span>
                  </th>
                  <th colSpan={1}>
                    <span>강사/교육회사</span>
                  </th>
                  <td colSpan={7}>
                    <AntdSearch
                      className="input-search-sm"
                      style={{ width: '200px' }}
                      value={(formData.LECT_EMP_NM && formData.LECT_EMP_NM) || ''}
                      onClick={() => this.handleModalVisible('userSelect', true)}
                      onSearch={() => this.handleModalVisible('userSelect', true)}
                    />
                    {formData.LECT_CMPNY_NM && <span style={{ marginLeft: '5px' }}>{formData.LECT_CMPNY_NM}</span>}
                  </td>
                </tr>
                <tr>
                  <th rowSpan={2} colSpan={1}>
                    <Radio checked={formData.LECT_HOST_GB && formData.LECT_HOST_GB === 2} onClick={() => this.handleFormDataOnchange('LECT_HOST_GB', 2)} />
                    <span>외부강사</span>
                  </th>
                  <th colSpan={1}>
                    <span>생년월일</span>
                  </th>
                  <td colSpan={7}>
                    <AntdInput
                      className="ant-input-sm"
                      maxlength={6}
                      value={(formData.OUT_LECT_SSN && formData.OUT_LECT_SSN) || ''}
                      onChange={e => this.handleFormDataOnchange('OUT_LECT_SSN', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>
                    <span>성명</span>
                  </th>
                  <td colSpan={7}>
                    <AntdInput
                      className="ant-input-sm"
                      value={(formData.OUT_LECT_NM && formData.OUT_LECT_NM) || ''}
                      onChange={e => this.handleFormDataOnchange('OUT_LECT_NM', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th rowSpan={2} colSpan={1}>
                    <span>교육대상</span>
                  </th>
                  <th colSpan={2} style={{ padding: '0px 23px 0px 0px' }}>
                    <Radio checked={formData.EDU_TARGET_GB && formData.EDU_TARGET_GB === 1} onClick={() => this.handleFormDataOnchange('EDU_TARGET_GB', 1)} />
                    <span>년도</span>
                  </th>
                  <td colSpan={7}>{this.renderEduYearSelect()}</td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <Radio checked={formData.EDU_TARGET_GB && formData.EDU_TARGET_GB === 2} onClick={() => this.handleFormDataOnchange('EDU_TARGET_GB', 2)} />
                    <span>작업번호</span>
                  </th>
                  <td colSpan={7}>
                    <AntdSearch
                      className="input-search-sm"
                      style={{ width: '200px' }}
                      value={(formData.WORK_NO && formData.WORK_NO) || ''}
                      disable
                      onClick={() => this.handleModalVisible('safetyWork', true)}
                      onSearch={() => this.handleModalVisible('safetyWork', true)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
        </ContentsWrapper>
        <AntdModal
          title={modalTitle}
          width="70%"
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModalVisible('', false)}
          onCancel={() => this.handleModalVisible('', false)}
        >
          {modalType === 'userSelect' && <UserSelect onUserSelectHandler={undefined} onUserSelectedComplete={this.onSelectedComplete} onCancel={undefined} />}
          {modalType === 'safetyWork' && <BizMicroDevBase component={SearchSafetyWork} sagaKey="safetyWork_search" rowSelect={this.handleSafetyWorkSelect} />}
        </AntdModal>
      </EduInfoTableStyled>
    );
  }
}

EduInfoTable.propTypes = {
  sagaKey: PropTypes.string.isRequired,
  formData: PropTypes.object,
  changeFormData: PropTypes.func.isRequired,
  setFormData: PropTypes.func,
};

EduInfoTable.defaultProps = {};

export default EduInfoTable;
