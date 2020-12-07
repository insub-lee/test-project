import React from 'react';
import PropTypes from 'prop-types';

import StyledSettingView from './StyledSettingView';

const sizeOptions = [
  { key: 0, value: 1, text: '16%' },
  { key: 1, value: 2, text: '33%' },
  { key: 2, value: 3, text: '50%' },
  { key: 3, value: 6, text: '100%' },
];

const SettingView = ({ info, action }) => (
  <StyledSettingView>
    <div className="title">
      <strong>{`[${info.title}]`}</strong> Setting
      <div className="button_group">
        <button type="button" className="close" onClick={() => action.closeSettingView()}>
          <i className="fas fa-times fa-2x" />
        </button>
      </div>
    </div>
    <ul>
      <li>
        <div className="setting-label">Title</div>
        <div className="setting-control">
          <label htmlFor={`show-title-${info.index}`} className="setting-show-title">
            <input type="checkbox" id={`show-title-${info.index}`} defaultChecked={info.showTitle} onChange={e => action.handleToggleTitle(e.target.checked)} />
            <span className="slider round" />
          </label>
        </div>
      </li>
      <li>
        <div className="setting-label">Width</div>
        <div className="setting-control">
          {sizeOptions.map(size => (
            <label key={size.key} htmlFor={`width-${size.key}-${info.index}`} className="setting-width">
              <input
                type="radio"
                id={`width-${size.key}-${info.index}`}
                value={size.value}
                name={`width-radios-${info.index}`}
                defaultChecked={info.size === size.value}
                onChange={e => action.handleChangeWidth(e.target.value)}
              />
              <span>{size.text}</span>
            </label>
          ))}
        </div>
      </li>
      {/*
      <li>
        <div className="setting-label">Color</div>
        <div className="setting-control">
          <label htmlFor="color-1" className="setting-color type1 active">
            <input type="radio" id="color-1" value="1" />
            ABC
          </label>
          <label htmlFor="color-2" className="setting-color type2">
            <input type="radio" id="color-2" value="2" />
            ABC
          </label>
          <label htmlFor="color-3" className="setting-color type3">
            <input type="radio" id="color-3" value="3" />
            ABC
          </label>
          <label htmlFor="color-4" className="setting-color type4">
            <input type="radio" id="color-4" value="4" />
            ABC
          </label>
        </div>
      </li>
      */}
    </ul>
    {/*
    <div className="button_group">
      <button type="button" className="cancel">
        <i className="fas fa-times" />
      </button>
      <button type="button" className="save">
        <i className="fas fa-check" />
      </button>
    </div>
    */}
  </StyledSettingView>
);

SettingView.propTypes = {
  info: PropTypes.shape({
    showTitle: PropTypes.bool,
    size: PropTypes.number,
    title: PropTypes.string,
    index: PropTypes.number,
  }),
  action: PropTypes.shape({
    handleToggleTitle: PropTypes.func,
    handleChangeWidth: PropTypes.func,
    closeSettingView: PropTypes.func,
  }),
};

SettingView.defaultProps = {
  info: {
    showTitle: true,
    size: 1,
    title: '',
    index: -1,
  },
  action: {
    handleToggleTitle: () => false,
    handleChangeWidth: () => false,
    closeSettingView: () => false,
  },
};

export default SettingView;
