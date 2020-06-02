import React, { useState } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import StyledButton from 'components/BizBuilder/styled/StyledButton';
import { address } from 'apps/eshs/admin/safety/InspectionTarget/FireHydrant/internal_constants';

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
          modalHandler(true);
        } else {
          alert('error');
        }
      });
    } else {
      alert('one of SAFEPIN_YN, PHARM_YN, FORM_YN, POSITION_YN are empty');
    }
  };

  return (
    <StyledButton className="btn-primary" onClick={() => shoudFireAPI()}>
      {title}
    </StyledButton>
  );
}

RegisterInspection.propTypes = {};
RegisterInspection.defaultProps = {};
