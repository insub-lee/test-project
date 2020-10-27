import styled from 'styled-components';

const StyledTabs = styled.div`
  .sub_tab {
    margin-bottom: 30px;
    border-bottom: 2px solid #dee2e6;
  }
  .sub_tab:after {
    display: block;
    clear: both;
    content: '';
  }
  .sub_tab ul {
    font-size: 0;
    margin-bottom: -2px;
  }
  .sub_tab li {
    display: inline-block;
    width: 16.66%;
  }
  .sub_tab button {
    display: block;
    width: 100%;
    border-bottom: 2px solid #dee2e6;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #777;
  }
  .sub_tab button .row {
    display: block;
    line-height: 18px;
  }
  .sub_tab .on button {
    color: #333333;
    border-bottom: 2px solid #4491e0;
  }

  .sub_tab_body > .tab_contents {
    display: none;

    &.on {
      display: block;
    }
  }

  @media screen and (max-width: 1260px) {
    .sub_tab li {
      display: inline-block;
      width: 20%;
    }
    .sub_tab button {
      font-size: 13px;
    }
  }
`;

export default StyledTabs;
