import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, DatePicker, Select, Radio } from 'antd';

import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledPicker from 'commonStyled/Form/StyledPicker';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledTextarea from 'commonStyled/Form/StyledTextarea';

const { Option } = Select;
const { TextArea } = Input;
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledPicker(DatePicker);
const AntdTextArea = StyledTextarea(TextArea);

const EduInfoTableStyled = styled.div`
  .hstCmpnyCd {
    margin-left: 5px;
  }
`;

class SafetyWorkInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const { handleModal, formData, handleChangeFormData, profile } = this.props;
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
                  <th colSpan={2}>
                    <span>신청일</span>
                  </th>
                  <td colSpan={8}>
                    <AntdDatePicker className="ant-picker-xs" style={{ width: '200px' }} defaultValue={moment()} />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업지역</span>
                  </th>
                  <td colSpan={8}>
                    <AntdSelect
                      className="select-xs"
                      style={{ width: '200px' }}
                      defaultValue={formData.SITE}
                      onChange={value => handleChangeFormData('SITE', value)}
                    >
                      <Option value="청주">청주</Option>
                      <Option value="구미">구미</Option>
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 발주회사</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-xs ant-input-inline" defaultValue={formData.REQ_CMPNY_CD} readOnly style={{ width: '200px' }} />
                    <span style={{ color: '#495057', marginLeft: '5px' }}>{profile.DEPT_NAME_KOR}</span>
                  </td>
                  <th colSpan={2}>
                    <span>* 작업부서</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-xs ant-input-inline" defaultValue={formData.REQ_DEPT_CD} readOnly style={{ width: '200px' }} />
                    <span style={{ color: '#495057', marginLeft: '5px' }}>{profile.DEPT_NAME_KOR}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 담당자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-xs ant-input-inline" defaultValue={formData.REQ_EMP_NO} readOnly style={{ width: '200px' }} />
                    <span style={{ color: '#495057', marginLeft: '5px' }}>{profile.NAME_KOR}</span>
                  </td>
                  <th colSpan={2}>
                    <span>* 감독자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch
                      className="input-search-xs"
                      style={{ width: '200px' }}
                      value={formData.REQ_SUPERVISOR_EMP_NO}
                      disable
                      onClick={() => handleModal('hstUser', true)}
                      onSearch={() => handleModal('hstUser', true)}
                    />
                    {formData.REQ_SUPERVISOR_EMP_NM !== '' && <span style={{ marginLeft: '5px' }}>{formData.REQ_SUPERVISOR_EMP_NM}</span>}
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업업체</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch className="input-search-xs" style={{ width: '200px' }} disable />
                  </td>
                  <th colSpan={2}>
                    <span>서약서번호</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch className="input-search-xs" style={{ width: '200px' }} disable />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 주작업</span>
                  </th>
                  <td colSpan={3}>(주작업)</td>
                  <th colSpan={2}>
                    <span>* 보충작업</span>
                  </th>
                  <td colSpan={3}>(보충작업)</td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>위험성평가</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch className="input-search-xs" style={{ width: '200px' }} disable />
                  </td>
                  <th colSpan={2}>
                    <span>* 검토자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch className="input-search-xs" style={{ width: '200px' }} disable />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업명</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-xs" style={{ width: '200px' }} />
                  </td>
                  <th colSpan={2}>
                    <span>* 최종검토자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch className="input-search-xs" style={{ width: '200px' }} disable />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업내용</span>
                  </th>
                  <td colSpan={8}>
                    <AntdTextArea autoSize={{ minRows: 4, maxRows: 4 }} />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업동</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSelect
                      className="select-xs"
                      style={{ width: '200px' }}
                      defaultValue={formData.DGUBUN}
                      onChange={value => handleChangeFormData('DGUBUN', value)}
                    >
                      <Option value="C-1">C-1</Option>
                      <Option value="C-2">C-2</Option>
                      <Option value="R">R</Option>
                      <Option value="청주기타">청주기타</Option>
                      <Option value="F1동">F1동</Option>
                      <Option value="F3동">F3동</Option>
                      <Option value="A1동">A1동</Option>
                      <Option value="D.I동">D.I동</Option>
                      <Option value="기숙사동">기숙사동</Option>
                      <Option value="구미기타">구미기타</Option>
                    </AntdSelect>
                  </td>
                  <th colSpan={2}>
                    <span>* 작업장소</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-xs ant-input-inline" style={{ width: '200px' }} />
                    <span style={{ color: '#17a9a1', marginLeft: '5px' }}>※ 작업 상세장소 입력</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업기간</span>
                  </th>
                  <td colSpan={3}>
                    <AntdDatePicker className="ant-picker-xs" style={{ width: '200px' }} />
                  </td>
                  <th colSpan={2}>
                    <span>* 작업시간</span>
                  </th>
                  <td colSpan={3}></td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>첨부</span>
                  </th>
                  <td colSpan={8}>(파일업로드)</td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
        </ContentsWrapper>
      </EduInfoTableStyled>
    );
  }
}

SafetyWorkInfo.propTypes = {
  formData: PropTypes.object,
  profile: PropTypes.object,
  handleModal: PropTypes.func,
  handleChangeFormData: PropTypes.func,
};

SafetyWorkInfo.defaultProps = {};

export default SafetyWorkInfo;
