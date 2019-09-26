import styled from 'styled-components';

import iconTabs from 'images/portal/icon-tabs.png';
import iconList from 'images/portal/icon-list.png';
import iconClose from 'images/portal/btn-close.png';
import iconPen from 'images/portal/icon-pen.png';
import iconworkCard from 'images/portal/icon-workCard.png';
import iconworkFolder from 'images/portal/icon-folder.png';

const Styled = styled.i`
  display: inline-block;
  vertical-align: middle;
  &.icon-tabs {
    background: url(${iconTabs}) no-repeat center;
    width: 40px;
    height: 34px;
  }
  &.icon-list {
    background: url(${iconList}) no-repeat center;
    width: 15px;
    height: 25px;
    margin-right: 8px;
    background-size: 15px;
  }
  &.icon-close {
    background: url(${iconClose}) no-repeat center;
    width: 15px;
    height: 15px;
  }
  &.icon-pen {
    background: url(${iconPen}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
    margin-right: 5px;
    margin-top: -5px;
  }
  &.icon-workCard {
    background: url(${iconworkCard}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
  }
  &.icon-workFolder {
    background: url(${iconworkFolder}) no-repeat center;
    width: 15px;
    height: 15px;
    background-size: 100%;
  }
  &.icon-pin {
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzg4NmFiNSI+PHBhdGggZD0iTTEwNS40MDAzOSwxNi40MzI5NGwtMTAuMTM0MTEsMTAuMTM0MTFsNy44NTI1NCw3Ljg1MjU0bC00NC40Mjc3NCwzNS42MzczN2wtMTAuNjI0MDIsLTEwLjYyNDAybC0xMC4xMzQxMSwxMC4xMzQxMWwyNy4yMzg5MywyNy4yMzg5M2wtNDMuNjcxODcsNDMuNjU3ODh2MTAuMDM2MTRoMTAuMDM2MTNsNDMuNjU3ODgsLTQzLjY3MTg3bDI3LjIzODkzLDI3LjIzODkzbDEwLjEzNDExLC0xMC4xMzQxMWwtMTAuMDA4MTQsLTEwLjAwODE0bDM1LjE0NzQ2LC00NC45MTc2NGw3LjcyNjU2LDcuNzI2NTZsMTAuMTM0MTEsLTEwLjEzNDExek0xMTMuMjI0OTMsNDQuNjkzNjhsMTQuMTkzMzYsMTQuMTkzMzZsLTM0LjQxOTYsNDQuMDIxODFsLTIzLjMwNTY2LC0yMy4zMDU2NnoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==')
      50% 50% no-repeat;
    background-size: 100%;
    width: 20px;
    height: 20px;
  }
  &.icon-pin-pill {
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzg4NmFiNSI+PHBhdGggZD0iTTEwMy44NDY2OCwxNy44NDY2OGMtMi45MTYyOCwwLjAwMDc3IC01LjU0MTMzLDEuNzY4NDIgLTYuNjM4Nyw0LjQ3MDM1Yy0xLjA5NzM3LDIuNzAxOTQgLTAuNDQ4MjQsNS43OTkzNyAxLjY0MTY0LDcuODMzMzZsNC4yNjkyLDQuMjY5MjFsLTQ0LjQyNzc0LDM1LjYzNzM3bC03LjA0MDY5LC03LjA0MDY5Yy0xLjM0OTI4LC0xLjM4Njk4IC0zLjIwMjAzLC0yLjE2OTQ4IC01LjEzNzA0LC0yLjE2OTZjLTIuOTE2MjgsMC4wMDA3NyAtNS41NDEzMywxLjc2ODQxIC02LjYzODcsNC40NzAzNWMtMS4wOTczNywyLjcwMTk0IC0wLjQ0ODI1LDUuNzk5MzcgMS42NDE2Myw3LjgzMzM2bDIzLjY1NTYsMjMuNjU1NmwtNDEuNjAwMjYsNDEuNTg2MjdjLTIuNzczNSwyLjc3MzUgLTIuNzczNSw3LjI2MjYzIDAsMTAuMDM2MTRjMi43NzM1LDIuNzczNSA3LjI2MjYzLDIuNzczNSAxMC4wMzYxMywwbDQxLjU4NjI3LC00MS42MDAyNmwyMy42NTU2LDIzLjY1NTZjMS43OTc1MiwxLjg3MjIzIDQuNDY2NzUsMi42MjY0MSA2Ljk3ODI1LDEuOTcxNjhjMi41MTE1LC0wLjY1NDcyIDQuNDcyODIsLTIuNjE2MDUgNS4xMjc1NSwtNS4xMjc1NWMwLjY1NDcyLC0yLjUxMTUgLTAuMDk5NDYsLTUuMTgwNzMgLTEuOTcxNjgsLTYuOTc4MjVsLTYuNDI0OCwtNi40MjQ4MWwzNS4xNDc0NiwtNDQuOTE3NjRsNC4xNDMyMyw0LjE0MzIzYzEuNzk3NTIsMS44NzIyMiA0LjQ2Njc0LDIuNjI2MzkgNi45NzgyNCwxLjk3MTY2YzIuNTExNDksLTAuNjU0NzMgNC40NzI4MSwtMi42MTYwNCA1LjEyNzU0LC01LjEyNzU0YzAuNjU0NzMsLTIuNTExNDkgLTAuMDk5NDUsLTUuMTgwNzIgLTEuOTcxNjcsLTYuOTc4MjRsLTQzLC00M2MtMS4zNDkyOCwtMS4zODY5OSAtMy4yMDIwMywtMi4xNjk0OCAtNS4xMzcwNSwtMi4xNjk2eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')
      50% 50% no-repeat;
    background-size: 100%;
    width: 20px;
    height: 20px;
  }
`;

export default Styled;
