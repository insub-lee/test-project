import React from 'react';
import PropTypes from 'prop-types';

const GridBox = ({ size, children, isSetting, action }) => (
  <div className={`grid_item grid${size}`}>
    {children}
    {isSetting && (
      <div className="grid_setting">
        <button type="button" className="setting fas fa-cog fa-lg" onClick={() => action.showSettingView()} />
        <button type="button" className="setting fas fa-times fa-lg" onClick={() => action.removeComponent()} />
      </div>
    )}
  </div>
);

GridBox.propTypes = {
  size: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  isSetting: PropTypes.bool,
  action: PropTypes.shape({
    showSettingView: PropTypes.func,
    removeComponent: PropTypes.func,
  }),
};

GridBox.defaultProps = {
  size: 1,
  children: null,
  isSetting: false,
  action: {
    showSettingView: () => false,
    removeComponent: () => false,
  },
};

export default GridBox;
