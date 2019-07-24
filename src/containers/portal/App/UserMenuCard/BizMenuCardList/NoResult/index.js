import React from 'react';
import { intlObj } from 'utils/commonUtils';
import messages from './messages';
import NoResultBox from './noResultStyle';
import noResultImage from 'images/bizstore/no-result.png';

const NoResult = () => (
  <NoResultBox>
    <img src={noResultImage} alt={intlObj.get(messages.alarm)} />
    <h4 className="noResultTitle">
      <strong>{intlObj.get(messages.noResult)}</strong>
    </h4>
  </NoResultBox>
);

export default NoResult;
