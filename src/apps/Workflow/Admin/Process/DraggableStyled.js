import styled from 'styled-components';

const DraggableStyled = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: calc(1.47em + 1rem + 2px);
  padding: 0.5rem 0.875rem;
  margin-bottom: 0.3rem;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.47;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;

  &.active {
    border-color: rgb(24, 144, 255);
  }
`;

export default DraggableStyled;
