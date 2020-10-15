import React from 'react';
import PropTypes from 'prop-types';

import SignProcessList from '../../SignProcessList';
import FormView from '../../../../components/FormPreview/FormView';
import BtnWrap from '../../BtnWrap';
import Button from '../../../../components/Button';
import useHooks from './useHooks';

const Detail = ({ info }) => {
  /* need info, dpCd */
  const { defaultFormData } = useHooks({ info, dpcd: '' });
  return (
    <div>
      <SignProcessList list={info.signPrclistInfo} />
      <form autoComplete="off" onSubmit={e => e.preventDefault()}>
        <input type="hidden" name="signlineno" value={info.signlineno} />
        <input type="hidden" name="signno" value={info.signno} />
        <input type="hidden" name="docno" value={info.docno} />
        {/* Default System Id */}
        <input type="hidden" name="sysid" value="TPMS" />
        {/* Default SyStem MenuId */}
        <input type="hidden" name="mnuid" value="TPMS1070" />
        <FormView datas={defaultFormData} noBoarder isImprove />
        <BtnWrap>
          <Button type="submit" color="primary">
            제출하기
          </Button>
          {!info.signPrclistInfo.some(item => item.sign === '완료 반려') && (
            <Button type="button" color="default" onClick={() => console.debug('drop')}>
              Drop
            </Button>
          )}
        </BtnWrap>
      </form>
    </div>
  );
};

Detail.propTypes = {
  info: PropTypes.object,
};

Detail.defaultProps = {
  info: {},
};

export default Detail;
