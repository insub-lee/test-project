import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import ListPage from './page/ListPage';

const Empty = () => <></>;

/**
 * JEM - 공지사항
 * @returns {*}
 */
const noticeBrd = () => (
  <BizBuilderBase
    sagaKey="jem-board-notice"
    viewType="LIST"
    workSeq={15546}
    modalTitle="공지사항"
    CustomListPage={ListPage}
    ListCustomButtons={Empty}
    InputCustomButtonsByModal={Empty}
    ViewCustomButtonsByModal={Empty}
  />
);

export default noticeBrd;
