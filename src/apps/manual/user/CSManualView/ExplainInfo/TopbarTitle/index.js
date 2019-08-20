import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const TopbarTitle = ({ mualMaster }) => (
  <Styled>
    <li>
      <dl>
        <dt>· 담당자 :&nbsp;</dt>
        <dd>{mualMaster.USER_INFO}</dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>· 배포일 :&nbsp;</dt>
        <dd>{mualMaster.PUBDATE}</dd>
      </dl>
    </li>
    <li>
      <dl>
        <dt>· 만료일 :&nbsp;</dt>
        <dd>{mualMaster.ENDDATE}</dd>
      </dl>
    </li>
  </Styled>
);

TopbarTitle.propTypes = {
  mualMaster: PropTypes.object,
};

TopbarTitle.defaultProps = {
  mualMaster: {},
};

export default TopbarTitle;
