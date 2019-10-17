import styled from 'styled-components';

const StyledEvaluationForm = styled.div`
  .assessment {
    background: #ebf0f6;
  }
  .assessment .inner {
    padding: 20px 10px;
  }

  .assessment .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
  }
  .assessment .title span {
    font-size: 14px;
    color: #666666;
    font-weight: 400;
    display: block;
    margin-top: 5px;
  }

  .assessment .assessWrap li {
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .assessment .assessWrap li .question {
    position: relative;
    border-bottom: 1px solid #ebf0f6;
    padding: 15px 12px;
    font-size: 16px;
  }
  .assessment .assessWrap li .question span.point {
    display: inline-block;
    background: #16b5cc;
    color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    margin-right: 8px;
    font-size: 16px;
  }

  .assessment .assessWrap li .question div.score {
    position: absolute;
    display: inline-block;
    border: 1px solid #ebf0f6;
    //border-radius: 50%;
    width: 70px;
    height: 30px;
    //line-height: 30px;
    //text-align: center;
    //font-weight: bold;
    //margin-right: 8px;
    //font-size: 16px;
    right: 0;
  }

  .assessment .assessWrap li .number {
    display: inline-block;
    width: 50px;
  }

  .assessment .assessWrap li .radio,
  .assessment .assessWrap li .text {
    border-bottom: 1px solid #ebf0f6;
    padding: 15px 19px;
    display: block;
  }

  .assessment .assessWrap li textarea {
    margin-top: 10px;
    padding: 5px 0 15px 0;
    border: 0;
    width: 100%;
    border-bottom: 1px solid #d9e0e7;
  }

  .assessment .btnWrap .assessSubmit {
    background: #136191;
    color: #fff;
    font-size: 16px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-radius: 5px;
    margin-top: 10px;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  div.score_board {
    background: white;
    padding: 15px 12px;
    font-size: 15px;
    font-weight: 700;
    text-align: right;
  }
`;

export default StyledEvaluationForm;
