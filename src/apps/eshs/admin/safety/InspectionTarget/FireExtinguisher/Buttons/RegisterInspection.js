import React, { useState } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';

import StyledButton from 'components/BizBuilder/styled/StyledButton';
import { address } from 'apps/eshs/admin/safety/InspectionTarget/internal_constants';
import { VIEW_TYPE, META_SEQ } from '../../internal_constants';

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
    // viewMetaSeqHandler(META_SEQ.INPUT_INSPECTION, VIEW_TYPE.INPUT);
    const { SAFEPIN_YN, PHARM_YN, FORM_YN, POSITION_YN } = formData;
    if (SAFEPIN_YN && PHARM_YN && FORM_YN && POSITION_YN) {
      const { POSITION_NO, CHIP_NO, REG_USER_ID } = formData;
      request({
        method: 'POST',
        url: `${address.registerInspectionResult}`,
        data: { SAFEPIN_YN, PHARM_YN, FORM_YN, POSITION_YN, POSITION_NO, CHIP_NO, REG_USER_ID },
      }).then(({ response }) => {
        // console.debug('£££ RegisterInspection response : ', response);
        if (response?.result === 1) {
          modalHandler(true);
        } else {
          alert('error');
        }
      });
    } else {
      alert('one of SAFEPIN_YN, PHARM_YN, FORM_YN, POSITION_YN are empty');
    }
    // obj.put("SAFEPIN_YN", temp.get("safepin_yn"));
    //					obj.put("PHARM_YN", temp.get("pharm_yn"));
    //					obj.put("FORM_YN", temp.get("form_yn"));
    //					obj.put("POSITION_YN", temp.get("position_yn"));
  };

  return (
    <StyledButton className="btn-primary" onClick={() => shoudFireAPI()}>
      {title}
    </StyledButton>
  );
}

RegisterInspection.propTypes = {};
RegisterInspection.defaultProps = {};
