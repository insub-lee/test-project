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

import { ModalHugger } from '../../../components/ModalHugger';

import { useModalController } from '../../../hooks/useModalController';
import useHooks from './useHooks';
import useAuth from '../../../hooks/useAuth';
import { useBoard } from '../../../hooks/useBoard';
import { request } from '../../../utils/boardCode';

import { InquiryBody, InquiryTitle } from './Inquiry';
import { ModifyBody } from './Modify';
import { DeleteBody } from './Delete';
import { ReplyBody } from './Reply';
import { formJson } from './formJson';

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
  const { authInfo, isError: isAuthError } = useAuth();

  const {
    isError,
    data,
    pagination,
    isLoading,
    action: {
      pageHandler,
      pageSizeHandler,
      updateViewCount,
      regPost,
      deletePost,
      modifyPost,
      replyPost,
      submitSearchQuery,
    },
  } = useBoard({ boardCode: request });

  const {
    modalStatus,
    processedContent,
    selectedRecord,
    actions: { openModal, closeAll, closeModal, processRecord },
  } = useModalController(['INQ', 'MOD', 'DEL', 'REP']);

  const {
    registAreaModalRef,
    columns,
    checkedList,
    actions: { handleOpenRegistModal, deleteCheckedList },
  } = useHooks({
    data,
    openModal,
    callback: () => {
      closeAll();
      pageHandler(1);
    },
    processRecord,
  });

  const essential = {
    formJson,
    content: processedContent,
    selectedRecord,
    boardCode: request,
    successCallback: () => {
      closeAll();
      pageHandler(1);
    },
    closeModal,
    openModal,
    regPost,
    deletePost,
    modifyPost,
    replyPost,
    updateViewCount,
  };

  return (
    <>
      <div className="tpms-view">
        <TitleContainer title="개선요청활동 게시판" nav={nav}>
          <Spin spinning={isLoading}>
            <StyledWrapper>
              <div className="view_top">
                <div className="btn_wrap_left">
                  <Button type="button" color="primary" onClick={deleteCheckedList} disabled={checkedList?.length < 1}>
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

      <ModalHugger
        className="REP"
        width={850}
        visible={modalStatus.REP}
        title="답변하기"
        onCancel={() => closeModal('REP')}
      >
        <ReplyBody {...essential} />
      </ModalHugger>

      <ModalHugger
        className="MOD"
        width={850}
        visible={modalStatus.MOD}
        title="수정하기"
        onCancel={() => closeModal('MOD')}
      >
        <ModifyBody {...essential} />
      </ModalHugger>

      <ModalHugger
        className="DEL"
        width={300}
        visible={modalStatus.DEL}
        title="비밀번호 입력"
        onCancel={() => closeModal('DEL')}
      >
        <DeleteBody {...essential} />
      </ModalHugger>

      <ModalHugger
        className="INQ"
        width={850}
        visible={modalStatus.INQ}
        title={<InquiryTitle {...essential} />}
        onCancel={() => closeModal('INQ')}
      >
        <InquiryBody {...essential} />
      </ModalHugger>
    </>
  );
};

export default InfoTable;
