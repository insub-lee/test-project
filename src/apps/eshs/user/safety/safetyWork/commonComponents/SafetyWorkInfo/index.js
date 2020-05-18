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
    const { handleModal, formData, handleChangeFormData, handleWorkCategory, handleUploadFileChange } = this.props;
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
                  <td colSpan={8}>
                    <AntdSelect className="select-xs" style={{ width: '200px' }} value={formData.SITE} onChange={value => handleChangeFormData('SITE', value)}>
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
                    <AntdInput className="ant-input-xs ant-input-inline" value={formData.REQ_CMPNY_CD} readOnly style={{ width: '200px' }} />
                    <span style={{ color: '#495057', marginLeft: '5px' }}>{formData.REQ_CMPNY_NM}</span>
                  </td>
                  <th colSpan={2}>
                    <span>* 작업부서</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-xs ant-input-inline" value={formData.REQ_DEPT_CD} readOnly style={{ width: '200px' }} />
                    <span style={{ color: '#495057', marginLeft: '5px' }}>{formData.REQ_DEPT_NM}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 담당자</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-xs ant-input-inline" value={formData.REQ_EMP_NO} readOnly style={{ width: '200px' }} />
                    <span style={{ color: '#495057', marginLeft: '5px' }}>{formData.REQ_EMP_NM}</span>
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
                      style={{ width: '200px' }}
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
                      <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => console.debug('작업전 점검 등록 버튼')}>
                        작업전 점검 등록
                      </StyledButton>
                    </div>
                    <Radio.Group value={formData.WCATEGORY} onChange={value => handleWorkCategory(value.target.value)}>
                      <Radio value="공통">공통</Radio>
                      <Radio value="화기작업">
                        화기작업
                        <span style={{ color: '#ff6666', marginLeft: '27px' }}>※ 화기작업 : 화염, 스파크 등을 발생이키는 작업</span>
                        {formData.WCATEGORY === '화기작업' && (
                          <>
                            <br />
                            <span style={{ color: '#495057', marginLeft: '5px' }}>화제관리 담당자명 : </span>
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
                        <span style={{ color: '#ff6666', marginLeft: '5px' }}>※ 일반위험작업 : 화기작업 이외의 작업 </span>
                      </Radio>
                    </Radio.Group>
                  </td>
                  <th colSpan={2}>
                    <span>* 보충작업</span>
                  </th>
                  <td colSpan={3}>
                    <div className="tableInBtnWrap">
                      <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => console.debug('작업전 점검 등록 버튼')}>
                        작업전 점검 등록
                      </StyledButton>
                    </div>
                    <Checkbox.Group value={formData.SUB_WCATEGORY} onChange={e => handleChangeFormData('SUB_WCATEGORY', e)}>
                      <Checkbox value="고소">고소</Checkbox>
                      <Checkbox value="굴착">굴착</Checkbox>
                      <Checkbox value="밀폐">밀폐공간</Checkbox>
                      <Checkbox value="방사선">방사선</Checkbox>
                      <Checkbox value="전기">전기</Checkbox>
                      <Checkbox value="중량물">중량물</Checkbox>
                    </Checkbox.Group>
                    <span style={{ color: '#ff6666' }}>※ 보충작업 : 추가 발생 위험 작업체크(중복체크가능)</span>
                    <br />
                    <span style={{ color: '#ff6666' }}>※ 작업장 여건 고려 : 고소, 전기작업 등 </span>
                  </td>
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
                    <AntdSearch
                      className="input-search-xs"
                      style={{ width: '200px' }}
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
                      style={{ width: '200px' }}
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
                      style={{ width: '200px' }}
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
                    <AntdInput
                      className="ant-input-xs ant-input-inline"
                      style={{ width: '200px' }}
                      value={formData.WLOC}
                      onChange={e => handleChangeFormData('WLOC', e.target.value)}
                    />
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
                    {/*
                      { handleChange, fileList, customRequest, action, limit, disabled, onRemove }
                    */}
                    <Upload action="/upload" handleChange={handleUploadFileChange} fileList={formData.fileList} />
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
  handleUploadFileChange: PropTypes.func,
};

SafetyWorkInfo.defaultProps = {};

export default SafetyWorkInfo;
