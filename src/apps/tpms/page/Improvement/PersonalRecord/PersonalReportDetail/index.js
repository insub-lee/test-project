import React, { Component } from 'react';
import { Icon, Spin } from 'antd';
import Table from 'rc-table';
import { fromJS } from 'immutable';
import moment from 'moment';
import download from 'js-file-download';
import Button from 'apps/tpms/components/Button';
import GridContainer from 'apps/tpms/components/GridContainer';
import GridBox from 'apps/tpms/components/Dashboard/GridBox';
import SignTotal from 'apps/tpms/components/Dashboard/BuiltChart/SignTotal';
import MonthlyTransition from 'apps/tpms/components/Dashboard/BuiltChart/MonthlyTransition';
// import SignStep from 'apps/tpms/components/Dashboard/BuiltChart/SignStep';
// import SignDepart from 'apps/tpms/components/Dashboard/BuiltChart/SignDepart';
import Pagination from 'apps/tpms/components/Tableboard/Pagination';
import StyledTable from 'apps/tpms/components/Tableboard/StyledTable';
import StyledHeader from 'apps/tpms/components/Tableboard/StyledHeader';
import StyledHeaderCell from 'apps/tpms/components/Tableboard/StyledHeaderCell';
import StyledBodyRow from 'apps/tpms/components/Tableboard/StyledBodyRow';
import StyledBodyCell from 'apps/tpms/components/Tableboard/StyledBodyCell';
import jsonToQueryString from 'apps/tpms/utils/jsonToQueryString';
import alertMessage from 'apps/tpms/components/Notification/Alert';
import {
  StepSelector,
  ProjectLevelSelector,
  // ProjectTypeSelector,
  // PerformTypeSelector,
} from 'apps/tpms/page/Improvement/CommonSelectors';
import request from 'utils/request';

import StyledTableWrapper from '../../PartialRecord/StyledTableWrapper';
import StyledDetail from '../../PartialRecord/StyledDetail';
import ProjectInfoModal from '../Modal';

const statusSelectorWithComponent = item => {
  const result = {
    status: '',
    iconComponent: <span />,
  };
  // const statusData = ['regyn', 'saveyn', 'dropyn', 'delayyn', 'progressyn', 'finishyn'];
  const statusData = ['finishyn', 'dropyn', 'progresslistyn', 'saveyn', 'regyn'];
  statusData.some(status => {
    const check = item[status] === 'Y';
    result.status = check ? status : '';
    return check;
  });
  switch (result.status) {
    case 'regyn':
      result.iconComponent = <span className="icon icon_ing1" />;
      break;
    case 'saveyn':
      result.iconComponent = <span className="icon icon_ing1" />;
      break;
    case 'progresslistyn':
      result.iconComponent = <span className="icon icon_ing2" />;
      break;
    case 'dropyn':
      result.iconComponent = <span className="icon icon_ing3" />;
      result.colorCode = '#ff5d5d';
      break;
    case 'finishyn':
      result.iconComponent = <span className="icon icon_ing5" />;
      result.colorCode = '#0000ff';
      break;
    default:
      result.iconComponent = <span />;
      break;
  }
  return result;
};

const components = {
  table: StyledTable,
  header: {
    wrapper: StyledHeader,
    cell: StyledHeaderCell,
  },
  body: {
    row: StyledBodyRow,
    cell: StyledBodyCell,
  },
};

