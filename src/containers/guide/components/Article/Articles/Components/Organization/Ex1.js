import React, { PureComponent } from 'react';
import { Button } from 'antd';
import Organization from 'containers/portal/components/Organization';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  closeModal = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.setState({ show: !this.state.show });
          }}
        >
          모달형 조직도
        </Button>
        <Organization isModal userTab pstnTab dutyTab grpTab show={this.state.show} closeModal={this.closeModal} isProfile={false} />
      </div>
    );
  }
}
const code = `import React, { PureComponent } from 'react';
import { Button } from 'antd';
import Organization from 'containers/portal/components/Organization';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  closeModal = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div>
        <Button onClick={() => { this.setState({ show: !this.state.show }); }}>모달형 조직도</Button>
        <Organization
          isModal={true}
          userTab={true}
          pstnTab={true}
          dutyTab={true}
          grpTab={true}
          show={this.state.show}
          closeModal={this.closeModal}
          isProfile={false}
        />
      </div>
    );
  }
}
`;

const title = '-기본 사용법';

const details = '기본 사용법의 예시입니다.';

export { App, code, title, details };
