import React from 'react';
import { Tabs } from '../../../Abstraction/portalComponents';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const App = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);

const code = `import { Tabs } from '../../../Abstraction/portalComponents';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

ReactDOM.render(
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
  </Tabs>,
  mountNode
);
`;

const title = '-기본 사용법';

const details = '기본 사용법의 예시입니다.';

export { App, code, title, details };
