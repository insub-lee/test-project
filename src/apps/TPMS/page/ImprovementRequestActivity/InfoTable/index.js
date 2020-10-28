import React from 'react';

import Table from 'rc-table';

import GlobalStyle from '../../../components/GlobalStyle';
import TitleContainer from '../../../components/TitleContainer';
import StyledWrapper from '../../../components/BuiltTables/StyledWrapper';
import StyledSearch from '../../../components/Tableboard/SearchWrap/StyledSearch';
import Pagination from '../../../components/Tableboard/Pagination';
import StyledBodyCell from '../../../components/Tableboard/StyledBodyCell';
import StyledBodyRow from '../../../components/Tableboard/StyledBodyRow';
import StyledHeader from '../../../components/Tableboard/StyledHeader';
import StyledHeaderCell from '../../../components/Tableboard/StyledHeaderCell';
import StyledTable from '../../../components/Tableboard/StyledTable';
import Button from '../../../components/Button';
import Spin from '../../../components/Spin';
import RegistAreaModal from './RegistModal';

import usePostList from '../../../hooks/usePostList';
import useHooks from './useHooks';

/**
 * TPMS - 개선요청활동(생산) - 개선요청활동 게시판
 *
 * @returns {*}
 * @constructor
 */

const nav = [{ title: 'TPMS' }, { title: '개선요청활동생산' }, { title: '개선요청활동 게시판' }];

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

const InfoTable = () => {
  const {
    isLoading,
    isError,
    checkedList,
    data,
    pagination,
    action: { submitSearchQuery, pageHandler, pageSizeHandler },
  } = usePostList({ brdid: 'brd00000000000000024' });

  const {
    registAreaModalRef,
    columns,
    actions: { handleOpenRegistModal, deleteCheckedList },
  } = useHooks({ data });

  return (
    <div className="tpms-view">
      <TitleContainer title="개선요청활동 게시판" nav={nav}>
        <Spin spinning={isLoading}>
          <StyledWrapper>
            <div className="view_top">
              <div className="btn_wrap_left">
                <Button type="button" color="primary" onClick={deleteCheckedList} disabled={checkedList.length < 1}>
                  선택 삭제
                </Button>
              </div>
              <StyledSearch>
                <form autoComplete="off" className="page" name="form-name" onSubmit={submitSearchQuery}>
                  <select name="category" className="search-select">
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
                <Button type="button" color="primary" onClick={handleOpenRegistModal}>
                  엑셀 업로드
                </Button>
              </div>
              <div className="btn_wrap" />
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
      <RegistAreaModal ref={registAreaModalRef} callback={() => {}} />
    </div>
  );
};

export default InfoTable;
