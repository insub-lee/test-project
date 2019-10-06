import styled, { css } from 'styled-components';

const StyleWidget = styled.div`
  ${props =>
    props.appCount === 1 &&
    css`
      & .bookmarkWidget_wrap {
      }

      & .gKTCno {
        position: relative;
        padding: 0px 0px 20px 0px;
      }

      /* 테이블  */
      & .fr-view table {
        border: none;
        border-collapse: collapse;
        empty-cells: show;
        max-width: 100vmax;
      }

      /* 하단 */
      & .dkXVuF > div.mualView-btn-wrapper {
        width: 80%;
      }

      & .dkXVuF > div.mualView-select-wrapper {
        margin-left: 10px;
        width: 15%;
      }
    `};

  ${props =>
    props.appCount > 1 &&
    css`
      & .bookmarkWidget_wrap {
      }

      & .gKTCno {
        position: relative;
        padding: 0px 0px 20px 0px;
      }

      /* 테이블  */
      & .fr-view table {
        border: none;
        border-collapse: collapse;
        empty-cells: show;
        max-width: 100vmax;
      }

      /* 하단 */
      & .dkXVuF > div.mualView-btn-wrapper {
        width: 80%;
      }

      & .dkXVuF > div.mualView-select-wrapper {
        margin-left: 10px;
        width: 15%;
      }
    `};
`;
export default StyleWidget;
