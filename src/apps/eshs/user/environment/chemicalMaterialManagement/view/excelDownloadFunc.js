// listData를 ExcelDownloadComp 형식에 맞게 변환해주는 함수
// columnsDefs : column List
// type: fields or columns
// fieldName: column List에서 가져올 key
// fieldArr: 생략하거나 [] 넣을 것

export const createExcelData = (columnsDefs, type, fieldName, fieldArr = []) => {
  const tempCol = fieldArr;
  columnsDefs.map(col => {
    if (col.children) {
      return createExcelData(col.children, type, fieldName, tempCol);
    }
    if (type.toUpperCase() === 'FIELD') {
      return tempCol.push({ field: col[fieldName], style: { font: { sz: '12' } } });
    }
    if (type.toUpperCase() === 'COLUMNS') {
      return tempCol.push({ title: col[fieldName], width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '', bold: true } } });
    }
    return null;
  });

  return tempCol;
};
