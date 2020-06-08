import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { message } from 'antd';

class ChkItemResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalList: [],
      data: {},
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({ data });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextData = nextProps.data;
    const prevData = prevState.data;
    if (nextData !== prevData) {
      const totalList = [];
      const list = (nextData && nextData.list) || [];
      const totalResult = nextData.totalResult || [];
      let itemGroup = {};
      let currDesc = '';
      let groupCnt = 0;
      const lastIdx = totalResult.lastIndex;
      totalResult.forEach((t, idx) => {
        let row = { ...t };
        let isOk = false;
        list.forEach(l => {
          const itemList = l.itemList || [];

          const fIndex = itemList.findIndex(i => i.CHK_RESULT_ITEM_CD === t.CHK_RESULT_ITEM_CD);
          if (fIndex > -1) {
            isOk = true;
            row = { ...row, [`${l.CHK_CD}_RESULT`]: itemList[fIndex].RESULT };
          }
        });
        if (isOk) {
          totalList.push(row);
          if (currDesc !== t.CHK_RESULT_ITEM_DESC) {
            itemGroup = { ...itemGroup, [currDesc]: groupCnt };
            currDesc = t.CHK_RESULT_ITEM_DESC;
            groupCnt = 0;
          }
          groupCnt++;
        }
        if (lastIdx === idx) itemGroup = { ...itemGroup, [currDesc]: groupCnt };
      });

      return { data: nextData, totalList, itemGroup };
    }
    return null;
  }

  handleItemOnClick = index => {
    message.warning('미구현');
    message.warning(`index [ ${index} ]`);
  };

  render() {
    const { totalList, data, itemGroup } = this.state;
    const list = (data && data.list) || [];
    const listLen = list.length;
    let currDesc = '';
    return (
      <table className="table-border">
        <colgroup>
          <col width="10%" />
          <col width="15%" />
          {list.map((l, index) => (
            <col key={`COL_${index}`} width={`${Math.floor(50 / listLen)}%`} />
          ))}
          <col width="25%" />
        </colgroup>
        <thead>
          <tr>
            <th>구분</th>
            <th>검사종목</th>
            {list.map((l, index) => (
              <th key={`TH_${index}`}>
                {l.CHK_YEAR}년도 <br />
                {l.CHK_TYPE_NM} {l.CHK_SEQ}
              </th>
            ))}
            <th>기준치</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan={eval(3 + listLen)}>{totalList.length} 항목</td>
          </tr>
        </tfoot>
        <tbody>
          {totalList.map((t, rowIndex) => {
            if (!currDesc) {
              currDesc = t.CHK_RESULT_ITEM_DESC;
              return (
                <tr key={rowIndex}>
                  <td align="center" rowSpan={itemGroup[currDesc]}>
                    {t.CHK_RESULT_ITEM_DESC || ''}
                  </td>
                  <td align="center" className="td-pointer" onClick={() => this.handleItemOnClick(rowIndex)}>
                    {t.CHK_RESULT_ITEM_NM || ''}
                  </td>
                  {list.map((l, colIndex) => (
                    <td align="center" key={`${rowIndex}_${colIndex}`}>{`${t[`${l.CHK_CD}_RESULT`] || ''} ${(!!t[`${l.CHK_CD}_RESULT`] && t.UNIT) || ''}`}</td>
                  ))}
                  <td>{t.BASE_RESULT}</td>
                </tr>
              );
            }
            if (currDesc === t.CHK_RESULT_ITEM_DESC) {
              return (
                <tr key={rowIndex}>
                  <td align="center" className="td-pointer" onClick={() => this.handleItemOnClick(rowIndex)}>
                    {t.CHK_RESULT_ITEM_NM || ''}
                  </td>
                  {list.map((l, colIndex) => (
                    <td align="center" key={`${rowIndex}_${colIndex}`}>{`${t[`${l.CHK_CD}_RESULT`] || ''} ${(!!t[`${l.CHK_CD}_RESULT`] && t.UNIT) || ''}`}</td>
                  ))}
                  <td>{t.BASE_RESULT}</td>
                </tr>
              );
            }
            if (currDesc !== t.CHK_RESULT_ITEM_DESC) {
              currDesc = t.CHK_RESULT_ITEM_DESC;
              return (
                <tr key={rowIndex}>
                  <td align="center" rowSpan={itemGroup[currDesc]}>
                    {t.CHK_RESULT_ITEM_DESC || ''}
                  </td>
                  <td align="center" className="td-pointer" onClick={() => this.handleItemOnClick(rowIndex)}>
                    {t.CHK_RESULT_ITEM_NM || ''}
                  </td>
                  {list.map((l, colIndex) => (
                    <td align="center" key={`${rowIndex}_${colIndex}`}>{`${t[`${l.CHK_CD}_RESULT`] || ''} ${(!!t[`${l.CHK_CD}_RESULT`] && t.UNIT) || ''}`}</td>
                  ))}
                  <td>{t.BASE_RESULT}</td>
                </tr>
              );
            }
            return '';
          })}
        </tbody>
      </table>
    );
  }
}

ChkItemResultTable.propTypes = {
  data: PropTypes.object,
};
ChkItemResultTable.defaultProps = {
  data: {},
};

export default ChkItemResultTable;
