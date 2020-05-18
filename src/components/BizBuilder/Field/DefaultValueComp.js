import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';

class DefaultValueComp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const compData = (this.props && this.props.CONFIG && this.props.CONFIG.property && this.props.CONFIG.property.compData) || [];
    const setItems = compData.filter(c => c.DEFAULT_VALUE);
    if (0 in setItems) {
      this.setFormData(setItems);
    }
  }

  setFormData = list => {
    const { sagaKey: id, setFormData, formData } = this.props;

    const dfForm = list.reduce((result, item) => {
      const itemType = (item.CONFIG && item.CONFIG.info && item.CONFIG.info.type) || '';
      const dfVal = item.DEFAULT_VALUE;
      let val = '';
      if (dfVal) {
        switch (itemType) {
          case ('CHAR', 'VARCHAR', 'TEXT'):
            val = dfVal;
            break;
          case ('FLOAT', 'DOUBLE', 'INT'):
            val = eval(dfVal);
            break;
          case 'TIMESTAMP':
            if (dfVal === 'NOW()' || dfVal === 'now()') {
              val = moment(new Date()).format('YYYY-MM-DD');
            } else {
              val = moment(dfVal).format('YYYY-MM-DD');
            }
            break;
          default:
            val = dfVal;
            break;
        }
      }
      result[item.COMP_FIELD] = val;
      return result;
    }, {});

    setFormData(id, { ...formData, ...dfForm });
  };

  render() {
    return '';
  }
}

DefaultValueComp.propTypes = {
  setFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  formData: PropTypes.object,
  CONFIG: PropTypes.object,
};

export default DefaultValueComp;
