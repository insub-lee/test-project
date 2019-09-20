import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';

import StyledWriteTabPanel from '../../../../components/WritePage/StyledWriteTabPanel';
import FroalaEditorView from '../../../../components/RichTextEditor/FroalaEditorView';
import Styled from './Styled';
const getlength = data => data.length;
const Tabs = ({ tabData, keyName }) => {
  const view = tabData.map(data => ({
    id: data.id,
    TabComponent: <div className="titleWrap">{data.title}</div>,
    TabPanelComponent: (
      <StyledWriteTabPanel>
        <FroalaEditorView model={data.board} />
      </StyledWriteTabPanel>
    ),
    disabled: false,
  }));
  const length = getlength(view);
  return (
    <Styled length={length}>
      <ReactTabs>
        <TabList>
          {view.map(tab => (
            <Tab key={tab[keyName]} disabled={tab.disabled}>
              {tab.TabComponent}
            </Tab>
          ))}
        </TabList>
        {view.map(tab => (
          <TabPanel key={tab[keyName]}>{tab.TabPanelComponent}</TabPanel>
        ))}
      </ReactTabs>
    </Styled>
  );
};

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
