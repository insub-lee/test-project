import React from 'react';
import PropTypes from 'prop-types';

import FormView from '../../components/FormPreview/FormView';
import makeContent from '../../utils/makeContents';

export const ReplyBody = ({ formJson = [], content = {}, formRef }) => {
  const temp = { ...content };
  temp.pwd = '';
  const data = makeContent(formJson, temp, false);

  data.forEach(e => {
    if (e.option.name === 'title') {
      e.option.value = `답변:${e.option.value}`;
    }
  });

  return (
    <form ref={formRef} autoComplete="off" onSubmit={e => e.preventDefault()}>
      <FormView datas={data} noBoarder smallView />
    </form>
  );
};

ReplyBody.propTypes = { formJson: PropTypes.array, content: PropTypes.object };

ReplyBody.defaultProps = { formJson: [{}], content: {} };
