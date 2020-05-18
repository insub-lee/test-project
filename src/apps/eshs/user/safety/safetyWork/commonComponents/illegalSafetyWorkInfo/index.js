import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { Input, Select, Radio, Checkbox } from 'antd';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdSelect = StyledSelect(Select);

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
    const { handleModal, formData, handleChangeFormData, handleWorkCategory } = this.props;
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
                    <span>* 작업지역</span>
                  </th>
                  <td colSpan={3}>
                    <AntdSelect className="select-xs" style={{ width: '200px' }} value={formData.SITE} onChange={value => handleChangeFormData('SITE', value)}>
                      <Option value="청주">청주</Option>
                      <Option value="구미">구미</Option>
                    </AntdSelect>
                  </td>
                  <th colSpan={2}>
                    <span>* 작업구분</span>
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
                    <AntdInput className="ant-input-xs ant-input-inline" value={formData.REQ_CMPNY_CD} readOnly style={{ width: '200px' }} />
                    <span style={{ color: '#495057', marginLeft: '5px' }}>{formData.REQ_CMPNY_NM}</span>
                  </td>
                  <th colSpan={2}>
                    <span>* 주관팀</span>
                  </th>
                  <td colSpan={3}>
                    <AntdInput className="ant-input-xs ant-input-inline" value={formData.REQ_DEPT_CD} readOnly style={{ width: '200px' }} />
                    <span style={{ color: '#495057', marginLeft: '5px' }}>{formData.REQ_DEPT_NM}</span>
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업업체</span>
                  </th>
                  <td colSpan={7}>
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
                    <span>* 작업명</span>
                  </th>
                  <td colSpan={8}>
                    <AntdInput
                      className="ant-input-xs"
                      style={{ width: '200px' }}
                      value={formData.TITLE}
                      onChange={e => handleChangeFormData('TITLE', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}>
                    <span>* 작업장소</span>
                  </th>
                  <td colSpan={8}>
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
                    <span>등록일</span>
                  </th>
                  <td colSpan={8}>{formData.CREATE_DT && formData.CREATE_DT !== '' && <span>{moment(formData.CREATE_DT).format('YYYY-MM-DD')}</span>}</td>
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
};

SafetyWorkInfo.defaultProps = {};

export default SafetyWorkInfo;
