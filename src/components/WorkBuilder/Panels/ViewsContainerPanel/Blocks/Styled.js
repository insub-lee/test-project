import styled from 'styled-components';

const Styled = styled.div`
  .blocks-cs {
    &.sign-line-checkbox {
      padding: 15px;
    }

    .block-categories {
      display: flex;
      flex-direction: column;
      .block-category {
        width: 100%;
        .title {
          font-weight: lighter;
          background-color: rgba(0, 0, 0, 0.1);
          letter-spacing: 1px;
          padding: 9px 10px 9px 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.25);
          text-align: left;
          position: relative;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .caret-icon {
          margin-right: 5px;
        }
        .blocks-c {
          display: none;
          flex-wrap: wrap;
          justify-content: flex-start;

          &.active {
            display: flex;
          }

          .block {
            -moz-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            -o-user-select: none;
            user-select: none;
            width: 45%;
            min-width: 45px;
            padding: 1em;
            box-sizing: border-box;
            min-height: 60px;
            //cursor: all-scroll;
            cursor: pointer;
            font-size: 11px;
            font-weight: lighter;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 3px;
            margin: 10px 2.5% 5px;
            box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.15);
            transition: all 0.2s ease 0s;
            transition-property: box-shadow, color;

            .block-label {
              line-height: normal;
              font-size: 0.65rem;
              font-weight: normal;
              font-family: Helvetica, sans-serif;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            &:hover {
              color: #d97aa6;
              box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.15);
            }
          }
        }
      }
    }
  }
`;

export default Styled;
