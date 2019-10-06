import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';
import Styled from './Styled';
import Button from '../../../styled/StyledButton';

class View extends Component {
  componentDidMount() {}

  render() {
    const { formData, metaList, id, workSeq, taskSeq, deleteTask, onDeleteComplete, addNotifyBuilder } = this.props;
    const contentMeta = metaList.filter(meta => meta.COMP_FIELD === 'CONTENT');
    // const attachMeta = metaList.filter(meta => meta.COMP_FIELD === 'ATTACH');

    return (
      <Styled className="manual-descriptions-view">
        <table>
          <tbody>
            <tr>
              <th className="manual-descriptions-item-label manual-descriptions-item-colon" style={{ width: '120px' }}>
                공지알림
              </th>
              <td className="manual-descriptions-item-content" colSpan="3">
                <Button className="btn-primary" onClick={() => addNotifyBuilder(id, workSeq, taskSeq, 'TITLE', 'CONTENT')}>
                  알람보내기
                </Button>
              </td>
            </tr>
            <tr>
              <th className="manual-descriptions-item-label manual-descriptions-item-colon" style={{ width: '120px' }}>
                제목
              </th>
              <td className="manual-descriptions-item-content" colSpan="3">
                {formData.TITLE}
              </td>
            </tr>
            <tr>
              <td className="manual-descriptions-item-content" colSpan="4" style={{ minHeight: '300px' }}>
                {contentMeta && contentMeta.length > 0 && formData.hasOwnProperty('CONTENT') && (
                  <FroalaEditorView model={formData.CONTENT.length > 0 ? formData.CONTENT[0].DETAIL : formData.CONTENT} />
                )}
              </td>
            </tr>
            {/* <tr className="manual-descriptions-row">
              <th className="manual-descriptions-item-label manual-descriptions-item-colon">첨부</th>
              <td className="manual-descriptions-item-content" colSpan="3"></td>
            </tr> */}
          </tbody>
        </table>
        <div style={{ textAlign: 'right', paddingTop: '10px' }}>
          <Button className="btn-primary" onClick={() => deleteTask(id, workSeq, taskSeq, onDeleteComplete)}>
            삭제
          </Button>
        </div>
      </Styled>
    );
  }
}

View.propTypes = {
  id: PropTypes.string,
  workSeq: PropTypes.number,
  taskSeq: PropTypes.number,
  formData: PropTypes.object,
  metaList: PropTypes.array,
  deleteTask: PropTypes.func,
  onDeleteComplete: PropTypes.func,
  addNotifyBuilder: PropTypes.func,
};

export default View;
