import React from 'react';
import PropTypes from 'prop-types';

import FormView from '../../components/FormPreview/FormView';
import makeContent from '../../utils/makeContents';
import Button from '../../components/Button';

import { usePost } from '../../hooks/usePost';

export const ReplyBody = ({ formJson = [], content = {}, brdid, selectedRecord, successCallback }) => {
  const {
    action: { ReplyPost },
  } = usePost({ brdid });
  const data = makeContent(formJson, { ...content, pwd: '' }, false);

  data.forEach(e => {
    if (e.option.name === 'title') {
      e.option.value = `답변:${e.option.value}`;
    } else {
      e.option.value = '';
    }
  });

  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        ReplyPost(e.target, selectedRecord).then(({ response, error }) => {
          if (response && !error) {
            const { insertyn } = response;
            if (insertyn) {
              successCallback();
            } else {
              window.alert('답변 작성 실패');
            }
          }
        });
      }}
    >
      <FormView datas={data} noBoarder smallView />
      <div className="ant-modal-footer">
        <Button type="submit" color="primary" size="big">
          답변하기
        </Button>
      </div>
    </form>
  );
};

ReplyBody.propTypes = {
  brdid: PropTypes.string,
  formJson: PropTypes.array,
  content: PropTypes.object,
  selectedRecord: PropTypes.array,
  successCallback: PropTypes.func,
};

ReplyBody.defaultProps = { brdid: '', formJson: [], content: {}, selectedRecord: [], successCallback: () => {} };
