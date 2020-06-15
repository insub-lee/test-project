import React from 'react';
import PropTypes from 'prop-types';

const columns = [
  {
    title: '등록번호',
    align: 'center',
    dataIndex: 'SE_NO',
    width: '20%',
  },
  {
    title: '등록일자',
    align: 'center',
    dataIndex: 'SE_DT',
    width: '20%',
  },
  {
    title: '고혈압',
    align: 'center',
    dataIndex: 'GRADE_GO',
    width: '10%',
  },
  {
    title: '간장질환',
    align: 'center',
    dataIndex: 'GRADE_GAN',
    width: '10%',
  },
  {
    title: '고지혈',
    align: 'center',
    dataIndex: 'GRADE_GOJI',
    width: '10%',
  },
  {
    title: '당뇨',
    align: 'center',
    dataIndex: 'GRADE_DANG',
    width: '10%',
  },
  {
    title: '빈혈',
    align: 'center',
    dataIndex: 'GRADE_BIN',
    width: '10%',
  },
  {
    title: '비만',
    align: 'center',
    dataIndex: 'GRADE_BIMAN',
    width: '10%',
  },
];

const SelfDetailList = ({ rowClick, list, text }) => (
  <table className="table-border">
    <colgroup>
      {columns.map(col => (
        <col key={`COL_${col.dataIndex}`} width={col.width} />
      ))}
    </colgroup>
    <thead>
      <tr>
        {columns.map(col => (
          <th key={`SelfDetail_${col.dataIndex}`}>{col.title}</th>
        ))}
      </tr>
    </thead>
    {text && (
      <tfoot>
        <tr>
          <td colSpan={columns.length}>
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </td>
        </tr>
      </tfoot>
    )}
    <tbody>
      {list.map(item => (
        <tr
          key={`TR_${item.SE_NO}`}
          className="tr-pointer"
          onClick={() => rowClick(`${item.BIGO || ''} <H3>*상담내용*</H3> <br>${(item.CONSULT && item.CONSULT.replace(/align="left"/gi, '')) || ''}`)}
        >
          {columns.map(col => (
            <td align={col.align} key={`TH_${item.SE_NO}_${col.dataIndex}`}>
              {item[col.dataIndex]}
            </td>
          ))}
        </tr>
      ))}
      <tr>
        <td colSpan={columns.length} align="center">
          <font color="green">
            ※ <b>등록번호</b>를 클릭하시면 상세결과를 보실 수 있습니다.
          </font>
        </td>
      </tr>
    </tbody>
  </table>
);

SelfDetailList.propTypes = {
  rowClick: PropTypes.func,
  list: PropTypes.array,
  text: PropTypes.string,
};
SelfDetailList.defaultProps = {
  rowClick: () => {},
  list: [],
  text: '',
};

export default SelfDetailList;