export class PersonalReportDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: fromJS([]),
      pagination: fromJS({
        current: 1,
        pageSize: 10,
        total: 0,
      }),
      // search: fromJS({
      //   category: 'all',
      //   text: undefined,
      // }),
      isExpanded: false,
    };
    this.pageHandler = this.pageHandler.bind(this);
    this.pageSizeHandler = this.pageSizeHandler.bind(this);
    this.fetchTableData = this.fetchTableData.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.handleReportDown = this.handleReportDown.bind(this);
    this.ProjectInfoModalOpen = this.ProjectInfoModalOpen.bind(this);

    this.ProjectInfoModalRef = React.createRef();

    this.setState({ loaded: true });
  }

  componentDidMount() {
    this.fetchTableData();
  }

  componentDidUpdate(prevProps) {
    console.debug(prevProps, this.props);
    if (prevProps.requestQuery !== this.props.requestQuery) {
      this.fetchTableData(true, '');
    }
  }

  componentWillUnmount() {
    console.debug('## Unmount');
    this.setState({
      pagination: fromJS({
        current: 1,
        pageSize: 10,
        total: 0,
      }),
    });
  }

  toggleExpanded() {
    const { enableFixView, disableFixView } = this.props;
    this.setState(
      prevState => ({
        isExpanded: !prevState.isExpanded,
      }),
      () => {
        if (this.state.isExpanded) {
          enableFixView();
        } else {
          disableFixView();
        }
      },
    );
  }

  pageHandler(page) {
    this.setState(
      prevState => ({ pagination: prevState.pagination.set('current', page) }),
      () => this.fetchTableData(),
    );
  }

  // toggleExpanded() {
  //   this.setState(prevState => ({
  //     isExpanded: !prevState.isExpanded,
  //   }));
  // }

  pageSizeHandler(e) {
    const pageSize = parseInt(e.target.value, 10);
    this.setState(
      prevState => ({
        pagination: prevState.pagination.set('pageSize', pageSize).set('current', 1),
      }),
      () => this.fetchTableData(),
    );
  }

  async fetchTableData(isInit, brdId) {
    const { pagination } = this.state;
    const { requestQuery } = this.props;
    const { startDate, endDate, projectType, empNo, fab, area, keyno, model } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');
    const startDt = startDate
      ? startDate.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDt = endDate ? endDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    this.setState({ loaded: true });

    const requestQuery2 = {
      type: 'perlist',
      currentPage: isInit ? 1 : pagination.get('current'),
      pageSize: pagination.get('pageSize'),
      mnuId: 'list',
      sysid: 'TPMS',
      sdd: startDt,
      edd: endDt,
      schusrid: empNo,
      prjtype: projectType === '' ? undefined : projectType,
      fab,
      area,
      keyno,
      model,
    };
    const queryString = jsonToQueryString(requestQuery2);
    const { response, error } = await request({
      url: `/apigate/v1/portal/sign/report?${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
    });
    if (response && !error) {
      const { list } = response;
      const nextList = list.map(item => ({
        ...item,
        status: statusSelectorWithComponent(item),
        contents: [],
        loaded: false,
      }));
      this.setState(prevState => ({
        data: fromJS(nextList),
        // pagination: prevState.pagination.set('total', response.pagination.total),
        pagination: prevState.pagination.set('total', response.pagination.total).set('current', isInit ? 1 : pagination.get('current')),
        expandedRowKeys: [],
      }));
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }

    this.setState({ loaded: false });
  }

  async handleReportDown() {
    // const { pagination } = this.state;
    const { requestQuery } = this.props;
    const { startDate, endDate, projectType, empNo, fab, area, keyno, model } = requestQuery;

    const curtDate = moment().format('YYYYMMDD');
    const startDt = startDate
      ? startDate.replace(/\./gi, '')
      : moment(curtDate, 'YYYYMMDD')
          .add(-1, 'year')
          .format('YYYYMMDD');
    const endDt = endDate ? endDate.replace(/\./gi, '') : moment(curtDate).format('YYYYMMDD');

    const requestQuery2 = {
      type: 'perlist',
      // currentPage: isInit ? 1 : pagination.get('current'),
      // pageSize: pagination.get('pageSize'),
      mnuId: 'list',
      sysid: 'TPMS',
      sdd: startDt,
      edd: endDt,
      schusrid: empNo,
      prjtype: projectType === '' ? undefined : projectType,
      fab,
      area,
      keyno,
      model,
    };
    const queryString = jsonToQueryString(requestQuery2);
    const { response, error } = await request({
      url: `/apigate/v1/portal/sign/report/down?${queryString}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      responseType: 'blob',
      method: 'GET',
    });
    if (response && !error) {
      console.debug(response);
      const date = moment().format('YYYYMMDDHHmmss');
      // const fileName = `recordReport_${date}_${profile.usrid}`;
      const fileName = `personalReport_${date}`;
      download(response, `${fileName}.xls`);
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  }

  ProjectInfoModalOpen(prjId) {
    this.ProjectInfoModalRef.current.handleOpen(prjId);
  }

  render() {
    const { data, pagination, isExpanded, loaded } = this.state;
    const { requestQuery } = this.props;
    const { startDate, endDate, prjTypeLabel, userInfo, fabLabel, areaLabel, keynoLabel, modelLabel } = requestQuery;
    const columns = [
      {
        title: 'No',
        dataIndex: 'rownum',
        width: '5%',
      },
      {
        title: '본부/팀',
        dataIndex: 'prj_leader_dept_name',
        width: '10%',
      },
      {
        title: 'Leader',
        dataIndex: 'reader',
        width: '10%',
      },
      {
        title: 'Level',
        dataIndex: 'project_level',
        width: '10%',
        render: (value, row, index) => <ProjectLevelSelector keyValue={Number(value)} row={row} index={index} />,
      },
      {
        title: 'Project 명',
        dataIndex: 'project_title',
        width: '15%',
        render: (item, row) => (
          <div style={{ textAlign: 'left' }}>
            <button type="button" style={{ color: row.status.colorCode || 'black' }} onClick={() => this.ProjectInfoModalOpen(row.project_id)}>
              {item}
            </button>
          </div>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: '10%',
        render: value => value.iconComponent,
      },
      {
        title: 'ID',
        dataIndex: 'project_id',
        width: '10%',
        render: (prjId, row) => (
          <button type="button" style={{ color: row.status.colorCode || 'black' }} onClick={() => this.ProjectInfoModalOpen(prjId)}>
            {row.project_id}
          </button>
        ),
      },
      {
        title: '시작일',
        dataIndex: 'regdt',
        width: '10%',
        render: item => moment(item).format('YYYY.MM.DD'),
      },
      {
        title: '단계별진척현황',
        dataIndex: 'progressstep',
        width: '10%',
        render: (value, row, index) => (
          <StepSelector
            level={value === undefined && row.progresslistyn === 'Y' ? 0 : value}
            row={row}
            index={index}
            isDrop={row.status.status === 'dropyn'}
            isFinish={row.status.status === 'finishyn'}
          />
        ),
      },
      {
        title: '비고',
        dataIndex: 'delayyn',
        width: '10%',
        render: item => <div style={{ textAlign: 'center' }}>{item === 'Y' ? '지연' : ''}</div>,
      },
    ];

    return (
      <StyledDetail className={`${isExpanded ? 'expanded' : ''}`}>
        <div className="sub_wrap">
          <div className="sub_tit2">
            <span className="small">
              조건 : &nbsp;&nbsp;
              {`${prjTypeLabel || ''}`} &nbsp;&nbsp;
              {`${userInfo || ''}`} &nbsp;&nbsp;
              {`${fabLabel || ''}`} &nbsp;&nbsp;
              {`${areaLabel || ''}`} &nbsp;&nbsp;
              {`${keynoLabel || ''}`} &nbsp;&nbsp;
              {`${modelLabel || ''}`} &nbsp;&nbsp;
              <br />
              기간 : &nbsp;&nbsp; {`${startDate} ~ ${endDate}`}
            </span>
            <div className="btn_wrap">
              <button type="button" className={`icon icon_arr_big ${isExpanded ? 'on' : ''}`} onClick={this.toggleExpanded}>
                축소/확대
              </button>
            </div>
          </div>
          <div className="sub_line" />
          <div className="sub_tit2 bg">
            <span className="big">총 건수</span>
            <span className="line" />
            <span className="col">{pagination.get('total')} 건</span>
            <div className="btn_wrap">
              <Button type="button" color="gray" size="small" onClick={this.handleReportDown}>
                엑셀
              </Button>
              {/* <Button type="button" color="gray" size="small">
                삭제
              </Button> */}
            </div>
          </div>
          <div className="sub_con">
            <GridContainer className="grid">
              <GridBox size={3}>
                <section>
                  <SignTotal requestQuery={requestQuery} />
                </section>
              </GridBox>
              <GridBox size={3}>
                <section>
                  <MonthlyTransition requestQuery={requestQuery} />
                </section>
              </GridBox>
            </GridContainer>
            <StyledTableWrapper>
              <div className="sub_tb_top mb15">
                <ul className="sub_ing">
                  <li>
                    <span className="icon icon_ing1" />
                    등록
                  </li>
                  {/* <li>
                    <span className="icon icon_ing6" />
                    등록중
                  </li>
                   */}
                  <li>
                    <span className="icon icon_ing2" />
                    진행
                  </li>
                  <li>
                    <span className="icon icon_ing3" />
                    Drop
                  </li>
                  {/* <li>
                    <span className="icon icon_ing4" />
                    지연
                  </li> */}
                  <li>
                    <span className="icon icon_ing5" />
                    완료
                  </li>
                </ul>
              </div>
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={loaded}>
                <Table
                  columns={columns}
                  data={data.toJS()}
                  rowKey="postno"
                  rowClassName={(_record, index) => (index % 2 === 0 ? 'old' : 'even')}
                  components={components}
                />
              </Spin>
              <Pagination {...pagination.toJS()} groupSize={10} pageHandler={this.pageHandler} pageSizeHandler={this.pageSizeHandler} />
              <ProjectInfoModal ref={this.ProjectInfoModalRef} />
            </StyledTableWrapper>
          </div>
        </div>
      </StyledDetail>
    );
  }
}
