import React from 'react';
import { Spin } from '../../../Abstraction/portalComponents';

const App = () => (
  <Spin />
);


const code = `import { Spin } from '../../../Abstraction/portalComponents';

ReactDOM.render(<Spin />, mountNode);
`;

const title = '-delay';

const details = 'delay설정(ms)의 예시입니다.';

export { App, code, title, details };
