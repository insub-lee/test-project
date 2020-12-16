/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState } from 'react';
// import Modal from 'react-Modal';
import Modal from 'rc-dialog';

import Spin from '../../AntdSpinner';

// import modalStyles from '../modalStyles';
import StyledContent from './StyledContent';
import Button from '../../Button';
import service from './service';
import alertMessage from '../../Notification/Alert';
import { getProcessRule, fillWorkFlowData, stepChanger } from '../../../hooks/useWorkFlow';

// Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.7)';

export const DropModal = ({ info, isDropModalOpen, rel_type, setIsDropModalOpen, callback }) => {
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    const temp = { ...info, ...payload, rel_type };

    // payload.IMPROVE_CONTENT = modalParam.IMPROVE_CONTENT;
    // payload.SUCCESS_REASON = modalParam.SUCCESS_REASON;
    // payload.ATTACH_FILE_PATH = modalParam.ATTACH_FILE_PATH;
    // payload.ATTACH_FILE = modalParam.ATTACH_FILE;
    // payload.signref = modalParam.signref;
    // payload.files = modalParam.files;
    setIsSaving(true);
    getProcessRule().then(e => {
      // rel_type - 202  1차 드랍 결재 상신, 203
      fillWorkFlowData(e, temp).then(ee => {
        if (ee) {
          stepChanger(info?.task_seq, 20, temp).then(({ result, req, error }) => {
            if (result && !error) {
              alertMessage.notice('Drop 결재 등록하였습니다.');
              callback();
            } else {
              alertMessage.alert('Server Error');
              callback();
            }
          });
        }
      });
      callback();
    });
    // postData(payload).then(result => {
    //   if (result) {
    //     setIsSaving(false);
    //     setIsDropModalOpen(false);
    //     callback();
    //   } else {
    //     alertMessage.alert('Server Error');
    //   }
    // });
  };

  return (
    <Modal
      maskClosable={false}
      visible={isDropModalOpen}
      animation="zoom"
      maskAnimation="fade"
      onClose={() => {
        setIsDropModalOpen(false);
      }}
      style={{
        width: 500,
      }}
      bodyStyle={{
        padding: 0,
      }}
      closable={false}
      destroyOnClose
    >
      <StyledContent>
        <div>
          <div className="pop_tit">
            Drop 사유
            <button
              type="button"
              aria-label="dclose"
              className="icon icon_pclose"
              onClick={() => {
                setIsDropModalOpen(false);
              }}
            />
          </div>
          <div className="pop_con">
            <Spin spinning={isSaving}>
              <form autoComplete="off" onSubmit={onSubmit}>
                <textarea placeholder="Drop 사유를 작성해 주세요." name="drop_reason" maxLength={45} required />
                <div className="btn_wrap">
                  <Button type="submit" size="big" color="primary">
                    Drop하기
                  </Button>
                </div>
              </form>
            </Spin>
          </div>
        </div>
      </StyledContent>
    </Modal>
  );
};
