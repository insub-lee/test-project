import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, DatePicker, Select, Radio, Checkbox } from 'antd';
import Upload from 'components/FormStuff/Upload/DropZone';
import StyledButton from 'commonStyled/Buttons/StyledButton';
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

  .ant-checkbox-group {
    display: block;
    .ant-checkbox-wrapper {
      display: block;
      padding: 5px 0px 5px 0px;
      display: inline-block;
    }
  }

  .ant-radio-wrapper {
    display: block;
  }

  .tableInBtnWrap {
    margin: 0px 0px 5px 0px;
  }
`;

class SafetyWorkInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleModal, formData } = this.props;
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
                    <span>{formData.REQUEST_DT}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>작업지역</span>
                  </th>
                  <td colSpan={8}>
                    <span>{formData.SITE}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>발주회사</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.REQ_CMPNY_NM}</span>
                  </td>
                  <th colSpan={2}>
                    <span>작업부서</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.REQ_DEPT_NM}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>담당자</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.REQ_EMP_NM}</span>
                  </td>
                  <th colSpan={2}>
                    <span>감독자</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.REQ_SUPERVISOR_EMP_NM}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>작업업체</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.WRK_CMPNY_CD}</span>
                    {formData.WRK_CMPNY_NM !== '' && <span style={{ marginLeft: '5px' }}>{formData.WRK_CMPNY_NM}</span>}
                  </td>
                  <th colSpan={2}>
                    <span>서약서번호</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.PLEDGE_NO}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>주작업</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.WCATEGORY}</span>
                    {formData.WCATEGORY === '화기작업' && (
                      <>
                        <br />
                        <span style={{ color: '#495057', marginLeft: '5px' }}>화제관리 담당자명 : </span>
                        <span>{formData.FIRE_MANAGER}</span>
                      </>
                    )}
                  </td>
                  <th colSpan={2}>
                    <span>보충작업</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.SUB_WCATEGORY.toString().replace(',', ', ')}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>위험성평가</span>
                  </th>
                  <td colSpan={3}>
                    <span></span>
                  </td>
                  <th colSpan={2}>
                    <span>검토자</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.EXM_EMP_NM}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>작업명</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.TITLE}</span>
                  </td>
                  <th colSpan={2}>
                    <span>최종검토자</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.FINAL_OK_EMP_NM}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>작업내용</span>
                  </th>
                  <td colSpan={8}>
                    <AntdTextArea autoSize={{ minRows: 2, maxRows: 2 }} value={formData.WORK_DESC} disabled />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>작업동</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.DGUBUN}</span>
                  </td>
                  <th colSpan={2}>
                    <span>작업장소</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.WLOC}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>작업기간</span>
                  </th>
                  <td colSpan={3}>
                    <span>{formData.FROM_DT !== '' && moment(formData.FROM_DT).format('YYYY-MM-DD')}</span>
                  </td>
                  <th colSpan={2}>
                    <span>작업시간</span>
                  </th>
                  <td colSpan={3}>
                    <span>{`${formData.FROM_TIME} ~ ${formData.TO_TIME}`}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>첨부</span>
                  </th>
                  <td colSpan={8}></td>
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
  handleModal: PropTypes.func,
};

SafetyWorkInfo.defaultProps = {};

export default SafetyWorkInfo;
