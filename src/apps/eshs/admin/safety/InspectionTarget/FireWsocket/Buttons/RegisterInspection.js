import React, { useState } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import { address } from 'apps/eshs/admin/safety/InspectionTarget/FireWsocket/internal_constants';
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
  handleModalLoading,
}) {
  const shoudFireAPI = () => {
    // 커스텀버튼 : FH (소화전) 에 맞는 폼데이터로 변경
    const { EXTERIOR_YN, DAMAGE_YN } = formData;
    handleModalLoading(true);
    if (EXTERIOR_YN && DAMAGE_YN) {
      const { POSITION_NO, CHIP_NO, REG_USER_ID } = formData;
      request({
        method: 'POST',
        url: `${address.registerInspectionResult}`,
        data: { EXTERIOR_YN, DAMAGE_YN, POSITION_NO, CHIP_NO, REG_USER_ID },
      }).then(({ response }) => {
        if (response?.result === 1) {
          handleModalLoading(false);
          message.success(<MessageContent>점검결과를 등록 하였습니다.</MessageContent>);
          onCloseModalHandler();
        } else {
          handleModalLoading(false);
          message.error(<MessageContent>점검결과 등록에 실패하였습니다.</MessageContent>);
        }
      });
    } else {
      handleModalLoading(false);
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
