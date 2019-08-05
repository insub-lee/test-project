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
      workSeq,
    } = this.props;
    getView(workSeq);
  }

  render() {
    const {
      boxes, resultFormStuffs, workSeq, taskSeq,
    } = this.props;
    return (
      <Wrapper className="ag-theme-balham" style={{ height: 300, width: '100%' }}>
        <View boxes={boxes} formStuffs={resultFormStuffs} workSeq={workSeq} taskSeq={taskSeq} />
      </Wrapper>
    );
  }
}

WorkBuilderViewerPage.propTypes = {
  boxes: PropTypes.arrayOf(PropTypes.object),
  resultFormStuffs: PropTypes.arrayOf(PropTypes.object),
  getView: PropTypes.func,
  workSeq: PropTypes.number.isRequired,
  taskSeq: PropTypes.number.isRequired,
};

WorkBuilderViewerPage.defaultProps = {
  boxes: [],
  resultFormStuffs: [],
  getView: () => console.debug('no bind events'),
};

const mapStateToProps = createStructuredSelector({
  columns: selectors.makeSelectColumns(),
  list: selectors.makeSelectList(),
  boxes: selectors.makeSelectBoxes(),
  formStuffs: selectors.makeSelectFormStuffs(),
  isOpenFormModal: selectors.makeSelectIsOpenFormModal(),
  isOpenEditModal: selectors.makeSelectIsOpenEditModal(),
  resultFormStuffs: selectors.makeSelectResultFormStuffs(),
  workSeq: selectors.makeSelectWorkSeq(),
  taskSeq: selectors.makeSelectTaskSeq(),
  workFLow: selectors.makeSelectWorkFlow(),
  workFlowConfig: selectors.makeSelectWorkFlowConfig(),
});

const mapDispatchToProps = dispatch => ({
  getView: id => dispatch(actions.getView(id)),
  submitData: ({ target }, signLineRef) => {
    if (signLineRef) {
      console.debug('SignLine Data', signLineRef.current);
    }
    const data = new FormData(target);
    const payload = {};
    data.forEach((value, key) => {
      const node = document.querySelector(`[name="${key}"]`);
      const dataType = node.getAttribute('data-type') || 'string';
      switch (dataType) {
        case 'json':
          console.debug('@ value', value);
          payload[key] = JSON.parse(value);
          break;
        default:
          payload[key] = value;
          break;
      }
    });
    // dispatch(actions.postData(payload));
  },
  toggleFormModal: value => dispatch(actions.toggleFormModal(value)),
  getTaskSeq: () => dispatch(actions.getTaskSeq()),
  openEditModal: (workSeq, taskSeq) => dispatch(actions.openEditModal(workSeq, taskSeq)),
  closeEditModal: () => dispatch(actions.closeEditModal()),
  saveTempContents: (detail, fieldNm, type, contSeq) => dispatch(actions.saveTaskContents({
    detail, fieldNm, type, contSeq,
  })),
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
