import React, { useMemo } from 'react';

import Table from 'rc-table';

import moment from 'moment';

import Spin from '../../components/AntdSpinner';
import GlobalStyle from '../../components/GlobalStyle';
import TitleContainer from '../../components/TitleContainer';
import StyledSearch from '../../components/Tableboard/SearchWrap/StyledSearch';
import Pagination from '../../components/Tableboard/Pagination';
import StyledWrapper from '../../components/BuiltTables/StyledWrapper';
import StyledTable from '../../components/Tableboard/StyledTable';
import StyledHeader from '../../components/Tableboard/StyledHeader';
import StyledHeaderCell from '../../components/Tableboard/StyledHeaderCell';
import StyledBodyRow from '../../components/Tableboard/StyledBodyRow';
import StyledBodyCell from '../../components/Tableboard/StyledBodyCell';
import { ModalHugger } from '../../components/ModalHugger';
import Button from '../../components/Button';

import usePostList from '../../hooks/usePostList';
import { useModalController } from '../../hooks/useModalController';
import useAuth from '../../hooks/useAuth';

import { InquiryBody, InquiryTitle } from './Inquiry';
import { ModifyBody } from './Modify';
import { DeleteBody } from './Delete';
import { RegisterBody } from './Register';
import { formJson } from './formJson';

/**
 * TPMS - 우수활동사례
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '우수활동사례' }];
const categories = [
  { value: 'all', text: '전체' },
  { value: 'title', text: '제목' },
  { value: 'regname', text: '작성자' },
  { value: 'content', text: '내용' },
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

const curYear = Number(moment().format('YYYY'));
const endYear = 2018;
const yearCategory = [];
for (let i = curYear; i >= endYear; i -= 1) {
  yearCategory.push({ value: i, text: `${i}년` });
}
const brdid = 'brd00000000000000007';

const ExcellentActivityCase = () => {
  const { authInfo, isError: isAuthError } = useAuth();

  const {
    isLoading,
    isError,
    data,
    pagination,
    action: { submitSearchQuery, pageHandler, pageSizeHandler },
  } = usePostList({ brdid });

  const {
    processedContent,
    modalStatus,
    selectedRecord,
    actions: { closeModal, openModal, processRecord, closeAll },
  } = useModalController(['REG', 'MOD', 'DEL', 'INQ']);

  const columns = useMemo(
    () => [
      {
        title: 'NO',
        dataIndex: 'postno',
        key: 'postno',
        width: '5%',
        render: (postno, record) => (record.hpostno > 0 ? '' : postno),
      },
      {
        title: 'Rev',
        dataIndex: 'updcnt',
        key: 'updcnt',
        width: '5%',
        render: (updcnt, record) => (record.hpostno > 0 ? '' : updcnt),
      },
      {
        title: '제목',
        dataIndex: 'title',
        key: 'title',
        width: '45%',
        render: (title, record) => (
          <button
            type="button"
            onClick={() => {
              processRecord(record);
              openModal('INQ');
            }}
          >
            {record.isReply && (
              <>
                <span className="icon icon_reply" />
                &nbsp;&nbsp;
              </>
            )}
            {title}
          </button>
        ),
      },
      {
        title: '소속',
        dataIndex: 'deptnm',
        key: 'deptnm',
        width: '10%',
      },
      {
        title: '작성자',
        dataIndex: 'regnm',
        key: 'regnm',
        width: '10%',
      },
      {
        title: '작성일',
        dataIndex: 'regdt',
        key: 'regdt',
        width: '10%',
        render: regdt => moment(regdt).format('YYYY.MM.DD'),
      },
      {
        title: '조회',
        dataIndex: 'readcnt',
        key: 'readcnt',
        width: '5%',
      },
    ],
    [],
  );
  const essential = {
    brdid,
    formJson,
    content: processedContent,
    selectedRecord,
    successCallback: () => {
      closeAll();
      pageHandler(1);
    },
    closeModal,
    openModal,
    // authInfo,
  };
  return (
    <>
      <div className="tpms-view">
        <TitleContainer title="우수활동사례" nav={nav}>
          <Spin spinning={isLoading}>
            <StyledWrapper>
              <div className="view_top">
                <StyledSearch>
                  <form autoComplete="off" className="page" name="form-name" onSubmit={submitSearchQuery}>
                    <select className="yearCategory search-select" name="yearCategory" onChange={() => {}}>
                      {yearCategory.map(category => (
                        <option key={category.text} value={category.value}>
                          {category.text}
                        </option>
                      ))}
                    </select>
                    <select className="search-select" name="category">
                      {categories.map(category => (
                        <option key={category.text} value={category.value}>
                          {category.text}
                        </option>
                      ))}
                    </select>
                    <input type="text" className="input" name="text" />
                    <button type="submit" className="icon icon_search_white">
                      검색
                    </button>
                  </form>
                </StyledSearch>
                <div className="btn_wrap">
                  <Button color="primary" size="big" onClick={() => openModal('REG')}>
                    등록하기
                  </Button>
                </div>
              </div>
              <Table
                columns={columns}
                data={data}
                rowKey="postno"
                rowClassName={(_record, index) => (index % 2 === 0 ? 'old' : 'even')}
                components={componentsStyle}
              />
              <Pagination {...pagination} groupSize={10} pageHandler={pageHandler} pageSizeHandler={pageSizeHandler} />
            </StyledWrapper>
          </Spin>
        </TitleContainer>
        <GlobalStyle />
      </div>
      <ModalHugger className="REG" width={850} visible={modalStatus.REG} title="등록하기" onCancel={() => closeModal('REG')}>
        <RegisterBody {...essential} />
      </ModalHugger>

      <ModalHugger className="MOD" width={850} visible={modalStatus.MOD} title="수정하기" onCancel={() => closeModal('MOD')}>
        <ModifyBody {...essential} />
      </ModalHugger>

      <ModalHugger className="DEL" width={300} visible={modalStatus.DEL} title="비밀번호 입력" onCancel={() => closeModal('DEL')}>
        <DeleteBody {...essential} />
      </ModalHugger>

      <ModalHugger className="INQ" width={850} visible={modalStatus.INQ} title={<InquiryTitle {...essential} />} onCancel={() => closeModal('INQ')}>
        <InquiryBody {...essential} />
      </ModalHugger>
    </>
  );
};

export default ExcellentActivityCase;
