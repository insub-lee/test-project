import React from 'react';
import PropTypes from 'prop-types';

const Settings = ({
  type, target, targetIndex, boxType, action: { changeTitle, changeName, changeMaxLength, changeFormStuffSpan },
}) => (
  <div className="sm-sector">
    <div className="sm-title">
      <span className="icon-settings fa fa-cog" /> Settings
    </div>
    <div className="sm-properties">
      <div className="trt-traits gjs-one-bg gjs-two-color">
        <div className="trt-trait">
          <div className="label" title="Title">
              Label
          </div>
          <div className="field field-text">
            <div className="input-holder">
              <input
                type="text"
                key={`${type}-${target}-${targetIndex}-label`}
                defaultValue={target.property.label}
                placeholder="eg. Text here"
                onChange={e => changeTitle(type, targetIndex, e)}
              />
            </div>
          </div>
        </div>
        <div className="trt-trait">
          <div className="label" title="Title">
            Name
          </div>
          <div className="field field-text">
            <div className="input-holder">
              <input
                type="text"
                key={`${type}-${target}-${targetIndex}-name`}
                defaultValue={target.property.name}
                placeholder="eg. Text here"
                onChange={e => changeName(type, targetIndex, e)}
              />
            </div>
          </div>
        </div>
        {(target.type === 'text' || target.type === 'textarea') && (
          <div className="trt-trait">
            <div className="label" title="Title">
              Length
            </div>
            <div className="field field-text">
              <div className="input-holder">
                <input
                  type="number"
                  key={`${type}-${target}-${targetIndex}-max--length`}
                  defaultValue={target.property.maxLength || 0}
                  placeholder="eg. insert number"
                  min={0}
                  onChange={e => changeMaxLength(type, targetIndex, e)}
                />
              </div>
            </div>
          </div>
        )}
        {boxType === 'table' && (
          <div className="trt-trait">
            <div className="label" title="Box Type">
                  Span
            </div>
            <div className="field field-text">
              <div className="input-holder">
                <select
                  key={`${type}-${target}-${targetIndex}-span`}
                  className="field-select"
                  defaultValue={target.property.span || 1}
                  onChange={e => changeFormStuffSpan(targetIndex, e.target.value)}
                >
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
      </div>
    </div>
  </div>
);

Settings.propTypes = {
  target: PropTypes.object.isRequired,
  targetIndex: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  boxType: PropTypes.string,
  action: PropTypes.shape({
    changeTitle: PropTypes.func,
    changeName: PropTypes.func,
    changeMaxLength: PropTypes.func,
    changeSpan: PropTypes.func,
  }),
};

Settings.defaultProps = {
  boxType: '',
  action: {
    changeTitle: () => false,
    changeName: () => false,
    changeMaxLength: () => false,
    changeSpan: () => false,
  },
};

export default Settings;
