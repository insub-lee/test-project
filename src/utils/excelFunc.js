export const excelDown = (strHtml, fileName) => {
  let tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
  tab_text += '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  tab_text += '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
  tab_text += '<x:Name>Test Sheet</x:Name>';
  tab_text += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
  tab_text += '</x:ExcelWorksheets></x:ExcelWorkbook></xml>';
  tab_text += '<style>.tr-total td { background-color: #c5c9cd; }</style>';
  tab_text += '</head><body>'
  tab_text += strHtml;
  tab_text += '</body></html>'

  let data_type = 'data:application/vnd.ms-excel';
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf("MSIE ");
  // fileName = 'TEST_Table' + '.xls';
  fileName = fileName + '.xls';

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    //ie 용
    if (window.navigator.msSaveBlob) {
        let blob = new Blob([tab_text], {
            type: "application/csv;charset=utf-8;"
        });
        navigator.msSaveBlob(blob, fileName);
    }
  } else { //그외
      let blob2 = new Blob([tab_text], {
          type: "application/csv;charset=utf-8;"
      });
      let filename = fileName;
      let elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob2);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
  }
}
