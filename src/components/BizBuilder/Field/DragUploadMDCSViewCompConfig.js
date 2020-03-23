import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Select, Input } from 'antd';
import StyledHtmlTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';

const { Option } = Select;

class DragUploadMDCSViewCompConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downType: undefined,
      drmInfo: { pr: undefined, uc: undefined, bk: undefined, ed: undefined },
      aclList: [],
      optList: [],
    };
  }

  initDataBind = response => {
    const {
      configInfo: {
        property: { selectedValue },
      },
    } = this.props;
    const { aclList: list } = response;
    const optList = list.map(item => <Option key={item.IDX}>{item.ACL_DESC}</Option>);
    this.setState({ ...selectedValue, aclList: list, optList });
  };

  componentDidMount() {
    const { submitHandlerBySaga, configInfo } = this.props;
    const apiUrl = '/api/mdcs/v1/common/drmAclHandler';
    submitHandlerBySaga('GET', apiUrl, {}, this.initDataBind);
  }

  onChangeDownType = e => {
    const { value } = e.target;
    this.setState(
      prevState => ({ ...prevState, downType: value }),
      () => this.onSaveConfig(),
    );
  };

  onChangeDRM = value => {
    const { aclList } = this.state;
    const idx = aclList.findIndex(f => f.IDX === Number(value));
    if (idx > -1) {
      const selectedAcl = aclList[idx];
      this.setState({ drmInfo: { pr: selectedAcl.PR, uc: selectedAcl.UC, bk: selectedAcl.BK, ed: selectedAcl.ED } }, () => this.onSaveConfig());
    }
  };

  onSaveConfig = () => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    const { downType, drmInfo } = this.state;
    configInfo.property.selectedValue = { downType, drmInfo };
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  onChangePrint = e => {
    const { value } = e.target;
    const { drmInfo } = this.state;
    const tDrmInfo = { ...drmInfo, pr: value };
    this.setState({ drmInfo: tDrmInfo }, () => this.onSaveConfig());
  };

  onChangeContorl = e => {
    const { value } = e.target;
    const { drmInfo } = this.state;
    const tDrmInfo = { ...drmInfo, uc: value };
    this.setState({ drmInfo: tDrmInfo }, () => this.onSaveConfig());
  };

  onChangeCopyPaste = e => {
    const { value } = e.target;
    const { drmInfo } = this.state;
    const tDrmInfo = { ...drmInfo, bk: value };
    this.setState({ drmInfo: tDrmInfo }, () => this.onSaveConfig());
  };

  onChangeExpire = e => {
    const { value } = e.target;
    const { drmInfo } = this.state;
    const tDrmInfo = { ...drmInfo, ed: value };
    this.setState({ drmInfo: tDrmInfo }, () => this.onSaveConfig());
  };

  render() {
    const {
      downType,
      drmInfo: { pr, uc, bk, ed },
      optList,
    } = this.state;
    console.debug('this.state', this.state);
    return (
      <StyledHtmlTable>
        <table>
          <tbody>
            <tr>
              <th>다운로드 형식</th>
              <td>
                <Radio.Group value={downType} onChange={this.onChangeDownType}>
                  <Radio value="DRM">다운로드(DRM적용)</Radio>
                  <Radio value="PDF">PDF 다운로드</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th>DRM 정책</th>
              <td>
                <Select style={{ width: '300px' }} placeholder="DRM 정책을 선택해주세요" onChange={this.onChangeDRM}>
                  {optList}
                </Select>
              </td>
            </tr>
            <tr>
              <th>Print</th>
              <td>
                <Radio.Group value={pr} onChange={this.onChangePrint}>
                  <Radio value="1">YES</Radio>
                  <Radio value="0">NO</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th>Control/Uncontrol</th>
              <td>
                <Radio.Group value={uc} onChange={this.onChangeContorl}>
                  <Radio value="C">Controlled</Radio>
                  <Radio value="U">UnControlled</Radio>
                  <Radio value="P">Preliminary</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th>Copy & Paste</th>
              <td>
                <Radio.Group value={bk} onChange={this.onChangeCopyPaste}>
                  <Radio value="1">YES</Radio>
                  <Radio value="0">NO</Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <th>Expire Date</th>
              <td>
                <Input value={ed} onChange={this.onChangeExpire}></Input>
              </td>
            </tr>
          </tbody>
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
