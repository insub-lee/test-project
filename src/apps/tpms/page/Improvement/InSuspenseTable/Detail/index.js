import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import StyledContentsModal from 'commonStyled/MdcsStyled/Modal/StyledContentsModal';
import JasperViewer from 'components/JasperViewer';
import Spin from '../../../../components/AntdSpinner';
import SignProcessList from '../../SignProcessList';
import FormView from '../../../../components/FormPreview/FormView';
import BtnWrap from '../../BtnWrap';
import Button from '../../../../components/Button';
import useHooks from './useHooks';
import useAuth from '../../../../hooks/useAuth';

const AntdModal = StyledContentsModal(Modal);

const Detail = ({ info, callback }) => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();

  const {
    formRef,
    defaultFormData,
    isLoading,
    actions: { accept, reject },
  } = useHooks({ info, usrnm: authInfo?.usrNm || '', dpcd: authInfo?.deptId || '', callback });

  const [visible, setVisible] = useState(false);
  const { task_seq: taskSeq, step } = info;
  const fullpath = window.location.origin;
  const jasperPath = fullpath.includes('dev') || fullpath.includes('local') ? 'Dev' : 'Prod';
  const jasperSrc = `http://10.100.22.99:4488/jasperserver-pro/rest_v2/reports/public/reports/${jasperPath}/TPMS/complete.html?taskSeq=${taskSeq}&step=${step}&j_username=superuser&j_password=superuser`;
  return (
    <>
      <div>
        <Spin spinning={isAuthLoading || isLoading}>
          <div style={{ textAlign: 'right', padding: '0px 25px 0px 0px' }}>
            <Button type="submit" color="primary" disabled={isAuthLoading} onClick={() => setVisible(true)}>
              리포트 보기
            </Button>
          </div>
          <SignProcessList info={info} />
          <form ref={formRef} autoComplete="off" onSubmit={e => e.preventDefault()}>
            {/* <input type="hidden" name="signlineno" value={info.signlineno} /> */}
            {/* <input type="hidden" name="signno" value={info.signno} /> */}
            <input type="hidden" name="task_seq" value={info?.task_seq} />
            <FormView datas={defaultFormData} noBoarder isImprove />
            <BtnWrap>
              <Button type="button" color="primary" onClick={accept} disabled={isAuthLoading || isLoading}>
                승인하기
              </Button>
              <Button type="button" color="default" onClick={reject} disabled={isAuthLoading || isLoading}>
                반려하기
              </Button>
            </BtnWrap>
          </form>
        </Spin>
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
      </div>
    </>
  );
};

Detail.propTypes = {
  info: PropTypes.object,
  callback: PropTypes.func,
};

Detail.defaultProps = {
  info: {},
  callback: () => {},
};

export default Detail;
