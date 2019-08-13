import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';

import Styled from './Styled';

const Tabs = ({ tabs, keyName, selectedTabIdx, setSelectedTabIdx, widgetId }) => (
  <Styled>
    <ReactTabs selectedIndex={selectedTabIdx} onSelect={tabIndex => setSelectedTabIdx(tabIndex, widgetId)}>
      <TabList>
        {tabs.map(tab => (
          <Tab key={tab[keyName]} disabled={tab.disabled}>
            {tab.MUAL_TABNAME}
          </Tab>
        ))}
      </TabList>
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
