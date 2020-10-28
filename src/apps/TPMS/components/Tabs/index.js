import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledTabs from './StyledTabs';
import Tab from './Tab';
import TabBody from './TabBody';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
    this.handleTabIndex = this.handleTabIndex.bind(this);
  }

  handleTabIndex(e) {
    const { callBackTabIndex } = this.props;
    const { tabIndex } = e.target.parentElement;
    this.setState({ tabIndex }, () => callBackTabIndex(tabIndex));
  }

  render() {
    const { tabIndex } = this.state;
    const { tabs, toBody } = this.props;
    return (
      <StyledTabs>
        <div className="sub_tab">
          <ul>
            {tabs.map((tab, index) => (
              <Tab key={tab.id} tabIndex={index} isActive={tabIndex === index} text={tab.tabText} tabHandler={this.handleTabIndex} />
            ))}
          </ul>
        </div>
        <div className="sub_tab_body">
          {tabs.map((tab, index) => (
            <TabBody key={tab.id} isActive={tabIndex === index}>
              {tab.tabBody}
            </TabBody>
          ))}
        </div>
      </StyledTabs>
    );
  }
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object),
  callBackTabIndex: PropTypes.func,
};

Tabs.defaultProps = {
  tabs: [],
  callBackTabIndex: () => false,
};

export default Tabs;
