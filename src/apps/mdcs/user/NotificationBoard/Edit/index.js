import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import RichTextEditor from 'components/FormStuff/RichTextEditor';
import { froalaEditorConfig } from 'components/FormStuff/config';
import Styled from './Styled';
import Button from '../../../styled/StyledButton';

class Edit extends Component {
  componentDidMount() {}

  onChangeFormData = (model, name, compTag, contSeq) => {
    const { id, changeFormData } = this.props;
    changeFormData(id, name, model);
  };

  render() {
    const { id, reloadId, metaList, formData } = this.props;
    const contentMeta = metaList.filter(meta => meta.COMP_FIELD === 'CONTENT');
    const attachMeta = metaList.filter(meta => meta.COMP_FIELD === 'ATTACH');

    return (
      <Styled className="manual-descriptions-view">
        <table>
          <tbody>
            <tr className="manual-descriptions-row">
              <th className="manual-descriptions-item-label manual-descriptions-item-colon" style={{ width: '120px' }}>
                제목
              </th>
              <td className="manual-descriptions-item-content" colSpan="3">
                <Input value={formData.TITLE} onChange={e => this.props.changeFormData(id, 'TITLE', e.target.value)}></Input>
              </td>
            </tr>
            <tr className="manual-descriptions-row">
              <td className="manual-descriptions-item-content" colSpan="4">
                {contentMeta && contentMeta.length > 0 && formData.hasOwnProperty('CONTENT') && (
                  // <RichTextEditor
                  //   {...JSON.parse(contentMeta[0].CONFIG).property.property}
                  //   saveTempContents={this.onChangeFormData}
                  //   value={formData.CONTENT}
                  //   config={froalaEditorConfig()}
                  // />
                  <RichTextEditor
                    {...JSON.parse(contentMeta[0].CONFIG).property.property}
                    saveTempContents={this.onChangeFormData}
                    value={formData.CONTENT}
                    config={froalaEditorConfig()}
                  />
                )}
              </td>
            </tr>
            <tr className="manual-descriptions-row">
              <th className="manual-descriptions-item-label manual-descriptions-item-colon">첨부</th>
              <td className="manual-descriptions-item-content" colSpan="3"></td>
            </tr>
          </tbody>
        </table>
        <div className="list-btn list-top-btn" style={{ padding: '5px' }}>
          <Button type="button" className="btn-primary" style={{ float: 'right' }} onClick={() => this.props.saveTask(id, this.props.onSaveComplete)}>
            글쓰기
          </Button>
          {/* {editMode === 'INSERT' ? (
            <Button type="button" className="btn-primary" style={{ float: 'right' }} onClick={() => this.props.saveTask(id, this.props.onSaveComplete)}>
              글쓰기
            </Button>
          ) : (
            <Button type="button" className="btn-primary" style={{ float: 'right' }} onClick={() => this.props.modifyTask(id, this.props.onModifyComplete)}>
              수정 완료
            </Button>
          )} */}
        </div>
      </Styled>
    );
  }
}
Edit.propTypes = {
  froalaEditorConfig: PropTypes.object,
  changeFormData: PropTypes.func,
  // editMode: PropTypes.string,
  onSaveComplete: PropTypes.func,
  onModifyComplete: PropTypes.func,
};

Edit.defaultProps = {
  froalaEditorConfig: {},
  // editMode: 'INSERT',
};
export default Edit;
