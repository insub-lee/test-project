import React, { Component } from 'react';
import { debounce } from 'lodash';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import StyledButton from 'components/CommonStyled/StyledButton';

const onCopyHandler = (CONFIG, changeFormData, formData, id) => {
  const { optionCopyKey, optionCompKey } = CONFIG.property;
  if (formData[optionCopyKey] !== undefined) {
    const value = formData[optionCopyKey];
    if (value && value.trim()) {
      changeFormData(id, optionCompKey, value);

      message.success(<MessageContent>복사 되었습니다.</MessageContent>, 3);
    } else {
      message.warning(<MessageContent>복사할 내용이 없습니다.</MessageContent>, 3);
    }
  } else {
    message.warning(<MessageContent>에러가 발생하였습니다. 관리자에게 문의하세요.</MessageContent>, 3);
  }
};

const LabelComp = ({ NAME_KOR, CONFIG, changeFormData, formData, sagaKey: id, readOnly, visible }) =>
  visible ? (
    <div className={CONFIG.property.className || ''}>
      <span>{NAME_KOR}</span>
      {CONFIG && CONFIG.property && CONFIG.property.optionCopyKey && CONFIG.property.optionCompKey && !readOnly && (
        <StyledButton className="btn-gray btn-xs" onClick={() => onCopyHandler(CONFIG, changeFormData, formData, id)}>
          Copy Description
        </StyledButton>
      )}
    </div>
  ) : (
    ''
  );
export default LabelComp;
