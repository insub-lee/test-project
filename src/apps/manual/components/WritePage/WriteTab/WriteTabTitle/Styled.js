import styled from 'styled-components';

const Styled = styled.div`
  position: relative;
  text-align: center;
  font-size: 14px;
  background-color: #eff0f2;
  color: #666;
  border: 1px solid #e5e5e5;
  border-right: 0;
  border-radius: 3px 3px 0 0;
  display: block;
  padding: 0.5rem 1.125rem;
  .titleWrap {
    display: inherit;
    border: none;
    padding: 0;
    width: 130px;
    line-height: normal;
    height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .btn-m-minus {
    margin-left: 5px;
    background-color: transparent;
    border: none;
    outline: 0;
    & > i {
      font-size: 20px;
      color: #886ab5;
    }
  }
  input ~ .btn-m-minus {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
  }
  .noShow {
    display: none;
  }
`;

export default Styled;
