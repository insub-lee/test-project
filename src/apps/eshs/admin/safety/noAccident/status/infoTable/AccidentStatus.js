import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

class NoAccidentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRow = formData => {
    const jsx = [];
    for (let i = 1; i < 4; i += 1) {
      jsx.push(
        <tr className="tr-center">
          <td>{formData[`AREA_${i}`]}</td>
          <td>{formData[`NO_ACCIDENT_DT_${i}`]}</td>
          <td>{formData[`TARGET_${i}`]}</td>
          <td>{formData[`TOTAL_${i}`]}</td>
          <td>{formData[`RATE_${i}`]}</td>
        </tr>,
      );
    }
    return jsx;
  };

  render() {
    const { info } = this.props;
    return (
      <StyledHtmlTable>
        <table>
          <colgroup>
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <tbody>
            <tr>
              <th>
                <span>지역</span>
              </th>
              <th>
                <span>무재해 시작일</span>
              </th>
              <th>
                <span>목표시간</span>
              </th>
              <th>
                <span>달성시간</span>
              </th>
              <th>
                <span>달성배수</span>
              </th>
            </tr>
            {info && this.renderRow(info)}
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

NoAccidentStatus.propTypes = {
  info: PropTypes.object,
};

NoAccidentStatus.defaultProps = {
  info: {},
};

export default NoAccidentStatus;
