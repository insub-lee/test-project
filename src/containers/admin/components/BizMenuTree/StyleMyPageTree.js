import styled from 'styled-components';
import iconAppList from 'images/common/icon-applist.png';
import iconFolder from 'images/common/icon-folder.png';
import iconCopy from 'images/common/icon-copy.png';
import iconVisible from 'images/common/icon-visible.png';
import iconInVisible from 'images/common/icon-invisible.png';
import iconRemove from 'images/common/icon-delete-white.png';
import iconEdit from 'images/common/icon-edit-white2.png';
import iconSetting from 'images/common/icon-settings.png';

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
            > .active {
              > span {
                color: #f85023 !important;
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
    width: calc(100% - 5px);
    height: 35px;
    padding: 5px;
    background: #d3d5d7;
    text-align: right;

    button + button {
      margin-left: 5px;
    }
  }
`;

// 앱보기 아이콘 버튼
const AppListBtn = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #d3d5d7;
  border-radius: 3px;
  background: #ffffff url(${iconAppList}) no-repeat 50% 50%;
`;

// 폴더보기 아이콘 버튼
const FolderBtn = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #d3d5d7;
  border-radius: 3px;
  background: #ffffff url(${iconFolder}) no-repeat 50% 50%;
`;

// 복사하기 아이콘 버튼
const CopyBtn = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #d3d5d7;
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

const SettingBtn = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #d3d5d7;
  border-radius: 3px;
  background: #ffffff url(${iconSetting}) no-repeat 50% 50%;
`;

export default StyleMyPageTree;
export { AppListBtn, FolderBtn, CopyBtn, VisionBtn, RemoveBtn, EditBtn, SettingBtn };
