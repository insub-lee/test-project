import styled from 'styled-components';

const Panel = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  //-webkit-box-shadow: 0 0 13px 0 rgba(62, 44, 90, 0.08);
  //box-shadow: 0 0 13px 0 rgba(62, 44, 90, 0.08);
  margin-bottom: 1.5rem;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-bottom: 1px solid #e0e0e0;
  border-radius: 4px;
  -webkit-transition: border 0.5s ease-out;
  transition: border 0.5s ease-out;
`;

export default Panel;
