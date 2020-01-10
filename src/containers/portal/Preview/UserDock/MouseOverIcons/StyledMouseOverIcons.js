import styled from 'styled-components';
import WithDirection from 'config/withDirection';
import IconPinOut from '../../../../../images/portal/dockicon-pin-out.png';
import IconPinIn from '../../../../../images/portal/dockicon-pin-in.png';
import IconDelete from '../../../../../images/portal/dockicon-delete.png';

const MouseOverIconsWrapper = styled.div`
  width: 100%;
  height: 15px;
  margin: auto;
  position: absolute;
  cursor: pointer;
  bottom: 2px;
  padding-left: 2px;
  padding-right: 2px;
  display: none;
  z-index: 999999;

  .addDockItemBtn,
  .exitDockItemBtn,
  .removeDockItemBtn {
    width: 32px;
    height: 15px;
    float: left;
    box-sizing: border-box;
    border: 1px solid black;
    border-color: transparent;
    border-radius: 3px;
  }

  .fullWidth {
    width: 66px;
  }

  // 왼쪽 버튼들
  .addDockItemBtn,
  .removeDockItemBtn {
    margin-right: 1px;
  }

  .addDockItemBtn {
    background: rgba(0, 0, 0, 0.5) url(${IconPinIn}) no-repeat 50% 50%;
  }

  .removeDockItemBtn {
    background: rgba(0, 0, 0, 0.5) url(${IconPinOut}) no-repeat 50% 50%;
  }

  // 오른쪽 버튼들
  .exitDockItemBtn {
    margin-left: 1px;
    background: rgba(0, 0, 0, 0.5) url(${IconDelete}) no-repeat 50% 50%;
  }
`;

export default WithDirection(MouseOverIconsWrapper);
