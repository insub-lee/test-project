import React from 'react';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

const settingPopover = () => (
  <div className="mSearchWrapper">
    <Input placeholder="구성원 검색" className="mInputBox" />
    <Button className="mSearchButton">
      <span className="icon icon-search" />
    </Button>
  </div>
);

export default settingPopover;
