import React from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

const EshCouncilBoard = props => {
  let sagaKey = 'EshCouncilBoard_';
  let inputMetaSeq = -1;
  let conditional = '';
  switch (props.pageType) {
    case 'A001': // 사업장ESH위원회
      sagaKey += `${sagaKey}_${props.pageType}`;
      conditional = `AND W.BOARD_TYPE in ('A000', 'A001')`;
      inputMetaSeq = props.inputMetaSeq || 16823;
      break;
    case 'A002': // 산업안전보건위원회
      sagaKey += `${sagaKey}_${props.pageType}`;
      conditional = `AND W.BOARD_TYPE in ('A000', 'A002')`;
      inputMetaSeq = props.inputMetaSeq || 16822;
      break;
    case 'A003': // 협력업체위원회
      sagaKey += `${sagaKey}_${props.pageType}`;
      conditional = `AND W.BOARD_TYPE in ('A000', 'A003')`;
      inputMetaSeq = props.inputMetaSeq || 16821;
      break;
    default:
      break;
  }
  return <BizBuilderBase sagaKey={sagaKey} workSeq={16802} viewType="LIST" conditional={conditional} modalInputMetaSeq={inputMetaSeq} />;
};

EshCouncilBoard.propTypes = {
  pageType: PropTypes.string,
  inputMetaSeq: PropTypes.number,
};

EshCouncilBoard.defaultProps = {
  pageType: '',
  inputMetaSeq: -1,
};

export default EshCouncilBoard;
