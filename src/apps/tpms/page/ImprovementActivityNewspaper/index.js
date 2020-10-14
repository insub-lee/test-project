import React, { useMemo } from 'react';

import Table from 'rc-table';
import moment from 'moment';

import GlobalStyle from '../../components/GlobalStyle';
import Spin from '../../components/AntdSpinner';
import TitleContainer from '../../components/TitleContainer';
import StyledWrapper from '../../components/BuiltTables/StyledWrapper';
import StyledSearch from '../../components/Tableboard/SearchWrap/StyledSearch';
import Pagination from '../../components/Tableboard/Pagination';
import StyledBodyCell from '../../components/Tableboard/StyledBodyCell';
import StyledBodyRow from '../../components/Tableboard/StyledBodyRow';
import StyledHeader from '../../components/Tableboard/StyledHeader';
import StyledHeaderCell from '../../components/Tableboard/StyledHeaderCell';
import StyledTable from '../../components/Tableboard/StyledTable';

import usePostList from '../../hooks/usePostList';

/**
 * TPMS - 개선활동신문고
 *
 * @returns {*}
 * @constructor
 */
const nav = [{ title: 'TPMS' }, { title: '개선활동신문고' }];

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

const ImprovementActivityNewspaper = () => {
  const {
    isLoading,
    isError,
    data,
    pagination,
    action: { submitSearchQuery, pageHandler, pageSizeHandler },
  } = usePostList({ brdid: 'brd00000000000000005' });

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
          <button type="button" onClick={() => console.debug(record)}>
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

  return (
    <div className="tpms-view">
      <TitleContainer title="개선활동신문고" nav={nav}>
        <Spin spinning={isLoading}>
          <StyledWrapper>
            <div className="view_top">
              <StyledSearch>
                <form autoComplete="off" className="page" name="form-name" onSubmit={submitSearchQuery}>
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
                </form>
              </StyledSearch>
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
    </div>
  );
};

export default ImprovementActivityNewspaper;
