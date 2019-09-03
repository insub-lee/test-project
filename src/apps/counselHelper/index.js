import React, { PureComponent } from 'react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import HelperWidget from './helperWidget';
import StyleWidget from './StyleWidget';

class Widget extends PureComponent {
  constructor(props) {
    super(props);
    const initData = this.props.item.data;
    const initId = this.props.item.WIDGET_ID;
    if (Object.keys(initData).length === 0) {
    } else {
      this.props.getDetail(initData.categorie, initId);
    }
  }

  render() {
    const { item, detail } = this.props;

    return (
      <StyleWidget>
        <HelperWidget detail={detail} />
      </StyleWidget>
    );
  }
}
Widget.propTypes = {
  getDetail: PropTypes.func,
  detail: PropTypes.object,
};

Widget.defaultProps = {
  detail: [],
};

const mapStateToProps = createStructuredSelector({
  detail: selectors.makeSelectDetail(),
});

const mapDispatchToProps = dispatch => ({
  getDetail: (PRNT_ID, WIDGET_ID) => dispatch(actions.getDetail(PRNT_ID, WIDGET_ID)),
});

const withReducer = injectReducer({ key: 'apps-Widget', reducer });
const withSaga = injectSaga({ key: 'apps-Widget', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Widget);
