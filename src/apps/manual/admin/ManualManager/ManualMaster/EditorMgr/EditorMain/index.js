import React, { Component } from 'react';
// import { Scrollbars } from 'react-custom-scrollbars';
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
    // const { addComponetId, handleChangeCompId } = this.props;
    // if (addComponetId.length > 0) {
    //   const addComp = document.querySelector(`#${addComponetId}`);
    //   const topPosition = addComp.getBoundingClientRect().top - 70;
    //   const mainDiv = document.querySelector(`.editorMainWrapper`);
    //   const bottomPosition = mainDiv.scrollHeight;
    //   if (addComp.getBoundingClientRect().bottom + 21 > mainDiv.getBoundingClientRect().bottom) window.scrollTo(0, bottomPosition);
    //   else window.scrollBy(0, topPosition);
    //   handleChangeCompId('');
    // }
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
      handlePushCompValue,
      handleRemoveCompValue,
      indexRelationList,
    } = this.props;
    return (
      <StyleEditorMain
        id="editorMainWrapper"
        className="editorMainWrapper"
        onMouseOver={() => (focusComponetIdx === 0 ? false : handleChangeFocusIdx(0))}
        onClick={() => handleChangeCompIdx(0)}
      >
        {/* <Scrollbars
          className="editorMainWrapperScroll"
          style={{ height: 'calc(100vh - 149px)' }}
          ref={c => {
            setScrollComponent(c);
          }}
        > */}
        <div className="dropWrapper editorMainDrop">
          {tabComponentList &&
            tabComponentList.size > 0 &&
            tabComponentList
              .toJS()
              .filter(comp => comp.IS_REMOVE !== 'Y')
              .map((item, index) => {
                const restProps = {
                  item,
                  handleChangeCompValue,
                  handleChangeCompIdx,
                  selectedComponentIdx,
                  focusComponetIdx,
                  addAreaIdx,
                  handlePushCompValue,
                  handleRemoveCompValue,
                  indexRelationList,
                };
                return <RenderEditorComponent key={item.MUAL_TABCOMP_IDX} {...restProps} />
              })}
        </div>
        {/* </Scrollbars> */}
      </StyleEditorMain>
    );
  }
}

EditorMain.propTypes = {
  handleChangeCompValue: PropTypes.func,
  handlePushCompValue: PropTypes.func,
  handleRemoveCompValue: PropTypes.func,
  handleChangeCompIdx: PropTypes.func,
  handleChangeCompId: PropTypes.func,
  handleChangeFocusIdx: PropTypes.func,
  tabComponentList: PropTypes.object,
  selectedComponentIdx: PropTypes.number,
  addComponetId: PropTypes.string,
  focusComponetIdx: PropTypes.number,
  addAreaIdx: PropTypes.number,
  indexRelationList: PropTypes.arrayOf(PropTypes.object),
  // setScrollComponent: PropTypes.func,
};

EditorMain.defaultProps = {
  handleChangeCompValue: () => false,
  handlePushCompValue: () => false,
  handleRemoveCompValue: () => false,
  handleChangeCompIdx: () => false,
  handleChangeCompId: () => false,
  handleChangeFocusIdx: () => false,
  tabComponentList: fromJS([]),
  selectedComponentIdx: 0,
  addComponetId: '',
  focusComponetIdx: 0,
  addAreaIdx: 0,
  indexRelationList: [],
  // setScrollComponent: () => false,
};

const mapStateToProps = createStructuredSelector({
  tabComponentList: selectors.makeSelectTabComponentList(),
  selectedComponentIdx: selectors.makeSelectEditorComponentIndex(),
  addComponetId: selectors.makeSelectAddEditorComponentId(),
  focusComponetIdx: selectors.makeSelectFocusEditorComponentIndex(),
  addAreaIdx: selectors.makeSelectAddEditorComponentIndex(),
  indexRelationList: selectors.makeSelectIndexRelationList(),
});

const mapDispatchToProps = dispatch => ({
  handleChangeCompValue: (tabIdx, compIdx, key, value) => dispatch(actions.setEditorComponentValueByReduc(tabIdx, compIdx, key, value)),
  handleChangeCompIdx: idx => dispatch(actions.setEditorComponentIndexByReduc(idx)),
  handleChangeCompId: id => dispatch(actions.setAddEditorComponentIdByReduc(id)),
  handleChangeFocusIdx: idx => dispatch(actions.setFocusEditorComponentIdxByReduc(idx)),
  // setScrollComponent: item => dispatch(actions.setScrollComponentByReducr(item)),
  handlePushCompValue: (tabIdx, compIdx, key, value) => dispatch(actions.addEditorComponentValueByReduc(tabIdx, compIdx, key, value)),
  handleRemoveCompValue: (tabIdx, compIdx, key) => dispatch(actions.removeEditorComponentValueByReduc(tabIdx, compIdx, key)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorMain);
