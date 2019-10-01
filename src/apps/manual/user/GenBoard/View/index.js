import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';
import { froalaEditorConfig } from 'components/FormStuff/config';
import Styled from './Styled';
import Button from '../../../styled/StyledButton';

class View extends Component {
  render() {
    const { formData, metaList } = this.props;
    const contentMeta = metaList.filter(meta => meta.COMP_FIELD === 'CONTENT');
    const attachMeta = metaList.filter(meta => meta.COMP_FIELD === 'ATTACH');
    console.debug('formData', formData);
    return (
      <Styled className="manual-descriptions-view" style={{ display: this.props.visible ? 'inline' : 'none' }}>
        <table>
          <tbody>
            <tr className="manual-descriptions-row">
              <th className="manual-descriptions-item-label manual-descriptions-item-colon" style={{ width: '120px' }}>
                제목
              </th>
              <td className="manual-descriptions-item-content" colSpan="3">
                {formData.TITLE}
              </td>
            </tr>
            <tr className="manual-descriptions-row">
              <td className="manual-descriptions-item-content" colSpan="4">
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

export default View;
