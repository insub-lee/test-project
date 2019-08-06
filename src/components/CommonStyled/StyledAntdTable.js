import styled from 'styled-components';

const primaryColor = '#6a60b9';
const primaryColor2 = '#886ab5';
const reversePrimaryColor = '#c1b2d9';

const StyledAntdTable = Component => styled(Component)`
 /* thead */
 .ant-table-thead > tr:first-child > th:first-child {
   border-top-left-radius: 0;
 }
 .ant-table-thead > tr:first-child > th:last-child {
   border-top-right-radius: 0;
 }
 .ant-table-thead > tr > th {
   background-color: ${primaryColor};
   color: #ffffff;
   text-align: center;
   font-size: 12px;
   padding: 10px;
 }
 /* tbody */
 .ant-table-tbody > tr > td {
   background: #ffffff;
   border-bottom: 1px solid #ddd;
   padding: 10px;
   color: #666;
   font-size: 12px;
 }
 /* checkbox */
 .ant-checkbox-indeterminate .ant-checkbox-inner:after {
   background-color: ${primaryColor};
 }
 .ant-checkbox-checked .ant-checkbox-inner {
   border-color: ${primaryColor};
   background-color: ${primaryColor};
 }
 .ant-checkbox-checked:after {
   background-color: ${primaryColor};
   border-color: ${primaryColor};
 }
 .ant-checkbox-input:focus + .ant-checkbox-inner,
 .ant-checkbox-wrapper:hover .ant-checkbox-inner,
 .ant-checkbox:hover .ant-checkbox-inner {
   border-color: ${primaryColor};
 }
 /* Pagination */
 .ant-pagination-item {
   border: none;
 }
 .ant-pagination-item a {
   color: ${reversePrimaryColor};
 }
 .ant-pagination-item-active {
   border-color: ${primaryColor2};
   background-color: ${primaryColor2};
   color: #ffffff;
 }
 .ant-pagination-item-active a {
   color: ${reversePrimaryColor};
 }
 .ant-table-pagination.ant-pagination {
   float: none;
   margin: 20px auto;
   text-align: center;
 }
 .ant-pagination-item-link .anticon {
   vertical-align: inherit;
 }
`;
export default StyledAntdTable;
