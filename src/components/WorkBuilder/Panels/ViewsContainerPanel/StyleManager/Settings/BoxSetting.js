import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const BoxSettings = ({ type, target, targetIndex, action: { changeTitle, changeUseLabel, changeBoxType, changeBoxColumnCount } }) => (
  <div className="sm-sector">
    <div className="sm-title">
      <span className="icon-settings fa fa-cog" /> Settings
    </div>
    <div className="sm-properties">
      <div className="trt-traits gjs-one-bg gjs-two-color">
        <div className="trt-trait">
          <div className="label" title="Label">
            Label
          </div>
          <div className="field field-text">
            <div className="input-holder">
              <input
                type="text"
                defaultValue={target.property.label}
                placeholder="eg. Text here"
                onChange={e => changeTitle(type, targetIndex, e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="trt-trait">
          <div className="label" title="Box Type">
            Type
          </div>
          <div className="field field-text">
            <div className="input-holder">
              <select className="field-select" defaultValue={target.property.type} onChange={e => changeBoxType(targetIndex, e.target.value)}>
                <option value="normal">normal</option>
                <option value="table">table</option>
              </select>
            </div>
            <div className="sel-arrow">
              <div className="d-s-arrow" />
            </div>
          </div>
        </div>
        {target.property.type === 'table' && (
          <div className="trt-trait">
            <div className="label" title="Box Type">
              Column
            </div>
            <div className="field field-text">
              <div className="input-holder">
                <select className="field-select" defaultValue={target.property.column} onChange={e => changeBoxColumnCount(targetIndex, e.target.value)}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
              <div className="sel-arrow">
                <div className="d-s-arrow" />
              </div>
            </div>
          </div>
        )}
        <div className="trt-trait">
          <div className="label-for-check" title="Use Label">
            Use Label
          </div>
          <div className="" style={{ width: '100%' }}>
            <Checkbox defaultChecked={target.property.useLabel} onChange={e => changeUseLabel(type, targetIndex, e.target.checked)} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

BoxSettings.propTypes = {
  type: PropTypes.string.isRequired,
  target: PropTypes.object.isRequired,
  targetIndex: PropTypes.number.isRequired,
  action: PropTypes.object,
};

BoxSettings.defaultProps = {
  action: {
    changeTitle: () => false,
    changeUseLabel: () => false,
    changeBoxType: () => false,
    changeBoxColumnCount: () => false,
  },
};

export default BoxSettings;
