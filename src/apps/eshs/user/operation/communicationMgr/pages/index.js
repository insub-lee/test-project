import React from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

const CommunicationMgr = props => {
  let sagaKey = 'CommunicationMgr';
  let conditional = '';
  switch (props.pageType) {
    case 'HSE': // 환경안전보건
      sagaKey += `${sagaKey}_${props.pageType}`;
      conditional = `AND W.KIND in ('HSE', 'H', 'SE')`;
      break;
    case 'FET': // 설비기술팀
      sagaKey += `${sagaKey}_${props.pageType}`;
      conditional = `AND W.KIND = 'FET'`;
      break;
    default:
      break;
  }
  return <BizBuilderBase sagaKey={sagaKey} workSeq={16749} viewType="LIST" conditional={conditional} />;
};

CommunicationMgr.propTypes = {
  pageType: PropTypes.string,
};

CommunicationMgr.defaultProps = {
  pageType: '',
};

export default CommunicationMgr;
