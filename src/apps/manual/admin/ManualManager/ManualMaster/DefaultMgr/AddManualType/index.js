import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import selectors from '../../selectors';
import * as actions from '../../actions';

import Styled from './Styled';
import Tree from './Tree';
import TypeContents from './TypeContents';

const AddManualType = ({
  setCompareTempletChangeValue,
  saveCompareTemplet,
  compareTemplet,
  setCtContentName,
  removeCtContentItem,
  addCtContentItem,
  moveCtContentItem,
}) => (
  <Styled>
    <div className="addManualTypeTreeWrap">
      <Tree />
    </div>
    <div className="addManualTypeContentsWrap">
      <TypeContents
        setCompareTempletChangeValue={setCompareTempletChangeValue}
        saveCompareTemplet={saveCompareTemplet}
        compareTemplet={compareTemplet}
        action={{ setCtContentName, removeCtContentItem, addCtContentItem, moveCtContentItem }}
      />
    </div>
  </Styled>
);

AddManualType.propTypes = {
  setCompareTempletChangeValue: PropTypes.func,
  compareTemplet: PropTypes.object,
  saveCompareTemplet: PropTypes.func,
  setCtContentName: PropTypes.func,
  removeCtContentItem: PropTypes.func,
  addCtContentItem: PropTypes.func,
  moveCtContentItem: PropTypes.func,
};

AddManualType.defaultProps = {
  setCompareTempletChangeValue: () => false,
  compareTemplet: {},
  saveCompareTemplet: () => false,
  setCtContentName: () => false,
  removeCtContentItem: () => false,
  addCtContentItem: () => false,
  moveCtContentItem: () => false,
};

const mapStateToProps = createStructuredSelector({
  compareTemplet: selectors.makeSelectedCompareTempletNode(),
});

const mapDispatchToProps = dispatch => ({
  setCompareTempletChangeValue: (key, value) => dispatch(actions.setCompareTempletChangeValueByReducr(key, value)),
  saveCompareTemplet: () => dispatch(actions.saveCompareTempletBySaga()),
  setCtContentName: (id, value) => dispatch(actions.setCompareTempletContentNameByReducr(id, value)),
  removeCtContentItem: id => dispatch(actions.removeCompareTempletContentItemByReducr(id)),
  addCtContentItem: () => dispatch(actions.addCompareTempletContentItemByReducr()),
  moveCtContentItem: dropResult => dispatch(actions.moveCompareTempletContentItemByReducr(dropResult)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddManualType);
