import React from 'react';
import { Modal } from 'antd';

import StyledModalWrapper from 'apps/mdcs/styled/Modals/StyledModalWrapper';

import ModalView from './ModalView';
import ModalList from './ModalList';
import CoverView from './CoverView';

const AntdModal = StyledModalWrapper(Modal);

const StandardDocModal = ({
  viewType,
  workSeq,
  taskSeq,
  visible,
  closeBtnFunc,
  widgetTitle,
  coverView,
  onCloseCoverView,
  clickCoverView,
  onClickRow,
  listData,
  listVisible,
  closeListBtnFunc,
}) => (
  <>
    <AntdModal className="modalWrapper modalTechDoc modalCustom" visible={visible} footer={null} width={800} onCancel={closeBtnFunc} destroyOnClose>
      <>
        <div className="pop_tit">{widgetTitle}</div>
        <div className="pop_con">
          <ModalView viewType={viewType} workSeq={workSeq} taskSeq={taskSeq} closeBtnFunc={closeBtnFunc} clickCoverView={clickCoverView} />
        </div>
      </>
    </AntdModal>
    <AntdModal
      className="modalWrapper modalTechDoc modalCustom"
      visible={coverView.visible || false}
      footer={null}
      width={800}
      okButtonProps={null}
      onCancel={onCloseCoverView}
      destroyOnClose
    >
      <div className="pop_tit">표지 보기</div>
      <div className="SearchContentLayer">
        <CoverView coverView={coverView} onCloseCoverView={onCloseCoverView} />
      </div>
    </AntdModal>
    <AntdModal className="modalWrapper modalTechDoc modalCustom" visible={listVisible} footer={null} width={1000} onCancel={closeListBtnFunc} destroyOnClose>
      <>
        <div className="pop_tit">{widgetTitle}</div>
        <div className="pop_con">
          <ModalList onClickRow={onClickRow} closeBtnFunc={closeListBtnFunc} listData={listData} />
        </div>
      </>
    </AntdModal>
  </>
);

export default StandardDocModal;
