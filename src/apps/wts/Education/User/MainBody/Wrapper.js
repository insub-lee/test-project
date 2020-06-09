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

    input {
      text-align: center;
    }

    select[name='searchDate'] {
      width: 130px;
      padding: 0 0 0 10px;
      font-size: 20px;
      height: 55px;
      line-height: 55px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAYAAAAPtVbGAAAAu0lEQVRIie2WsQ3CMBBFn1EqhqDPBlRAi2+IjIIY6lxDxwa0iIKKmjY0FxRFTmQLufNvrC+f79lXfNk9Xu+ewmpsdQUZ/apg858qpELKqZnbCKob4G7We5FrpGYPBLOtF3nGes2+xA60Qz9rmA1YhIxAMgLtIoDjEgDAWXYtxkpQPQBq9gSch3vExjhRnwSZgNbAJxEAOdnlRS5AZ7ZLBACJ4xorqG69yC21npxx/aEa9RVSUEMKF/0WfQG+mErmooDh3gAAAABJRU5ErkJggg==)
        no-repeat right 10px center;
    }
  }

  .cateList {
    margin-bottom: 10px;
  }
  .cateList li {
    display: inline-block;
    margin-right: 10px;
  }
  .cateList li:last-chlid {
    margin-right: 0;
  }
  .cateIcon {
    display: inline-block;
    width: 15px;
    height: 15px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .cateTxt {
    display: inline-block;
    vertical-align: middle;
  }
  .cateIcon.cate01 {
    background: rgb(31, 181, 173);
  }
  .cateIcon.cate02 {
    background: #ff7f29;
  }
  .cateIcon.cate03 {
    background: #0f3f99;
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
`;

export default Wrapper;
