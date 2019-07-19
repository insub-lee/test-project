import styled from 'styled-components';

const Styled = styled.div`
  border-top: 2px solid rgba(0, 0, 0, 0.2);

  #sign-line-options {
    font-size: 0.75rem;
    padding: 10px 5px;
  }

  #sign-line-options-up {
  }

  #sign-line-options-label {
    padding: 7px 0;
    float: left;
  }

  #sign-line-options-status-c {
    float: right;
  }

  #sign-line-options-input-c {
    position: relative;
    display: inline-block;

    > .field {
      background-color: rgba(0, 0, 0, 0.2);
      border: none;
      box-shadow: none;
      border-radius: 2px;
      box-sizing: border-box;
      padding: 0;
      position: relative;
    }

    > .select {
      width: 100%;
    }

    .sel-arrow {
      height: 100%;
      width: 9px;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 0;
      .d-s-arrow {
        bottom: 0;
        top: 0;
        margin: auto;
        right: 5px;
        border-top: 4px solid rgba(255, 255, 255, 0.7);
        position: absolute;
        height: 0;
        width: 0;
        border-left: 3px solid transparent;
        border-right: 4px solid transparent;
        cursor: pointer;
      }
    }
  }
  #sign-line-options-input-holder {
  }

  #sign-line-options-states {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: inherit;
    border: none;
    background-color: transparent;
    box-sizing: border-box;
    width: 50px;
    position: relative;
    padding: 5px;

    option {
      background-color: #444;
      color: #ddd;
    }
  }

  #sign-line-options-field {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    box-shadow: none;
    border-radius: 2px;
    box-sizing: border-box;
    position: relative;
    clear: both;
    padding: 5px;
    margin-bottom: 5px;
    text-align: left;
  }

  .trt-traits {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    .trt-trait {
      display: flex;
      justify-content: flex-start;
      //padding: 5px 10px;
      font-weight: lighter;

      .label {
        line-height: 27px;
        width: 30%;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.65rem;
      }

      .field {
        background-color: rgba(0, 0, 0, 0.2);
        border: none;
        box-shadow: none;
        border-radius: 2px;
        box-sizing: border-box;
        padding: 0;
        position: relative;
        width: 70%;

        input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          color: inherit;
          border: none;
          background-color: transparent;
          box-sizing: border-box;
          width: 100%;
          position: relative;
          padding: 5px;
          z-index: 1;
        }

        .field-select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          color: inherit;
          border: none;
          background-color: transparent;
          box-sizing: border-box;
          width: 100%;
          position: relative;
          padding: 5px;
          z-index: 1;

          option {
            background-color: #444;
            color: #ddd;
          }
        }
      }
    }
  }

  .sm-sector,
  .clm-tags {
    clear: both;
    font-weight: lighter;
    text-align: left;

    .sm-title {
      font-weight: lighter;
      background-color: rgba(0, 0, 0, 0.1);
      letter-spacing: 1px;
      padding: 9px 10px 9px 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
      text-align: left;
      position: relative;
      cursor: pointer;
    }
  }

  .sm-properties {
    font-size: 0.75rem;
    padding: 10px 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    box-sizing: border-box;
    width: 100%;
  }

  .trt-traits {
    font-size: 0.75rem;
  }

  .trt-trait {
    display: flex;
    justify-content: flex-start;
    padding: 5px 10px;
    font-weight: lighter;

    .label {
      width: 30%;
      text-align: left;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .label-for-check {
      text-align: left;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .field {
      background-color: rgba(0, 0, 0, 0.2);
      border: none;
      box-shadow: none;
      border-radius: 2px;
      box-sizing: border-box;
      padding: 0;
      position: relative;
      width: 70%;

      input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        color: inherit;
        border: none;
        background-color: transparent;
        box-sizing: border-box;
        width: 100%;
        position: relative;
        padding: 5px;
        z-index: 1;
      }
    }

    .sel-arrow {
      height: 100%;
      width: 9px;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 0;
      .d-s-arrow {
        bottom: 0;
        top: 0;
        margin: auto;
        right: 5px;
        border-top: 4px solid rgba(255, 255, 255, 0.7);
        position: absolute;
        height: 0;
        width: 0;
        border-left: 3px solid transparent;
        border-right: 4px solid transparent;
        cursor: pointer;
      }
    }
  }
`;

export default Styled;
