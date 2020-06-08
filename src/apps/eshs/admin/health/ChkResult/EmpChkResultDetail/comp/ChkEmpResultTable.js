import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { message } from 'antd';

class ChkEmpResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: '검진년도', field: 'CHK_YEAR', align: 'center' },
        { title: '검진종류', field: 'CHK_TYPE_NM', align: 'center' },
        { title: '검진차수', field: 'CHK_SEQ', align: 'center' },
        { title: '검진기관', field: 'HOSPITAL_NM', align: 'center' },
        { title: '검진일자', field: 'CHK_DT', align: 'center', className: 'td-pointer', onClick: true },
        { title: '판정', field: 'DISEASE_DESC', align: 'left' },
      ],
    };
  }

  handleChkDtOnClick = record => {
    message.warning('미구현');
    console.debug('record', record);
  };

  render() {
    const { empInfo, chkCd, noData } = this.props;
    const { columns } = this.state;
    return (
      <table className="table-border" key={`${chkCd}_table`}>
        <colgroup>
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="15%" />
          <col width="15%" />
          <col width="40%" />
        </colgroup>
        <thead>
          <tr>
            {columns.map(u => (
              <th key={`${chkCd}_${u.title}_thead`}>{u.title}</th>
            ))}
          </tr>
        </thead>
        {noData ? (
          <tfoot>
            <tr>
              <td colSpan={6}>검진 결과가 없습니다.</td>
            </tr>
          </tfoot>
        ) : (
          <tbody>
            <tr>
              {columns.map(u => (
                <td
                  key={`${chkCd}_${u.title}_tbody`}
                  align={u.align}
                  className={u.className || ''}
                  onClick={eval(u.onClick) ? () => this.handleChkDtOnClick(u) : undefined}
                >
                  {u.title === '판정' ? empInfo[u.field] ? <div dangerouslySetInnerHTML={{ __html: empInfo[u.field] }} /> : '-' : empInfo[u.field]}
                </td>
              ))}
            </tr>
            <tr>
              <td colSpan={4}>
                <span>[ 종합소견 ]</span>
                {empInfo.TOTAL_COMMENT && <div dangerouslySetInnerHTML={{ __html: empInfo.TOTAL_COMMENT.replace(/니다./gi, '니다.<br/>') }} />}
              </td>
              <td colSpan={2}>
                <span>[ 조치사항 ]</span>
                {empInfo.MEASURE && <div dangerouslySetInnerHTML={{ __html: empInfo.MEASURE.replace(/니다./gi, '니다.<br/>') }} />}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    );
  }
}

ChkEmpResultTable.propTypes = {
  empInfo: PropTypes.object,
  chkCd: PropTypes.string,
  noData: PropTypes.bool,
};
ChkEmpResultTable.defaultProps = {
  empInfo: {},
  chkCd: '',
  noData: false,
};

export default ChkEmpResultTable;
