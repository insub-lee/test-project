import React from 'react';

import PropTypes from 'prop-types';

const leftColumns = [
  { title: '수축기', dataIndex: 'SUCHUK', parentColumn: '고혈압', rowSpan: 2 },
  { title: '이완기', dataIndex: 'IWAN', parentColumn: '고혈압' },
  { title: 'GOT', dataIndex: 'GOT', parentColumn: '간장질환', rowSpan: 3 },
  { title: 'GPT', dataIndex: 'GPT', parentColumn: '간장질환' },
  { title: '감마GTP', dataIndex: 'GAMMA', parentColumn: '간장질환' },
  { title: 'T-콜레스트롤', dataIndex: 'COL', parentColumn: '고지혈', rowSpan: 4 },
  { title: '중성지방', dataIndex: 'JOONGSUNG', parentColumn: '고지혈' },
  { title: 'HDL', dataIndex: 'HDL', parentColumn: '고지혈' },
  { title: 'LDL', dataIndex: 'LDL', parentColumn: '고지혈' },
  { title: '혈당', dataIndex: 'HYULDANG', parentColumn: '당뇨', rowSpan: 1 },
  { title: '혈색소', dataIndex: 'HYULSAK', parentColumn: '빈혈', rowSpan: 1 },
  { title: '체지방률', dataIndex: 'CHEJI', parentColumn: '체성분', rowSpan: 3 },
  { title: '복부지방률', dataIndex: 'BOK', parentColumn: '체성분' },
  { title: '기초대사량', dataIndex: 'GICHO', parentColumn: '체성분' },
];

const standard = {
  SUCHUK: '91 ~ 139',
  IWAN: '61 ~ 89',
  GOT: '50이하',
  GPT: '45이하',
  GAMMA: '77이하(남자) 45이하(여자)',
  COL: '239이하',
  JOONGSUNG: '200이하',
  HDL: '60이상',
  LDL: '100미만',
  HYULDANG: '70~110',
  HYULSAK: '12.1~16.5(남자) 10.1~15.5(여자)',
  CHEJI: '10~20%(남자) 18~28%(여자)',
  BOK: '13~16.5(남자) 10~15.5(여자)',
  GICHO: '13~16.5(남자) 10~15.5(여자)',
};

const SelfCheckList = ({ list }) => (
  <table className="table-border">
    <colgroup>
      <col width="10%" />
      <col width="15%" />
      {list.map((l, index) => (
        <col key={`COL_${index}`} width={`${Math.floor(50 / list.length)}%`} />
      ))}
      <col width="25%" />
    </colgroup>
    <thead>
      <tr>
        <th>구분</th>
        <th>검사종목</th>
        {list.map((l, index) => (
          <th key={`THEAD_${index}`}>{l.SE_DT}</th>
        ))}
        <th>기준치(정상)</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td colSpan={3 + list.length}>{`${leftColumns.length} 건`}</td>
      </tr>
    </tfoot>
    <tbody>
      {leftColumns.map(col => (
        <tr key={`TR_${col.dataIndex}`}>
          {col.rowSpan && <th rowSpan={col.rowSpan}>{col.parentColumn}</th>}
          <th>{col.title}</th>
          {list.map((item, index) => (
            <td align="center" key={`TD_${col.dataIndex}_${index}`}>
              {item[col.dataIndex]}
            </td>
          ))}
          <td>{standard[col.dataIndex]}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

SelfCheckList.propTypes = {
  list: PropTypes.array,
};

SelfCheckList.defaultProps = {
  list: [],
};
export default SelfCheckList;
