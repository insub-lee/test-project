import React from 'react';
import { Button } from '../../../Abstraction/portalComponents';

const App = () => (
  <div className="guideComponentWrapper">
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
  </div>
);

const code = `import { Button } from '../../../Abstraction/portalComponents';

ReactDOM.render(
  <div>
    <Button type='primary'>Primary</Button>
    <Button>Default</Button>
    <Button type='dashed'>Dashed</Button>
    <Button type='danger'>Danger</Button>
  </div>,
mountNode);
`;
const title = '-버튼 Type';

const details = '제공되는 버튼의 Type들과 예시입니다.';

export { App, code, title, details };
