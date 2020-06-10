import React, { useState } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import { address } from 'apps/eshs/admin/safety/InspectionTarget/FireDpump/internal_constants';
import { Button } from 'antd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
const StyledButton = StyledAntdButton(Button);

export default function RegisterInspection({
  sagaKey,
  detail,
  title,
  viewMetaSeqHandler,
  onCloseModalHandler,
  modalHandler,
  formData,
  taskSeq,
  workSeq,
  viewPageData,
  shouldFire,
}) {
  const shoudFireAPI = () => {
    // 커스텀버튼 : WP (미분무 펌프) 에 맞는 폼데이터로 변경
    const { WORK_ODD_YN } = formData;
    if (WORK_ODD_YN) {
      const { POSITION_NO, CHIP_NO, REG_USER_ID } = formData;
      request({
        method: 'POST',
        url: `${address.registerInspectionResult}`,
        data: { WORK_ODD_YN, POSITION_NO, CHIP_NO, REG_USER_ID },
      }).then(({ response }) => {
        if (response?.result === 1) {
          message.success(<MessageContent>점검결과를 등록 하였습니다.</MessageContent>);
          onCloseModalHandler();
        } else {
          message.error(<MessageContent>점검결과 등록에 실패하였습니다.</MessageContent>);
        }
      });
    } else {
      message.error(<MessageContent>점검항목중 누락된 내용이 있습니다.</MessageContent>);
    }
  };

  return (
    <StyledButton className="btn-primary btn-first" onClick={() => shoudFireAPI()}>
      {title}
    </StyledButton>
  );
}

RegisterInspection.propTypes = {};
RegisterInspection.defaultProps = {};
