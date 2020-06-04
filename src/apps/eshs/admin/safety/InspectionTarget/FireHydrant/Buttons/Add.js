import React, { useState } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import { address } from 'apps/eshs/admin/safety/InspectionTarget/FireHydrant/internal_constants';
import { VIEW_TYPE, META_SEQ } from '../internal_constants';

const StyledButton = StyledAntdButton(Button);
export default function Add({ sagaKey, detail, title, viewMetaSeqHandler, onCloseModalHandler, modalHandler, formData, taskSeq, workSeq, viewPageData }) {
  const insertIssueNote = () => {
    const { ISSUE_YN } = formData;
    if (ISSUE_YN === 'Y' || ISSUE_YN === 'N') {
      const { ISSUE_NOTE } = formData;
      if (typeof ISSUE_NOTE === 'string' && ISSUE_NOTE !== '') {
        const { POSITION_NO, REG_DATE, REG_USER_ID, CHIP_NO } = formData;
        if (typeof REG_DATE === 'string') {
          request({
            method: 'POST',
            url: `${address.registerIssueNote}`,
            data: { ISSUE_YN, POSITION_NO, REG_DATE, ISSUE_NOTE, REG_USER_ID, CHIP_NO },
          }).then(({ response }) => {
            if (response?.result === 1) {
              onCloseModalHandler();
            } else {
              alert('failed to insert Issue_NOTE');
            }
          });
        } else {
          alert('REG_DATE is not string type');
        }
      } else {
        alert('insert ISSUE_NOTE value');
      }
    } else {
      alert('insert ISSUE_YN value');
    }
  };

  const shoudFireAPI = title => {
    if (title === '저장') {
      insertIssueNote();
    } else {
      viewMetaSeqHandler(META_SEQ.INPUT_ISSUE_NOTE, VIEW_TYPE.INPUT);
      modalHandler(true);
    }
  };

  return (
    <StyledButton className="btn-primary btn-first" onClick={() => shoudFireAPI(title)}>
      {title}
    </StyledButton>
  );
}

Add.propTypes = {};
Add.defaultProps = {};
