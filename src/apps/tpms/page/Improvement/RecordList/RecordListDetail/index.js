/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Table from 'rc-table';

import Pagination from '../../../../components/Tableboard/Pagination';
import StyledBodyCell from '../../../../components/Tableboard/StyledBodyCell';
import StyledBodyRow from '../../../../components/Tableboard/StyledBodyRow';
import StyledHeader from '../../../../components/Tableboard/StyledHeader';
import StyledHeaderCell from '../../../../components/Tableboard/StyledHeaderCell';
import StyledTable from '../../../../components/Tableboard/StyledTable';
import StyledDetail from '../StyledDetail';
import Button from '../../../../components/Button';
import ALinkButton from '../../../../components/ALinkButton';
import Spin from '../../../../components/AntdSpinner';
import StyledTableWrapper from '../StyledTableWrapper';
import { StepSelector, ProjectLevelSelector, ProjectTypeSelector, PerformTypeSelector } from '../../CommonSelectors';
import useHooks from './useHooks';

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

const columns = [
  {
    title: 'No',
    dataIndex: 'task_seq',
    width: '5%',
  },
  {
    title: '부서',
    dataIndex: 'reg_dept_name',
    width: '10%',
  },
  {
    title: 'Leader',
    dataIndex: 'project_leader',
    width: '10%',
  },
  {
    title: 'ProjectID',
    dataIndex: 'project_id',
    width: '15%',
    render: (value, row) => <span style={{ color: row.status.colorCode || 'black' }}>{value}</span>,
  },
  {
    title: 'ProjectLevel',
    dataIndex: 'project_level',
    width: '10%',
    render: (value, row, index) => <ProjectLevelSelector keyValue={Number(value)} row={row} index={index} />,
  },
  {
    title: 'ProjectType',
    dataIndex: 'project_type',
    width: '10%',
    render: (value, row, index) => <ProjectTypeSelector keyValue={value} row={row} index={index} />,
  },
  {
    title: 'PerformType',
    dataIndex: 'performance_type',
    width: '10%',
    render: (value, row, index) => <PerformTypeSelector keyValue={value} row={row} index={index} />,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: '10%',
    render: value => value.iconComponent,
  },
  {
    title: '단계별진척현황',
    dataIndex: 'step',
    width: '10%',
    render: (value, row, index) => <StepSelector level={value} row={row} index={index} isDrop={value === 22} isFinish={value === 12} />,
  },
  {
    title: '비고',
    dataIndex: 'status',
    width: '10%',
    render: item => <div style={{ textAlign: 'center' }}>{item === 'Y' ? '지연' : ''}</div>,
  },
];

const RecordListDetail = ({ requestQuery, authInfo, enableFixView, disableFixView }) => {
  const {
    isLoading,
    isExpanded,
    pagination,
    data,
    jasperUrl,
    actions: { pageHandler, pageSizeHandler, handleReportDown, toggleExpanded },
  } = useHooks({ requestQuery, authInfo, enableFixView, disableFixView });

  const { startDate, endDate, stdDate, headQuartsLabel, project_type_label, project_level_label } = requestQuery;

  return (
    <StyledDetail className={`${isExpanded ? 'expanded' : ''}`}>
      <Spin spinning={isLoading}>
        <div className="sub_wrap">
          <div className="sub_tit2">
            <span className="small">
              조건 : &nbsp;&nbsp;
              {`${headQuartsLabel || ''}`} &nbsp;&nbsp;
              {`${project_type_label || ''}`} &nbsp;&nbsp;
              {`${project_level_label || ''}`} &nbsp;&nbsp;
              {`${stdDate || ''}`}
              <br />
              기간 : &nbsp;&nbsp; {`${startDate} ~ ${endDate}`}
            </span>
            <div className="btn_wrap">
              <button type="button" className={`icon icon_arr_big ${isExpanded ? 'on' : ''}`} onClick={toggleExpanded}>
                축소/확대
              </button>
            </div>
          </div>
          <div className="sub_line" />
          <div className="sub_tit2 bg">
            <span className="big">총 건수</span>
            <span className="line" />
            <span className="col">{pagination.total} 건</span>
            <div className="btn_wrap">
              {/* 
              ! imple later 
              <Button type="button" color="gray" size="small" onClick={handleReportDown}>
                엑셀
              </Button> */}
              {/* 
              ! TODO impl later
              <ALinkButton href={jasperUrl} color="gray" size="small" download>
                출력
              </ALinkButton> */}
            </div>
          </div>
          <div className="sub_con">
            <StyledTableWrapper>
              <div className="sub_tb_top mb15">
                <ul className="sub_ing">
                  <li>
                    <span className="icon icon_ing1" />
                    등록
                  </li>
                  <li>
                    <span className="icon icon_ing2" />
                    진행
                  </li>
                  <li>
                    <span className="icon icon_ing3" />
                    Drop
                  </li>
                  <li>
                    <span className="icon icon_ing5" />
                    완료
                  </li>
                </ul>
              </div>
              <Table
                columns={columns}
                data={data}
                rowKey="postno"
                rowClassName={(_record, index) => (index % 2 === 0 ? 'old' : 'even')}
                components={components}
              />
              <Pagination {...pagination} groupSize={10} pageHandler={pageHandler} pageSizeHandler={pageSizeHandler} />
            </StyledTableWrapper>
          </div>
        </div>
      </Spin>
    </StyledDetail>
  );
};

RecordListDetail.propTypes = {
  requestQuery: PropTypes.object.isRequired,
  authInfo: PropTypes.object.isRequired,
  enableFixView: PropTypes.func,
  disableFixView: PropTypes.func,
};

RecordListDetail.defaultProps = {
  enableFixView: () => {},
  disableFixView: () => {},
};

export default RecordListDetail;
