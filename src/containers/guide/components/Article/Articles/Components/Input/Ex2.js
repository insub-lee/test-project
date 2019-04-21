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


const code = `import { Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader } from '../../../Abstraction/portalComponents';

const InputGroup = Input.Group;
const Option = Select.Option;

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class CompactDemo extends React.Component {
  state = {
    dataSource: [],
  }

  handleChange = (value) => {
    this.setState({
      dataSource: !value || value.indexOf('@') >= 0 ? [] : [
        \`\${value}@gmail.com\`,
        \`\${value}@163.com\`,
        \`\${value}@qq.com\`,
      ],
    });
  }

  render() {
    return (
      <div>
        <InputGroup size="large">
          <Col span={5}>
            <Input defaultValue="0571" />
          </Col>
          <Col span={8}>
            <Input defaultValue="26888888" />
          </Col>
        </InputGroup>
        <br />
        <InputGroup compact>
          <Input style={{ width: '20%' }} defaultValue="0571" />
          <Input style={{ width: '30%' }} defaultValue="26888888" />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Zhejiang">
            <Option value="Zhejiang">Zhejiang</Option>
            <Option value="Jiangsu">Jiangsu</Option>
          </Select>
          <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Option1">
            <Option value="Option1">Option1</Option>
            <Option value="Option2">Option2</Option>
          </Select>
          <Input style={{ width: '50%' }} defaultValue="input content" />
          <InputNumber />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Input style={{ width: '50%' }} defaultValue="input content" />
          <DatePicker />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Option1-1">
            <Option value="Option1-1">Option1-1</Option>
            <Option value="Option1-2">Option1-2</Option>
          </Select>
          <Select defaultValue="Option2-2">
            <Option value="Option2-1">Option2-1</Option>
            <Option value="Option2-2">Option2-2</Option>
          </Select>
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="1">
            <Option value="1">Between</Option>
            <Option value="2">Except</Option>
          </Select>
          <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
          <Input style={{ width: 30, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
          <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="Maximum" />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select defaultValue="Sign Up">
            <Option value="Sign Up">Sign Up</Option>
            <Option value="Sign In">Sign In</Option>
          </Select>
          <AutoComplete
            dataSource={this.state.dataSource}
            style={{ width: 200 }}
            onChange={this.handleChange}
            placeholder="Email"
          />
        </InputGroup>
        <br />
        <InputGroup compact>
          <Select style={{ width: '30%' }} defaultValue="Home">
            <Option value="Home">Home</Option>
            <Option value="Company">Company</Option>
          </Select>
          <Cascader style={{ width: '70%' }} options={options} placeholder="Select Address" />
        </InputGroup>
      </div>
    );
  }
}

ReactDOM.render(<CompactDemo />, mountNode);`;

const title = '-Pre / Post tab';

const details = 'Pre / Post 탭에 대한 사용 예제입니다.';

export { App, code, title, details };
