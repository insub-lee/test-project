import React from 'react';
import { Carousel } from '../../../Abstraction/portalComponents';

function onChange(a, b, c) {
  console.log(a, b, c);
}
const App = () => (
  <div>
    <Carousel
      afterChange={onChange}
    >
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>
  </div>
);

const code = `import { Carousel } from '../../../Abstraction/portalComponents';

function onChange(a, b, c) {
  console.log(a, b, c);
}

ReactDOM.render(
  <Carousel afterChange={onChange}>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </Carousel>,
  mountNode
);
/* For demo */
.ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel .slick-slide h3 {
  color: #fff;
}
`;

const title = '-기본';

const details = '기본 사용법의 예시입니다.';

export { App, code, title, details };
