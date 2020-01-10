import React, { PureComponent } from 'react';
import { Button } from 'antd';
import AppSelector from 'components/appSelector';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      appList: [],
    };
  }

  closeModal = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  /*
    appSelector로부터 가져온 App 목록을 이용해 필요한 작업 수행
  */
  addList = app => {
    const { appList } = this.state;
    const appListCopy = appList.slice();
    const appListCopyFromAppselector = app;

    appListCopyFromAppselector.map(obj => {
      if (appList.findIndex(o => o.APP_ID === obj.APP_ID) === -1) {
        appListCopy.push(obj);
      }
      return appListCopy;
    });

    this.setState({
      appList: appListCopy,
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
          모달형 AppSelector
        </Button>
        <AppSelector show={this.state.show} closeModal={this.closeModal} addList={this.addList} />
      </div>
    );
  }
}
const code = `import React, { PureComponent } from 'react';
import { Button } from 'antd';
import AppSelector from 'components/appSelector';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      appList: [],
    };
  }

  closeModal = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  /*
    appSelector로부터 가져온 App 목록을 이용해 필요한 작업 수행
  */
  addList = (app) => {
    const { appList } = this.state;
    const appListCopy = appList.slice();
    const appListCopyFromAppselector = app;

    appListCopyFromAppselector.map((obj) => {
      if (appList.findIndex(o => o.APP_ID === obj.APP_ID) === -1) {
        appListCopy.push(obj);
      }
      return appListCopy;
    });

    this.setState({
      appList: appListCopy,
    });
  }

  render() {
    return (
      <div>
        <Button onClick={() => { this.setState({ show: !this.state.show }); }}>모달형 AppSelector</Button>
        <AppSelector
          show={this.state.show}
          closeModal={this.closeModal}
          addList={this.addList}
        />
      </div>
    );
  }
}
`;

const title = '-기본 사용법';

const details = '기본 사용법의 예시입니다.';

export { App, code, title, details };
