import styled from 'styled-components';
import iconAppList from 'images/common/icon-applist.png';
import iconFolder from 'images/common/icon-folder.png';
import iconCopy from 'images/common/icon-copy.png';
import iconVisible from 'images/common/icon-visible.png';
import iconInVisible from 'images/common/icon-invisible.png';
import iconRemove from 'images/common/icon-delete-white.png';
import iconEdit from 'images/common/icon-edit-white2.png';
import iconBizGroup from 'images/common/icon-plus.png';
import iconBizTree from 'images/common/icon-biz-tree.png';
import iconBizTreeSelected from 'images/common/icon-biz-tree-active.png';
import iconBizGroupReset from 'images/common/icon-reset.png';
import iconBizDelete from 'images/common/icon-biz-delete.png';
import iconBizConfirm from 'images/common/icon-biz-confirm.png';

const StyleMyPageTree = styled.div`
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
            .bizIcon {
              margin-left: 3px;
              padding-left: 25px;
              background-image: url(${iconBizTree});
              background-repeat: no-repeat;
              background-position: 0 50%;

              &.active {
                background-image: url(${iconBizTreeSelected});

                > span {
                  color: #f85023 !important;
                }
              }
            }

            .bizConfirmIcon {
              margin-left: 3px;
              padding-left: 25px;
              background-image: url(${iconBizConfirm});
              background-repeat: no-repeat;
              background-position: 0 50%;
            }

            .bizDeleteIcon {
              margin-left: 3px;
              padding-left: 25px;
              background-image: url(${iconBizDelete});
              background-repeat: no-repeat;
              background-position: 0 50%;
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

      .node-content-renderer_rowWrapper__wq3Bo {
        padding: 0;
        cursor: auto;

        .rstcustom__row {
          padding: 10px 10px 10px 0;
          cursor: move;
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
    height: 30px;
    padding: 5px;
    background: #d6c7de;
    text-align: right;
    margin-bottom: 10px;

    button + button {
      margin-left: 5px;
    }
  }
`;

// 앱보기 아이콘 버튼
const AppListBtn = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconAppList}) no-repeat 50% 50%;
`;

// 폴더보기 아이콘 버튼
const FolderBtn = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconFolder}) no-repeat 50% 50%;
`;

// 복사하기 아이콘 버튼
const CopyBtn = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconCopy}) no-repeat 50% 50%;
`;

// 화면노출 아이콘 버튼
const VisionBtn = styled.button`
  width: 20px;
  height: 20px;
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
  width: 20px;
  height: 20px;
  border-color: #4b4b4b;
  border-radius: 3px;
  background: #4b4b4b url(${iconRemove}) no-repeat 50% 50%;
`;

// 편집 아이콘 버튼
const EditBtn = styled.button`
  width: 20px;
  height: 20px;
  border-color: #4b4b4b;
  border-radius: 3px;
  background: #4b4b4b url(${iconEdit}) no-repeat 50% 50%;
`;

const BizGroupBtn = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconBizGroup}) no-repeat 50% 50%;
`;

const BizGroupResetBtn = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconBizGroupReset}) no-repeat 50% 50%;
`;

export default StyleMyPageTree;
export { AppListBtn, FolderBtn, CopyBtn, VisionBtn, RemoveBtn, EditBtn, BizGroupBtn, BizGroupResetBtn };
