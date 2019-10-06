import React from 'react';
import { Button } from 'antd';

const CounselItem = (itemClass, itemTit, itemTxt, itemNo, pushCounselHelperKeyword) => (
  <React.Fragment>
    <div className={`item ${itemClass}`}>
      <a href="#none">
        <span className="item-deco">
          <span className="icon" />
          <span className="txt">{itemTit}</span>
        </span>
        <span className="item-tit">
          <strong className="txt">{itemTxt}</strong>
          <span className="num">{itemNo}</span>
        </span>
      </a>
    </div>
  </React.Fragment>
);

export default CounselItem;
