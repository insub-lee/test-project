import styled from 'styled-components';
import iconFirst from '../../../images/icon_arr_first.png';
import iconPrev from '../../../images/icon_arr_prev.png';
import iconNext from '../../../images/icon_arr_next.png';
import iconLast from '../../../images/icon_arr_last.png';
import selectImg from '../../../images/icon_select2.png';

const StyledPage = styled.div`
  font-size: 0;
  position: relative;
  text-align: center;
  margin: 20px 0;
  min-height: 38px;

  & > a {
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: middle;
    margin: 0 3px;
    border-radius: 100%;
  }
  & > a.num {
    line-height: 32px;
    text-align: center;
    font-size: 13px;
    color: #555;
  }
  & > a.num.on {
    color: white;
    background: #636a78;
  }
  & > a.first {
    background: #f9f9f9 url(${({ img }) => img || iconFirst}) no-repeat center;

    &.disabled {
      pointer-events: none;
      cursor: default;
      background: url(${({ img }) => img || ''}) no-repeat center;
    }
  }
  & > a.prev {
    background: #f9f9f9 url(${({ img }) => img || iconPrev}) no-repeat center;

    &.disabled {
      pointer-events: none;
      cursor: default;
      background: url(${({ img }) => img || ''}) no-repeat center;
    }
  }
  & > a.next {
    background: #f9f9f9 url(${({ img }) => img || iconNext}) no-repeat center;

    &.disabled {
      pointer-events: none;
      cursor: default;
      background: url(${({ img }) => img || ''}) no-repeat center;
    }
  }
  & > a.last {
    background: #f9f9f9 url(${({ img }) => img || iconLast}) no-repeat center;

    &.disabled {
      pointer-events: none;
      cursor: default;
      background: url(${({ img }) => img || ''}) no-repeat center;
    }
  }

  & .page_size {
    border: 1px solid #d9e0e7;
    border-radius: 3px;
    height: 38px;
    line-height: 38px;
    //text-indent: 15px;
    background: white url(${selectImg}) no-repeat right 15px center;
    min-width: 48px;
    width: 70px;
    position: absolute;
    right: 0;
    top: -5px;
    appearance: none;
    color: rgb(85, 85, 85);
    vertical-align: middle;
    font-size: 15px;
    padding-left: 10px;
  }

  @media screen and (max-width: 1260px) {
    padding-bottom: 50px;

    .page_size {
      width: 70px;
      position: absolute;
      right: 0;
      top: 55%;
    }
  }
`;

export default StyledPage;
