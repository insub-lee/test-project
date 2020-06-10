import styled from 'styled-components';

const SummernoteDefaultStyle = styled.div`
  ul {
    display: block;
    list-style-type: disc;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
  }

  ol {
    display: block;
    list-style-type: decimal;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
  }

  li {
    display: list-item;
    text-align: -webkit-match-parent;
    //position: relative;
    min-height: 0 !important;
    padding-left: 0 !important;
    margin-bottom: 0 !important;
    font-size: initial;
  }
`;

export default SummernoteDefaultStyle;
