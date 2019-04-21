import React from 'react';
import { Tooltip } from '../../../Abstraction/portalComponents';

const App = () => (
  <Tooltip title="prompt text">
    <span>마우스를 올려보세요.</span>
  </Tooltip>
);


const code = `import { Tooltip } from '../../../Abstraction/portalComponents';

ReactDOM.render(
  <Tooltip title="prompt text">
    <span>마우스를 올려보세요.</span>
  </Tooltip>,
  mountNode
);
`;

const title = '-기본 사용법';

const details = '기본 사용법의 예시입니다.';

export { App, code, title, details };
