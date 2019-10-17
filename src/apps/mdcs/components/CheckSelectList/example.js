import React, { PureComponent } from 'react';
import { fromJS } from 'immutable';
import CheckSelectList from './index';

class CheckSelectListExam extends PureComponent {
  render() {
    // checkSelectList props
    // sourceData: array[object,]
    //  rowSize: number(default - 20)
    // sucessMsg: string(default - 전송성공)
    // errorMsg: string(default - 전송실패)
    // selectedItem: {title: string, key: string, data: any}
    // customFunc: func(selectedData)

    const customFunc = e => {
      console.log('커스텀펑션 테스트', e);
    };

    const selectedItems = { title: 'MANUAL-TITLE', key: 'MANUAL-KEY', data: 'Newsfeed' };

    return (
      <div>
        <CheckSelectList customFunc={customFunc} selectedItem={selectedItems} />
      </div>
    );
  }
}
export default CheckSelectListExam;
