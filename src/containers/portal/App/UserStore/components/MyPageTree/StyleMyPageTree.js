import styled from 'styled-components';
import iconAppList from 'images/common/icon-applist.png';
import iconFolder from 'images/common/icon-folder.png';
import iconCopy from 'images/common/icon-copy.png';
import iconVisible from 'images/common/icon-visible.png';
import iconInVisible from 'images/common/icon-invisible.png';
import iconRemove from 'images/common/icon-delete-white.png';
import iconEdit from 'images/common/icon-edit-white2.png';
import iconBizGroup from 'images/common/icon-plus.png';
import iconBizApp from 'images/common/icon-no-content-gray.png';

const StyleMyPageTree = styled.div`
  display: flex;
  flex: 1 0 50%;
  padding: 0;
  flexDirection: column;
  height: 100%;
  width: 100%;

  .mypageTree {
    position: absolute;
    bottom: 47px;
    width: 100%;
    max-width: 279px;
    height: 165px;
    padding: 10px 15px 0 15px;
    margin-bottom: 2px;
    background: #e9e9e9;

    .entryName {
      > li {
        padding: 3px 0;

        label {
          display: inline-block;
          width: 80px;
          height: 32px;
          float: left;
          line-height: 32px;
          color: #404040;
          font-size: 14px;
        }

        .ant-input {
          width: calc(100% - 80px);
        }
      }
    }

    .buttonWrapper {
      padding: 9px 0 14px;
      text-align: right;

      > button {
        background: transparent;
        color: #404040;
        font-size: 14px;
        font-weight: 600;
        text-decoration: underline;

        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }

  .rst__node {
    &:hover {
      // background: #d3d5d7;

      * {
        opacity: 1;
      }
    }

    .rst__nodeContent {
      .rstcustom__rowWrapper {
        padding: 0 !important;

        .rstcustom__rowLabel {
          .rstcustom__rowTitle {
            button {
              background: transparent;

              &.active {
                > span {
                  color: #f85023 !important;
                }
              }
            }

            input {
              border: 1px solid #d1d2d3;
              color: #404040;
            }
          }
        }

        .rstcustom__rowToolbar {
          position: fixed;
          right: 0;
          padding-right: 5px;
          justify-content: flex-end;

          button {
            margin-top: 5px;
            margin-left: 5px;
          }
        }
      }
    }
  }

  // 드래그할 때
  .rstcustom__rowCancelPad:before,
  .rstcustom__rowLandingPad:before {
    background-color: #f5f5f5;
    border: none !important;
  }

  // 맨 아래 고정 메뉴
  .fixedMenu {
    width: 100%;
    height: 36px;
    padding: 0;
    background: #d3d5d7;
    text-align: right;

    button {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
`;

// 앱보기 아이콘 버튼
const AppListBtn = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #d3d5d7;
  border-color: #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconAppList}) no-repeat 50% 50%;
`;

// 폴더보기 아이콘 버튼
const FolderBtn = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #d3d5d7;
  border-color: #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconFolder}) no-repeat 50% 50%;
`;

// 복사하기 아이콘 버튼
const CopyBtn = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #d3d5d7;
  border-color: #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconCopy}) no-repeat 50% 50%;
`;

// 화면노출 아이콘 버튼
const VisionBtn = styled.button`
  width: 25px;
  height: 25px;
  border-color: #4b4b4b;
  border-radius: 3px;

  &.visible {
    background: #4b4b4b url(${iconVisible}) no-repeat 50% 50%;
  }

  &.invisible {
    background: #4b4b4b url(${iconInVisible}) no-repeat 50% 50%;
  }
`;

// 삭제 아이콘 버튼
const RemoveBtn = styled.button`
  width: 25px;
  height: 25px;
  border-color: #4b4b4b;
  border-radius: 3px;
  background: #4b4b4b url(${iconRemove}) no-repeat 50% 50%;
`;

// 편집 아이콘 버튼
const EditBtn = styled.button`
  width: 25px;
  height: 25px;
  border-color: #4b4b4b;
  border-radius: 3px;
  background: #4b4b4b url(${iconEdit}) no-repeat 50% 50%;
`;

const BizGroupBtn = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconBizGroup}) no-repeat 50% 50%;
`;

const BizAppBtn = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconBizApp}) no-repeat 50% 50%;
`;

export default StyleMyPageTree;
export { AppListBtn, FolderBtn, CopyBtn, VisionBtn, RemoveBtn, EditBtn, BizGroupBtn, BizAppBtn };
