import React from 'react';
import { Select } from '../../../Abstraction/portalComponents';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i += 1) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const App = () => (
  <Select mode="multiple" style={{ width: '100%' }} placeholder="Please select" defaultValue={['a10', 'c12']}>
    {children}
  </Select>
);

const code = `
import { Select } from '../../../Abstraction/portalComponents';

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(&#96;selected &#36;{value}&#96;);
}

ReactDOM.render(
  <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Please select"
    defaultValue={['a10', 'c12']}
    onChange={handleChange}
  >
    {children}
  </Select>,
  mountNode
);
`;

const title = '-중복선택';

const details = '중복선택의 예시입니다.';

export { App, code, title, details };
