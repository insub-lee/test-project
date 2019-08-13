import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import View from 'components/WorkBuilder/View';
import Preloader from 'components/Preloader';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';

class WorkBuilderViewerPage extends Component {
  componentDidMount() {
    console.debug('Boot......두두두두두두');
    const { apiUrl, getView } = this.props;
    console.debug('@ api url', apiUrl);
    getView(apiUrl);
  }

  componentWillUnmount() {
    const { resetData } = this.props;
    resetData();
  }

  render() {
    const {
      boxes, resultFormStuffs, isLoading,
    } = this.props;
    return (
      <Wrapper>
        <Preloader spinning={isLoading}>
          <View boxes={boxes} formStuffs={resultFormStuffs} readOnly />
        </Preloader>
      </Wrapper>
    );
  }
}

WorkBuilderViewerPage.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.object),
  resultFormStuffs: PropTypes.arrayOf(PropTypes.object),
  getView: PropTypes.func,
  apiUrl: PropTypes.string.isRequired,
  resetData: PropTypes.func,
  isLoading: PropTypes.bool,
};

WorkBuilderViewerPage.defaultProps = {
  boxes: [],
  resultFormStuffs: [],
  getView: () => console.debug('no bind events'),
  resetData: () => console.debug('no bind events'),
  isLoading: true,
};

const mapStateToProps = createStructuredSelector({
  boxes: selectors.makeSelectBoxes(),
  resultFormStuffs: selectors.makeSelectResultFormStuffs(),
  isLoading: selectors.makeSelectIsLoading(),
});

const mapDispatchToProps = dispatch => ({
  getView: apiUrl => dispatch(actions.getView(apiUrl)),
  resetData: () => dispatch(actions.resetData()),
});

const withReducer = injectReducer({ key: 'work-builder-view-page', reducer });
const withSaga = injectSaga({ key: 'work-builder-view-page', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WorkBuilderViewerPage);
