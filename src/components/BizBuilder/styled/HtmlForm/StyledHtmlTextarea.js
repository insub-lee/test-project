import styled from 'styled-components';

const StyledHtmlTextarea = styled.textarea`
  &.html-textarea {
    display: block;
    width: 100%;
    height: auto;
    padding: 10px;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.47;
    color: #666;
    background-clip: padding-box;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    &:hover,
    &:focus {
      border-color: #636a78;
      outline: 0;
      box-shadow: 0 0 0 0.2rem transparent;
    }
  }
`;

export default StyledHtmlTextarea;
