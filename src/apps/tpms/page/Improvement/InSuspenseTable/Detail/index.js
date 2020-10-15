import React from 'react';
import PropTypes from 'prop-types';

import SignProcessList from '../../SignProcessList';
import FormView from '../../../../components/FormPreview/FormView';
import BtnWrap from '../../BtnWrap';
import Button from '../../../../components/Button';
import useHooks from './useHooks';

const Detail = ({ info }) => {
  /* need info, dpCd */
  const {
    formRef,
    defaultFormData,
    actions: { accept, reject },
  } = useHooks({ info, dpcd: '' });
  return (
    <div>
      <SignProcessList list={info.signPrclistInfo} />
      <form ref={formRef} autoComplete="off" onSubmit={e => e.preventDefault()}>
        <input type="hidden" name="signlineno" value={info.signlineno} />
        <input type="hidden" name="signno" value={info.signno} />
        <input type="hidden" name="docno" value={info.docno} />
        <FormView datas={defaultFormData} noBoarder isImprove />
        <BtnWrap>
          <Button type="button" color="primary" onClick={accept}>
            승인하기
          </Button>
          <Button type="button" color="default" onClick={reject}>
            반려하기
          </Button>
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
