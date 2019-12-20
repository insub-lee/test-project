import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

import { froalaEditorConfig } from 'components/FormStuff/config';
import RichTextEditor from 'components/FormStuff/RichTextEditor';
import Upload from 'components/FormStuff/Upload';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import SignLine from 'apps/Workflow/Admin/SignLine';

class Edit extends Component {
  componentDidMount() {}

  onChangeFormData = (detail, fieldName, compType, contSeq) => {
    const { id, changeFormData } = this.props;
    changeFormData(id, fieldName, detail);
  };

  onTempSave = () => {
    const callback = id => {
      message.success(<MessageContent>임시저장 성공</MessageContent>, 3);
    };
    this.props.tempSaveTask(this.props.id, callback);
  };

  onSave = () => {
    const callback = id => {
      message.success(<MessageContent>등록 성공</MessageContent>, 3);
    };
    this.props.saveTask(this.props.id, '', callback);
  };

  onModify = () => {
    const callback = id => {
      message.success(<MessageContent>수정 성공</MessageContent>, 3);
    };
    this.props.modifyTask(this.props.id, callback);
  };

  render() {
    const { id, metaList, formData, changeFormData, taskSeq } = this.props;

    const contentMeta = metaList.filter(meta => meta.COMP_FIELD === 'CONTENT');
    const attachMeta = metaList.filter(meta => meta.COMP_FIELD === 'ATTACH');

    return (
      <div style={{ width: '90%', margin: '0 auto' }}>
        <br />
        <Input placeholder="TITLE" value={formData.TITLE} onChange={e => changeFormData(id, 'TITLE', e.target.value)} style={{ width: '500px' }} />
        <br />
        <br />
        {/* <Input placeholder="CONTENT" value={formData.CONTENT} onChange={e => changeFormData(id, 'CONTENT', e.target.value)} style={{ width: '500px' }} /> */}
        {contentMeta && contentMeta.length > 0 && formData.hasOwnProperty('CONTENT') && (
          <RichTextEditor
            {...JSON.parse(contentMeta[0].CONFIG).property.property}
            saveTempContents={this.onChangeFormData}
            config={froalaEditorConfig()}
            defaultValue={formData.CONTENT}
          />
        )}
        <br />
        <br />
        {attachMeta && attachMeta.length > 0 && formData.hasOwnProperty('ATTACH') && (
          <Upload
            {...JSON.parse(attachMeta[0].CONFIG).property.property}
            saveTempContents={this.onChangeFormData}
            workSeq={formData.WORK_SEQ}
            taskSeq={formData.TASK_SEQ}
            defaultValue={formData.ATTACH}
          />
        )}
        <br />
        <br />
        <Input value={formData.NUMBER_1566369925874} onChange={e => changeFormData(id, 'NUMBER_1566369925874', e.target.value)} style={{ width: '500px' }} />
        <br />
        <br />
        {taskSeq !== -1 ? (
          <Button onClick={this.onModify} type="primary">
            수정
          </Button>
        ) : (
          <>
            <Button onClick={this.onTempSave} type="primary" style={{ marginRight: '10px' }}>
              임시저장
            </Button>
            <Button onClick={this.onSave} type="primary">
              등록
            </Button>
          </>
        )}
      </div>
    );
  }
}

Edit.propTypes = {
  id: PropTypes.string,
  viewType: PropTypes.string,
  workSeq: PropTypes.number,
  taskSeq: PropTypes.number,
  metaList: PropTypes.array,
  formData: PropTypes.object,
  changeFormData: PropTypes.func,
  getTaskSeq: PropTypes.func,
  tempSaveTask: PropTypes.func,
  saveTask: PropTypes.func,
  modifyTask: PropTypes.func,
  saveTempContents: PropTypes.func,
  getExtraApiData: PropTypes.func,
};

Edit.defaultProps = {
  formData: {
    TITLE: '',
    CONTENT: {
      WORK_SEQ: -1,
      TASK_SEQ: -1,
      CONT_SEQ: -1,
      FIELD_NM: 'CONTENT',
      ORD: 0,
      TYPE: 'rich-text-editor',
      DETAIL: '',
    },
    number_1566369925874: '',
  },
};

export default Edit;
