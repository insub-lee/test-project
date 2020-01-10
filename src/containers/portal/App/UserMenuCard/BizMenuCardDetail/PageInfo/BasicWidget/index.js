import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import Loadable from 'react-loadable';
// import Loading from './Loading';
// import Card from '../../../../components/uielements/Card/card.style';
import BizStorePreviewWidget from 'containers/store/components/BizStorePreviewWidget';

class BasicWidget extends PureComponent {
  render() {
    const { item } = this.props;

    return <BizStorePreviewWidget item={item} />;
  }
}

BasicWidget.propTypes = {
  item: PropTypes.object.isRequired,
};
export default BasicWidget;
