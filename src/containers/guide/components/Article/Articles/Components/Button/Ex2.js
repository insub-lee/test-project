import React from 'react';
import { Button, Radio } from '../../../Abstraction/portalComponents';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'large',
    };
  }

  handleSizeChange = e =>
    this.setState({
      size: e.target.value,
    });

  render() {
    return (
      <div className="guideComponentWrapper">
        <Radio.Group value={this.state.size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <Button type="primary" size={this.state.size}>
          Primary
        </Button>
        <Button size={this.state.size}>Normal</Button>
        <Button type="dashed" size={this.state.size}>
          Dashed
        </Button>
        <Button type="danger" size={this.state.size}>
          Danger
        </Button>
      </div>
    );
  }
}

const code = `import { Button, Radio } from '../../../Abstraction/portalComponents';

class ButtonSize extends React.Component {
  state = {
    size: "large",
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const size = this.state.size;
    return (
      <div>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <Button type="primary" size={size}>primary</Button>
        <Button size={size}>Normal</Button>
        <Button type="dashed" size={size}>dashed</Button>
        <Button type="danger" size={size}>danger</Button>
      </div>
    );
  }
}

ReactDOM.render(<ButtonSize />, mountNode);
`;
const title = '-버튼 size';

const details = '제공되는 버튼의 size에 대한 예시입니다.';

export { App, code, title, details };
