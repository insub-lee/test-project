/* eslint-disable camelcase */
import React, { useMemo, useState } from 'react';
import moment from 'moment';
import Table from 'rc-table';

import GlobalStyle from '../../../components/GlobalStyle';
import Spin from '../../../components/AntdSpinner';
import ExpandableTitleContainer from '../../../components/ExpandableTitleContainer';
import Pagination from '../../../components/Tableboard/Pagination';
import StyledBodyCell from '../../../components/Tableboard/StyledBodyCell';
import StyledBodyRow from '../../../components/Tableboard/StyledBodyRow';
import StyledHeader from '../../../components/Tableboard/StyledHeader';
import StyledHeaderCell from '../../../components/Tableboard/StyledHeaderCell';
import StyledTable from '../../../components/Tableboard/StyledTable';
import StyledModalTitle from '../../../components/CommonStyledElement/StyledModalTitle';
import StatusIcon from '../StatusIcon';
import { ModalHugger } from '../../../components/ModalHugger';
import Detail from './Detail';

import useSignList from '../../../hooks/useSignList';
import { useModalController } from '../../../hooks/useModalController';
import useAuth from '../../../hooks/useAuth';

/**
 * TPMS - 개선활동 - 등록/진행 - 등록함
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선활동' }, { title: '등록/진행' }, { title: '등록함' }];

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

const RecordList = () => {
  /* need info, dpCd */
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();

  const {
    data,
    isLoading,
    isError,
    pagination,
    action: { pageHandler, pageSizeHandler },
  } = useSignList({ is_temp: 0, menu_id: 'register', step: 2 });

  const {
    modalStatus,
    actions: { openModal, closeModal },
  } = useModalController(['INFO']);

  const [currentRecord, setCurrentRecord] = useState(null);

  const columns = useMemo(
    () => [
      {
        title: 'NO',
        dataIndex: 'task_seq',
        key: 'task_seq',
        width: '5%',
      },
      {
        title: 'Project ID',
        dataIndex: 'project_id',
        key: 'project_id',
        width: '20%',
        render: (value, row) => (
          <button
            type="button"
            onClick={() => {
              setCurrentRecord(row);
              openModal('INFO');
            }}
          >
            {value}
          </button>
        ),
      },
      {
        title: 'Project 명',
        dataIndex: 'title',
        key: 'title',
        width: '35%',
        render: (value, row) => (
          <button
            type="button"
            onClick={() => {
              setCurrentRecord(row);
              openModal('INFO');
            }}
          >
            {value}
          </button>
        ),
      },
      {
        title: 'Level',
        dataIndex: 'project_level',
        key: 'project_level',
        width: '10%',
        render: project_level => {
          switch (project_level) {
            case 1:
              return '본부';
            case 2:
              return '담당';
            case 3:
              return '팀';
            case 4:
              return 'Part';
            default:
              return '본부';
          }
        },
      },
      {
        title: 'Type',
        dataIndex: 'project_type',
        key: 'project_type',
        width: '10%',
        render: project_type => {
          switch (project_type) {
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
        dataIndex: 'reg_dttm',
        key: 'reg_dttm',
        width: '10%',
        render: reg_dttm => (reg_dttm ? moment(reg_dttm).format('YYYY.MM.DD') : ''),
      },
      {
        title: '문서상태',
        dataIndex: 'step',
        key: 'step',
        width: '10%',
        render: step => {
          switch (step) {
            case 0:
            case 1:
              return (
                <StatusIcon className="sky">
                  <span className="icon icon_ing1_on" />
                  1차 등록 중
                </StatusIcon>
              );
            case 8:
            case 11:
              return (
                <StatusIcon className="sky">
                  <span className="icon icon_ing1_on" />
                  완료보고 등록 중
                </StatusIcon>
              );
            case 2: // 갓 등록된 상황
            case 3: // 현상파악
            case 4: // 원인파악
            case 5: // 대책수립
            case 6: // 개선활동
            case 7: // 완료보고
              return (
                <StatusIcon className="green">
                  <span className="icon icon_ing2_on" />
                  진행
                </StatusIcon>
              );
            case 20:
            case 21:
            case 22:
              return (
                <StatusIcon className="gold">
                  <span className="icon icon_ing3_on" />
                  DROP
                </StatusIcon>
              );
            case 30:
              return (
                <StatusIcon className="orange">
                  <span className="icon icon_ing4_on" />
                  지연
                </StatusIcon>
              );
            case 12:
              return (
                <StatusIcon className="gray">
                  <span className="icon icon_ing5_on" />
                  완료
                </StatusIcon>
              );
            default:
              return '';
          }
        },
      },
    ],
    [],
  );

  return (
    <>
      <div className="tpms-view">
        <ExpandableTitleContainer title="개선활동 - 등록/진행" nav={nav} useCount count={pagination.total}>
          <Spin spinning={isLoading}>
            <Table
              columns={columns}
              data={data}
              rowKey="rownum"
              rowClassName={(_record, index) => (index % 2 === 0 ? 'old' : 'even')}
              components={componentsStyle}
            />
            <Pagination {...pagination} groupSize={10} pageHandler={pageHandler} pageSizeHandler={pageSizeHandler} />
          </Spin>
        </ExpandableTitleContainer>
        <GlobalStyle />
      </div>
      <ModalHugger
        width={1250}
        visible={modalStatus.INFO}
        title={
          <StyledModalTitle>
            <span className="big">Project ID</span>
            <span className="line" />
            <span className="small">{currentRecord?.project_id || ''}</span>
          </StyledModalTitle>
        }
        footer={null}
        onCancel={() => closeModal('INFO')}
      >
        <Detail
          info={currentRecord}
          callback={() => {
            pageHandler(1);
          }}
        />
      </ModalHugger>
    </>
  );
};

export default RecordList;
