import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';
import Edit from './Edit';

class ComponentPool extends PureComponent {
  render() {
    const { viewType, match } = this.props;

    const typeValue = viewType || match.params.viewType;

    switch (typeValue) {
      case 'edit':
        return <BizMicroDevBase id="ComponentPool_Edit" component={Edit} {...this.props} />;

      case 'list':
        return <BizMicroDevBase id="ComponentPool_List" component={List} {...this.props} />;

      default:
        return <BizMicroDevBase id="ComponentPool_List" component={List} {...this.props} />;
    }
  }
}

ComponentPool.propTypes = {
  viewType: PropTypes.string,
};

ComponentPool.defaultProps = {
  viewType: 'list',
};

export default ComponentPool;
