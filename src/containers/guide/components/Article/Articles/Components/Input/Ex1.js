import React from 'react';
import { Input, Select, Icon } from '../../../Abstraction/portalComponents';

const { Option } = Select;

const App = () => {
  const selectBefore = (
    <Select defaultValue="Http://" style={{ width: 90 }}>
      <Option value="Http://">Http://</Option>
      <Option value="Https://">Https://</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue=".com" style={{ width: 80 }}>
      <Option value=".com">.com</Option>
      <Option value=".kr">.kr</Option>
      <Option value=".net">.net</Option>
      <Option value=".org">.org</Option>
    </Select>
  );
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input addonAfter={<Icon type="setting" />} defaultValue="mysite" />
      </div>
    </div>
  );
};


const code = `import { Input, Select, Icon } from '../../../Abstraction/portalComponents';

const Option = Select.Option;

const selectBefore = (
  <Select defaultValue="Http://" style={{ width: 90 }}>
    <Option value="Http://">Http://</Option>
    <Option value="Https://">Https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" style={{ width: 80 }}>
    <Option value=".com">.com</Option>
    <Option value=".kr">.kr</Option>
    <Option value=".net">.net</Option>
    <Option value=".org">.org</Option>
  </Select>
);

ReactDOM.render(
  <div>
    <div style={{ marginBottom: 16 }}>
      <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
    </div>
    <div style={{ marginBottom: 16 }}>
      <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
    </div>
    <div style={{ marginBottom: 16 }}>
      <Input addonAfter={<Icon type="setting" />} defaultValue="mysite" />
    </div>
  </div>,
  mountNode);`;

const title = '-Pre / Post tab';

const details = 'Pre / Post 탭에 대한 사용 예제입니다.';

export { App, code, title, details };
