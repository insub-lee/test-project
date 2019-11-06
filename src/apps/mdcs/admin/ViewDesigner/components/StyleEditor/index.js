import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

import Styled from './Styled';

class StyleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthValue: '',
      widthType: '',
      heightValue: '',
      heightType: '',
    };
  }

  componentDidMount() {
    const {
      style: { width, height },
    } = this.props;
    const widthValue = parseFloat(width).toString();
    const widthType = width.replace(widthValue, '');
    const heightValue = parseFloat(height).toString();
    const heightType = height.replace(heightValue, '');
    this.setState({ widthValue, widthType, heightValue, heightType });
  }

  onChangeWidthValue = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      const { widthType } = this.state;
      this.setState({ widthValue: widthType === '%' && Number(value) > 100 ? '100' : value }, () => this.updateBodyStyle());
    }
  };

  onChangeHeightValue = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      const { heightType } = this.state;
      this.setState({ heightValue: heightType === '%' && Number(value) > 100 ? '100' : value }, () => this.updateBodyStyle());
    }
  };

  onChangeWidthType = value => {
    this.setState(
      prevState => {
        const { widthValue } = prevState;
        return { widthType: value, widthValue: value === '%' && Number(widthValue) > 100 ? '100' : widthValue };
      },
      () => this.updateBodyStyle(),
    );
  };

  onChangeHeightType = value => {
    this.setState(
      prevState => {
        const { heightValue } = prevState;
        return { heightType: value, heightValue: value === '%' && Number(heightValue) > 100 ? '100' : heightValue };
      },
      () => this.updateBodyStyle(),
    );
  };

  updateBodyStyle = () => {
    const { widthValue, widthType, heightValue, heightType } = this.state;
    const {
      action: { updateBodyStyle },
    } = this.props;
    updateBodyStyle(`${widthValue}${widthType}`, `${heightValue}${heightType}`);
  };

  render() {
    const { widthValue, widthType, heightValue, heightType } = this.state;
    return (
      <Styled>
        <Input
          className="style-editor-input"
          addonBefore={<div>Width</div>}
          addonAfter={
            <Select style={{ width: 70 }} value={widthType} name="widthType" onChange={this.onChangeWidthType}>
              <Select.Option value="%">%</Select.Option>
              <Select.Option value="px">px</Select.Option>
            </Select>
          }
          name="widthValue"
          value={widthValue}
          onChange={this.onChangeWidthValue}
        />
        <span className="blank-divider" />
        <Input
          className="style-editor-input"
          addonBefore={<div>Height</div>}
          addonAfter={
            <Select style={{ width: 70 }} value={heightType} name="heightType" onChange={this.onChangeHeightType}>
              <Select.Option value="%">%</Select.Option>
              <Select.Option value="px">px</Select.Option>
            </Select>
          }
          name="heightValue"
          value={heightValue}
          onChange={this.onChangeHeightValue}
        />
      </Styled>
    );
  }
}

StyleEditor.propTypes = {
  style: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  action: PropTypes.shape({
    updateBodyStyle: PropTypes.func,
  }),
};

StyleEditor.defaultProps = {
  style: {
    width: '0',
    height: '0',
  },
  action: PropTypes.shape({
    updateBodyStyle: () => {},
  }),
};

export default StyleEditor;
