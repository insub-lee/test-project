import React, { useState } from 'react';

import Table from 'rc-table';
import moment from 'moment';

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

// Todo - should move to useBuilderBase
const pagination = {
  current: 1,
  pageSize: 10,
  total: 0,
};

const InfoTable = () => {
  const [checkList, setCheckList] = useState([]);

  // Todo - Toggle All
  const handleChangeAll = () => setCheckList(prevState => []);

  // Todo - Toggle one
  const handelChangeCheck = postno =>
    setCheckList(prevState => (prevState.includes(postno) ? [...prevState, postno] : prevState.filter(value => value !== postno)));

  // Todo - Get Type Column
  const getTypeColumn = (hpostno, record) => '완료';

  // Todo - Get ToolTip Text
  const getToolTipText = (content, hpostno) => '본 내용이 나와야 한다...';

  // Todo - Get Status Column
  const getStatusColumn = (hpostno, clsyn, rejectyn) => {
    let status = '';
    if (hpostno > 0 && clsyn !== null) {
      status = '완료';
    } else if (hpostno > 0 && rejectyn !== null) {
      status = '불가';
    }
    return status;
  };

  const columns = [
    {
      title: (
        <div className="checkbox">
          <input
            type="checkbox"
            id="change-all-checkbox"
            // checked={data.filter(row => !(row.hpostno > 0)).length === checkedList.length}
            onChange={handleChangeAll}
          />
          <label htmlFor="change-all-checkbox">
            <span />
          </label>
        </div>
      ),
      dataIndex: 'postno',
      key: 'postno',
      width: '5%',
      // render: (postno, record) => this.getCheckBox(postno, record, checkedList),
      render: (postno, record) => {
        if (record.hpostno > 0) return '';
        return (
          <div className="checkbox">
            <input type="checkbox" id={`checkbox-${postno}`} checked={checkList.includes(postno)} onChange={() => handelChangeCheck(postno)} />
            <label htmlFor={`checkbox-${postno}`}>
              <span />
            </label>
          </div>
        );
      },
    },
    {
      title: '요청일',
      dataIndex: 'regdt',
      key: 'regdt',
      width: '10%',
      render: regdt => moment(regdt).format('YYYY.MM.DD'),
    },
    {
      title: '소속',
      dataIndex: 'deptnm',
      key: 'deptnm',
      width: '10%',
    },
    {
      title: '요청자',
      dataIndex: 'regnm',
      key: 'regnm',
      width: '10%',
    },
    {
      title: '분류',
      dataIndex: 'postno',
      key: 'postno',
      width: '5%',
      render: (hpostno, record) => getTypeColumn(hpostno, record),
    },
    {
      title: '개선요청사항',
      dataIndex: 'title',
      key: 'title',
      width: '45%',
      render: (title, record) => (
        <div className="tooltip">
          {record.isReply && (
            <>
              <span className="icon icon_reply" />
              &nbsp;&nbsp;
            </>
          )}
          {title}
          <span className="tooltiptext">{getToolTipText(record.content, record.hpostno)}</span>
        </div>
      ),
    },
    {
      title: '상태',
      dataIndex: 'hpostno',
      key: 'hpostno',
      width: '5%',
      render: (hpostno, record) => getStatusColumn(hpostno, record.clsyn, record.rejectyn),
    },
  ];

  return (
    <div className="tpms-view">
      <TitleContainer title="개선요청활동 게시판" nav={nav}>
        <StyledWrapper>
          <div className="view_top">
            <div className="btn_wrap_left">
              <Button type="button" color="primary" onClick={() => {}}>
                전체 삭제
              </Button>
            </div>
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
              </form>
            </StyledSearch>
            <div className="btn_wrap">
              <Button type="button" color="primary" onClick={() => {}}>
                엑셀 업로드
              </Button>
            </div>
            <div className="btn_wrap" />
          </div>
          <Table columns={columns} rowKey="postno" rowClassName={(_record, index) => (index % 2 === 0 ? 'old' : 'even')} components={componentsStyle} />
          <Pagination {...pagination} groupSize={10} pageHandler={() => {}} pageSizeHandler={() => {}} />
        </StyledWrapper>
      </TitleContainer>
      <GlobalStyle />
    </div>
  );
};

export default InfoTable;
