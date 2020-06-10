import React from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import { Button } from 'antd';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { address, VIEW_TYPE, META_SEQ } from 'apps/eshs/admin/safety/InspectionTarget/FireErt/internal_constants';

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
              message.success(<MessageContent>Issue Note를 등록 하였습니다.</MessageContent>);
              onCloseModalHandler();
            } else {
              message.error(<MessageContent>Issue Note 등록에 실패하였습니다.</MessageContent>);
            }
          });
        } else {
          message.error(<MessageContent>REG_DATE is not string type</MessageContent>);
        }
      } else {
        message.error(<MessageContent>Issue 내용을 입력해 주십시오.</MessageContent>);
      }
    } else {
      message.error(<MessageContent>조치/미조치 여부를 선택해 주십시오.</MessageContent>);
    }
  };

  const shoudFireAPI = titleText => {
    if (titleText === '저장') {
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

Add.propTypes = {
  sagaKey: PropTypes.string,
  title: PropTypes.string,
  formData: PropTypes.object,
  viewMetaSeqHandler: PropTypes.func,
  onCloseModalHandler: PropTypes.func,
  modalHandler: PropTypes.func,
};

Add.defaultProps = {};
