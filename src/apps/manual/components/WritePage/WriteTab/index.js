import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';
import { Icon } from 'antd';

import Styled from './Styled';

const WriteTab = ({ tabs, keyName, onClick, selectedIndex, setIndex, flag }) => (
  <Styled>
    <ReactTabs
      selectedIndex={selectedIndex}
      onSelect={index => {
        setIndex(index);
      }}
    >
      <div className="tabList-wrap">
        <TabList>
          {tabs.map(tab => (
            <Tab key={tab[keyName]} disabled={tab.disabled}>
              {tab.TabComponent}
            </Tab>
          ))}
        </TabList>
        <button type="button" className={`btn-m-plus ${flag}`} onClick={onClick}>
          <Icon type="plus-circle" />
        </button>
      </div>
      {tabs.map(tab => (
        <TabPanel key={tab[keyName]}>{tab.TabPanelComponent}</TabPanel>
      ))}
    </ReactTabs>
  </Styled>
);
WriteTab.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object),
  keyName: PropTypes.string.isRequired,
};

WriteTab.defaultProps = {
  tabs: [],
};

export default WriteTab;
