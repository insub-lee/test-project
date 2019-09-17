import React from 'react';

import Input from '../../../../../components/FormStuff/Input';
import Radio from '../../../../../components/FormStuff/Radio/index';
import Styled from './Styled';

const WriteBoard = () => (
  <Styled className="write-board-wrap">
    <div className="title">
      <Input placeholder="목차명을 입력해 주세요." />
    </div>
    <div className="write-body">에디트 영역</div>
    <div className="write-option">
      <div className="item">
        <p>URL 정보</p>
        <Input />
      </div>
      <div className="item">
        <p>조회방법</p>
        <Radio id="radio01" label="팝업" name="radio01" />
        <Radio id="radio02" label="inline" name="radio01" />
      </div>
      <div className="item">
        <p>action 대상</p>
        <Radio id="radio03" label="목차메뉴" name="radio02" />
        <Radio id="radio04" label="목차메뉴&목차명" name="radio02" />
      </div>
    </div>
  </Styled>
);

export default WriteBoard;
