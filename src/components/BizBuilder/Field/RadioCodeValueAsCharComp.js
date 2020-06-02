import React, { Component } from 'react';
import { Radio } from 'antd';

class RadioCodeValueAsCharComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG, colData } = this.props;
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
        this.setState({
          dataSource: fieldSelectData[CONFIG.property.compSelectDataKey]
            .filter(f => f.LVL !== 0 && f.USE_YN === 'Y')
            .map(item => ({ label: item.NAME_KOR, value: item.CODE })),
        });
      }
    }
  }

  onChangeRadio = e => {
    const { sagaKey, COMP_FIELD, changeFormData } = this.props;
    changeFormData(sagaKey, COMP_FIELD, e.target.value);
  };

  render() {
    const { colData, readOnly, CONFIG } = this.props;
    const { dataSource } = this.state;
    return <Radio.Group onChange={this.onChangeRadio} options={dataSource} value={colData} disabled={readOnly || CONFIG.property.readOnly}></Radio.Group>;
  }
}

export default RadioCodeValueAsCharComp;
