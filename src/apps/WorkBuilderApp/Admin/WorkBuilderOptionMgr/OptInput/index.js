import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Input, Select } from 'antd';
import TableWrapper from 'commonStyled/AdminStyled/TableWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const { Option } = Select;
class OptInput extends Component {
  render() {
    const { id } = this.props;
    console.debug(this.props);
    return (
      <TableWrapper>
        <div className="inner">
          <table>
            <tbody>
              <tr className="item">
                <th className="item-title">옵션명</th>
                <td className="item-cont">
                  <AntdInput value={this.props.formData.OPT_NAME} onChange={e => this.props.changeFormData(id, 'OPT_NAME', e.target.value)}></AntdInput>
                </td>
              </tr>
              <tr className="item">
                <th className="item-title">사용자App 경로</th>
                <td className="item-cont">
                  <AntdInput value={this.props.formData.OPT_APP_SRC} onChange={e => this.props.changeFormData(id, 'OPT_APP_SRC', e.target.value)}></AntdInput>
                </td>
              </tr>
              <tr className="item">
                <th className="item-title">관리자 설정경로</th>
                <td className="item-cont">
                  <AntdInput
                    value={this.props.formData.OPT_APP_SETTING_SRC}
                    onChange={e => this.props.changeFormData(id, 'OPT_APP_SETTING_SRC', e.target.value)}
                  ></AntdInput>
                </td>
              </tr>
              <tr className="item">
                <th className="item-title">사용여부</th>
                <td className="item-cont">
                  <Select
                    value={this.props.formData.ISUSED}
                    placeholder="사용여부를 선택해주세요"
                    onChange={val => this.props.changeFormData(id, 'ISUSED', val)}
                    style={{ width: '300px' }}
                  >
                    <Option value="Y">사용</Option>
                    <Option value="N">미사용</Option>
                  </Select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TableWrapper>
    );
  }
}

export default OptInput;
