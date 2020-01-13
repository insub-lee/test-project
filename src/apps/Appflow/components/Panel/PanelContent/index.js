import styled from 'styled-components';

const PanelContent = styled.div`
  padding: 1rem 1rem;
  min-height: 400px;
  overflow-y: auto;

  &:only-child {
    -webkit-border-radius: 0 0 4px 4px;
    -moz-border-radius: 0 0 4px 4px;
    border-radius: 0 0 4px 4px;
  }

  &:last-child,
  &:only-child {
    border-radius: 0 0 4px 4px;
  }

  ul {
    padding-left: 0;
    list-style: none;

    li {
      margin-bottom: 5px;

      :last-child {
        margin-bottom: 0;
      }
    }
  }

  .panel-tag {
    padding: 1rem 1rem;
    margin-bottom: 2rem;
    border-left: 3px solid #1dc9b7;
    background: #eef7fd;
    opacity: 0.8;
    font-weight: 400;
    font-size: 0.875rem;
    border-radius: 0 8px 8px 0;
  }
`;

export default PanelContent;
