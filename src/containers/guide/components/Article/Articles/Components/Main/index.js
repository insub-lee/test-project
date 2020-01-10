import React from 'react';
import { Button } from '../../../Abstraction/portalComponents';
// import { Table } from 'semantic-ui-react';
import * as comp from '../../../ArticleComponents/components';
// import { Icon } from '../../../Abstraction/portalComponents';

const ComponentsMain = () => (
  <div>
    <comp.ArticleHead txt="컴포넌트 설명의 메인 페이지 입니다." />
    <comp.ArticleText txt="작업중" />
    <div>
      <Button type="primary">버튼 1</Button>
      <Button>버튼 2</Button>
      <Button type="dashed">Button 3</Button>
      <Button type="danger">Button 4</Button>
    </div>
  </div>
);

export default ComponentsMain;
