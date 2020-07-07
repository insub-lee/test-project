import styled from 'styled-components';

import iconMore from 'images/eshs/main/icon_more.png';
import iconMoreOn from 'images/eshs/main/icon_more_on.png';
import iconMainMenu1 from 'images/eshs/main/icon_main_menu1.png';
import iconMainMenu1On from 'images/eshs/main/icon_main_menu1_on.png';

const StyledQuickLink = styled.div`
  .contents-item {
    border: 1px solid #ededed;
    border-radius: 4px;
    background: #fff;
    padding: 20px;
    position: relative;
    width: 100%;
    height: 100%;
    margin-right: 2%;
    float: left;

    > a {
      display: block;

      .item-icon {
        display: inline-block;
        width: 35px;
        height: 35px;
        background: url(${iconMainMenu1}) no-repeat center;
        background-size: 100%;
      }

      .item-btn-link {
        background: url(${iconMore}) no-repeat center;
        background-size: 100%;
        width: 4px;
        height: 35px;
        text-align: right;
        display: inline-block;
        position: absolute;
        right: 20px;
        top: 20px;
      }

      .title-area {
        margin-top: 30px;

        .item-title {
          font-size: 17px;
          color: #333;
          margin-bottom: 5px;
        }

        .item-cont {
          font-size: 14px;
          color: #666666;
          line-height: 1.5em;
          text-overflow: ellipsis;
          display: block;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 42px;
        }
      }
    }

    &:hover {
      background: #4197ee;
      border: 1px solid #3883d1;

      .item-icon {
        background: url(${iconMainMenu1On}) no-repeat center;
        background-size: 100%;
      }

      .item-btn-link {
        background: url(${iconMoreOn}) no-repeat center;
        background-size: 100%;
      }

      .title-area .item-title,
      .title-area .item-cont {
        color: #fff;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default StyledQuickLink;