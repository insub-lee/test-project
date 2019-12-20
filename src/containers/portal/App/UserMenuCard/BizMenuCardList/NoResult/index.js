import React from 'react';
import { intlObj } from 'utils/commonUtils';
import noResultImage from 'images/bizstore/no-result.png';
import messages from './messages';
import NoResultBox from './noResultStyle';

const NoResult = () => (
  <NoResultBox>
    <img src={noResultImage} alt={intlObj.get(messages.alarm)} />
    <h4 className="noResultTitle">
      <strong>{intlObj.get(messages.noResult)}</strong>
    </h4>
  </NoResultBox>
);

export default NoResult;
