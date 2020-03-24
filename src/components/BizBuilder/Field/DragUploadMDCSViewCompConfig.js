import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Select, Input } from 'antd';
import StyledHtmlTable from 'commonStyled/Table/StyledHtmlTable';

class DragUploadMDCSViewCompConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downType: undefined,
      drmInfo: {},
    };
  }

  onChangeDownType = e => {
    const { value } = e.target;
    this.setState({ downType: value });
  };

  render() {
    const { downType } = this.state;
    return (
      <StyledHtmlTable>
        <table>
          <tr>
            <td>다운로드 형식</td>
            <td>
              <Radio.Group value={downType} onChange={this.onChangeDownType}>
                <Radio value="DRM">다운로드(DRM적용)</Radio>
                <Radio value="PDF">PDF 다운로드</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>*DRM 설정</td>
          </tr>
          <tr>
            <td>Print</td>
            <td>
              <Radio.Group>
                <Radio>YES</Radio>
                <Radio>NO</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td>Control/Uncontrol</td>
            <td>
              <Radio.Group>
                <Radio>Controlled</Radio>
                <Radio>UnControlled</Radio>
                <Radio>Preliminary</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td>Copy & Paste</td>
            <td>
              <Radio.Group>
                <Radio>YES</Radio>
                <Radio>NO</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td>Expire Date</td>
            <td>
              <Input></Input>
            </td>
          </tr>
        </table>
      </StyledHtmlTable>
    );
  }
}

DragUploadMDCSViewCompConfig.propTypes = {
  apiArray: PropTypes.array,
};

DragUploadMDCSViewCompConfig.defaultProps = {
  apiArray: [{ key: 'list', url: `MdcsDrmAclHandler.java`, type: 'GET' }],
};

export default DragUploadMDCSViewCompConfig;
