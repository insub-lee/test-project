import React, { PureComponent } from 'react';
import AppSelectorPortal from 'components/appSelectorportal';
import fakeData from './fakeData';

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
        <AppSelectorPortal
          item={fakeData.item} // this.props.item
          type="mypage" // "mypage" or "bizgroup", this.props.type
          updateBizGroupChgYn="Y" // "Y" or "N", this.props.updateBizGroupChgYn
        />
      </div>
    );
  }
}
const code = `import React, { PureComponent } from 'react';
import AppSelectorPortal from 'components/appSelectorportal';
import fakeData from './fakeData';

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
        <AppSelectorPortal
          item={this.props.item}
          type={this.props.type}
          updateBizGroupChgYn={this.props.updateBizGroupChgYn}
        />
      </div>
    );
  }
}
`;

const title = '-인라인(in-line) AppSelector 사용법';

const details = '인라인(in-line AppSelecotr 사용법의 예시입니다.';

export { App, code, title, details };
