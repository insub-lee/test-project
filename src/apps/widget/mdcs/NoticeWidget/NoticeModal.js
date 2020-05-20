import React from 'react';
import { Modal } from 'antd';

import StyledModalWrapper from 'apps/mdcs/styled/Modals/StyledModalWrapper';

import ModalView from './ModalView';

const AntdModal = StyledModalWrapper(Modal);

const NoticeModal = ({ viewType, workSeq, taskSeq, visible, closeBtnFunc }) => (
  <AntdModal className="modalWrapper modalTechDoc modalCustom" visible={visible} footer={null} width={800} onCancel={closeBtnFunc} destroyOnClose>
    <>
      <div className="pop_tit">알림판</div>
      <div className="pop_con">
        <ModalView viewType={viewType} workSeq={workSeq} taskSeq={taskSeq} closeBtnFunc={closeBtnFunc} />
      </div>
    </>
  </AntdModal>
);

export default NoticeModal;
