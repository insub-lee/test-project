import styled from 'styled-components';

const StyledBuilderDataWidget = styled.div`
  .section-body {
    
    .section-contents-board {
      font-size: 0;
      padding: 10px 0;

      li {
        padding: 5px 10px;

        a {
          position: relative;
          display: block;
          width: 100%;
          overflow: hidden;
          text-align: left;
          color: #666666;
          font-size: 14px;

          .board-txt {
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            width: 100%;
            /* width: calc(100% - 65px); */
            overflow: hidden;

            &:before {
              content: '·';
              display: inline-block;
              margin-right: 4px;
            }
          }

          .board-date {
            position: absolute;
            right: 0;
            top: 1px;
            font-size: 12px;
            color: #cccccc;
          }
        }

        &:last-child {
          margin-bottom: 0;
        }

        &:hover {
          background: #e3f0ff;
          a {
            color: #4491e0;
          }
        }
      }
    }
  }
`;

export default StyledBuilderDataWidget;