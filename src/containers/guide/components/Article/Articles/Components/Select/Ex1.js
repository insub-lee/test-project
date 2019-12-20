import React from 'react';
import { Select } from '../../../Abstraction/portalComponents';

const { Option } = Select;

const App = () => (
  <div>
    <Select defaultValue="lucy" style={{ width: 120 }}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    <Select defaultValue="lucy" style={{ width: 120 }} disabled>
      <Option value="lucy">Lucy</Option>
    </Select>
    <Select defaultValue="lucy" style={{ width: 120 }} loading>
      <Option value="lucy">Lucy</Option>
    </Select>
  </div>
);

const code = `
import { Select } from '../../../Abstraction/portalComponents';

const Option = Select.Option;

function handleChange(value) {
  console.log(&#96;selected &#36;{value}&#96;);
}

ReactDOM.render(
  <div>
    <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    <Select defaultValue="lucy" style={{ width: 120 }} disabled>
      <Option value="lucy">Lucy</Option>
    </Select>
    <Select defaultValue="lucy" style={{ width: 120 }} loading>
      <Option value="lucy">Lucy</Option>
    </Select>
  </div>,
  mountNode
);
`;

const title = '-기본 사용법';

const details = '기본 사용법의 예시입니다.';

export { App, code, title, details };
