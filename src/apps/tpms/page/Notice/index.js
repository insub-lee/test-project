import React, { useState } from 'react';
import Table from 'rc-table';
import moment from 'moment';
import { Modal, Button } from 'antd';

import GlobalStyle from '../../components/GlobalStyle';
import TitleContainer from '../../components/TitleContainer';
import StyledWrapper from '../../components/BuiltTables/StyledWrapper';
import StyledSearch from '../../components/Tableboard/SearchWrap/StyledSearch';
import Pagination from '../../components/Tableboard/Pagination';
import StyledBodyCell from '../../components/Tableboard/StyledBodyCell';
import StyledBodyRow from '../../components/Tableboard/StyledBodyRow';
import StyledHeader from '../../components/Tableboard/StyledHeader';
import StyledHeaderCell from '../../components/Tableboard/StyledHeaderCell';
import StyledTable from '../../components/Tableboard/StyledTable';
import { ModalRegister, Title } from '../../components/ModalRegister';

const nav = [{ title: 'TPMS' }, { title: '공지사항' }];
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

// Todo - should move to useBuilderBase
const pagination = {
  current: 1,
  pageSize: 10,
  total: 0,
};

const columns = [
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
      <>
        {record.isReply && (
          <>
            <span className="icon icon_reply" />
            &nbsp;&nbsp;
          </>
        )}
        {title}
      </>
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
];

/**
 * TPMS - 공지사항
 *
 * 모달 4개
 * 수정, 삭제, 등록, 게시글 850
 *
 * @returns {*}
 * @constructor
 */
const Notice = () => {
  const [openRegModal, setOpenRegModal] = useState(true);
  // const modalWidth = window.visualViewport.width * 0.8;
  return (
    <div className="tpms-view">
      <TitleContainer title="공지사항" nav={nav}>
        <StyledWrapper>
          <div className="view_top">
            <StyledSearch>
              <form
                autoComplete="off"
                className="page"
                name="form-name"
                onSubmit={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <select name="category">
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
                <button type="button" onClick={() => setOpenRegModal(true)}>
                  등록
                </button>
              </form>
            </StyledSearch>
            <div className="btn_wrap" />
          </div>
          <button type="button">수정</button>
          <button type="button">삭제</button>
          <button type="button">게시글</button>
          <button type="button" onClick={() => setOpenRegModal(true)}>
            등록
          </button>
          <Table columns={columns} rowKey="postno" rowClassName={(_record, index) => (index % 2 === 0 ? 'old' : 'even')} components={componentsStyle} />
          <Pagination {...pagination} groupSize={10} pageHandler={() => {}} pageSizeHandler={() => {}} />
          <Modal
            width={1024}
            footer={null}
            title={<Title title="등록하기" />}
            visible={openRegModal}
            onCancel={() => setOpenRegModal(false)}
            centered
            destroyOnClose
          >
            <ModalRegister closeModal={setOpenRegModal} />
          </Modal>
        </StyledWrapper>
      </TitleContainer>
      <GlobalStyle />
    </div>
  );
};

export default Notice;
