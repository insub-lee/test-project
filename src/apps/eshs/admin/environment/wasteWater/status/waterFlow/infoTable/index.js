import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

const AntdTable = StyledAntdTable(Table);

// Ehs - 용폐수 - 현황 - 유량 (검색결과 리스트 테이블)
class WaterFlowStatusTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calcList = listData => {
    let totalUsedAmount = 0;
    listData.forEach(item => {
      totalUsedAmount += item.USED_AMOUNT || 0;
    });
    // const result = [];
    // return result.concat({ OP_DT: '합계', USED_AMOUNT: totalUsedAmount }).concat({ OP_DT: '평균', USED_AMOUNT: totalUsedAmount / listData.length || 0 });
    return { total: totalUsedAmount, avg: totalUsedAmount / listData.length };
  };

  render() {
    const { listData } = this.props;
    // const calcList = this.calcList(listData || []);
    const { total, avg } = this.calcList(listData || []);

    const columns = [
      {
        title: '일자',
        dataIndex: 'OP_DT',
        key: 'OP_DT',
        align: 'center',
        width: '30%',
        render: (data, record) => {
          if (record.OP_DT === '합계' || record.OP_DT === '평균') {
            return <span>{data}</span>;
          }
          return <span>{moment(data, 'YYYYMMDD').format('YYYY-MM-DD')}</span>;
        },
      },
      {
        title: 'Key-Foundry 반도체',
        width: '70%',
        children: [
          {
            title: '폐수발생량(C-2)',
            dataIndex: 'USED_AMOUNT',
            key: 'USED_AMOUNT',
            align: 'center',
          },
        ],
      },
    ];
    return (
      <>
        <AntdTable pagination={false} columns={columns} dataSource={listData} />
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr className="tr-center">
                <th>
                  <span>합계</span>
                </th>
                <td>
                  <span>{total}</span>
                </td>
              </tr>
              <tr className="tr-center">
                <th>
                  <span>평균</span>
                </th>
                <td>
                  <span>{avg}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </>
    );
  }
}

WaterFlowStatusTable.propTypes = {
  listData: PropTypes.array,
};

WaterFlowStatusTable.defaultProps = {
  listData: [],
};

export default WaterFlowStatusTable;
