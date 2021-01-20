import React, { Component } from 'react';
import moment from 'moment';
import base64 from 'base-64';
import { v4 as uuid } from 'uuid';

import { FileSearchOutlined } from '@ant-design/icons';
import { Table, Icon, Progress, message, Modal } from 'antd';

// import { DraggableModal as Modal } from 'components/DraggableModal/AntdDraggableModal';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import ExcelDownLoad from 'components/ExcelDownLoad';
import BizBuilderBase from 'components/BizBuilderBase';
import JasperViewer from 'components/JasperViewer';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

const AntdTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

const excelColumns = [
  {
    title: '표준번호',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: 'Rev',
    width: { wpx: 30 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '표준제목',
    width: { wpx: 300 },
    style: { alignment: { horizontal: 'left' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '상태',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '기안자',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '결재요청일',
    width: { wpx: 120 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
];
const fields = [
  { field: 'DOCNUMBER', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'VERSION', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } }, format: { type: 'NUMBER' } },
  { field: 'DRAFT_TITLE', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
  { field: 'REG_DTTM', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } }, format: { type: 'DATE' } },
  { field: 'STATUS', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'NAME_KOR', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
];

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
      nPrcView: undefined,
      coverView: {
        visible: false,
      },
      jasperView: {
        visible: false,
        src: '',
      },
      contentView: {
        visible: false,
      },
    };
  }

  getTableColumns = () => [
    {
      title: '종류',
      dataIndex: 'APPVGUBUN',
      key: 'APPVGUBUN',
      width: '10%',
      align: 'center',
      render: (text, record) => (record.REL_TYPE === 999 ? '일괄폐기' : text),
    },
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
      render: (text, record) => text.split('.')[0],
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
      width: '8%',
      align: 'center',
      render: (text, record) => (record.PROC_STATUS === 9 ? '다운부결' : record.PROC_STATUS === 2 && record.STATUS === 2 ? '다운승인' : '다운신청'),
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
    console.debug('response wwork meta please', response);
    const { selectedRow } = this.state;
    const {
      result: { DOCNUMBER, NODE_FULLNAME, VERSION, ATTACH, ATTACH2 },
    } = response;
    const { DRAFT_DATA, DRAFT_ID } = selectedRow;
    const downType = DRAFT_DATA && DRAFT_DATA.IDX === 2 ? '기안용 Download 권한신청' : 'Print 권한신청';
    this.setState({ attach: ATTACH, attach2: ATTACH2, fullName: NODE_FULLNAME, docNumber: DOCNUMBER, version: VERSION.split('.')[0], downType });

    this.onGetHistoryList(DRAFT_ID);
  };

  onGetHistoryList = DRAFT_ID => {
    const { id, submitHandlerBySaga } = this.props;
    const url = '/api/workflow/v1/common/process/ProcessPreviewHandler';
    submitHandlerBySaga(id, 'POST', url, { PARAM: { draftId: DRAFT_ID } }, this.initHistoryDataBind);
  };

  initHistoryDataBind = (id, response) => {
    const { prcPreViewList } = response;
    const nPrcView = prcPreViewList.filter(f => f.STEP === 2).length > 0 ? prcPreViewList.filter(f => f.STEP === 2)[0] : undefined;
    console.debug('nPrcView', nPrcView);
    this.setState({ nPrcView });
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

  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    const coverView = { workSeq, taskSeq, viewMetaSeq, visible: true, viewType: 'VIEW' };
    this.setState({ coverView });
  };

  onCloseCoverView = () => {
    const { coverView } = this.state;
    this.setState({ coverView: { ...coverView, visible: false } });
  };

  // 재스퍼 리포트 보기
  clickJasperView = src => {
    this.setState({ jasperView: { visible: true, src } });
  };

  onCloseJasperView = () => {
    this.setState({
      jasperView: {
        visible: false,
        src: '',
      },
    });
  };

  clickContentView = () => {
    const { contentView } = this.state;
    this.setState({ contentView: { ...contentView, visible: true } });
  };

  onCloseContentView = () => {
    const { contentView } = this.state;
    this.setState({ contentView: { ...contentView, visible: false } });
  };

  render() {
    const {
      viewVisible,
      fullName,
      docNumber,
      version,
      opinion,
      attach,
      attach2,
      selectedRow,
      downType,
      showProgress,
      percentCompleted,
      nPrcView,
      coverView,
      jasperView,
      contentView,
    } = this.state;
    const { customDataList } = this.props;
    console.debug(customDataList);
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
          <div style={{ width: '100%', textAlign: 'right', marginBottom: '10px' }}>
            <ExcelDownLoad
              isBuilder={false}
              fileName={`검색결과 (${moment().format('YYYYMMDD')})`}
              className="workerExcelBtn"
              title="Excel 파일로 저장"
              btnSize="btn-sm"
              sheetName=""
              columns={excelColumns}
              fields={fields}
              submitInfo={{
                dataUrl: '/api/workflow/v1/common/approve/DraftDocDownList',
                method: 'POST',
                submitData: { PARAM: { relTypes: [4] } },
                dataSetName: 'list',
              }}
            />
          </div>
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
                    <th>요청사유</th>
                    <td colSpan={3}>{opinion}</td>
                  </tr>
                  <tr>
                    <th>표지보기</th>
                    <td colSpan={3}>
                      <StyledButton className="btn-gray btn-xxs btn-radius" onClick={this.clickContentView}>
                        <FileSearchOutlined /> 표지보기
                      </StyledButton>
                    </td>
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
                  ) : selectedRow && selectedRow.PROC_STATUS === 9 ? (
                    <tr>
                      <th>거부사유</th>
                      <td colSpan={3}>{nPrcView && nPrcView.OPINION}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', background: '#f7f7f7', color: '#f31717' }}>
                        결재중
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div style={{ height: '10px' }}> </div>
              <table>
                <colgroup>
                  <col style={{ width: '5%' }}></col>
                  <col></col>
                  <col style={{ width: '5%' }}></col>
                  <col style={{ width: '10%' }}></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th>직무</th>
                    <th>소속 및 이름</th>
                    <th>승인여부</th>
                    <th>승인일</th>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}>승인자</td>
                    <td style={{ textAlign: 'center' }}>
                      {nPrcView && nPrcView.APPV_DEPT_NAME} / {nPrcView && nPrcView.APPV_PSTN_NAME} <br />
                      {nPrcView && nPrcView.APPV_USER_NAME}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {nPrcView && nPrcView.APPV_STATUS === 9 ? '부결' : nPrcView && nPrcView.APPV_STATUS === 2 ? '승인' : '대기'}
                    </td>
                    <td style={{ textAlign: 'center' }}>{nPrcView && nPrcView.APPV_DTTM}</td>
                  </tr>
                </tbody>
              </table>
              <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                <StyledButton className="btn-light btn-sm" onClick={this.onCloseModal}>
                  닫기
                </StyledButton>
              </StyledButtonWrapper>
            </StyledHtmlTable>
          </StyledContentsWrapper>
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc2"
          title="표지 보기"
          width={800}
          style={{ top: '20px' }}
          destroyOnClose
          visible={contentView.visible}
          onCancel={this.onCloseContentView}
          footer={null}
        >
          <BizBuilderBase
            sagaKey="ContentView"
            viewType="VIEW"
            workSeq={selectedRow && selectedRow.WORK_SEQ}
            taskSeq={selectedRow && selectedRow.TASK_SEQ}
            clickCoverView={this.clickCoverView}
            clickJasperView={this.clickJasperView}
            onCloseContentView={this.onCloseContentView}
            ViewCustomButtons={({ onCloseContentView }) => (
              <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                <StyledButton className="btn-light btn-sm" onClick={onCloseContentView}>
                  닫기
                </StyledButton>
              </StyledButtonWrapper>
            )}
          />
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc"
          title="표지 보기"
          width={800}
          style={{ top: '20px' }}
          destroyOnClose
          visible={coverView.visible}
          onCancel={this.onCloseCoverView}
          footer={null}
        >
          <BizBuilderBase
            sagaKey="CoverView"
            viewType={coverView.viewType}
            workSeq={coverView.workSeq}
            taskSeq={coverView.taskSeq}
            viewMetaSeq={coverView.viewMetaSeq}
            onCloseCoverView={this.onCloseCoverView}
            onCloseModalHandler={this.onCloseCoverView}
            ViewCustomButtons={({ onCloseCoverView }) => (
              <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                <StyledButton className="btn-light btn-sm" onClick={onCloseCoverView}>
                  닫기
                </StyledButton>
              </StyledButtonWrapper>
            )}
          />
        </AntdModal>
        <AntdModal
          className="JasperModal"
          title="리포트 보기"
          visible={jasperView.visible}
          footer={null}
          width={900}
          initialWidth={900}
          okButtonProps={null}
          onCancel={this.onCloseJasperView}
          destroyOnClose
        >
          <JasperViewer title="JasperView" src={jasperView.src} />
        </AntdModal>
      </>
    );
  }
}

export default DraftDocDown;
