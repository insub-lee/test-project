import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, DatePicker, Select, Radio, Checkbox } from 'antd';
import DragUploadComp from 'components/BizBuilder/Field/DragUploadComp';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

const { Option } = Select;
const { TextArea } = Input;
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);
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

  onClickBfcheckBtn = type => {
    const { handleModal, formData } = this.props;
    if (!formData.WORK_NO || formData.WORK_NO === '') {
      message.error(<MessageContent>작업번호가 없습니다.</MessageContent>);
      return;
    }
    handleModal(type, true);
  };

  render() {
    const { handleModal, formData, handleChangeFormData, handleWorkCategory, handleChangeAttach, dgubunList } = this.props;
    const fromTimes = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
    const toTimes = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
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
                    <span>{formData.REQUEST_DT !== '' ? formData.REQUEST_DT : ''}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업지역</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSelect className="select-xs" style={{ width: '200px' }} value={formData.SITE} onChange={value => handleChangeFormData('SITE', value)}>
                      <Option value="구미">구미</Option>
                      <Option value="청주">청주</Option>
                      <Option value="서울">서울</Option>
                    </AntdSelect>
                  </td>
                  <th colSpan={2}>
                    <span>작업구분</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSelect
                      className="select-xs"
                      style={{ width: '200px' }}
                      value={formData.WGUBUN}
                      onChange={value => handleChangeFormData('WGUBUN', value)}
                    >
                      <Option value="신규">신규</Option>
                      <Option value="변경">변경</Option>
                      <Option value="이설">이설</Option>
                      <Option value="철거">철거</Option>
                      <Option value="기타">기타</Option>
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 발주회사</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-xs ant-input-inline" value={formData.REQ_CMPNY_CD} readOnly style={{ width: '100px' }} />
                    <span style={{ color: '#495057', marginLeft: '5px' }}>{formData.REQ_CMPNY_NM}</span>
                  </td>
                  <th colSpan={2}>
                    <span>* 작업부서</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-xs ant-input-inline" value={formData.REQ_DEPT_CD} readOnly style={{ width: '100px' }} />
                    <span style={{ color: '#495057', marginLeft: '5px' }}>{formData.REQ_DEPT_NM}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 담당자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-xs ant-input-inline" value={formData.REQ_EMP_NO} readOnly style={{ width: '100px' }} />
                    <span style={{ color: '#495057', marginLeft: '5px' }}>{formData.REQ_EMP_NM}</span>
                  </td>
                  <th colSpan={2}>
                    <span>* 감독자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch
                      className="input-search-xs"
                      style={{ width: '100px' }}
                      value={formData.REQ_SUPERVISOR_EMP_NO}
                      disable
                      onClick={() => handleModal('supervisor', true)}
                      onSearch={() => handleModal('supervisor', true)}
                    />
                    {formData.REQ_SUPERVISOR_EMP_NM !== '' && <span style={{ marginLeft: '5px' }}>{formData.REQ_SUPERVISOR_EMP_NM}</span>}
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업업체</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch
                      className="input-search-xs"
                      style={{ width: '100px' }}
                      value={formData.WRK_CMPNY_CD}
                      disable
                      onClick={() => handleModal('cmpny', true)}
                      onSearch={() => handleModal('cmpny', true)}
                    />
                    {formData.WRK_CMPNY_NM !== '' && <span style={{ marginLeft: '5px' }}>{formData.WRK_CMPNY_NM}</span>}
                  </td>
                  <th colSpan={2}>
                    <span>서약서번호</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch
                      className="input-search-xs"
                      style={{ width: '200px' }}
                      value={formData.PLEDGE_NO}
                      disable
                      onClick={() => handleModal('pledge', true)}
                      onSearch={() => handleModal('pledge', true)}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 주작업</span>
                  </th>
                  <td colSpan={3}>
                    <div className="tableInBtnWrap">
                      <StyledButton className="btn-gray btn-xxs btn-first" onClick={() => this.onClickBfcheckBtn('mainBfcheck')}>
                        작업전 점검 등록
                      </StyledButton>
                    </div>
                    <Radio.Group value={formData.WCATEGORY} onChange={value => handleWorkCategory(value.target.value)}>
                      <Radio value="화기작업">
                        화기작업
                        <br />
                        {formData.WCATEGORY === '화기작업' && (
                          <>
                            <br />
                            <span style={{ color: '#495057', marginLeft: '5px' }}>화재감시 담당자 : </span>
                            <AntdInput
                              className="ant-input-xs ant-input-inline"
                              value={formData.FIRE_MANAGER}
                              style={{ width: '100px' }}
                              onChange={e => handleChangeFormData('FIRE_MANAGER', e.target.value)}
                            />
                          </>
                        )}
                      </Radio>
                      <Radio value="일반위험작업">
                        일반위험작업
                        <br />
                        <span style={{ color: '#ff6666', marginLeft: '5px' }}>※ 일반위험작업 : 화기작업 이외의 작업 </span>
                      </Radio>
                    </Radio.Group>
                  </td>
                  <th colSpan={2}>
                    <span>* 보충작업</span>
                  </th>
                  <td colSpan={3} style={{ verticalAlign: 'top' }}>
                    <div className="tableInBtnWrap">
                      <StyledButton className="btn-gray btn-xxs btn-first" onClick={() => this.onClickBfcheckBtn('subBfcheck')}>
                        작업전 점검 등록
                      </StyledButton>
                    </div>
                    <Checkbox.Group value={formData.SUB_WCATEGORY} onChange={e => handleChangeFormData('SUB_WCATEGORY', e)}>
                      <Checkbox value="고소">고소</Checkbox>
                      <Checkbox value="굴착">굴착</Checkbox>
                      <Checkbox value="밀폐공간">밀폐공간</Checkbox>
                      <Checkbox value="방사선">방사선</Checkbox>
                      <br />
                      <Checkbox value="전기">전기</Checkbox>
                      <Checkbox value="중량물">중량물</Checkbox>
                    </Checkbox.Group>
                    <span style={{ color: '#ff6666' }}>※ 보충작업 : 추가 발생 위험 작업체크(중복체크가능)</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>위험성평가</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch
                      className="input-search-xs"
                      style={{ width: '200px' }}
                      value={formData.DETB_DANEST}
                      onClick={() => handleModal('riskAssessment', true)}
                      onSearch={() => handleModal('riskAssessment', true)}
                    />
                  </td>
                  <th colSpan={2}>
                    <span>* 검토자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch
                      className="input-search-xs"
                      style={{ width: '100px' }}
                      value={formData.EXM_EMP_NO}
                      disable
                      onClick={() => handleModal('exm', true)}
                      onSearch={() => handleModal('exm', true)}
                    />
                    {formData.EXM_EMP_NM !== '' && <span style={{ marginLeft: '5px' }}>{formData.EXM_EMP_NM}</span>}
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업명</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput
                      className="ant-input-xs"
                      style={{ width: '100%' }}
                      value={formData.TITLE}
                      onChange={e => handleChangeFormData('TITLE', e.target.value)}
                    />
                  </td>
                  <th colSpan={2}>
                    <span>* 최종검토자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSearch
                      className="input-search-xs"
                      style={{ width: '100px' }}
                      value={formData.FINAL_OK_EMP_NO}
                      disable
                      onClick={() => handleModal('final', true)}
                      onSearch={() => handleModal('final', true)}
                    />
                    {formData.FINAL_OK_EMP_NM !== '' && <span style={{ marginLeft: '5px' }}>{formData.FINAL_OK_EMP_NM}</span>}
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업내용</span>
                  </th>
                  <td colSpan={8}>
                    <AntdTextArea
                      autoSize={{ minRows: 2, maxRows: 2 }}
                      value={formData.WORK_DESC}
                      onChange={e => handleChangeFormData('WORK_DESC', e.target.value)}
                    />
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
                      value={formData.DGUBUN}
                      onChange={value => handleChangeFormData('DGUBUN', value)}
                    >
                      {dgubunList.map(item => (
                        <Option value={item.CODE}>{item.NAME_KOR}</Option>
                      ))}
                    </AntdSelect>
                  </td>
                  <th colSpan={2}>
                    <span>* 작업장소</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput
                      className="ant-input-xs ant-input-inline"
                      style={{ width: '100%' }}
                      value={formData.WLOC}
                      onChange={e => handleChangeFormData('WLOC', e.target.value)}
                    />
                    <br />
                    <span style={{ color: '#17a9a1', marginLeft: '5px' }}>※ 작업 상세장소 입력</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업기간</span>
                  </th>
                  <td colSpan={3}>
                    <AntdDatePicker
                      className="ant-picker-xs"
                      style={{ width: '200px' }}
                      value={formData.FROM_DT !== '' ? moment(formData.FROM_DT) : undefined}
                      onChange={e => handleChangeFormData('FROM_DT', e.format('YYYY-MM-DD'))}
                    />
                  </td>
                  <th colSpan={2}>
                    <span>* 작업시간</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSelect
                      className="select-xs"
                      style={{ width: '100px' }}
                      value={formData.FROM_TIME}
                      onChange={value => handleChangeFormData('FROM_TIME', value)}
                    >
                      {fromTimes.map(item => (
                        <Option value={item} key="fromTime">
                          {item}
                        </Option>
                      ))}
                    </AntdSelect>
                    <span style={{ margin: '0px 5px 0px 5px' }}>~</span>
                    <AntdSelect
                      className="select-xs"
                      style={{ width: '100px' }}
                      value={formData.TO_TIME}
                      onChange={value => handleChangeFormData('TO_TIME', value)}
                    >
                      {toTimes.map(item => (
                        <Option value={item} key="toTime">
                          {item}
                        </Option>
                      ))}
                    </AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>첨부</span>
                  </th>
                  <td colSpan={8}>
                    <DragUploadComp
                      WORK_SEQ={-1}
                      colData={{ DETAIL: formData.UPLOAD_FILES || [] }}
                      changeFormData={handleChangeAttach}
                      COMP_FIELD="UPLOAD_FILES"
                      visible
                      CONFIG={{ property: { MULTIPLE_UPLOAD: 'Y' } }}
                    />
                  </td>
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
  handleChangeFormData: PropTypes.func,
  handleWorkCategory: PropTypes.func,
  handleChangeAttach: PropTypes.func,
  dgubunList: PropTypes.array,
};

SafetyWorkInfo.defaultProps = {
  dgubunList: [],
};

export default SafetyWorkInfo;
