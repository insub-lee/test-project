import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import ReactIframe from 'react-iframe';
import { connect } from 'react-redux';
import { compose } from 'redux';
import selectors from './selectors';
import reducer from './reducer';
import Styled from './Styled';

class Iframe extends PureComponent {
  render() {
    const { item, url } = this.props;
    console.log(item);
    return (
      <Styled>
        <ReactIframe url={url}></ReactIframe>
      </Styled>
    );
  }
}
Iframe.defaultProps = {
  url: '',
};
Iframe.propTypes = {
  item: PropTypes.object,
  url: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  url: selectors.SelectUrl(),
});
const withReducer = injectReducer({ key: 'iframe-Widget', reducer });
const withConnect = connect(mapStateToProps);

export default compose(
  withReducer,
  withConnect,
)(Iframe);
