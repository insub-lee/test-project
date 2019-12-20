import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import ScrollBar from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

class ReactDataGridCustom extends Component {
  constructor(prop) {
    super(prop);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(values) {
    const { scrollTop, scrollHeight, clientHeight } = values;

    if (scrollHeight > 0) {
      const pad = clientHeight / 1.2; // 100px of the bottom
      // t will be greater than 1 if we are about to reach the bottom
      const t = (scrollTop + pad) / (scrollHeight - clientHeight);

      if (t > 1 || scrollTop === scrollHeight - clientHeight) this.props.readMore();
    }
  }

  render() {
    const {
      scrollHeight,
      columns,
      rowGetter,
      rowsCount,
      rowHeight,
      minHeight,
      // readMore,
    } = this.props;
    console.debug('???', navigator, navigator.userAgent, minHeight);
    const agent = navigator.userAgent.toLowerCase();
    const isIe = (navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || agent.indexOf('msie') !== -1;
    return (
      <ScrollBar
        style={{ width: '100%', height: scrollHeight }}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        onUpdate={values => {
          this.handleUpdate(values);
        }}
      >
        <ReactDataGrid
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={rowsCount}
          rowHeight={rowHeight}
          minHeight={isIe ? minHeight + 26 : minHeight + 7}
          headerRowHeight={-1}
        />
      </ScrollBar>
    );
  }
}

ReactDataGridCustom.defaultProps = {
  readMore: () => {},
  scrollHeight: 300,
};

ReactDataGridCustom.propTypes = {
  readMore: PropTypes.func,
  scrollHeight: PropTypes.number,
  minHeight: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  rowGetter: PropTypes.func.isRequired,
  rowsCount: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
};

export default ReactDataGridCustom;
