import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import ScrollBar from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';

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
    const { minHeight } = this.props;
    let nextMinHeight = minHeight;
    const agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || agent.indexOf('msie') !== -1) {
      // ie일 경우
      nextMinHeight += 26;
    } else {
      nextMinHeight += 7;
    }

    return (
      <div style={{ width: '100%' }}>
        <AutoSizer>
          {({ width, height }) => (
            <ScrollBar
              style={{ width, height }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              onUpdate={values => {
                this.handleUpdate(values);
              }}
            >
              <ReactDataGrid {...this.props} minHeight={nextMinHeight} headerRowHeight={-1} />
            </ScrollBar>
          )}
        </AutoSizer>
      </div>
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
};

export default ReactDataGridCustom;
