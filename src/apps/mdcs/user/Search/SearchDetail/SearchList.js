import React, { Component } from 'react';
import { Table, Button } from 'antd';
import moment from 'moment';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import BizBuilderBase from 'components/BizBuilderBase';
import DraftDownLoad from 'apps/mdcs/Modal/DraftDownLoad';
import ExcelDownLoad from 'components/ExcelDownLoad';
import JasperViewer from 'components/JasperViewer';
import history from 'utils/history';
import { PAGINATION_OPT_CODE } from 'components/BizBuilder/Common/Constants';
import { DraggableModal as Modal } from 'components/DraggableModal/AntdDraggableModal';

const AntdModal = StyledAntdModal(Modal);
const AntdTable = StyledAntdTable(Table);
const columns = [
  {
    title: '종류',
    key: 'NODE_FULLNAME',
    dataIndex: 'NODE_FULLNAME',
    align: 'center',
    width: '14%',
  },
  { title: 'No.', key: 'DOCNUMBER', width: '11%', dataIndex: 'DOCNUMBER' },
  {
    title: 'REV.',
    key: 'VERSION',
    align: 'center',
    width: '6%',
    dataIndex: 'VERSION',
    render: (text, record) => (record.STATUS === 99 ? 'OBS' : text && text.indexOf('.') > -1 ? text.split('.')[0] : text),
  },
  { title: 'Effect Date', align: 'center', key: 'END_DTTM', width: '10%', dataIndex: 'END_DTTM', render: (text, record) => moment(text).format('YYYY-MM-DD') },
  { title: 'Title', align: 'left', key: 'TITLE', width: '35%', dataIndex: 'TITLE', ellipsis: true },
  { title: '기안부서', align: 'left', key: 'REG_DEPT_NAME', width: '14%', dataIndex: 'REG_DEPT_NAME', ellipsis: true },
  { title: '기안자', align: 'center', key: 'REG_USER_NAME', width: '10%', dataIndex: 'REG_USER_NAME' },
];

