import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';
import { Popconfirm } from 'antd';
import Styled from './Styled';
import Button from '../../../styled/StyledButton';

class View extends Component {
  componentDidMount() {}

  render() {
    console.log('view this.props : ', this.props);
    const { formData, metaList, id, reloadId, workSeq, taskSeq } = this.props;
    const contentMeta = metaList.filter(meta => meta.COMP_FIELD === 'CONTENT');
    // const attachMeta = metaList.filter(meta => meta.COMP_FIELD === 'ATTACH');

    return (
      <Styled className="manual-descriptions-view">
        {/* <Button className="btn-primary" onClick={() => addNotifyBuilder(id, workSeq, taskSeq, 'TITLE', 'CONTENT')}>
          삭제
        </Button> */}
        <Popconfirm
          className="btn-primary"
          title="삭제하시겠습니까?"
          onConfirm={() => this.props.deleteTask(id, reloadId, workSeq, taskSeq, this.props.onDeleteComplete)}
        >
          <a>삭제</a>
        </Popconfirm>
        <Button className="btn-primary" onClick={() => this.props.onChangeMovePageHandler('MODIFY', workSeq, taskSeq)}>
          수정
        </Button>
        <table>
          <tbody>
            {/* <tr>
              <th className="manual-descriptions-item-label manual-descriptions-item-colon" style={{ width: '120px' }}>
                공지알림
              </th>
              <td className="manual-descriptions-item-content" colSpan="3">
                <Button className="btn-primary" onClick={() => addNotifyBuilder(id, workSeq, taskSeq, 'TITLE', 'CONTENT')}>
                  알람보내기
                </Button>
              </td>
            </tr> */}
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
            <tr className="manual-descriptions-row">
              <th className="manual-descriptions-item-label manual-descriptions-item-colon">첨부</th>
              <td className="manual-descriptions-item-content" colSpan="3"></td>
            </tr>
          </tbody>
        </table>
      </Styled>
    );
  }
}

View.propTypes = {
  id: PropTypes.string,
  reloadId: PropTypes.string,
  workSeq: PropTypes.number,
  taskSeq: PropTypes.number,
  formData: PropTypes.object,
  metaList: PropTypes.array,
  addNotifyBuilder: PropTypes.func,
  onChangeMovePageHandler: PropTypes.func,
  deleteTask: PropTypes.func,
  onDeleteComplete: PropTypes.func,
};

export default View;
