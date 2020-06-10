import styled from 'styled-components';

const Wrapper = styled.div`
  .title {
    padding: 10px 0;
    font-size: 20px;
    font-weight: 600;
  }

  .btn_wrap {
    margin-bottom: 5px;
    text-align: right;
  }

  .search_div {
    padding: 5px 0;
    width: 270px;

    li {
      float: left;
      list-style-type: none;
      vertical-align: bottom;
      margin: 0 30px 10px 0;
    }

    input {
      text-align: center;
    }
  }
`;

export default Wrapper;
