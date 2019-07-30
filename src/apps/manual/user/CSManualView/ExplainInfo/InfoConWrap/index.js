import React from 'react';
import PropTypes from 'prop-types';

import Title from '../Title';
import InfoCon from '../InfoCon';
import Styled from './Styled';

const InfoConWrap = ({ componentList }) => (
  <Styled>
    {componentList &&
      componentList.map(item => {
        switch (item.TYPE) {
          case 'index':
            return <Title key={`manualViewIndexComp_title_${item.MUAL_TABCOMP_IDX}`} contents={item.MUAL_COMPVIEWINFO} idx={item.MUAL_TABCOMP_IDX} />;
          case 'editor':
            return <InfoCon key={`manualViewIndexComp_infoCon_${item.MUAL_TABCOMP_IDX}`} contents={item.MUAL_COMPVIEWINFO} />;
          default:
            return '';
        }
      })}
  </Styled>
);

InfoConWrap.propTypes = {
  componentList: PropTypes.array,
};

InfoConWrap.defaultProps = {
  componentList: [],
};

export default InfoConWrap;
