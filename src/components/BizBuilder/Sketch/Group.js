import styled from 'styled-components';

const Group = styled.div`
  position: relative;
  padding: 5px;
  margin-bottom: 3px;
  /* border: 1px solid #ddd; */
  border-top: 2px solid #999;

  /* :hover {
    background-color: rgba(220, 204, 245, 0.1);
  } */

  .group-actions {
    display: none;
    position: absolute;
    top: -15px;
    right: -15px;

    button {
      width: 30px;
      height: 30px;
      overflow: hidden;
      border: 1px solid #999;
      border-radius: 50%;
    }
  }

  :hover > .group-actions {
    display: block;
  }
`;

export default Group;
