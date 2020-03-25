import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Input, Table } from 'antd';

import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import StyledTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';

const AntdTable = StyledAntdTable(Table);

class DistributeDocView extends Component {
  
  columns = [
    {
      title: 'No',
      dataIndex: 'RNUM',
      key: 'RNUM',
      align: 'center',
      width: '10%',
    },
    {
      title: '파일명(횟수)',
      dataIndex: 'NAME',
      key: 'NAME',
    },
    {
      title: '다운',
      dataIndex: 'DOWN_CNT',
      key: 'DOWN_CNT',
      width: '10%',
    },
    {
      title: '다운로드 일자',
      dataIndex: 'DOWNLOAD_DTTM',
      key: 'DOWNLOAD_DTTM',
      width: '20%',
      align: 'center',
    },
  ]
  
  componentDidMount() {
    const { id, apiAry, getCallDataHandler, selectedRow } = this.props;
    console.debug('selectedRow >> ', selectedRow);
    apiAry.push({
      key: 'distributeDoc',
      url: '/api/edds/v1/common/distributeDoc',
      type: 'POST',
      params: { PARAM: { ...selectedRow } },
    })
    getCallDataHandler(id, apiAry, () => {});
  }

  render() {
    const { result: { distributeDoc } } = this.props;
    let detail = {};
    if (distributeDoc && distributeDoc !== undefined) {
      if (distributeDoc.detail !== undefined) {
        detail = distributeDoc.detail;
      }
    }

    return (
      <div>
        {Object.keys(detail).length > 0 && (
          <React.Fragment>

            <StyledTable>
              <table>
                <colgroup>
                  <col width="100px" />
                  <col width="" />
                  <col width="100px" />
                  <col width="200px" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>문서명</th>
                    <td colSpan={3}>{detail.TITLE}</td>
                  </tr>
                  <tr>
                    <th>발송번호</th>
                    <td>{detail.TRANS_NO}</td>
                    <th>발송자</th>
                    <td>{detail.DIST_USER_NAME}</td>
                  </tr>
                  <tr>
                    <th>발송일</th>
                    <td>{moment(detail.REG_DTTM).format('YYYY-MM-DD')}</td>
                    <th>발송자ID</th>
                    <td>{detail.DIST_USER_ID}</td>
                  </tr>
                  <tr>
                    <th>문서번호</th>
                    <td>{detail.DOCNUMBER}</td>
                    <th>개정번호</th>
                    <td>{detail.VERSION}</td>
                  </tr>
                  <tr>
                    <th>관리유형</th>
                    <td></td>
                    <th>소스시스템</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>DRM 권한</th>
                    <td colSpan={3}></td>
                  </tr>
                  <tr>
                    <th>전달사항</th>
                    <td colSpan={3}>
                      <Input.TextArea value={detail.DISTRIBUTE_REASON} readOnly />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledTable>
            <AntdTable dataSource={detail.fileList.map(item => ({ ...item, key: item.SEQ }))} columns={this.columns} pagination={false} />
          </React.Fragment>
        )}
      </div>
    )
  }
}

DistributeDocView.propTypes = {
  id: PropTypes.string,
  apiAry: PropTypes.array,
  result: PropTypes.object,
  getCallDataHandler: PropTypes.func,
  selectedRow: PropTypes.object,
};

DistributeDocView.defaultProps = {
  id: 'distributeDoc',
  apiAry: [],
  result: {
    distributeDoc: {
      detail: {},
    },
  },
  getCallDataHandler: () => {},
};

export default DistributeDocView;