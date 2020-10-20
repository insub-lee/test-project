import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import FormView from '../../components/FormPreview/FormView';
import makeContent from '../../utils/makeContents';

import { usePost } from '../../hooks/usePost';

export const ModifyBody = ({ formJson = [], content = {}, brdid, selectedRecord, successCallback }) => {
  const data = makeContent(formJson, { ...content, pwd: '' }, false);
  const {
    action: { modifyPost },
  } = usePost({ brdid });

  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();

        modifyPost(e.target, selectedRecord).then(({ response, error }) => {
          if (response && !error) {
            const { updateyn, error: errorMsg } = response;
            if (updateyn) {
              successCallback();
            } else {
              window.alert(errorMsg);
            }
          }
        });
      }}
    >
      <FormView datas={data} noBoarder smallView />{' '}
      <div className="ant-modal-footer">
        <Button color="primary" size="big" onClick={() => {}}>
          확인
        </Button>
      </div>
    </form>
  );
};

ModifyBody.propTypes = {
  formJson: PropTypes.array,
  content: PropTypes.object,
  brdid: PropTypes.string,
  selectedRecord: PropTypes.object,
  successCallback: PropTypes.func,
};

ModifyBody.defaultProps = { formJson: [], content: {}, brdid: '', selectedRecord: {}, successCallback: () => {} };
