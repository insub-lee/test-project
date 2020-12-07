import React from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

const CommunicationMgr = props => {
  let sagaKey = 'CommunicationMgr';
  let inputMetaSeq = 16761;
  let conditional = '';
  switch (props.pageType) {
    case 'HSE': // 환경안전보건
      sagaKey += `${sagaKey}_${props.pageType}`;
      conditional = `AND W.KIND in ('HSE', 'H', 'SE')`;
      inputMetaSeq = props.inputMetaSeq || 16781;
      break;
    case 'FET': // 설비기술팀
      sagaKey += `${sagaKey}_${props.pageType}`;
      conditional = `AND W.KIND = 'FET'`;
      inputMetaSeq = props.inputMetaSeq || 16781;
      break;
    default:
      break;
  }
  return <BizBuilderBase sagaKey={sagaKey} workSeq={16749} viewType="LIST" conditional={conditional} modalInputMetaSeq={inputMetaSeq} />;
};

CommunicationMgr.propTypes = {
  pageType: PropTypes.string,
  inputMetaSeq: PropTypes.number,
};

CommunicationMgr.defaultProps = {
  pageType: '',
  inputMetaSeq: 16761,
};

export default CommunicationMgr;
