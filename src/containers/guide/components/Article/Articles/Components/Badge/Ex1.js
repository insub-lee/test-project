/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { Badge } from '../../../Abstraction/portalComponents';

const App = () => (
  <div>
    <Badge count={5}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={0} showZero>
      <a href="#" className="head-example" />
    </Badge>
  </div>
);

const code = `import { Badge, Icon } from '../../../Abstraction/portalComponents';

ReactDOM.render(
  <div>
    <Badge count={5}>
      <a href="#" className="head-example" />
    </Badge>
    <Badge count={0} showZero>
      <a href="#" className="head-example" />
    </Badge>
  </div>,
  mountNode
);
`;

const title = '-기본 사용법';

const details = '기본 사용법. count값이 0일때 Badge는 사라지지만, showZero를 사용하면 노출시킬 수 있습니다.';

export { App, code, title, details };
