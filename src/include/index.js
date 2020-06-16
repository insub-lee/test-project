import * as $ from 'jquery';
import 'antd/dist/antd.min.css';
import 'xeicon/xeicon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'rodal/lib/rodal.css';
import 'rc-dialog/assets/index.css';
import 'moment/locale/ko';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

window.jQuery = $;
window.$ = $;

/* hide console when use production level */
function noConsole() {}
if (process.env.NODE_ENV === 'production') {
  console.log = noConsole;
  console.error = noConsole;
  console.warn = noConsole;
  console.debug = noConsole;
}
