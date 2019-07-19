import styled from 'styled-components';

const Styled = styled.div`
  .layer {
    font-weight: lighter;
    text-align: left;
    position: relative;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 0.75rem;

    &.active {
      opacity: 0.5;
    }

    .layer-vis {
      height: auto !important;
      width: auto !important;
      left: 0;
      top: 4px;
      padding: 7px 5px 7px 10px;
      position: absolute;
      cursor: pointer;
      z-index: 1;
    }

    .layer-title {
      font-weight: lighter;
      background-color: rgba(0, 0, 0, 0.1);
      letter-spacing: 1px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
      text-align: left;
      position: relative;
      cursor: pointer;
      padding: 3px 10px 5px 30px;
      display: flex;
      align-items: center;
      padding-left: 40px;

      .layer-title-inn {
        align-items: center;
        position: relative;
        display: flex;
        width: 100%;
      }

      .layer-name {
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
        padding: 5px 0;
        display: inline-block;
        box-sizing: content-box;
        overflow: hidden;
        white-space: nowrap;
        margin: 0 30px 0 5px;

        &.layer-name--no-edit {
          text-overflow: ellipsis;
        }
        
        &.layer-form-stuff {
          margin-left: 20px;
        }
      }
    }

    .layer-count {
      position: absolute;
      right: 27px;
      top: 9px;
    }
  }
`;

export default Styled;
