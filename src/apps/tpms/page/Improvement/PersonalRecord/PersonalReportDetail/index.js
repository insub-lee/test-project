import React, { Component } from 'react';
import { Icon, Spin } from 'antd';
import Table from 'rc-table';
import moment from 'moment';

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
import {
  StepSelector,
  ProjectLevelSelector,
  // ProjectTypeSelector,
  // PerformTypeSelector,
} from 'apps/tpms/page/Improvement/CommonSelectors';

import StyledTableWrapper from '../../PartialRecord/StyledTableWrapper';
import StyledDetail from '../../PartialRecord/StyledDetail';
import ProjectInfoModal from '../Modal';

import { useHooks } from './useHooks';

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

export const PersonalReportDetail = ({ requestQuery }) => {
  const {
    data,
    pagination,
    isExpanded,
    isLoading,
    projectInfoModalRef,
    action: { handleReportDown, pageHandler, pageSizeHandler, projectInfoModalOpen, setIsExpanded },
  } = useHooks({ requestQuery });
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
          <button type="button" style={{ color: row.status.colorCode || 'black' }} onClick={() => projectInfoModalOpen(row.project_id)}>
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
        <button type="button" style={{ color: row.status.colorCode || 'black' }} onClick={() => projectInfoModalOpen(prjId)}>
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
            <button type="button" className={`icon icon_arr_big ${isExpanded ? 'on' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
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
            <Button type="button" color="gray" size="small" onClick={handleReportDown}>
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
            <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
              <Table
                columns={columns}
                data={data.toJS()}
                rowKey="postno"
                rowClassName={(_record, index) => (index % 2 === 0 ? 'old' : 'even')}
                components={components}
              />
            </Spin>
            <Pagination {...pagination.toJS()} groupSize={10} pageHandler={pageHandler} pageSizeHandler={pageSizeHandler} />
            <ProjectInfoModal ref={projectInfoModalRef} />
          </StyledTableWrapper>
        </div>
      </div>
    </StyledDetail>
  );
};
