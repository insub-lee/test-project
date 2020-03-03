import React, { Component } from 'react';
import { Radio, Popover, Checkbox, Button } from 'antd';

import StyledHtmlTable from 'commonStyled/Table/StyledHtmlTable';
import message from 'components/Feedback/message';

class RadioIFoundryComp extends Component {
  state = {
    foundry_flag: undefined,
    division: [],
    place: '',
    isPopOver: false,
  };

  radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  onClickFoundry = () => {
    const { changeFormData, sagaKey, COMP_FIELD } = this.props;
    const { division, place } = this.state;
    if (division.length > 0 && place !== '' && place !== undefined) {
      changeFormData(sagaKey, COMP_FIELD, 'Y');
      changeFormData(sagaKey, 'DIVISION', division.join());
      changeFormData(sagaKey, 'PLACE', place);
      this.setState({ isPopOver: false });
    } else {
      message.success('Application Division 및 Registration Place 를 선택해 주세요', 2);
    }
  };

  onChangeAppDivision = values => {
    this.setState({ division: values });
  };

  onChangePlace = e => {
    this.setState({ place: e.target.value });
  };

  onChangeDivision = e => {
    const { sagaKey, COMP_FIELD, changeFormData } = this.props;
    if (e.target.value === 'Y') {
      this.setState({ isPopOver: true });
      changeFormData(sagaKey, COMP_FIELD, undefined);
    } else {
      this.setState({ foundry_flag: 'N', division: [], place: '', isPopOver: false }, () => {
        const { division, place } = this.state;
        changeFormData(sagaKey, COMP_FIELD, 'N');
        changeFormData(sagaKey, 'DIVISION', division.join());
        changeFormData(sagaKey, 'PLACE', place);
      });
    }
  };

  onInitData = () => {
    console.debug('initdata');
  };

  render() {
    const { colData, formData } = this.props;
    console.debug('colData', colData);
    const content = (
      <StyledHtmlTable>
        <table>
          <tbody>
            <tr>
              <th>Application Division</th>
              <td>
                <Checkbox.Group value={this.state.division} onChange={this.onChangeAppDivision}>
                  <Checkbox value="CE">CE</Checkbox>
                  <Checkbox value="DISPLAY">DISPLAY</Checkbox>
                  <Checkbox value="POWER">POWER</Checkbox>
                  <Checkbox value="FSG">FSG</Checkbox>
                </Checkbox.Group>
              </td>
            </tr>
            <tr>
              <th>
                Registration Place<br></br>(Select 1 item)
              </th>
              <td>
                <Radio.Group value={this.state.place} onChange={this.onChangePlace}>
                  <Radio value="Full-Set" style={this.radioStyle}>
                    Full-Set
                  </Radio>
                  <Radio value="Updating" style={this.radioStyle}>
                    Updating
                  </Radio>
                </Radio.Group>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'right' }}>
                <Button onClick={this.onClickFoundry}>적용</Button>
                <Button>취소</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );

    return (
      <>
        <Radio.Group onChange={this.onChangeDivision} value={colData}>
          <Popover placement="bottom" visible={this.state.isPopOver} style={{ width: '500px' }} content={content}>
            <Radio value="Y">Y</Radio>
          </Popover>
          <Radio value="N">N</Radio>
          <Button>초기화</Button>
        </Radio.Group>
        <StyledHtmlTable style={{ display: colData === 'Y' ? 'inline-block' : 'none', marginTop: '2px' }}>
          <table>
            <tbody>
              <tr>
                <th>Application Division</th>
                <td>{this.state.division.join()}</td>
              </tr>
              <tr>
                <th>Registration Place</th>
                <td>{this.state.place}</td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </>
    );
  }
}

export default RadioIFoundryComp;
