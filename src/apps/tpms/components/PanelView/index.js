import styled from 'styled-components';

const PanelView = styled.div`
  height: 100vh;
  background-color: #eff3f8;

  .panels {
    display: flex;
    flex: 1 1 0;
    height: 100%;
    position: absolute;
    outline: none;
    overflow: hidden;
    user-select: text;
    flex-direction: row;
    left: 0;
    right: 0;

    .panel_left {
      flex: 0 0 auto;
      position: relative;
      outline: none;
      width: 210px;
      background-color: #152434;
    }
    .panel_right {
      flex: 1 1 0;
      width: calc(100% - 210px);
      position: relative;
      outline: none;
    }
  }
`;

export default PanelView;
