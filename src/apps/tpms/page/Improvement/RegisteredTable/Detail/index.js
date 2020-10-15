import React from 'react';
import PropTypes from 'prop-types';

import SignProcessList from '../../SignProcessList';
import FormView from '../../../../components/FormPreview/FormView';

import useHooks from './useHooks';
import useAuth from '../../../../hooks/useAuth';

const Detail = ({ info, usrid, dpcd, dpnm }) => {
  const { defaultFormData } = useHooks({ info, dpcd: '' });
  return (
    <div>
      <SignProcessList list={info.signPrclistInfo} />
      <form autoComplete="off" onSubmit={e => e.preventDefault()}>
        <input type="hidden" name="docno" value={info.docno} />
        <input type="hidden" name="signlineno" value={info.signlineno} />
        <input type="hidden" name="signno" value={info.signno} />
        <input type="hidden" name="signno" value={info.signno} />
        <input type="hidden" name="sysid" value="TPMS" />
        <input type="hidden" name="mnuid" value="TPMS1040" />
        <input type="hidden" name="PRJ_ID" value={info.PRJ_ID} />
        <input type="hidden" name="insdt" value={info.insdt} />
        <input type="hidden" name="PRJ_LEADER" value={usrid} />
        <input type="hidden" name="PRJ_TYPE" value={info.PRJ_TYPE} />
        <input type="hidden" name="PRJ_LEVEL" value={info.PRJ_LEVEL} />
        <input type="hidden" name="PERFORM_TYPE" value={info.PERFORM_TYPE} />
        <input type="hidden" name="PRJ_LEADER_DEPT_CODE" value={dpcd || ''} />
        <input type="hidden" name="PRJ_LEADER_DEPT_NAME" value={dpnm || ''} />
        <FormView datas={defaultFormData} noBoarder isImprove />
      </form>
    </div>
  );
};

Detail.propTypes = {
  info: PropTypes.object,
  usrid: PropTypes.string,
  dpcd: PropTypes.string,
  dpnm: PropTypes.string,
};

Detail.defaultProps = {
  info: {},
  usrid: PropTypes.string,
  dpcd: PropTypes.string,
  dpnm: PropTypes.string,
};

export default Detail;
