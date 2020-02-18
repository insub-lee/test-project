import React, { Component } from 'react';
import { Form, Select } from 'antd';

import PropTypes from 'prop-types';

import StyledHtmlTable from 'commonStyled/Table/StyledHtmlTable';
const FormItem = Form.Item;
const { Option } = Select;

class DwStd extends Component {
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

DwStd.propTypes = {};

DwStd.defaultProps = {};

export default DwStd;
