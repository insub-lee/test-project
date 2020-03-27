import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import base64 from 'base-64';
import { Input, Table } from 'antd';

import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import StyledTable from 'commonStyled/MdcsStyled/Table/StyledHtmlTable';

const AntdTable = StyledAntdTable(Table);

class DistributeDocView extends Component {
  
  componentDidMount() {
    const { id, apiAry, getCallDataHandler, selectedRow } = this.props;
    apiAry.push({
      key: 'distributeDocView',
      url: '/api/edds/v1/common/distributeDoc',
      type: 'POST',
      params: { PARAM: { ...selectedRow } },
    })
    getCallDataHandler(id, apiAry, () => {});
  }

  onClickDownload = row => {
    const { id, getFileDownload } = this.props;
    const {
      result: {
        distributeDocView: { detail },
      },
    } = this.props;
    const drmInfo = {
      pr: detail.PR,
      uc: detail.UC,
      bk: detail.BK,
      ed: detail.ED,
    };
    const acl = base64.encode(JSON.stringify({ drmInfo: { ...drmInfo } }));
    const url = `/down/eddsfile/${row.SEQ}/${acl}`;
    getFileDownload(id, url, row.NAME);
  };

  columns = [
    {
      title: 'No',
      dataIndex: 'RNUM',
      key: 'RNUM',
      align: 'center',
      width: '10%',
    },
    {
      title: '파일명',
      dataIndex: 'NAME',
      key: 'NAME',
      render: (text, record) => <li style={{ cursor: 'pointer' }} onClick={() => this.onClickDownload(record)}>{text}</li>
    },
    {
      title: '다운',
      dataIndex: 'DOWN_CNT',
      key: 'DOWN_CNT',
      width: '10%',
      render: (text, record) => `${text}회`
    },
    {
      title: '다운로드 일자',
      dataIndex: 'DOWN_DATE',
      key: 'DOWN_DATE',
      width: '20%',
      align: 'center',
      render: (text, record) => record.DOWN_DATE && moment(record.DOWN_DATE).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  render() {
    const { result: { distributeDocView } } = this.props;
    let detail = {};
    if (distributeDocView && distributeDocView !== undefined) {
      if (distributeDocView.detail !== undefined) {
        detail = distributeDocView.detail;
      }
    }

    return (
      <div id="EDDS_DOWN">
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
                    <td colSpan={3}>{detail.TITLE} / {detail.TASK_SEQ}</td>
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
                    <td colSpan={3}>
                      <p>Print Option: <span style={{ color : 'red' }}>{detail.PR === '0' ? 'disable' : 'enable' }</span>, Effective days : <span style={{ color : 'red' }}>{detail.ED}</span></p>
                    </td>
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
  id: 'distributeDocView',
  apiAry: [],
  result: {
    distributeDocView: {
      detail: {},
    },
  },
  getCallDataHandler: () => {},
};

export default DistributeDocView;