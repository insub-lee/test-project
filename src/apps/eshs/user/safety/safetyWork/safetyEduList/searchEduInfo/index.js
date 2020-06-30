import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Input, DatePicker, Select, Radio } from 'antd';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';
import StyledHtmlTable from './Styled';

const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdDatePicker = StyledDatePicker(DatePicker);
const AntdSelect = StyledSelect(Select);
const { Option } = Select;

class EduInfoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 2006 - 현재년도 까지 Select 생성
  renderEduYearSelect = () => {
    const { onChangeSearchValue } = this.props;
    const endYear = Number(moment().format('YYYY'));
    const options = [];
    for (let year = 2006; year <= endYear; year += 1) {
      options.push(year);
    }
    return (
      <AntdSelect className="select-xs" style={{ width: '200px' }} onChange={e => onChangeSearchValue('EDU_YEAR', e)}>
        {options.map(YYYY => (
          <Option value={`${YYYY}`}>{YYYY}</Option>
        ))}
      </AntdSelect>
    );
  };

  render() {
    const { searchValues, onChangeSearchValue, handleModal, onSearch, resetSearchValue } = this.props;
    return (
      <StyledCustomSearchWrapper>
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
                  <span>교육번호</span>
                </th>
                <td colSpan={7}>
                  <AntdSearch
                    className="input-search-xs"
                    style={{ width: '200px' }}
                    value={searchValues.EDU_NO}
                    onClick={() => handleModal('eduSearch', true)}
                    onSearch={() => handleModal('eduSearch', true)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={3}>
                  <span>지역</span>
                </th>
                <td colSpan={2}>
                  <AntdSelect className="select-xs" style={{ width: '200px' }} value={searchValues.SITE} onChange={e => onChangeSearchValue('SITE', e)}>
                    <Option value="">전체</Option>
                    <Option value="청주">청주</Option>
                    <Option value="구미">구미</Option>
                  </AntdSelect>
                </td>
                <th colSpan={2}>
                  <span>교육기간</span>
                </th>
                <td colSpan={3}>
                  <div>
                    <AntdDatePicker
                      className="ant-picker-xs"
                      style={{ width: '45%' }}
                      value={searchValues.START_EDU_DT !== '' ? moment(searchValues.START_EDU_DT) : undefined}
                      onChange={e => {
                        if (e === null) {
                          onChangeSearchValue('START_EDU_DT', '');
                          return;
                        }
                        onChangeSearchValue('START_EDU_DT', e.format('YYYY-MM-DD'));
                      }}
                    />
                    <span styled={{ margin: '0px 10px 0px 10px', width: '10%' }}> ~ </span>
                    <AntdDatePicker
                      className="ant-picker-xs"
                      style={{ width: '45%' }}
                      value={searchValues.END_EDU_DT !== '' ? moment(searchValues.END_EDU_DT) : undefined}
                      onChange={e => {
                        if (e === null) {
                          onChangeSearchValue('END_EDU_DT', '');
                          return;
                        }
                        onChangeSearchValue('END_EDU_DT', e.format('YYYY-MM-DD'));
                      }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th rowSpan={3} colSpan={1}>
                  <span>강사구분</span>
                </th>
                <th colSpan={1}>
                  <Radio checked={searchValues.LECT_HOST_GB === 1} onClick={() => onChangeSearchValue('LECT_HOST_GB', 1)} />
                  <span>내부강사</span>
                </th>
                <th colSpan={1}>
                  <span>교육회사/사번</span>
                </th>
                <td colSpan={7}>
                  <AntdSearch
                    className="input-search-xs"
                    style={{ width: '200px' }}
                    value={searchValues.LECT_EMP_NM}
                    onClick={() => handleModal('searchEmp', true)}
                    onSearch={() => handleModal('searchEmp', true)}
                  />
                  {searchValues.LECT_CMPNY_NM && <span style={{ marginLeft: '10px' }}>{searchValues.LECT_CMPNY_NM}</span>}
                </td>
              </tr>
              <tr>
                <th rowSpan={2} colSpan={1}>
                  <Radio checked={searchValues.LECT_HOST_GB === 2} onClick={() => onChangeSearchValue('LECT_HOST_GB', 2)} />
                  <span>외부강사</span>
                </th>
                <th colSpan={1}>
                  <span>생년월일</span>
                </th>
                <td colSpan={7}>
                  <AntdInput
                    className="ant-input-xs"
                    style={{ width: '200px' }}
                    maxlength={6}
                    onChange={e => onChangeSearchValue('OUT_LECT_SSN', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>성명</span>
                </th>
                <td colSpan={7}>
                  <AntdInput
                    value={searchValues.OUT_LECT_NM}
                    className="ant-input-xs"
                    style={{ width: '200px' }}
                    onChange={e => onChangeSearchValue('OUT_LECT_NM', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th rowSpan={2} colSpan={1}>
                  <span>교육대상</span>
                </th>
                <th colSpan={2} style={{ padding: '0px 23px 0px 0px' }}>
                  <Radio checked={searchValues.EDU_TARGET_GB === 1} onClick={() => onChangeSearchValue('EDU_TARGET_GB', 1)} />
                  <span>년도</span>
                </th>
                <td colSpan={7}>{this.renderEduYearSelect()}</td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <Radio checked={searchValues.EDU_TARGET_GB === 2} onClick={() => onChangeSearchValue('EDU_TARGET_GB', 2)} />
                  <span>작업번호</span>
                </th>
                <td colSpan={7}>
                  <AntdSearch
                    className="input-search-xs"
                    style={{ width: '200px' }}
                    value={searchValues.WORK_NO}
                    onClick={() => handleModal('searchWorkNo', true)}
                    onSearch={() => handleModal('searchWorkNo', true)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <StyledButton className="btn-gray mr5 btn-sm" onClick={() => onSearch()}>
              검색
            </StyledButton>
            <StyledButton className="btn-gray mr5 btn-sm" onClick={() => resetSearchValue()}>
              검색조건 초기화
            </StyledButton>
          </div>
        </StyledHtmlTable>
      </StyledCustomSearchWrapper>
    );
  }
}

EduInfoTable.propTypes = {
  searchValues: PropTypes.object,
  onChangeSearchValue: PropTypes.func,
  handleModal: PropTypes.func,
  onSearch: PropTypes.func,
  resetSearchValue: PropTypes.func,
};

EduInfoTable.defaultProps = {
  onChangeSearchValue: PropTypes.func,
  handleModal: () => false,
  onSearch: () => false,
  resetSearchValue: () => false,
};

export default EduInfoTable;
