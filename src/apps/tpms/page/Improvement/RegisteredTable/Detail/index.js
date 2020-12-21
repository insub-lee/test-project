import React from 'react';
import PropTypes from 'prop-types';

import Spin from '../../../../components/AntdSpinner';
import SignProcessList from '../../SignProcessList';
import FormView from '../../../../components/FormPreview/FormView';

import useHooks from './useHooks';
import useAuth from '../../../../hooks/useAuth';

const Detail = ({ info, usrid, dpcd, dpnm }) => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();
  const { defaultFormData } = useHooks({ info, usrnm: authInfo?.usrNm || '', deptId: authInfo?.deptId || '' });
  return (
    <div>
      <Spin spinning={isAuthLoading}>
        {/* <SignProcessList list={info?.signPrclistInfo} /> */}
        <SignProcessList info={info} />
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input type="hidden" name="task_seq" value={info?.task_seq} />
          {/* <input type="hidden" name="signlineno" value={info?.signlineno} /> */}
          {/* <input type="hidden" name="signno" value={info?.signno} /> */}
          {/* <input type="hidden" name="signno" value={info?.signno} /> */}
          {/* <input type="hidden" name="sysid" value="TPMS" /> */}
          {/* <input type="hidden" name="mnuid" value="TPMS1040" /> */}
          <input type="hidden" name="project_id" value={info?.project_id} />
          <input type="hidden" name="reg_dttm" value={info?.reg_dttm} />
          <input type="hidden" name="project_leader" value={authInfo?.emrNo} />
          <input type="hidden" name="project_type" value={info?.project_type} />
          <input type="hidden" name="project_level" value={info?.project_level} />
          <input type="hidden" name="performance_type" value={info?.performance_type} />
          <input type="hidden" name="project_leader_dept_id" value={authInfo?.deptId || ''} />
          <input type="hidden" name="project_leader_dept_name" value={authInfo?.deptName || ''} />
          <FormView datas={defaultFormData} noBoarder isImprove />
        </form>
      </Spin>
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
