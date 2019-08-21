import React, { PureComponent } from 'react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Config from './config';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
class testConfig extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getWidgetInfo();
  }

  HandleCategorieChange = PRNT_ID => {
    this.props.getDetail(PRNT_ID);
  };

  render() {
    const { categorie } = this.props;
    return (
      <div>
        <Config item={categorie} onCategorieChange={this.HandleCategorieChange}></Config>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  categorie: selectors.makeSelectWidget(),
  detail: selectors.makeSelectDetail(),
});

const mapDispatchToProps = dispatch => ({
  getWidgetInfo: () => dispatch(actions.getWidgetInfo()),
  getDetail: PRNT_ID => dispatch(actions.getDetail(PRNT_ID)),
});

const withReducer = injectReducer({ key: 'test-Widget', reducer });
const withSaga = injectSaga({ key: 'test-Widget', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(testConfig);
