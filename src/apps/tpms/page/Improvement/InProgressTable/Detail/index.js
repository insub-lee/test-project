import React from 'react';
import PropTypes from 'prop-types';

import Spin from '../../../../components/AntdSpinner';
import SignProcessList from '../../SignProcessList';
import FormView from '../../../../components/FormPreview/FormView';
import BtnWrap from '../../BtnWrap';
import Button from '../../../../components/Button';
import DropModal from '../../../../components/BuiltModals/DropModal';

import useHooks from './useHooks';
import useAuth from '../../../../hooks/useAuth';

const Detail = ({ info, callback }) => {
  const { authInfo, isError: isAuthError, isLoading: isAuthLoading } = useAuth();

  /* need info, dpCd */
  const {
    isLoading,
    isError,
    defaultFormData,
    dropModalRef,
    actions: { submitForm, openDropModal },
  } = useHooks({ info, usrnm: authInfo?.usrNm || '', dpcd: authInfo?.userRoleInfoList?.[0]?.dpcd || '' });
  return (
    <div>
      <Spin spinning={isAuthLoading || isLoading}>
        <SignProcessList list={info.signPrclistInfo} />
        <form autoComplete="off" onSubmit={submitForm}>
          <input type="hidden" name="signlineno" value={info.signlineno} />
          <input type="hidden" name="signno" value={info.signno} />
          <input type="hidden" name="docno" value={info.docno} />
          {/* Default System Id */}
          <input type="hidden" name="sysid" value="TPMS" />
          {/* Default SyStem MenuId */}
          <input type="hidden" name="mnuid" value="TPMS1060" />
          <FormView datas={defaultFormData} noBoarder isImprove />
          <BtnWrap>
            <Button type="submit" color="primary">
              저장하기
            </Button>
            <Button type="button" color="default" onClick={openDropModal}>
              DROP
            </Button>
          </BtnWrap>
        </form>
      </Spin>
      <DropModal
        ref={dropModalRef}
        signlineno={info.signlineno}
        signno={info.signno}
        docno={info.docno}
        phase={info.phase}
        sysid="TPMS"
        mnuid="TPMS1060"
        callback={callback}
      />
    </div>
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
