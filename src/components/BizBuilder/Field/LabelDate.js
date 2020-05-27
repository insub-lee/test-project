import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

Moment.locale('ko');
class LabelDate extends React.Component {
  render() {
    const { colData, visible, CONFIG, isSearch, searchCompRenderer } = this.props;
    if (isSearch && visible && CONFIG.property.searchType !== 'CUSTOM') {
      return searchCompRenderer(this.props);
    }
    return visible ? (
      <span className={CONFIG.property.className || ''}>{colData === 'NOW()' ? Moment().format('YYYY-MM-DD') : Moment(colData).format('YYYY-MM-DD')}</span>
    ) : (
      ''
    );
  }
}

LabelDate.propTypes = {
  colData: PropTypes.string,
  visible: PropTypes.bool,
  CONFIG: PropTypes.any,
  isSearch: PropTypes.bool,
  searchCompRenderer: PropTypes.func,
};

export default LabelDate;
