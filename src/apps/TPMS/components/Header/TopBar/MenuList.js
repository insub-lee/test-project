import React from 'react';
import StyledMenuList from './StyledMenuList';

const MenuList = () => (
  <StyledMenuList className="gnb_menu">
    <li>
      <button type="button" className="icon icon_alarm">
        알람<span className="num">99</span>
      </button>
    </li>
    <li>
      <button type="button" className="icon icon_setting">
        설정
      </button>
    </li>
    <li>
      <button type="button" className="icon icon_search">
        검색
      </button>
      <form autoComplete="off" onSubmit={e => e.preventDefault()}>
        <div className="gnb_menu_search">
          <input type="text" />
          <button type="button" className="icon icon_search_g">
            검색
          </button>
        </div>
      </form>
    </li>
  </StyledMenuList>
);

export default MenuList;
