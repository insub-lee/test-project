import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

Moment.locale('ko');
class LabelDateWithoutTime extends React.Component {
  render() {
    const { colData, visible, CONFIG, isSearch, searchCompRenderer } = this.props;
    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }
    if (!visible) {
      return '';
    }
    if (!colData || colData === '' || colData === ' ') {
      return <span className={CONFIG.property.className || ''}> </span>;
    }
    return <span className={CONFIG.property.className || ''}>{Moment(colData).format('YYYY-MM-DD')}</span>;
  }
}

LabelDateWithoutTime.propTypes = {
  colData: PropTypes.string,
  visible: PropTypes.string,
  CONFIG: PropTypes.any,
  isSearch: PropTypes.bool,
  searchCompRenderer: PropTypes.func,
};

export default LabelDateWithoutTime;
