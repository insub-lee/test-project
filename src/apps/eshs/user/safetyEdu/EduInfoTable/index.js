import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, DatePicker, Select, Modal, Radio } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/EshsStyled/Select/StyledSelect';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import HstCmpnySelectComp from '../HstCmpnySelectTable';
import HstCmpnyUserSelectComp from '../HstCmpnyUserTable';

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
      modalVisible: false,
    };
  }

  handleModalVisible = (type, bool) => {
    this.setState({
      modalType: type,
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

  rowOnclickForHstCmpnyUser = record => {
    const { sagaKey: id, changeFormData } = this.props;
    changeFormData(id, 'LECT_EMP_NO', record.SQ_SWTB_HST_CMPNY_EMP);
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
    const { eshsHstCmpnyList, eshsHstCmpnyUserList, formData } = this.props;
    const { modalType, modalVisible } = this.state;
    let selectedHstCmpny = {};
    let selectedHstCmpnyUser = {};
    let selectedHstCmpnyUserList = [];
    if (formData.LECT_CMPNY_CD || false) {
      selectedHstCmpny = eshsHstCmpnyList.filter(item => item.HST_CMPNY_CD === formData.LECT_CMPNY_CD).pop();
      selectedHstCmpnyUserList = eshsHstCmpnyUserList.filter(item => item.HST_CMPNY_CD === formData.LECT_CMPNY_CD);
    }
    if (formData.LECT_EMP_NO || false) {
      selectedHstCmpnyUser = eshsHstCmpnyUserList.filter(item => item.SQ_SWTB_HST_CMPNY_EMP === formData.LECT_EMP_NO).pop();
    }
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
                  <th rowSpan={4} colSpan={1}>
                    <span>강사구분</span>
                  </th>
                  <th rowSpan={2} colSpan={1}>
                    <Radio checked={formData.LECT_HOST_GB && formData.LECT_HOST_GB === 1} onClick={() => this.handleFormDataOnchange('LECT_HOST_GB', 1)} />
                    <span>내부강사</span>
                  </th>
                  <th colSpan={1}>
                    <span>교육회사</span>
                  </th>
                  <td colSpan={7}>
                    <AntdSearch
                      className="input-search-sm"
                      style={{ width: '200px' }}
                      value={selectedHstCmpny.HST_CMPNY_NM || ''}
                      onClick={() => this.handleModalVisible('hstCmpny', true)}
                      onSearch={() => this.handleModalVisible('hstCmpny', true)}
                    />
                    {formData.LECT_CMPNY_CD && formData.LECT_CMPNY_CD !== '' && (
                      <span className="hstCmpnyCd">{`( 주관회사 코드 : ${formData.LECT_CMPNY_CD} )`}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>
                    <span>성명</span>
                  </th>
                  <td colSpan={7}>
                    <AntdSearch
                      className="input-search-sm"
                      style={{ width: '200px' }}
                      value={selectedHstCmpnyUser.EMP_NM || ''}
                      disable
                      onClick={() => {
                        if (formData.LECT_CMPNY_CD && formData.LECT_CMPNY_CD !== '') {
                          this.handleModalVisible('hstUser', true);
                        } else {
                          message.error(<MessageContent>먼저 교육회사를 선택하십시오.</MessageContent>);
                        }
                      }}
                      onSearch={() => {
                        if (formData.LECT_CMPNY_CD && formData.LECT_CMPNY_CD !== '') {
                          this.handleModalVisible('hstUser', true);
                        } else {
                          message.error(<MessageContent>먼저 교육회사를 선택하십시오.</MessageContent>);
                        }
                      }}
                    />
                    {formData.LECT_EMP_NO && formData.LECT_EMP_NO !== '' && <span className="hstCmpnyCd">{`( 내부강사 사번 : ${formData.LECT_EMP_NO} )`}</span>}
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
                      onClick={() => alert('준비중')}
                      onSearch={() => alert('준비중')}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
        </ContentsWrapper>
        <AntdModal
          title={modalType === 'hstCmpny' ? '주관회사 검색' : '주관회사 사원'}
          width={700}
          visible={modalVisible}
          footer={null}
          onOk={() => this.handleModalVisible('', false)}
          onCancel={() => this.handleModalVisible('', false)}
        >
          {modalType === 'hstCmpny' && <HstCmpnySelectComp eshsHstCmpnyList={eshsHstCmpnyList} handleFormDataOnchange={this.handleFormDataOnchange} />}
          {modalType === 'hstUser' && <HstCmpnyUserSelectComp eshsHstCmpnyUserList={selectedHstCmpnyUserList} rowOnclick={this.rowOnclickForHstCmpnyUser} />}
        </AntdModal>
      </EduInfoTableStyled>
    );
  }
}

EduInfoTable.propTypes = {
  sagaKey: PropTypes.string.isRequired,
  result: PropTypes.object,
  formData: PropTypes.object,
  setFormData: PropTypes.func.isRequired,
  getCallDataHandler: PropTypes.func.isRequired,
  changeFormData: PropTypes.func.isRequired,
  submitHandlerBySaga: PropTypes.func.isRequired,
  eshsHstCmpnyList: PropTypes.array,
  eshsHstCmpnyUserList: PropTypes.array,
};

EduInfoTable.defaultProps = {
  eshsHstCmpnyList: [],
  eshsHstCmpnyUserList: [],
};

export default EduInfoTable;
