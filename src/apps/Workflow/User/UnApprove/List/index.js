import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Icon, Button, Anchor } from 'antd';

import moment from 'moment';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import MdcsAppvView from 'apps/Workflow/components/ApproveBase/viewComponent/MdcsAppvView';
import ProcessView from 'apps/Workflow/User/CommonView/processView';
import ExcelDownLoad from 'components/ExcelDownLoad';

const AntdLineTable = StyledAntdTable(Table);
const AntdModal = StyledAntdModal(Modal);

const excelColumns = [
  {
    title: '종류',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '유형',
    width: { wpx: 120 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
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
    title: '기안일',
    width: { wpx: 120 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
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
];
const fields = [
  { field: 'APPVGUBUN', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'NODETYPE', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'DOCNUMBER', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'VERSION', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } }, format: { type: 'NUMBER' } },
  { field: 'DRAFT_TITLE', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
  { field: 'REG_DTTM', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } }, format: { type: 'DATE' } },
  { field: 'STATUS', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'NAME_KOR', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
];

class UnApproveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationIdx: 1,
      pageSize: 10,
      isPreView: false,
    };
  }

  componentDidMount() {
    const { getUnApproveList } = this.props;
    const { paginationIdx, pageSize } = this.state;
    const prefixUrl = '/api/workflow/v1/common/approve/UnApproveListMDCSHandler';
    getUnApproveList(prefixUrl, paginationIdx, pageSize);
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
      title: '유형',
      dataIndex: 'NODETYPE',
      key: 'NODETYPE',
      width: '15%',
      align: 'center',
      render: (text, record) => (record.APPV_USER_ID === record.ORG_APPV_USER_ID ? text : `${text}(위임결재)`),
    },
    {
      title: '표준번호',
      dataIndex: 'DOCNUMBER',
      key: 'DOCNUMBER',
      width: '10%',
      align: 'center',
      ellipsis: true,
      render: (text, record) =>
        record.REL_TYPE === 99 ? (
          <a onClick={() => this.onRowClick(record)}>폐기</a>
        ) : record.REL_TYPE === 999 ? (
          <a onClick={() => this.onRowClick(record)}>{`OBS-${record.DRAFT_ID}`}</a>
        ) : (
          <a onClick={() => this.onRowClick(record)}>{text}</a>
        ),
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '5%',
      align: 'center',
      ellipsis: true,
      render: (text, record) => (record.REL_TYPE === 99 ? '폐기' : record.REL_TYPE === 999 ? '1' : text && text.indexOf('.') > -1 ? text.split('.')[0] : text),
    },
    {
      title: '표준제목',
      dataIndex: 'DRAFT_TITLE',
      key: 'title',
      ellipsis: true,
      render: (text, record) => <a onClick={() => this.onRowClick(record)}>{text}</a>,
    },
    {
      title: '기안일',
      dataIndex: 'REG_DTTM',
      key: 'regDttm',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '상태',
      dataIndex: 'STATUS',
      key: 'status',
      width: '10%',
      align: 'center',
      render: (text, record) => <a onClick={() => this.onPrcPreViewClick(record)}>결재중</a>,
    },
    {
      title: '기안자',
      dataIndex: 'NAME_KOR',
      key: 'nameKor',
      width: '10%',
      align: 'center',
    },
  ];

  onPrcPreViewClick = record => {
    this.setState({ isPreView: true });
    this.props.setSelectedRow(record);
  };

  onClosePreView = () => {
    this.setState({ isPreView: false });
  };

  onRowClick = record => {
    console.debug(record);
    this.props.setSelectedRow(record);
    this.props.setViewVisible(true);
  };

  onModalClose = () => {
    this.props.setViewVisible(false);
  };

  setPaginationIdx = paginationIdx =>
    this.setState({ paginationIdx }, () => {
      const { pageSize } = this.state;
      const { getUnApproveList } = this.props;
      const prefixUrl = '/api/workflow/v1/common/approve/UnApproveListMDCSHandler';
      getUnApproveList(prefixUrl, paginationIdx, pageSize);
    });

  render() {
    const { unApproveList, unApproveListCnt, viewVisible, selectedRow } = this.props;
    const { paginationIdx, isPreView } = this.state;

    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 미결함
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
                dataUrl: '/api/workflow/v1/common/approve/UnApproveListMDCSHandler',
                method: 'POST',
                submitData: { PARAM: { relTypes: [1, 4, 99, 999], PAGE: undefined, PAGE_CNT: undefined } },
                dataSetName: 'list',
              }}
            />
          </div>
          <AntdLineTable
            key="apps-workflow-user-unapprove-list"
            columns={this.getTableColumns()}
            dataSource={unApproveList}
            bordered
            pagination={{ current: paginationIdx, total: unApproveListCnt }}
            onChange={pagination => this.setPaginationIdx(pagination.current)}
          />
        </StyledContentsWrapper>

        <AntdModal title="표준문서 결재" width={680} visible={this.props.viewVisible} destroyOnClose onCancel={this.onModalClose} footer={[]}>
          <MdcsAppvView {...this.props} />
          {/* <AntdModal title="표준문서 결재" width={680} visible={this.props.viewVisible} destroyOnClose onCancel={this.onModalClose} footer={[]}>
              <MdcsAppvView {...this.props} />
            </AntdModal> */}
        </AntdModal>

        <AntdModal title="결재정보" width={680} visible={isPreView} destroyOnClose onCancel={this.onClosePreView} footer={null}>
          <ProcessView {...this.props}></ProcessView>
        </AntdModal>
      </>
    );
  }
}

UnApproveList.propTypes = {
  unApproveList: PropTypes.array,
  getUnApproveList: PropTypes.func,

  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

UnApproveList.defaultProps = {
  unApproveList: [],
  getUnApproveList: () => {},

  selectedRow: {},
};

export default UnApproveList;
