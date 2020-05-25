import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import base64 from 'base-64';
import { Input, Table } from 'antd';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledTextarea from 'components/BizBuilder/styled/Form/StyledTextarea';

const AntdTable = StyledAntdTable(Table);
const AntdTextarea = StyledTextarea(Input.TextArea);

class DistributeDocView extends Component {
  
  componentDidMount() {
    this.getFileList();
  }

  getFileList = () => {
    const { id, getCallDataHandler, selectedRow } = this.props;
    const apiAry = [{
      key: 'distributeDocView',
      url: '/api/edds/v1/common/distributeDoc',
      type: 'POST',
      params: { PARAM: { ...selectedRow } },
    }];
    getCallDataHandler(id, apiAry, () => {});
  };

  onClickDownload = row => {
    const {
      id,
      getFileDownload,
      result: {
        distributeDocView: { detail },
      },
    } = this.props;

    if (row.FINE_DOWN_CNT <= 0) {
      message.info(<MessageContent>다운로드가 불가능합니다.<br /><br />다운로드를 원하시면 재배포 요청하시기 바랍니다.</MessageContent>);
    } else {
      const drmInfo = {
        pr: detail.PR,
        uc: detail.UC,
        bk: detail.BK,
        ed: detail.ED,
      };
      const acl = base64.encode(JSON.stringify({ 
        drmInfo: { ...drmInfo },
        docInfo: { 
          TRANS_NO: row.TRANS_NO, 
          RECV_USER_ID: row.RECV_USER_ID, 
          FILE_DOWN_CNT: row.FILE_DOWN_CNT 
        } 
      }));
      const url = `/down/eddsfile/${row.FILE_SEQ}/${acl}`;
      getFileDownload(id, url, row.FILE_NAME, () => {
        this.getFileList();
      });
    }
  };

  columns = [
    {
      title: 'No',
      dataIndex: 'RNUM',
      key: 'RNUM',
      align: 'center',
      width: '8%',
    },
    {
      title: '파일명',
      dataIndex: 'FILE_NAME',
      key: 'FILE_NAME',
      render: (text, record) => <li style={{ cursor: 'pointer' }} onClick={() => this.onClickDownload(record)}>{text}</li>
    },
    {
      title: '다운가능횟수',
      dataIndex: 'FILE_DOWN_CNT',
      key: 'FILE_DOWN_CNT',
      width: '20%',
      align: 'center',
      render: (text, record) => `${text}회`
    },
    {
      title: '다운로드 일자',
      dataIndex: 'DOWNLOAD_DTTM',
      key: 'DOWNLOAD_DTTM',
      width: '30%',
      align: 'center',
      render: (text, record) => record.DOWNLOAD_DTTM && moment(record.DOWNLOAD_DTTM).format('YYYY-MM-DD HH:mm:ss'),
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
          <>
            <StyledHtmlTable>
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
                    <td>{moment(detail.REG_DTTM).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <th>발송자ID</th>
                    <td>{detail.DIST_USER_ID}</td>
                  </tr>
                  <tr>
                    <th>문서번호</th>
                    <td>{detail.DOCNUMBER}</td>
                    <th>개정번호</th>
                    <td>{detail.VERSION}</td>
                  </tr>
                  {/* <tr>
                    <th>관리유형</th>
                    <td></td>
                    <th>소스시스템</th>
                    <td></td>
                  </tr> */}
                  <tr>
                    <th>DRM 권한</th>
                    <td colSpan={3}>
                      <p>Print Option: <span style={{ color : 'red' }}>{detail.PR === '0' ? 'disable' : 'enable' }</span>, Effective days : <span style={{ color : 'red' }}>{detail.ED}</span></p>
                    </td>
                  </tr>
                  <tr>
                    <th>전달사항</th>
                    <td colSpan={3}>
                      <AntdTextarea value={detail.DISTRIBUTE_REASON} readOnly />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledHtmlTable>
            <AntdTable
              dataSource={detail.fileList.map(item => ({ ...item, key: item.SEQ }))}
              columns={this.columns}
              pagination={false}
              style={{ marginTop: 10 }}
            />
          </>
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