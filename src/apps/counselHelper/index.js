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
    if (Object.keys(initData).length === 0) {
      console.log('객체빈값');
    } else {
      console.log(initData.categorie);
      this.props.getDetail(initData.categorie);
    }
    this.state = {
      detail: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.detail);
    this.setState({
      detail: nextProps.detail,
    });
  }

  render() {
    const { item } = this.props;
    console.log('아이템값');
    console.log(item);
    return (
      <StyleWidget>
        <HelperWidget detail={this.state.detail} />
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
  getDetail: PRNT_ID => dispatch(actions.getDetail(PRNT_ID)),
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
