import React, { Component } from 'react';
import moment from 'moment';
import base64 from 'base-64';
import uuid from 'uuid/v1';

import { Table, Icon, Modal } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);
class DraftDocDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewVisible: false,
      selectedRow: undefined,
      attach: undefined,
      attach2: undefined,
      fullName: undefined,
      docNumber: undefined,
      version: undefined,
      downType: undefined,
      opinion: undefined,
    };
  }

  getTableColumns = () => [
    {
      title: 'No',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '6%',
      align: 'center',
    },
    {
      title: '제목',
      dataIndex: 'DRAFT_TITLE',
      key: 'DRAFT_TITLE',
    },
    {
      title: '상태',
      dataIndex: 'STATUS_NM',
      key: 'STATUS_NM',
      width: '16%',
      align: 'center',
    },
    {
      title: '기안자',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      width: '10%',
      align: 'center',
    },
    {
      title: '결재요청일',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  componentDidMount() {
    const { id, getCustomDataBind } = this.props;
    const prefixUrl = '/api/workflow/v1/common/approve/DraftDocDownList';
    getCustomDataBind('POST', prefixUrl, { PARAM: { relTypes: [4] } });
  }

  onRowClick = (record, rowIndex, e) => {
    const { id, submitHandlerBySaga } = this.props;
    const { WORK_SEQ, TASK_SEQ, OPINION } = record;
    const prefixUrl = `/api/builder/v1/work/task/${WORK_SEQ}/${TASK_SEQ}`;
    submitHandlerBySaga(id, 'GET', prefixUrl, {}, this.initDataBind);
    this.setState({ viewVisible: true, selectedRow: record, opinion: OPINION });
  };

  initDataBind = (id, response) => {
    const { selectedRow } = this.state;
    console.debug('response', response, selectedRow);
    const {
      result: { DOCNUMBER, NODE_FULLNAME, VERSION, ATTACH, ATTACH2 },
    } = response;
    const { DRAFT_DATA } = selectedRow;
    const downType = DRAFT_DATA && DRAFT_DATA.IDX === 2 ? '기안용 Download 권한신청' : 'Print 권한신청';
    this.setState({ attach: ATTACH, attach2: ATTACH2, fullName: NODE_FULLNAME, docNumber: DOCNUMBER, version: VERSION, downType });
  };

  onCloseModal = () => {
    this.setState({ viewVisible: false });
  };

  onClickDownLoad = (down, fileName) => {
    const { getFileDownload } = this.props;
    const { selectedRow } = this.state;
    const { DRAFT_DATA } = selectedRow;
    const { BK, ED, PR, UC } = DRAFT_DATA;
    const drmInfo = { [uuid()]: 1, drmInfo: { bk: BK, ed: ED, pr: PR, uc: UC } };
    const acl = base64.encode(JSON.stringify(drmInfo));
    const url = `${down}/${acl}`;
    getFileDownload(url, fileName);
  };

  render() {
    const { viewVisible, fullName, docNumber, version, opinion, attach, attach2, selectedRow, downType } = this.state;
    const { customDataList } = this.props;
    console.debug('selectedRow', selectedRow);
    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 다운로드 신청 목록
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <AntdTable
            columns={this.getTableColumns()}
            dataSource={customDataList}
            onRow={(record, rowIndex) => ({
              onClick: e => this.onRowClick(record, rowIndex, e),
            })}
            bordered
          />
        </StyledContentsWrapper>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          title="파일신청 내용보기"
          width={600}
          visible={viewVisible}
          destroyOnClose
          onCancel={this.onCloseModal}
          footer={[]}
        >
          <StyledHtmlTable style={{ padding: '20px 20px 0' }}>
            <table>
              <tbody>
                <tr>
                  <th>문서종류</th>
                  <td colSpan={3}>{fullName}</td>
                </tr>
                <tr>
                  <th>문서번호</th>
                  <td>{docNumber}</td>
                  <th>개정번호</th>
                  <td>{version}</td>
                </tr>
                <tr>
                  <th>요청종류</th>
                  <td colSpan={3}>{downType}</td>
                </tr>
                <tr>
                  <th>요청사용</th>
                  <td colSpan={3}>{opinion}</td>
                </tr>
                {selectedRow && selectedRow.STATUS === 2 && selectedRow.PROC_STATUS === 2 ? (
                  <>
                    <tr>
                      <th>본문내용</th>
                      <td colSpan={3}>
                        {attach &&
                          attach.DETAIL &&
                          attach.DETAIL.map(file => (
                            <li className={`${file.fileExt} file-list`}>
                              <span style={{ verticalAlign: 'middle' }}>{file.icon}</span>
                              <span style={{ verticalAlign: 'middle' }}>{file.fileName}</span>
                              <StyledButton className="btn-light btn-xxs ml5" onClick={() => this.onClickDownLoad(file.down, file.fileName)}>
                                다운로드
                              </StyledButton>
                            </li>
                          ))}
                      </td>
                    </tr>
                    <tr>
                      <th>별첨</th>
                      <td colSpan={3}>
                        {attach2 &&
                          attach2.DETAIL &&
                          attach2.DETAIL.map(file => (
                            <li className={`${file.fileExt} file-list`}>
                              <span style={{ verticalAlign: 'middle' }}>{file.icon}</span>
                              <span style={{ verticalAlign: 'middle' }}>{file.fileName}</span>
                              <StyledButton className="btn-light btn-xxs ml5" onClick={() => this.onClickDownLoad(file.down, file.fileName)}>
                                다운로드
                              </StyledButton>
                            </li>
                          ))}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={4}>결재중</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <StyledButton className="btn-light" onClick={this.onCloseModal}>
                닫기
              </StyledButton>
            </div>
          </StyledHtmlTable>
        </AntdModal>
      </>
    );
  }
}

export default DraftDocDown;
