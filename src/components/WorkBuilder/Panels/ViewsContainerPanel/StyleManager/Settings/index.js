import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const Settings = ({
  type,
  target,
  targetIndex,
  boxType,
  works,
  action: { changeTitle, changeName, changeMaxLength, changeFormStuffSpan, changeRequired, changeWorkSelectorProperty },
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
        <div className="trt-trait">
          <div className="label-for-check" title="Use Label">
            Required
          </div>
          <div className="" style={{ margin: 'auto' }}>
            <Checkbox defaultChecked={target.property.required} onChange={e => changeRequired(type, targetIndex, e.target.checked)} />
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
        {/* work-selector 에 대한 스타일 지정 */}
        {target.type === 'work-selector' && (
          <React.Fragment>
            <div className="trt-trait">
              <div className="label" title="Box Type">
                Work
              </div>
              <div className="field field-text">
                <div className="input-holder">
                  {console.debug('@@ workSeq', target.property.workSeq)}
                  <select
                    key={`${type}-${target}-${targetIndex}-work-seq`}
                    className="field-select"
                    defaultValue={target.property.workSeq || -1}
                    onChange={e => changeWorkSelectorProperty(targetIndex, e, 'workSeq')}
                  >
                    <option value={-1} disabled>
                      업무를 선택
                    </option>
                    {works.map(work => (
                      <option key={work.WORK_SEQ} value={work.WORK_SEQ}>
                        {console.debug('@@ WORK_SEQ', work.WORK_SEQ)}
                        {work.NAME_KOR}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sel-arrow">
                  <div className="d-s-arrow" />
                </div>
              </div>
            </div>
            <div className="trt-trait">
              <div className="label" title="Title">
                Key
              </div>
              <div className="field field-text">
                <div className="input-holder">
                  <input
                    type="text"
                    key={`${type}-${target}-${targetIndex}-work-key`}
                    defaultValue={target.property.workKey}
                    placeholder="eg. Text here"
                    onChange={e => changeWorkSelectorProperty(targetIndex, e, 'workKey')}
                  />
                </div>
              </div>
            </div>
            <div className="trt-trait">
              <div className="label" title="Title">
                Value
              </div>
              <div className="field field-text">
                <div className="input-holder">
                  <input
                    type="text"
                    key={`${type}-${target}-${targetIndex}-work-value`}
                    defaultValue={target.property.workValue}
                    placeholder="eg. Text here"
                    onChange={e => changeWorkSelectorProperty(targetIndex, e, 'workValue')}
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
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
  works: PropTypes.arrayOf(PropTypes.object),
  action: PropTypes.shape({
    changeTitle: PropTypes.func,
    changeName: PropTypes.func,
    changeMaxLength: PropTypes.func,
    changeFormStuffSpan: PropTypes.func,
    changeRequired: PropTypes.func,
    changeWorkSelectorProperty: PropTypes.func,
  }),
};

Settings.defaultProps = {
  boxType: '',
  works: [],
  action: {
    changeTitle: () => false,
    changeName: () => false,
    changeMaxLength: () => false,
    changeFormStuffSpan: () => false,
    changeRequired: () => false,
    changeWorkSelectorProperty: () => console.debug('no bind event'),
  },
};

export default Settings;
