import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Radio } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';

class EduInfoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { eduInfo } = this.props;
    return (
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
                  <span>교육일자</span>
                </th>
                <td colSpan={7}>
                  <span>{eduInfo.EDU_DT && eduInfo.EDU_DT !== '' && moment(eduInfo.EDU_DT).format('YYYY-MM-DD')}</span>
                </td>
              </tr>
              <tr>
                <th colSpan={3}>
                  <span>지역</span>
                </th>
                <td colSpan={2}>
                  <span>{eduInfo.SITE}</span>
                </td>
                <th colSpan={2}>
                  <span>교육장소</span>
                </th>
                <td colSpan={3}>
                  <span>{eduInfo.EDU_LOC}</span>
                </td>
              </tr>
              <tr>
                <th rowSpan={4} colSpan={1}>
                  <span>강사구분</span>
                </th>
                <th rowSpan={2} colSpan={1}>
                  <Radio checked={eduInfo.LECT_HOST_GB && eduInfo.LECT_HOST_GB === 1} disabled />
                  <span>내부강사</span>
                </th>
                <th colSpan={1}>
                  <span>교육회사</span>
                </th>
                <td colSpan={7}>
                  <span>{eduInfo.LECT_CMPNY_NM && eduInfo.LECT_CMPNY_NM}</span>
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>성명</span>
                </th>
                <td colSpan={7}>
                  <span>{eduInfo.LECT_CMPNY_NM && eduInfo.LECT_EMP_NM}</span>
                </td>
              </tr>
              <tr>
                <th rowSpan={2} colSpan={1}>
                  <Radio checked={eduInfo.LECT_HOST_GB && eduInfo.LECT_HOST_GB === 2} disabled />
                  <span>외부강사</span>
                </th>
                <th colSpan={1}>
                  <span>생년월일</span>
                </th>
                <td colSpan={7}>
                  <span>{eduInfo.OUT_LECT_SSN}</span>
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  <span>성명</span>
                </th>
                <td colSpan={7}>
                  <span>{eduInfo.OUT_LECT_NM}</span>
                </td>
              </tr>
              <tr>
                <th rowSpan={2} colSpan={1}>
                  <span>교육대상</span>
                </th>
                <th colSpan={2} style={{ padding: '0px 23px 0px 0px' }}>
                  <Radio checked={eduInfo.EDU_TARGET_GB && eduInfo.EDU_TARGET_GB === 1} disabled />
                  <span>년도</span>
                </th>
                <td colSpan={7}>
                  <span>{eduInfo.EDU_YEAR}</span>
                </td>
              </tr>
              <tr>
                <th colSpan={2}>
                  <Radio checked={eduInfo.EDU_TARGET_GB && eduInfo.EDU_TARGET_GB === 2} disabled />
                  <span>작업번호</span>
                </th>
                <td colSpan={7}>
                  <span>{eduInfo.WORK_NO}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </ContentsWrapper>
    );
  }
}

EduInfoTable.propTypes = {
  eduInfo: PropTypes.object,
};

EduInfoTable.defaultProps = {};

export default EduInfoTable;
