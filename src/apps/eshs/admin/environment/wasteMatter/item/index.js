import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

// 폐기물 - 품목정보관리

const Item = () => <BizMicroDevBase sagaKey="item" component={List} />;

export default Item;
