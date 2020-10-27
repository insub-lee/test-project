import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 1311px;
  right: 30px;
  width: calc(50% - 20px);

  .approveFormRow {
    position: relative;
    padding-left: 30px;
    padding-bottom: 10px;
    text-align: left;
    min-height: 45px;

    .approveFormLabel {
      display: block;
      width: 200px;
      float: left;
      height: 45px;
      line-height: 45px;
      font-size: 15px;
    }

    .approveFormValue {
      padding: 10px;
      background: rgb(231, 231, 231);
      min-height: 45px;
      line-height: 1.5;
      display: block;
      margin-left: 200px;
    }
  }
`;
