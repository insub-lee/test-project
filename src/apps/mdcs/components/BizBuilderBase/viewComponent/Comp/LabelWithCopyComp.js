import React from 'react';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import StyledButton from 'apps/mdcs/styled/StyledButton';

const onCopyHandler = (CONFIG, changeFormData, formData, id) => {
  const { copyKey, compKey } = CONFIG.property.OPTION_BUTTON;

  if (formData[copyKey] && formData[copyKey].length > 0) {
    const value = formData[copyKey];
    if (value[0].DETAIL !== ' ' || value[0].DETAIL !== '') {
      changeFormData(id, compKey, value && value.length > 0 && value[0].DETAIL);
      message.success(<MessageContent>복사 되었습니다.</MessageContent>, 3);
    } else {
      message.warning(<MessageContent>설명을 입력하세요.</MessageContent>, 3);
    }
  } else {
    message.warning(<MessageContent>에러가 발생하였습니다. 관리자에게 문의하세요.</MessageContent>, 3);
  }
};

const LabelComp = ({ CONFIG, changeFormData, formData, id, readOnly }) => (
  <React.Fragment>
    <span>{CONFIG.property.NAME_KOR}</span>
    {CONFIG && CONFIG.property && CONFIG.property.OPTION_BUTTON && !readOnly && (
      <StyledButton className="btn-gray btn-xs" onClick={() => onCopyHandler(CONFIG, changeFormData, formData, id)}>
        Copy Description
      </StyledButton>
    )}
  </React.Fragment>
);
export default LabelComp;
