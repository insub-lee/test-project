import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

class useInfoViewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calcYearUseAvg = formData => {
    const {
      MONTH1_AVG,
      MONTH2_AVG,
      MONTH3_AVG,
      MONTH4_AVG,
      MONTH5_AVG,
      MONTH6_AVG,
      MONTH7_AVG,
      MONTH8_AVG,
      MONTH9_AVG,
      MONTH10_AVG,
      MONTH11_AVG,
      MONTH12_AVG,
    } = formData;
    const totalAvg =
      (MONTH1_AVG +
        MONTH2_AVG +
        MONTH3_AVG +
        MONTH4_AVG +
        MONTH5_AVG +
        MONTH6_AVG +
        MONTH7_AVG +
        MONTH8_AVG +
        MONTH9_AVG +
        MONTH10_AVG +
        MONTH11_AVG +
        MONTH12_AVG) /
      12;
    return totalAvg.toFixed(2);
  };

  render() {
    const { formData } = this.props;
    return (
      <StyledHtmlTable>
        <table>
          <colgroup>
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
            <col width="6.6%" />
          </colgroup>
          <tbody>
            <tr>
              <th colSpan={3}>
                <span>1월</span>
              </th>
              <th colSpan={3}>
                <span>2월</span>
              </th>
              <th colSpan={3}>
                <span>3월</span>
              </th>
              <th colSpan={3}>
                <span>4월</span>
              </th>
              <th colSpan={3}>
                <span>5월</span>
              </th>
            </tr>
            <tr>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
            </tr>
            <tr className="tr-center">
              <td colSpan={1}>
                <span>{formData.MONTH1}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH1_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH1_AVG.toFixed(2)}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH2}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH2_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH2_AVG.toFixed(2)}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH3}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH3_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH3_AVG.toFixed(2)}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH4}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH4_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH4_AVG.toFixed(2)}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH5}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH5_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH5_AVG.toFixed(2)}</span>
              </td>
            </tr>
            <tr>
              <th colSpan={3}>
                <span>6월</span>
              </th>
              <th colSpan={3}>
                <span>7월</span>
              </th>
              <th colSpan={3}>
                <span>8월</span>
              </th>
              <th colSpan={3}>
                <span>9월</span>
              </th>
              <th colSpan={3}>
                <span>10월</span>
              </th>
            </tr>
            <tr>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
            </tr>
            <tr className="tr-center">
              <td colSpan={1}>
                <span>{formData.MONTH6}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH6_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH6_AVG.toFixed(2)}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH7}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH7_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH7_AVG.toFixed(2)}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH8}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH8_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH8_AVG.toFixed(2)}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH9}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH9_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH9_AVG.toFixed(2)}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH10}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH10_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH10_AVG.toFixed(2)}</span>
              </td>
            </tr>
            <tr>
              <th colSpan={3}>
                <span>11월</span>
              </th>
              <th colSpan={3}>
                <span>12월</span>
              </th>
              <th colSpan={9}>
                <span>연간</span>
              </th>
            </tr>
            <tr>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
              <th colSpan={1}>
                <span>사용수량</span>
              </th>
              <th colSpan={1}>
                <span>사용량</span>
              </th>
              <th colSpan={1}>
                <span>평균사용량</span>
              </th>
              <th colSpan={3}>
                <span>사용수량</span>
              </th>
              <th colSpan={3}>
                <span>사용량</span>
              </th>
              <th colSpan={3}>
                <span>평균사용량</span>
              </th>
            </tr>
            <tr className="tr-center">
              <td colSpan={1}>
                <span>{formData.MONTH11}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH11_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH11_AVG.toFixed(2)}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH12}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH12_USE}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.MONTH12_AVG.toFixed(2)}</span>
              </td>
              <td colSpan={3}>
                <span>{formData.CHEMDISCHARGEY}</span>
              </td>
              <td colSpan={3}>
                <span>{formData.CHEMUSAGEY}</span>
              </td>
              <td colSpan={3}>
                <span>{this.calcYearUseAvg(formData)}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

useInfoViewTable.propTypes = {
  formData: PropTypes.object,
};

useInfoViewTable.defaultProps = {};

export default useInfoViewTable;
