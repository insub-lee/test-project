import React from 'react';
import moment from 'moment';
import Table from 'rc-table';

import GlobalStyle from '../../../components/GlobalStyle';
import ExpandableTitleContainer from '../../../components/ExpandableTitleContainer';
import Pagination from '../../../components/Tableboard/Pagination';
import StyledBodyCell from '../../../components/Tableboard/StyledBodyCell';
import StyledBodyRow from '../../../components/Tableboard/StyledBodyRow';
import StyledHeader from '../../../components/Tableboard/StyledHeader';
import StyledHeaderCell from '../../../components/Tableboard/StyledHeaderCell';
import StyledTable from '../../../components/Tableboard/StyledTable';
import { StepSelector } from '../CommonSelectors';

import useSignList from '../../../hooks/useSignList';

/**
 * TPMS - 개선활동 - 등록/진행 - 진행함
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: '등록/진행' }, { title: '진행함' }];

const columns = [
  {
    title: 'NO',
    dataIndex: 'rownum',
    key: 'rownum',
    width: '5%',
  },
  {
    title: 'Project ID',
    dataIndex: 'PRJ_ID',
    key: 'PRJ_ID',
    width: '20%',
  },
  {
    title: 'Project 명',
    dataIndex: 'PRJ_TITLE',
    key: 'PRJ_TITLE',
    width: '25%',
  },
  {
    title: '단계별진척현황',
    dataIndex: 'phase',
    width: '10%',
    render: (value, row, index) => <StepSelector level={value} row={row} index={index} />,
  },
  {
    title: 'Level',
    dataIndex: 'PRJ_LEVEL',
    key: 'PRJ_LEVEL',
    width: '10%',
    render: prjLevel => {
      switch (prjLevel) {
        case '1':
          return '본부';
        case '2':
          return '담당';
        case '3':
          return '팀';
        case '4':
          return 'Part';
        default:
          return '본부';
      }
    },
  },
  {
    title: 'Type',
    dataIndex: 'PRJ_TYPE',
    key: 'PRJ_TYPE',
    width: '10%',
    render: prjType => {
      switch (prjType) {
        case 'G':
          return '개별개선';
        case 'T':
          return 'TFT';
        case 'W':
          return 'Wafer Loss';
        default:
          return '';
      }
    },
  },
  {
    title: '등록일',
    dataIndex: 'PRJ_REG_DATE',
    key: 'PRJ_REG_DATE',
    width: '10%',
    render: prjRegDate => (prjRegDate ? moment(prjRegDate).format('YYYY.MM.DD') : ''),
  },
  {
    title: 'Leader',
    dataIndex: 'PRJ_LEADER_NAME',
    key: 'PRJ_LEADER_NAME',
    width: '10%',
  },
];

const componentsStyle = {
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

const InProgressTable = () => {
  const {
    data,
    isError,
    pagination,
    action: { pageHandler, pageSizeHandler },
  } = useSignList({ sysid: 'TPMS', mnuid: 'TPMS1060' });

  return (
    <div className="tpms-view">
      <ExpandableTitleContainer title="개선활동 - 등록/진행" nav={nav} useCount count={0}>
        <Table
          columns={columns}
          data={data}
          rowKey="rownum"
          rowClassName={(_record, index) => (index % 2 === 0 ? 'old' : 'even')}
          components={componentsStyle}
        />
        <Pagination {...pagination} groupSize={10} pageHandler={pageHandler} pageSizeHandler={pageSizeHandler} />
      </ExpandableTitleContainer>
      <GlobalStyle />
    </div>
  );
};
export default InProgressTable;
