import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';

import IconCollection from '../IconCollection';

import Styled from './Styled';

const Tabs = ({ tabs, keyName, selectedTabIdx, setSelectedTabIdx }) => (
  <Styled>
    <ReactTabs selectedIndex={selectedTabIdx} onSelect={tabIndex => setSelectedTabIdx(tabIndex)}>
      <div className="tabList-wrap">
        <TabList>
          <IconCollection className="icon-tabs" />
          {tabs.map(tab => (
            <Tab key={tab[keyName]} disabled={tab.disabled}>
              {tab.TabComponent}
            </Tab>
          ))}
        </TabList>
        <div className="chrome-tabs-bottom-bar"></div>
      </div>
      {tabs.map(tab => (
        <TabPanel key={tab[keyName]}>{tab.TabPanelComponent}</TabPanel>
      ))}
    </ReactTabs>
  </Styled>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object),
  keyName: PropTypes.string.isRequired,
  selectedTabIdx: PropTypes.number,
  setSelectedTabIdx: PropTypes.func.isRequired,
};

Tabs.defaultProps = {
  tabs: [],
  selectedTabIdx: 0,
};

export default Tabs;
