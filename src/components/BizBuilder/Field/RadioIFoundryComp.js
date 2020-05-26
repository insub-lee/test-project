import React, { Component } from 'react';
import { Radio, Popover, Checkbox, Button } from 'antd';

import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
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

  componentDidMount() {
    const { colData, formData } = this.props;
    const { DIVISION, PLACE: place } = formData;
    this.setState({ foundry_flag: colData, division: DIVISION.split(','), place });
  }

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
    const { sagaKey, COMP_FIELD, changeFormData, formData } = this.props;
    this.setState({ foundry_flag: e.target.value });
    if (e.target.value === 'Y') {
      const { DIVISION, PLACE: place } = formData;
      this.setState({ isPopOver: true, foundry_flag: e.target.value, division: DIVISION.split(','), place });
    } else {
      this.setState({ foundry_flag: e.target.value, division: [], place: '', isPopOver: false });
      changeFormData(sagaKey, COMP_FIELD, 'N');
      changeFormData(sagaKey, 'DIVISION', '');
      changeFormData(sagaKey, 'PLACE', '');
    }
  };

  onCancel = () => {
    this.setState({ isPopOver: false });
  };

  render() {
    const { colData, formData } = this.props;
    const { foundry_flag } = this.state;
    const { DIVISION, PLACE } = formData;
    console.debug('colData', colData);
    const content = (
      <StyledHtmlTable className="radioFoundry">
        <table>
          <tbody>
            <tr>
              <th>Application Divisiondd</th>
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
          </tbody>
        </table>
        <div className="applyButtonWrapper">
          <StyledButton className="btn-primary btn-sm" style={{ marginRight: '5px' }} type="primary" onClick={this.onClickFoundry}>
            적용
          </StyledButton>
          <StyledButton className="btn-light btn-sm" onClick={this.onCancel}>
            취소
          </StyledButton>
        </div>
      </StyledHtmlTable>
    );
    return (
      <>
        <Checkbox.Group value={foundry_flag}>
          <Popover placement="bottom" visible={this.state.isPopOver} style={{ width: '500px' }} content={content}>
            <Checkbox onChange={this.onChangeDivision} value="Y">
              Y
            </Checkbox>
          </Popover>
          <Checkbox onChange={this.onChangeDivision} value="N">
            N
          </Checkbox>
        </Checkbox.Group>
        <StyledHtmlTable className="radioFoundryResult" style={{ display: foundry_flag === 'Y' ? 'inline-block' : 'none', marginTop: '8px', width: '100%' }}>
          <table>
            <tbody>
              <tr>
                <th>Application Division</th>
                <td>{DIVISION && DIVISION.split(',').join()}</td>
              </tr>
              <tr>
                <th>Registration Place</th>
                <td>{PLACE}</td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </>
    );
  }
}

export default RadioIFoundryComp;
