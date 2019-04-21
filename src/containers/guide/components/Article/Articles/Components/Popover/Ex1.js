import React from 'react';
import { Popover, Button } from '../../../Abstraction/portalComponents';

class App extends React.Component {
  state = {
    content: (
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    ),
  }
  render() {
    return (
      <Popover content={this.state.content} title="Title">
        <Button type="primary">Hover me</Button>
      </Popover>
    );
  }
}

const code = `import { Popover, Button } from '../../../Abstraction/portalComponents';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

ReactDOM.render(
  <Popover content={content} title="Title">
    <Button type="primary">Hover me</Button>
  </Popover>,
  mountNode
);
`;

const title = '-기본 사용법';

const details = '기본 사용법 예시입니다.';

export { App, code, title, details };
