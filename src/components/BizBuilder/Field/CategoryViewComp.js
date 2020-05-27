import React, { Component } from 'react';

class CategoryViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: undefined,
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG, formData, colData } = this.props;
    console.debug('filed', fieldSelectData, CONFIG, this.props);
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
        const signOfChnList = fieldSelectData[CONFIG.property.compSelectDataKey];
        const idx = signOfChnList.findIndex(f => f.NODE_ID === Number(colData));
        const cateNode = signOfChnList[idx];
        console.debug('sign', signOfChnList, signOfChnList[idx]);
        this.setState({ textValue: cateNode.NAME_KOR });
      }
    }
  }

  render() {
    const { textValue } = this.state;
    return <div>{textValue}</div>;
  }
}

export default CategoryViewComp;
