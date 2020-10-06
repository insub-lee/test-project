import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import ListPage from './page/ListPage';

const Empty = () => <></>;

/**
 * JEM - 공지사항 관리
 * @returns {*}
 */
const noticeBrdManage = () => (
  <BizBuilderBase sagaKey="jem-board-notice-manage" viewType="LIST" workSeq={15546} modalTitle="공지사항" CustomListPage={ListPage} />
);

export default noticeBrdManage;
