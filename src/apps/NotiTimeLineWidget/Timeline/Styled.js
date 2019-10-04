import styled from 'styled-components';

const Styled = styled.div`
  .timeline-wrap {
    border-bottom: 1px solid #e0e0e0;
    padding: 30px 10px;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 0;
    }

    .timeline-title {
      margin-bottom: 10px;

      p {
        font-size: 20px;
        color: #000;
        white-space: nowrap;
        word-break: break-all;
      }
    }

    .timeline-content {
      margin-bottom: 20px;

      p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 16px;
        color: #666;
        height: 45px;
      }
    }

    .timeline-info {
      overflow: hidden;

      ul {
        margin: 0;
        padding: 0;
        li {
          font-size: 12px;
          color: #666;
          display: inline-block;
          margin-right: 10px;

          &:last-child {
            margin-right: 0;
          }

          span {
            vertical-align: middle;
          }
        }

        .timeline-info-left {
          float: left;
        }

        .timeline-info-right {
          float: right;

          i {
            margin-right: 5px;
            width: 13px;
            height: 13px;
          }
        }
      }
    }
  }
`;

export default Styled;
