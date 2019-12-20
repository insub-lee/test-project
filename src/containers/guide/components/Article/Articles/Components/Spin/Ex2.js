import React from 'react';
import { Spin, Alert, Switch } from '../../../Abstraction/portalComponents';

class App extends React.Component {
  state = { loading: false };

  toggle = value => {
    this.setState({ loading: value });
  };

  render() {
    const container = <Alert message="Alert message title" description="Further details about the context of this alert." type="info" />;
    return (
      <div>
        <Spin spinning={this.state.loading} delay={10}>
          {container}
        </Spin>
        <div style={{ marginTop: 16 }}>
          Loading state：
          <Switch checked={this.state.loading} onChange={this.toggle} />
        </div>
      </div>
    );
  }
}

const code = `import { Spin, Alert, Switch } from '../../../Abstraction/portalComponents';

class Card extends React.Component {
  state = { loading: false }

  toggle = (value) => {
    this.setState({ loading: value });
  }

  render() {
    const container = (
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    );
    return (
      <div>
        <Spin spinning={this.state.loading} delay={500}>{container}</Spin>
        <div style={{ marginTop: 16 }}>
          Loading state：<Switch checked={this.state.loading} onChange={this.toggle} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Card />, mountNode);
`;

const title = '-delay';

const details = '딜레이 길이를 직접 지정';

export { App, code, title, details };
