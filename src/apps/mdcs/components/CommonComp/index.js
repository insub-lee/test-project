import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CheckboxGroup from './CheckboxGroup'; // 체크박스 컴포넌트
import DocSelect from './DocSelect';

class CommonComp extends PureComponent {
  render() {
    const { compType, match } = this.props;
    const compTypeValue = compType || match.params.viewType;

    switch (compTypeValue) {
      case 'checkbox':
        return <DocSelect {...this.props} />;

      default:
        return <DocSelect {...this.props} />;
    }
  }
}

CommonComp.propTypes = {
  compType: PropTypes.string,
};

CommonComp.defaultProps = {
  compType: 'checkbox',
};

export default CommonComp;
