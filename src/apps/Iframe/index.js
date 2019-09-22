import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import ReactIframe from 'react-iframe';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from './actions';
import selectors from './selectors';
import reducer from './reducer';
import Styled from './Styled';

class Iframe extends PureComponent {
  constructor(props) {
    super(props);
    const { item } = props;
    if (Object.keys(item.data).length !== 0) {
      props.setUrl(item.data.url, item.WIDGET_ID);
    }
  }

  render() {
    const { item, url } = this.props;
    console.log(item);
    return (
      <Styled>
        <h2>주소:{url}</h2>
        <ReactIframe className="iframeController" url={url}></ReactIframe>
      </Styled>
    );
  }
}
Iframe.defaultProps = {
  url: 'http://www.youtube.com/embed/xDMP3i36naA',
};
Iframe.propTypes = {
  item: PropTypes.object,
  url: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  url: selectors.SelectUrl(),
});

const mapDispatchToProps = dispatch => ({
  setUrl: (url, WIDGET_ID) => dispatch(actions.setUrl(url, WIDGET_ID)),
});

const withReducer = injectReducer({ key: 'iframe-Widget', reducer });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
)(Iframe);
