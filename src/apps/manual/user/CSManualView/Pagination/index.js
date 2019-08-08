import React from 'react';

import Styled from './Styled';

const Pagination = () => (
  <Styled>
    <div>
      <div className="btn-wrap btn-prev">
        <button type="button" className="prev-btn">
          공인인증 확인절차
        </button>
      </div>
      <div className="present-tit">
        <span>주문대리인 등록 및 해지</span>
      </div>
      <div className="btn-wrap btn-next">
        <button type="button" className="next-btn">
          OTP등록방법
        </button>
      </div>
    </div>
  </Styled>
);

export default Pagination;
