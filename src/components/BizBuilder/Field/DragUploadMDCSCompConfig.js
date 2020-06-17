import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Select, Input } from 'antd';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';

const { Option } = Select;

class DragUploadMDCSCompConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserPDF: undefined,
    };
  }

  componentDidMount() {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property.isUsePDF = configInfo.property.isUsePDF || 0;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  }

  onChangePDF = e => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    const { value } = e.target;
    // changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
    configInfo.property.isUsePDF = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const {
      configInfo: { property },
    } = this.props;

    return (
      <StyledHtmlTable>
        <table>
          <tbody>
            <tr>
              <th>PDF변환 여부</th>
              <td>
                <Radio.Group value={property && property.isUsePDF} defaultValue={1} onChange={this.onChangePDF}>
                  <Radio value={0}>미사용</Radio>
                  <Radio value={1}>사용</Radio>
                </Radio.Group>
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

export default DragUploadMDCSCompConfig;
