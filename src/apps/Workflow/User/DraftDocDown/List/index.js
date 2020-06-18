import React, { Component } from 'react';
import moment from 'moment';
import base64 from 'base-64';
import uuid from 'uuid/v1';

import { Table, Icon, Modal, Progress, message } from 'antd';

import DragAntdModal from 'components/DragAntdModal';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

const AntdTable = StyledAntdTable(Table);
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
      percentCompleted: undefined,
      showProgress: false,
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
    this.setState({ viewVisible: false, showProgress: false });
  };

  onClickDownLoad = (down, fileName) => {
    const { sagaKey, getFileDownloadProgress } = this.props;
    const { selectedRow } = this.state;
    const { DRAFT_DATA } = selectedRow;
    const { BK, ED, PR, UC } = DRAFT_DATA;
    const drmInfo = { [uuid()]: 1, drmInfo: { bk: BK, ed: ED, pr: PR, uc: UC } };
    const acl = base64.encode(JSON.stringify(drmInfo));
    const url = `${down}/${acl}`;
    console.debug('url', url, fileName, this.props);
    this.setState({ showProgress: true, percentCompleted: 0 });

    getFileDownloadProgress(url, fileName, this.onProgress, this.onComplete);
  };

  onProgress = percent => {
    if (percent === 100) {
      this.setState({ percentCompleted: percent, showProgress: false });
    } else {
      this.setState({ percentCompleted: percent });
    }
  };

  onComplete = (response, url, fileName) => {
    const { size } = response;
    if (size === 0) {
      message.warning('PDF변환 중입니다.');
    } else {
      message.info('DRM문서는 해당 소프트웨어를 통해서만 조회가 가능합니다. (브라우저 지원불가)');
    }
  };

  render() {
    const { viewVisible, fullName, docNumber, version, opinion, attach, attach2, selectedRow, downType, showProgress, percentCompleted } = this.state;
    const { customDataList } = this.props;
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
        <DragAntdModal
          className="modalWrapper modalTechDoc"
          title="파일신청 내용보기"
          width={600}
          visible={viewVisible}
          destroyOnClose
          onCancel={this.onCloseModal}
          footer={null}
        >
          <StyledContentsWrapper>
            <StyledHtmlTable>
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
                      {showProgress && (
                        <tr>
                          <td colSpan={4}>
                            <Progress percent={percentCompleted} status="active" />
                          </td>
                        </tr>
                      )}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', background: '#f7f7f7', color: '#f31717' }}>
                        결재중
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                <StyledButton className="btn-light btn-sm" onClick={this.onCloseModal}>
                  닫기
                </StyledButton>
              </StyledButtonWrapper>
            </StyledHtmlTable>
          </StyledContentsWrapper>
        </DragAntdModal>
      </>
    );
  }
}

export default DraftDocDown;
