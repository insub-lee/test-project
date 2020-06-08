import React, { useState } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import { address } from 'apps/eshs/admin/safety/InspectionTarget/FireHydrant/internal_constants';
import { Button } from 'antd';
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
    // 커스텀버튼 : FH (소화전) 에 맞는 폼데이터로 변경
    const { ENCLOSURE_YN, DOOR_YN, OBSTACLE_YN } = formData;
    if (ENCLOSURE_YN && DOOR_YN && OBSTACLE_YN) {
      const { POSITION_NO, CHIP_NO, REG_USER_ID } = formData;
      request({
        method: 'POST',
        url: `${address.registerInspectionResult}`,
        data: { ENCLOSURE_YN, DOOR_YN, OBSTACLE_YN, POSITION_NO, CHIP_NO, REG_USER_ID },
      }).then(({ response }) => {
        if (response?.result === 1) {
          onCloseModalHandler();
        } else {
          alert('error');
        }
      });
    } else {
      alert('one of ENCLOSURE_YN, DOOR_YN, OBSTACLE_YN are empty');
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
