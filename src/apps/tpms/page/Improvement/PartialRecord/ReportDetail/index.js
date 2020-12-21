/* eslint-disable camelcase */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Table from 'rc-table';
import moment from 'moment';

import GridContainer from '../../../../components/GridContainer';
import GridBox from '../../../../components/Dashboard/GridBox';
import SignTotal from '../../../../components/Dashboard/BuiltChart/SignTotal';
import MonthlyTransition from '../../../../components/Dashboard/BuiltChart/MonthlyTransition';
import Pagination from '../../../../components/Tableboard/Pagination';
import StyledTable from '../../../../components/Tableboard/StyledTable';
import StyledHeader from '../../../../components/Tableboard/StyledHeader';
import StyledHeaderCell from '../../../../components/Tableboard/StyledHeaderCell';
import StyledBodyRow from '../../../../components/Tableboard/StyledBodyRow';
import StyledBodyCell from '../../../../components/Tableboard/StyledBodyCell';
// import Button from '../../../../components/Button';
import {
  StepSelector,
  ProjectLevelSelector,
  // ProjectTypeSelector,
  // PerformTypeSelector,
} from '../../CommonSelectors';

import ProjectInfoModal from '../../PersonalRecord/Modal';
import { useHooks } from './useHooks';
import { StyledDetail } from './StyledDetail';
import StyledTableWrapper from './StyledTableWrapper';

export const ReportDetail = ({ requestQuery }) => {
  const projectInfoModalRef = useRef();

  const {
    data,
    isExpanded,
    pagination,
    action: {
      setIsExpanded,
      pageHandler,
      pageSizeHandler,
      //  handleReportDown
    },
  } = useHooks({ requestQuery });

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
  const projectInfoModalOpen = row => {
    projectInfoModalRef.current.handleOpen(row);
  };
  const {
    startDate,
    endDate,
    headQuartsLabel,
    partLabel,
    teamLable,
    proejct_type,
    projectLevelLabels,
    statusLabel,
    fabLabel,
    areaLabel,
    keynoLabel,
    modelLabel,
  } = requestQuery;

  const columns = [
    {
      title: 'No',
      dataIndex: 'task_seq',
      width: '5%',
    },
    {
      title: '본부/팀',
      dataIndex: 'reg_dept_name',
      width: '10%',
    },
    {
      title: 'Leader',
      dataIndex: 'reg_user_name',
      width: '10%',
    },
    {
      title: 'Level',
      dataIndex: 'project_level',
      width: '10%',
      render: (project_level, row, index) => (
        <ProjectLevelSelector key={JSON.stringify(project_level) + index} keyValue={project_level} row={row} index={index} />
      ),
    },
    {
      title: 'Project 명',
      dataIndex: 'title',
      width: '15%',
      render: (title, row) => (
        <div style={{ textAlign: 'left' }}>
          <button type="button" style={{ color: row.status.colorCode || 'black' }} onClick={() => projectInfoModalOpen(row)}>
            {title}
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
      render: (project_id, row) => (
        <button type="button" style={{ color: row.status.colorCode || 'black' }} onClick={() => projectInfoModalOpen(project_id)}>
          {project_id}
        </button>
      ),
    },
    {
      title: '시작일',
      dataIndex: 'reg_dttm',
      width: '10%',
      render: item => moment(item).format('YYYY.MM.DD'),
    },
    // {
    //   title: '계획/실적',
    //   dataIndex: '',
    // },
    // {
    //   title: '등록완료',
    //   dataIndex: 'regingyn',
    // },
    {
      title: '단계별진척현황',
      dataIndex: 'step',
      width: '10%',
      render: (step, row, index) => <StepSelector level={step} row={row} index={index} isDrop={step === 22} isFinish={step === 12} />,
    },
    {
      title: '비고',
      dataIndex: 'step',
      width: '10%',
      render: step => <div style={{ textAlign: 'center' }}>{step === 30 ? '지연' : ''}</div>,
    },
  ];
  return (
    <StyledDetail className={`${isExpanded ? 'expanded' : ''}`}>
      <div className="sub_wrap">
        <div className="sub_tit2">
          <span className="small">
            조건 : &nbsp;&nbsp;
            {`${headQuartsLabel || ''}`} &nbsp;&nbsp;
            {`${partLabel || ''}`} &nbsp;&nbsp;
            {`${teamLable || ''}`} &nbsp;&nbsp;
            {`${proejct_type || ''}`} &nbsp;&nbsp;
            {`${projectLevelLabels || ''}`} &nbsp;&nbsp;
            {`${statusLabel || ''}`} &nbsp;&nbsp;
            {`${fabLabel || ''}`} &nbsp;&nbsp;
            {`${areaLabel || ''}`} &nbsp;&nbsp;
            {`${keynoLabel || ''}`} &nbsp;&nbsp;
            {`${modelLabel || ''}`} &nbsp;&nbsp;
            <br />
            기간 : &nbsp;&nbsp; {`${startDate} ~ ${endDate}`}
          </span>
          <div className="btn_wrap">
            <button
              type="button"
              className={`icon icon_arr_big ${isExpanded ? 'on' : ''}`}
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
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
            {/* <Button
              type="button"
              color="gray"
              size="small"
              onClick={() => {
                handleReportDown();
              }}
            >
              엑셀
            </Button> */}
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
                <li>
                  <span className="icon icon_ing6" />
                  등록중
                </li>
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
            <Table
              columns={columns}
              data={data.toJS()}
              rowKey="postno"
              rowClassName={(_record, index) => (index % 2 === 0 ? 'old' : 'even')}
              components={components}
            />
            <Pagination {...pagination.toJS()} groupSize={10} pageHandler={pageHandler} pageSizeHandler={pageSizeHandler} />
          </StyledTableWrapper>
          <ProjectInfoModal ref={projectInfoModalRef} />
        </div>
      </div>
    </StyledDetail>
  );
};

ReportDetail.propTypes = {
  requestQuery: PropTypes.object,
};

ReportDetail.defaultProps = {
  requestQuery: {},
};
