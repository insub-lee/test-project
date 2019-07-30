import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import selectors from '../../selectors';
import * as actions from '../../actions';

import StyleEditorMain from './StyleEditorMain';
import RenderEditorComponent from './RenderEditorComponent';

class EditorMain extends Component {
  componentDidUpdate() {
    const { addComponetId, handleChangeCompId } = this.props;
    if (addComponetId.length > 0) {
      const addComp = document.querySelector(`#${addComponetId}`);
      const topPosition = addComp.getBoundingClientRect().top - 70;
      const mainDiv = document.querySelector(`.editorMainWrapper`);
      const bottomPosition = mainDiv.scrollHeight;
      if (addComp.getBoundingClientRect().bottom + 21 > mainDiv.getBoundingClientRect().bottom) window.scrollTo(0, bottomPosition);
      else window.scrollBy(0, topPosition);
      handleChangeCompId('');
    }
  }

  render() {
    const {
      tabComponentList,
      handleChangeCompValue,
      handleChangeCompIdx,
      selectedComponentIdx,
      handleChangeFocusIdx,
      focusComponetIdx,
      addAreaIdx,
    } = this.props;
    return (
      <StyleEditorMain className="editorMainWrapper" onMouseOver={() => (focusComponetIdx === 0 ? false : handleChangeFocusIdx(0))}>
        <div className="dropWrapper editorMainDrop">
          <div className="innerDropWrapper">
            {tabComponentList &&
              tabComponentList.size > 0 &&
              tabComponentList
                .toJS()
                .filter(comp => comp.IS_REMOVE !== 'Y')
                .map((item, index) =>
                  RenderEditorComponent(item, handleChangeCompValue, handleChangeCompIdx, selectedComponentIdx, focusComponetIdx, addAreaIdx),
                )}
          </div>
        </div>
      </StyleEditorMain>
    );
  }
}

EditorMain.propTypes = {
  handleChangeTabComp: PropTypes.func,
  handleChangeCompValue: PropTypes.func,
  handleChangeCompIdx: PropTypes.func,
  handleRemoveComp: PropTypes.func,
  handleChangeCompId: PropTypes.func,
  handleChangeFocusIdx: PropTypes.func,
  handleChangeAddAreaIdx: PropTypes.func,
  tabComponentList: PropTypes.object,
  selectedComponentIdx: PropTypes.number,
  addComponetId: PropTypes.string,
  focusComponetIdx: PropTypes.number,
  addAreaIdx: PropTypes.number,
};

EditorMain.defaultProps = {
  handleChangeTabComp: () => false,
  handleChangeCompValue: () => false,
  handleChangeCompIdx: () => false,
  handleRemoveComp: () => false,
  handleChangeCompId: () => false,
  handleChangeFocusIdx: () => false,
  handleChangeAddAreaIdx: () => false,
  tabComponentList: fromJS([]),
  selectedComponentIdx: 0,
  addComponetId: '',
  focusComponetIdx: 0,
  addAreaIdx: 0,
};

const mapStateToProps = createStructuredSelector({
  tabComponentList: selectors.makeSelectTabComponentList(),
  selectedComponentIdx: selectors.makeSelectEditorComponentIndex(),
  addComponetId: selectors.makeSelectAddEditorComponentId(),
  focusComponetIdx: selectors.makeSelectFocusEditorComponentIndex(),
  addAreaIdx: selectors.makeSelectAddEditorComponentIndex(),
});

const mapDispatchToProps = dispatch => ({
  handleChangeTabComp: node => dispatch(actions.moveTabComponentByReduc(node)),
  handleChangeCompValue: (tabIdx, compIdx, key, value) => dispatch(actions.setEditorComponentValueByReduc(tabIdx, compIdx, key, value)),
  handleChangeCompIdx: idx => dispatch(actions.setEditorComponentIndexByReduc(idx)),
  handleRemoveComp: (tabIdx, compIdx) => dispatch(actions.removeEditorComponentByReduc(tabIdx, compIdx)),
  handleChangeCompId: id => dispatch(actions.setAddEditorComponentIdByReduc(id)),
  handleChangeFocusIdx: idx => dispatch(actions.setFocusEditorComponentIdxByReduc(idx)),
  handleChangeAddAreaIdx: idx => dispatch(actions.setAddEditorComponentIdxByReduc(idx)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorMain);
