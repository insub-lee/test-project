import styled from 'styled-components';

const Styled = styled.div`
  background: #fff;
  border: 1px solid #eaeaea;
  padding: 40px;
  border-radius: 3px;
  height: 100%;

  .title-wrap {
    width: 100%;
    position: relative;
    margin-bottom: 15px;

    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      width: 105px;
    }
  }

  .list-wrap {
    width: 100%;
    overflow: hidden;

    > div {
      float: left;

      .searchInput {
        width: 245px;
        margin-left: 10px;
      }

      .list-type {
        float: right;
        & label {
          width: 35px;
        }
      }
    }
  }
`;

export default Styled;