const excelColumns = [
  {
    title: '종류',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: 'NO',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: 'REV',
    width: { wpx: 30 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: 'Effect Date',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: 'Title',
    width: { wpx: 300 },
    style: { alignment: { horizontal: 'left' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '기안부서',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '기안자',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
];
const fields = [
  { field: 'NODE_FULLNAME', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'DOCNUMBER', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'VERSION', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'END_DTTM', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'TITLE', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
  { field: 'REG_DEPT_NAME', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
  { field: 'REG_USER_NAME', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
];

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchView: {
        visible: false,
        taskSeq: -1,
        workSeq: -1,
        nodeId: -1,
      },
      coverView: {
        visible: false,
      },
      jasperView: {
        visible: false,
        src: '',
      },
      isDownVisible: false,
      selectedRow: undefined,
      DRAFT_PROCESS: undefined,
      appvMember: undefined,
      paginationIdx: 1,
      pageSize: 10,
      isPagingData: false,
    };
  }

  componentDidMount = () => {
    const { workInfo } = this.props;
    let isPagingData = false;

    if (workInfo && workInfo.OPT_INFO) {
      workInfo.OPT_INFO.forEach(opt => {
        if (opt.OPT_CODE === PAGINATION_OPT_CODE && opt.ISUSED === 'Y') isPagingData = true;
      });
      this.setState({ isPagingData });
    }
  };

  // 검색결과 클릭시 발생
  onClickRow = (record, rowIndex) => {
    this.setState({
      SearchView: {
        visible: true,
        taskSeq: record.TASK_SEQ,
        workSeq: record.WORK_SEQ,
        nodeId: record.NODE_ID,
        draftId: record.DRAFT_ID,
      },
    });
  };

  closeBtnFunc = () => {
    this.setState({
      SearchView: {
        visible: false,
        taskSeq: -1,
        workSeq: -1,
        nodeId: -1,
      },
    });
  };

  // 기존 표지보기
  clickCoverView = (workSeq, taskSeq, viewMetaSeq) => {
    this.setState({ coverView: { visible: true, workSeq, taskSeq, viewMetaSeq } });
  };

  onCloseCoverView = () => {
    this.setState({
      coverView: {
        visible: false,
        workSeq: undefined,
        taskSeq: undefined,
        viewMetaSeq: undefined,
      },
    });
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

  onClickDownLoad = formData => {
    const { sagaKey, submitExtraHandler } = this.props;
    const url = '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder';
    submitExtraHandler(sagaKey, 'POST', url, { PARAM: { PRC_ID: 107 } }, this.initProcessData);
    this.setState({ isDownVisible: true, selectedRow: { ...formData } });
  };

  onCloseDownLoad = () => {
    this.setState({ isDownVisible: false });
  };

  initProcessData = (id, response) => {
    const { DRAFT_PROCESS } = response;
    const { DRAFT_PROCESS_STEP } = DRAFT_PROCESS;
    const appvMember =
      DRAFT_PROCESS_STEP.filter(item => item.NODE_ID === 133).length > 0 ? DRAFT_PROCESS_STEP.filter(item => item.NODE_ID === 133)[0].APPV_MEMBER : [];
    this.setState({ DRAFT_PROCESS, appvMember });
  };

  onCompleteProc = (id, response) => {
    history.push('/apps/Workflow/User/DraftDocDown');
    this.setState({ isDownVisible: false });
  };

  setPaginationIdx = paginationIdx =>
    this.setState({ paginationIdx }, () => {
      const { pageSize, isPagingData } = this.state;
      if (isPagingData) {
        const { sagaKey, workSeq, conditional, getListData } = this.props;
        getListData(sagaKey, workSeq, conditional, paginationIdx, pageSize);
      }
    });

  render() {
    const { listData, sagaKey, submitExtraHandler, listTotalCnt, conditional, workSeq } = this.props;
    const { SearchView, coverView, jasperView, isDownVisible, selectedRow, DRAFT_PROCESS, appvMember, paginationIdx } = this.state;
    return (
      <>
        <div style={{ width: '100%', textAlign: 'right', marginBottom: '10px' }}>
          <ExcelDownLoad
            key="excelDownLoad"
            isBuilder={false}
            fileName={`검색결과 (${moment().format('YYYYMMDD')})`}
            className="workerExcelBtn"
            title="Excel 파일로 저장"
            btnSize="btn-sm"
            sheetName=""
            columns={excelColumns}
            fields={fields}
            submitInfo={{
              dataUrl: `/api/builder/v1/work/taskList/${workSeq}`,
              method: 'POST',
              submitData: { PARAM: { whereString: [conditional] } },
              dataSetName: 'list',
            }}
          />
        </div>
        <AntdTable
          columns={columns}
          size="middle"
          dataSource={listData}
          className="tableCustom"
          onRow={(record, rowIndex) => ({
            onClick: event => {
              this.onClickRow(record, rowIndex);
            },
          })}
          pagination={{ current: paginationIdx, total: listTotalCnt }}
          onChange={pagination => this.setPaginationIdx(pagination.current)}
        />
        <AntdModal
          className="modalWrapper modalTechDoc"
          title="검색 내용 보기"
          visible={SearchView.visible}
          footer={null}
          width={800}
          initialWidth={800}
          onCancel={this.closeBtnFunc}
          onOk={this.closeBtnFunc}
          okButtonProps={null}
          destroyOnClose
        >
          <BizBuilderBase
            sagaKey="SearchView"
            viewType="VIEW"
            workSeq={SearchView.workSeq}
            taskSeq={SearchView.taskSeq}
            closeBtnFunc={this.closeBtnFunc}
            clickCoverView={this.clickCoverView}
            clickJasperView={this.clickJasperView}
            ViewCustomButtons={({ closeBtnFunc, isTaskFavorite, sagaKey, formData, setTaskFavorite }) => (
              <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                {isTaskFavorite && (
                  <StyledButton
                    className="btn-primary btn-sm mr5"
                    onClick={() => setTaskFavorite(sagaKey, formData.WORK_SEQ, formData.TASK_ORIGIN_SEQ, formData.BUILDER_TASK_FAVORITE || 'N')}
                  >
                    {formData.BUILDER_TASK_FAVORITE === 'Y' ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                  </StyledButton>
                )}
                <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.onClickDownLoad(formData)}>
                  다운로드 신청
                </StyledButton>
                <StyledButton className="btn-light btn-sm" onClick={closeBtnFunc}>
                  닫기
                </StyledButton>
              </StyledButtonWrapper>
            )}
          />
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc"
          title="파일 다운 신청"
          visible={isDownVisible}
          footer={null}
          width={800}
          initialWidth={800}
          onCancel={this.onCloseDownLoad}
          onOk={this.closeBtnFunc}
          okButtonProps={null}
          destroyOnClose
        >
          <DraftDownLoad
            selectedRow={selectedRow}
            appvMember={appvMember}
            DRAFT_PROCESS={DRAFT_PROCESS}
            sagaKey={sagaKey}
            submitHandlerBySaga={submitExtraHandler}
            onCompleteProc={this.onCompleteProc}
            onCloseDownLoad={this.onCloseDownLoad}
          />
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc"
          title="표지 보기"
          visible={coverView.visible}
          footer={null}
          width={850}
          initialWidth={850}
          okButtonProps={null}
          onCancel={this.onCloseCoverView}
          destroyOnClose
        >
          <BizBuilderBase
            sagaKey="CoverView"
            viewType="VIEW"
            exDraftId={SearchView.draftId}
            workSeq={coverView.workSeq}
            taskSeq={coverView.taskSeq}
            viewMetaSeq={coverView.viewMetaSeq}
            onCloseCoverView={this.onCloseCoverView}
            ViewCustomButtons={({ onCloseCoverView }) => (
              <StyledButtonWrapper className="btn-wrap-mt-20 btn-wrap-center">
                <StyledButton className="btn-primary btn-sm" onClick={onCloseCoverView}>
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

export default SearchList;
