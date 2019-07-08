import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';

import Styled from './Styled';

const Tabs = ({ tabs, keyName }) => (
  <Styled>
    <ReactTabs>
      <TabList>
        {tabs.map(tab => (
          <Tab key={tab[keyName]} disabled={tab.disabled}>
            {tab.TabComponent}
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
};

Tabs.defaultProps = {
  tabs: [],
};

export default Tabs;
