import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

import Styled from './Styled';

const commonClassName = 'panel-btn style-tab';
const tabIds = ['StyleManager', 'Layers', 'Blocks'];
const titles = ['Style Manager', 'Layers', 'Blocks'];

/*
const ViewsPanel = ({ tabId, action }) => (
  <Styled>
    <div className="buttons">
      <Tooltip title={titles[0]} placement="bottom">
        <span
          className={`${tabId === tabIds[0] ? `${commonClassName} panel-btn-active` : commonClassName}`}
          title={titles[0]}
          onClick={() => action.activeTab(tabIds[0], true)}
          role="button"
          onKeyPress={() => false}
          tabIndex="0"
        >
          <i className="fa fa-paint-brush" />
        </span>
      </Tooltip>
      <Tooltip title={titles[1]} placement="bottom">
        <span
          className={`${tabId === tabIds[1] ? `${commonClassName} panel-btn-active` : commonClassName}`}
          title={titles[1]}
          onClick={() => action.activeTab(tabIds[1], true)}
          role="button"
          onKeyPress={() => false}
          tabIndex="0"
        >
          <i className="fa fa-bars" />
        </span>
      </Tooltip>
      <Tooltip title={titles[2]} placement="bottom">
        <span
          className={`${tabId === tabIds[2] ? `${commonClassName} panel-btn-active` : commonClassName}`}
          title={titles[2]}
          onClick={() => action.activeTab(tabIds[2], true)}
          role="button"
          onKeyPress={() => false}
          tabIndex="0"
        >
          <i className="fa fa-th-large" />
        </span>
      </Tooltip>
    </div>
  </Styled>
);
 */
const ViewsPanel = ({ tabId, action }) => (
  <Styled>
    <div className="buttons">
      <Tooltip title={titles[2]} placement="bottom">
        <span
          className={commonClassName}
          title={titles[2]}
          // onClick={() => action.activeTab(tabIds[2], true)}
          // role="button"
          // onKeyPress={() => false}
          // tabIndex="0"
        >
          <i className="fa fa-th-large" />
        </span>
      </Tooltip>
    </div>
  </Styled>
);

ViewsPanel.propTypes = {
  tabId: PropTypes.string,
  action: PropTypes.object,
};

ViewsPanel.defaultProps = {
  tabId: '',
  action: {
    activeTab: () => false,
  },
};

export default ViewsPanel;
