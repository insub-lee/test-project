import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

class gasInfoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData } = this.props;
    const gasmdt = moment(`${formData.GASMDT}+01`, 'YYYYMMDD');
    const endDay = gasmdt.endOf('month').format('DD');
    return (
      <StyledHtmlTable>
        <table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col width="20%" />
          </colgroup>
          <tbody>
            <tr>
              <th colSpan={1}>
                <span>사용 월</span>
              </th>
              <td colSpan={6}>
                <span>{moment(formData.GASMDT, 'YYYYMM').format('YYYY.MM')}</span>
                <span style={{ color: 'rgb(255, 102, 102)', marginLeft: '10px' }}>{`※ 해당 월은 ${endDay}일 까지 존재합니다.`}</span>
              </td>
            </tr>
            <tr>
              <th colSpan={6}>
                <span>Gas Cabinet 정보</span>
              </th>
              <th colSpan={1} rowSpan={2}>
                <span>Gas 품명</span>
              </th>
            </tr>
            <tr>
              <th colSpan={1}>
                <span>Cabinet 번호</span>
              </th>
              <th colSpan={1}>
                <span>Gas Name</span>
              </th>
              <th colSpan={1}>
                <span>위치</span>
              </th>
              <th colSpan={1}>
                <span>감지기</span>
              </th>
              <th colSpan={1}>
                <span>Vent Line</span>
              </th>
              <th colSpan={1}>
                <span>기타 정보</span>
              </th>
            </tr>
            <tr className="tr-center">
              <td colSpan={1}>
                <span>{formData.CABINO || ''}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.PRODNM || ''}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.CABIAREA || ''}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.CABISENSOR || ''}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.CABIVENTLINE || ''}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.CABIINFO || ''}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.GASNM || ''}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

gasInfoTable.propTypes = {
  formData: PropTypes.object,
};

gasInfoTable.defaultProps = {};

export default gasInfoTable;
