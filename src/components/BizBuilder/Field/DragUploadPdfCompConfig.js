import React, { Component } from 'react';
import { Input } from 'antd';

class DragUploadPdfCompConfig extends Component {
  constructor(props) {
    super(props);
  }

  onChangeFileApi = e => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    const { value } = e.target;
    configInfo.property.selectedValue = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const {
      configInfo: { property },
    } = this.props;
    const { selectedValue } = property;
    return (
      <div>
        <table style={{ width: '100%' }}>
          <tr>
            <td>파일저장API : </td>
            <td>
              <Input stype={{ width: '100%' }} onChange={this.onChangeFileApi} value={selectedValue}></Input>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default DragUploadPdfCompConfig;
