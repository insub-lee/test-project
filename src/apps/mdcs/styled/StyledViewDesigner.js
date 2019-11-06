import styled from 'styled-components';

const StyledViewDesigner = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  flex: 1 1 auto;
  width: 100%;
  min-height: 100vh;
  .view-designer {
    display: flex;
    align-items: stretch;
    flex: 1 1 auto;
    padding: 0;
    flex-basis: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    width: 0;
    min-width: 0;
    max-width: 100%;
    min-height: 1px;
    .view-wrapper {
      flex: 1 1 auto;
      -webkit-box-ordinal-group: 4;
      order: 3;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      position: relative;
      .view-inner {
        display: flex;
        flex-grow: 1;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.1);
        height: 100vh;
        .view-sidebar {
          flex-wrap: wrap;
          flex-shrink: 0;
          position: relative;
          width: 15rem;
          background-color: #82a4dd;
        }
        .view-content-wrapper {
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          flex-direction: column;
          flex-grow: 1;
          padding: 1rem;
          position: relative;
          .top-button-wrapper {
            position: absolute;
            top: 10px;
            right: 10px;
          }
        }
      }
    }
  }
`;

export default StyledViewDesigner;
