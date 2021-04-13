import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';
import JasperViewer from 'components/JasperViewer';
import Button from '../../../../components/Button';
import Spin from '../../../../components/AntdSpinner';
import SignProcessList from '../../SignProcessList';
import FormView from '../../../../components/FormPreview/FormView';
import useHooks from './useHooks';
import useAuth from '../../../../hooks/useAuth';

const AntdModal = StyledContentsModal(Modal);

const Detail = ({ info, usrid, dpcd, dpnm }) => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();
  const { defaultFormData } = useHooks({ info, usrnm: authInfo?.usrNm || '', deptId: authInfo?.deptId || '' });
  const [visible, setVisible] = useState(false);
  const { task_seq: taskSeq, step } = info;
  const fullpath = window.location.origin;
  const jasperPath = fullpath.includes('dev') || fullpath.includes('local') ? 'Dev' : 'Prod';
  const jasperSrc = `http://10.100.22.99:4488/jasperserver-pro/rest_v2/reports/public/reports/${jasperPath}/TPMS/complete.html?taskSeq=${taskSeq}&step=${step}&j_username=superuser&j_password=superuser`;
  return (
    <>
      <div>
        <Spin spinning={isAuthLoading}>
          <div style={{ textAlign: 'right', padding: '0px 25px 0px 0px' }}>
            <Button type="submit" color="primary" disabled={isAuthLoading} onClick={() => setVisible(true)}>
              리포트 보기
            </Button>
          </div>
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
      <AntdModal
        className="JasperModal"
        title="리포트 보기"
        visible={visible}
        footer={null}
        width={900}
        initialWidth={900}
        okButtonProps={null}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <JasperViewer title="JasperView" src={jasperSrc} exportFormats="pdf" />
      </AntdModal>
    </>
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
