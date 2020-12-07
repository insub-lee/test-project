import React from 'react';
import PropTypes from 'prop-types';

import FormView from '../../../components/FormPreview/FormView';
import makeContent from '../../../utils/makeContents';
import Button from '../../../components/Button';

export const ReplyBody = ({ formJson = [], content = {}, replyPost, selectedRecord, successCallback }) => {
  const data = makeContent(
    formJson,
    {
      ...content,
      pwd: '',
    },
    false,
  );

  data.forEach(e => {
    if (e.option.name === 'title') {
      e.option.value = `답변:${e.option.value}`;
    } else {
      e.option.value = '';
    }
  });
  data.push({
    seq: formJson.length + 1,
    type: 'select',
    option: {
      label: '상태',
      name: 'status',
      values: [
        { label: '완료', value: '완료' },
        { label: '불가', value: '불가' },
        { label: '조치중', value: '조치중' },
      ],
    },
  });
  return (
    <form
      autoComplete="off"
      onSubmit={e => {
        e.preventDefault();
        replyPost(e.target, selectedRecord).then(({ response, error }) => {
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
  replyPost: PropTypes.func,
  formJson: PropTypes.array,
  content: PropTypes.object,
  selectedRecord: PropTypes.array,
  successCallback: PropTypes.func,
};

ReplyBody.defaultProps = { replyPost: () => {}, formJson: [], content: {}, selectedRecord: [], successCallback: () => {} };
