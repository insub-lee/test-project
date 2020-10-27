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
  const {
    isLoading,
    isError,
    formRef,
    dropModalRef,
    defaultFormData,
    actions: { submitForm, openDropModal },
  } = useHooks({ info, usrnm: authInfo?.usrNm || '', dpcd: authInfo?.userRoleInfoList?.[0]?.dpcd || '' });

  return (
    <div>
      <Spin spinning={isAuthLoading || isLoading}>
        <SignProcessList list={info.signPrclistInfo} />
        <form ref={formRef} autoComplete="off" onSubmit={submitForm}>
          <input type="hidden" name="signlineno" value={info.signlineno} />
          <input type="hidden" name="signno" value={info.signno} />
          <input type="hidden" name="docno" value={info.docno} />
          {/* Default System Id */}
          <input type="hidden" name="sysid" value="TPMS" />
          {/* Default SyStem MenuId */}
          <input type="hidden" name="mnuid" value="TPMS1070" />
          <FormView key={authInfo?.userRoleInfoList?.[0]?.dpcd || ''} datas={defaultFormData} noBoarder isImprove />
          <BtnWrap>
            <Button type="submit" color="primary">
              제출하기
            </Button>
            {!info.signPrclistInfo.some(item => item.sign === '완료 반려') && (
              <Button type="button" color="default" onClick={openDropModal}>
                Drop
              </Button>
            )}
          </BtnWrap>
        </form>
      </Spin>
      <DropModal ref={dropModalRef} signlineno={info.signlineno} signno={info.signno} docno={info.docno} sysid="TPMS" mnuid="TPMS1070" callback={callback} />
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
