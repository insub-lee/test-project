import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button } from 'antd';
import moment from 'moment';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import { isJSON } from 'utils/helpers';
import ExcelDownLoad from 'components/ExcelDownLoad';

const AntdTable = StyledAntdTable(Table);

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
    title: '종류',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '표준제목',
    width: { wpx: 300 },
    style: { alignment: { horizontal: 'left' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '부서코드',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '부서명',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '사번',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '이름',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '저장일',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
];
const fields = [
  { field: 'DOCNUMBER', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'VERSION', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'ROOT_NODE_NAME', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'TITLE', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
  { field: 'DEPT_CD', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'REG_DEPT_NAME', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'EMP_NO', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'REG_USER_NAME', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'UPD_DTTM', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
];

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      selectedRowKeys: [],
      selectedRows: [],
      selectedRow: {},
      isModifyView: false,
      workPrcProps: {},
      tempProcessRule: {},
      relType: 1,
    };
  }

  componentDidMount() {
    this.getListData();
  }

  getListData() {
    const { sagaKey, submitHandlerBySaga } = this.props;
    const url = '/api/mdcs/v1/common/adminTempSaveTaskList';
    submitHandlerBySaga(sagaKey, 'POST', url, {}, this.initListDataBind);
  }

  initListDataBind = (sagaKey, response) => {
    if (response) {
      const { list } = response;
      const dataList = list.map(node => ({ ...node, VERSION: node.VERSION.indexOf('.') > -1 ? node.VERSION.split('.')[0] : node.VERSION }));
      console.debug(dataList);
      this.setState({ dataList });
    }
  };

  getTableColumns = () => [
    {
      title: '표준번호',
      dataIndex: 'DOCNUMBER',
      width: '10%',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Rev',
      dataIndex: 'VERSION',
      width: '5%',
      align: 'center',
      render: (text, record) => (text && text.indexOf('.') > -1 ? text.split('.')[0] : text),
    },
    {
      title: '종류',
      dataIndex: 'ROOT_NODE_NAME',
      width: '10%',
      align: 'center',
    },
    {
      title: '표준제목',
      dataIndex: 'TITLE',
      ellipsis: true,
    },
    {
      title: '부서코드',
      dataIndex: 'DEPT_CD',
      width: '6%',
      align: 'center',
    },
    {
      title: '부서명',
      dataIndex: 'REG_DEPT_NAME',
      width: '10%',
      align: 'center',
    },
    {
      title: '사번',
      dataIndex: 'EMP_NO',
      width: '7%',
      align: 'center',
    },
    {
      title: '이름',
      dataIndex: 'REG_USER_NAME',
      width: '10%',
      align: 'center',
    },
    {
      title: '저장일',
      dataIndex: 'UPD_DTTM',
      width: '8%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  render() {
    const { profile } = this.props;
    const { dataList, selectedRowKeys, isModifyView, selectedRow, workPrcProps, tempProcessRule, relType } = this.state;
    const isLoading = false;
    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 임시저장함
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <div style={{ width: '100%', textAlign: 'right', marginBottom: '10px' }}>
            <ExcelDownLoad
              isBuilder={false}
              fileName={`임시저장함 다운 (${moment().format('YYYYMMDD')})`}
              className="workerExcelBtn"
              title="Excel 파일로 저장"
              btnSize="btn-sm"
              sheetName=""
              columns={excelColumns}
              fields={fields}
              dataSetBind={dataList}
            />
          </div>
          <AntdTable
            columns={this.getTableColumns()}
            dataSource={dataList}
            // rowSelection={{
            //   selectedRowKeys,
            //   onChange: this.onSelectChange,
            // }}
            pagination={false}
            bordered
          />
          {/* <StyledButtonWrapper className="btn-wrap-right">
            <Popconfirm title="Are you sure delete this task?" onConfirm={this.removeMultiTask} okText="Yes" cancelText="No">
              <StyledButton className="btn-light btn-sm">삭제</StyledButton>
            </Popconfirm>
          </StyledButtonWrapper> */}
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  draftList: PropTypes.array,
  getDraftList: PropTypes.func,
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  setViewVisible: PropTypes.func,
};

List.defaultProps = {
  draftList: [],
  getDraftList: () => {},
  selectedRow: {},
};

export default List;
