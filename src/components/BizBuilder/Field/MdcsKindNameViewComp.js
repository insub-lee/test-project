import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

class MdcsKindNameViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullPathName: undefined,
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG } = this.props;
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey]) {
        const fullPath = fieldSelectData[CONFIG.property.compSelectDataKey];
        const { FULLPATH_NM } = fullPath;
        this.setState({ fullPathName: FULLPATH_NM && FULLPATH_NM.indexOf('>') > -1 ? FULLPATH_NM.split('>')[0] : FULLPATH_NM || '' });
      }
    }
  }

  render() {
    const { fullPathName } = this.state;
    const { visible } = this.props;
    return visible && <label>{fullPathName}</label>;
  }
}

MdcsKindNameViewComp.propTypes = {
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  sagaKey: PropTypes.object,
  colData: PropTypes.any,
  visible: PropTypes.bool,
};

MdcsKindNameViewComp.defaultProps = {
  visible: false,
};

export default MdcsKindNameViewComp;
