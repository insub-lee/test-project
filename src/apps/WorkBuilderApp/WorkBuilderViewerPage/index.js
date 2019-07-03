import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import View from 'components/WorkBuilder/View';

import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';

class WorkBuilderViewerPage extends Component {
  componentDidMount() {
    console.debug('Boot......두두두두두두');
    const {
      getView,
      match: { params },
    } = this.props;
    const { ID } = params;
    getView(ID);
  }

  submitData = e => {
    console.debug(e.target);
    const data = new FormData(e.target);
    const payload = {};
    data.forEach((value, key) => {
      payload[key] = value;
      console.debug(key, value);
    });

    console.debug('# Payload', payload);
  };

  render() {
    const { boxes, formStuffs, submitData } = this.props;
    return (
      <Wrapper>
        <div className="title">
          <h3>무슨 무슨 앱</h3>
        </div>
        <hr />
        <div>
          <View boxes={boxes} formStuffs={formStuffs} submitData={submitData} />
        </div>
      </Wrapper>
    );
  }
}

WorkBuilderViewerPage.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.object),
  formStuffs: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object.isRequired,
  getView: PropTypes.func,
  submitData: PropTypes.func,
};

WorkBuilderViewerPage.defaultProps = {
  boxes: [],
  formStuffs: [],
  getView: () => console.debug('no bind events'),
  submitData: () => console.debug('no bind events'),
};

const mapStateToProps = createStructuredSelector({
  boxes: selectors.makeSelectBoxes(),
  formStuffs: selectors.makeSelectFormStuffs(),
});

const mapDispatchToProps = dispatch => ({
  getView: id => dispatch(actions.getView(id)),
  submitData: ({ target }) => {
    const data = new FormData(target);
    const payload = {};
    data.forEach((value, key) => {
      payload[key] = data.getAll(key).join(',');
    });
    console.debug(payload);
    dispatch(actions.postData(payload));
  },
});

const withReducer = injectReducer({ key: 'work-builder-viewer-page', reducer });
const withSaga = injectSaga({ key: 'work-builder-viewer-page', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(WorkBuilderViewerPage);
