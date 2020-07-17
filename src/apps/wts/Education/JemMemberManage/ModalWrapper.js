import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px 30px;

  .title {
    padding: 10px 0;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  .btn_wrap {
    margin-bottom: 5px;
    padding-top: 20px;
    text-align: center;
  }

  .tb02 td .cateWrap {
    display: block;
    margin: 0 auto 10px auto;
  }
  .tb02 td .cateWrap:last-child {
    margin-bottom: 0;
  }
  .tbCateTable td {
    vertical-align: top;
  }
  .tbCateTable .alignMid {
    vertical-align: middle;
  }

  .select_wrap {
    width: 100%;
    padding-left: 20px;
    .select_area_wrap {
      padding-bottom: 10px;
    }
    .title_span {
      width: 34px;
      display: inline-block;
    }
    .select_area,
    .select_bay {
      width: 80%;
    }
  }
`;

export default Wrapper;
