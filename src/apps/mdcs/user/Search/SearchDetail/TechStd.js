import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StyledCheckbox from 'components/FormStuff/Checkbox';

import StyledHtmlTable from 'commonStyled/Table/StyledHtmlTable';

class TechStd extends Component {
  render() {
    return (
      <StyledHtmlTable>
        <table>
          <thead>
            <tr>
              <th colSpan="4">기술표준 정보선택</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>중분류</th>
              <td></td>
            </tr>
            <tr>
              <th>SCOPE</th>
              <td></td>
            </tr>
            <tr>
              <th>Change</th>
              <td></td>
            </tr>
            <tr>
              <th>FMEA 대상</th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

TechStd.propTypes = {};

TechStd.defaultProps = {};

export default TechStd;
