import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';
import BoxBlock from './BoxBlock';
import FormBlock from './FormBlock';
// import GroupBlock from './GroupBlock';
import CustomBlock from './CustomBlock';

const enabledBasicTarget = ['', 'Box', 'Group'];
const enableCustomTarget = ['Box'];

const renderBlock = (type, { addBox, addFormStuff }) => {
  switch (type) {
    // case 'Box':
    //   return <GroupBlock onClick={addGroup} />;
    // case 'Group':
    //   return <FormBlock onClick={addFormStuff} />;
    case 'Box':
      return <FormBlock onClick={addFormStuff} />;
    default:
      return <BoxBlock onClick={addBox} />;
  }
};

const Blocks = ({ property: { viewTargetType, blockOpenStatus }, action: { addBox, addGroup, addFormStuff, toggleBlockOpenStatus } }) => (
  <Styled>
    {enabledBasicTarget.includes(viewTargetType) && (
      <div className="blocks-cs">
        <div className="block-categories">
          <div className="block-category">
            <div className="title" onClick={() => toggleBlockOpenStatus('basic')} role="button" onKeyPress={() => false} tabIndex="0" data-index={0}>
              <i className={`caret-icon fa ${blockOpenStatus.basic ? 'fa-caret-down' : 'fa-caret-right'}`} /> Basic
            </div>
            <div className={`blocks-c ${blockOpenStatus.basic ? 'active' : ''}`}>{renderBlock(viewTargetType, { addBox, addGroup, addFormStuff })}</div>
          </div>
        </div>
      </div>
    )}
    {enableCustomTarget.includes(viewTargetType) && (
      <div className="blocks-cs">
        <div className="block-categories">
          <div className="block-category">
            <div className="title" onClick={() => toggleBlockOpenStatus('custom')} role="button" onKeyPress={() => false} tabIndex="0" data-index={1}>
              <i className={`caret-icon fa ${blockOpenStatus.custom ? 'fa-caret-down' : 'fa-caret-right'}`} /> Custom
            </div>
            <div className={`blocks-c ${blockOpenStatus.custom ? 'active' : ''}`}>
              <CustomBlock onClick={addFormStuff} />
            </div>
          </div>
        </div>
      </div>
    )}
    {!enabledBasicTarget.includes(viewTargetType) && !enableCustomTarget.includes(viewTargetType) && (
      <div className="blocks-cs">
        <p style={{ padding: 10 }}>
          추가 가능한
          <br />
          Component가 없습니다.
        </p>
      </div>
    )}
  </Styled>
);

Blocks.propTypes = {
  action: PropTypes.object,
  property: PropTypes.object,
};

Blocks.defaultProps = {
  action: {
    addBox: () => false,
    addGroup: () => false,
    addFormStuff: () => false,
    toggleUseSignLine: () => false,
  },
  property: {
    viewTargetType: '',
  },
};

export default Blocks;
