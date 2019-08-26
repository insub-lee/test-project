import styled from 'styled-components';
import iconAddCtg from 'images/common/widget-icon-add.png';
import iconEdit from 'images/common/icon-edit.png';
import iconTrashcan from 'images/common/icon-delete-white.png';
import iconFolder from 'images/common/icon-folder.png';

const StyleMyAppTree = styled.div`
  .rst__node {
    &:hover {
      * {
        opacity: 1;
      }
    }

    .rst__nodeContent {
      .rstcustom__rowWrapper {
        padding: 0 !important;

        .rstcustom__rowContents {
          .rstcustom__rowLabel {
            .rstcustom__rowTitle {
              button {
                background: transparent;
                > .active {
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
            position: relative;
            top: 2px;
            margin-left: 5px;

            .rstcustom__toolbarButton {
              margin-right: 5px;
            }
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

  .fixedMenu {
    width: 100%;
    height: 25px;
    padding: 5px;
    background: #d6c7de;
    text-align: right;
    margin: 10px 0 10px;
    border-radius: 3px;

    button {
      width: 16px;
      height: 16px;
      border: 0px solid #d3d5d7;
      background-size: 11px;
    }

    button + button {
      margin-right: 5px;
    }
  }
`;

// 카테고리 추가 아이콘 버튼
const FolderBtn = styled.button`
  width: 15px;
  height: 15px;
  border: 1px solid #d3d5d7;
  border-radius: 3px;
  background: #ffffff url(${iconFolder}) no-repeat 50% 50%;
  background-size: 12px;
`;

// 매뉴얼 추가 아이콘 버튼
const AddCtgBtn = styled.button`
  width: 15px;
  height: 15px;
  border-color: #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconAddCtg}) no-repeat 50% 50%;
  background-size: 12px;
`;

// 수정 아이콘 버튼
const EditCtgBtn = styled.button`
  width: 15px;
  height: 15px;
  border-color: #ffffff;
  border-radius: 3px;
  background: #ffffff url(${iconEdit}) no-repeat 50% 50%;
  background-size: 12px;
`;

// 삭제 아이콘 버튼
const DeleteCtgBtn = styled.button`
  width: 15px;
  height: 15px;
  border-color: #2a2a2a;
  border-radius: 3px;
  background: #2a2a2a url(${iconTrashcan}) no-repeat 50% 50%;
  background-size: 12px;
`;

export default StyleMyAppTree;
export { AddCtgBtn, EditCtgBtn, DeleteCtgBtn, FolderBtn };
