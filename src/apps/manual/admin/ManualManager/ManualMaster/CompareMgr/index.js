import React from 'react';
import { Button, Row, Col } from 'antd';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import selectors from '../selectors';
import * as actions from '../actions';
import FroalaEditor from '../../../../components/RichTextEditor/FroalaEditor';
import FroalaEditorView from '../../../../components/RichTextEditor/FroalaEditorView';
import { froalaEditorConfigCompareMgr } from '../../../../components/RichTextEditor/FroalaEditorConfig';

import StyledButton from '../../../../../../components/Button/StyledButton';
import Styled from './Styled';

const handleNodeClick = (event, setSelectedIdx, idx) => {
  event.stopPropagation();
  setSelectedIdx(idx);
};

const CompareMgr = ({ manageTemplet, manageData, setCompareManageChangeValue, saveCompareData, defaultMgrMap, selectedIdx, setSelectedIdx }) => (
  <Styled onClick={e => handleNodeClick(e, setSelectedIdx, 0)}>
    <Row>
      <Col span={5} className="templetManageTopTitle">
        상품명
      </Col>
      <Col span={19} className="templetManageTopTitle">
        {defaultMgrMap.get('MUAL_NAME')}
      </Col>
    </Row>
    {manageTemplet.TEMPLET_CONTENT &&
      manageTemplet.TEMPLET_CONTENT.map((node, idx) => (
        <Row key={`templetManageValue_${node.ITEM_IDX}`} type="flex" justify="space-around" align="middle" className="templetManageRow">
          <Col span={5} className="templetManageTitle">
            {node.ITEM_NAME}
          </Col>
          <Col span={19}>
            <div className="templetManageContent" onClick={e => handleNodeClick(e, setSelectedIdx, node.ITEM_IDX)}>
              {selectedIdx === node.ITEM_IDX ? (
                <FroalaEditor config={froalaEditorConfigCompareMgr()} model={node.ITEM_DATA} onModelChange={text => setCompareManageChangeValue(idx, text)} />
              ) : (
                <FroalaEditorView model={node.ITEM_DATA} />
              )}
            </div>
          </Col>
        </Row>
      ))}
    <Row>
      <Col className="templetManageButtonWrap">
        <StyledButton className="btn-primary btn-bs-none" onClick={saveCompareData}>
          저장
        </StyledButton>
      </Col>
    </Row>
  </Styled>
);

CompareMgr.propTypes = {
  manageTemplet: PropTypes.object,
  manageData: PropTypes.object,
  setCompareManageChangeValue: PropTypes.func,
  saveCompareData: PropTypes.func,
  defaultMgrMap: PropTypes.object,
  selectedIdx: PropTypes.number,
  setSelectedIdx: PropTypes.func,
};

CompareMgr.defaultProps = {
  manageTemplet: {},
  manageData: {},
  setCompareManageChangeValue: () => false,
  saveCompareData: () => false,
  defaultMgrMap: fromJS({}),
  selectedIdx: 0,
  setSelectedIdx: () => false,
};

const mapStateToProps = createStructuredSelector({
  manageTemplet: selectors.makeSelectCompareManageTemplet(),
  manageData: selectors.makeSelectCompareManageData(),
  defaultMgrMap: selectors.makeSelectDefaultMgr(),
  selectedIdx: selectors.makeSelectedCompareManageIdx(),
});

const mapDispatchToProps = dispatch => ({
  setCompareManageChangeValue: (idx, value) => dispatch(actions.setCompareManageChangeValueByReducr(idx, value)),
  saveCompareData: () => dispatch(actions.saveCompareDataBySaga()),
  setSelectedIdx: idx => dispatch(actions.setSelectedCompareManageIdx(idx)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompareMgr);
