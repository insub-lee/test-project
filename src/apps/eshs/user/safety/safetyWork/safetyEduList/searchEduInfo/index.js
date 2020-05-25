import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, DatePicker, Select, Radio } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledPicker from 'commonStyled/Form/StyledPicker';
import StyledSelect from 'commonStyled/EshsStyled/Select/StyledSelect';
import StyledSearchInput from 'commonStyled/Form/StyledSearchInput';

const AntdInput = StyledInput(Input);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdDatePicker = StyledPicker(DatePicker);
const { Option } = Select;

const EduInfoTableStyled = styled.div`
  .hstCmpnyCd {
    margin-left: 5px;
  }
`;

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
      <StyledSelect>
        <Select style={{ width: '200px' }} onChange={e => onChangeSearchValue('EDU_YEAR', e)}>
          {options.map(YYYY => (
            <Option value={`${YYYY}`}>{YYYY}</Option>
          ))}
        </Select>
      </StyledSelect>
    );
  };

  render() {
    const { searchValues, onChangeSearchValue, handleModal } = this.props;
    return (
      <EduInfoTableStyled>
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
                  <span>* 지역</span>
                </th>
                <td colSpan={2}>
                  <StyledSelect>
                    <Select style={{ width: '100%' }} value={searchValues.SITE} onChange={e => onChangeSearchValue('SITE', e)}>
                      <Option value="">전체</Option>
                      <Option value="청주">청주</Option>
                      <Option value="구미">구미</Option>
                    </Select>
                  </StyledSelect>
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
                  {searchValues.LECT_CMPNY_NM && <span>{searchValues.LECT_CMPNY_NM}</span>}
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
                  <AntdInput className="ant-input-xs" maxlength={6} onChange={e => onChangeSearchValue('OUT_LECT_SSN', e.target.value)} />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>성명</span>
                </th>
                <td colSpan={7}>
                  <AntdInput value={searchValues.OUT_LECT_NM} className="ant-input-xs" onChange={e => onChangeSearchValue('OUT_LECT_NM', e.target.value)} />
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
        </StyledHtmlTable>
      </EduInfoTableStyled>
    );
  }
}

EduInfoTable.propTypes = {
  searchValues: PropTypes.func,
  onChangeSearchValue: PropTypes.func,
  handleModal: PropTypes.func,
};

EduInfoTable.defaultProps = {};

export default EduInfoTable;
