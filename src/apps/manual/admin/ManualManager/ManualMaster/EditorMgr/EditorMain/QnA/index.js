import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import FroalaEditor from '../../../../../../components/RichTextEditor/FroalaEditor';
import FroalaEditorView from '../../../../../../components/RichTextEditor/FroalaEditorView';

import { froalaEditorConfig } from '../FroalaEditorConfig';

class QnA extends Component {
  componentDidMount() {}

  render() {
    const { item, selectedComponentIdx, handleChangeCompValue } = this.props;
    return (
      <div className="manualEditorComponent">
        <div className="manualIndexWrapper">
          <div className="manualIndexTitle">
            {selectedComponentIdx === item.MUAL_TABCOMP_IDX ? (
              <Input
                type="text"
                defaultValue={item.MUAL_COMPVIEWINFO}
                placeholder="질문을 입력해주세요"
                onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', e.target.value)}
              />
            ) : (
              item.MUAL_COMPVIEWINFO || '질문을 입력해주세요'
            )}
          </div>
        </div>
        <div className="manualIndexContent">
          {selectedComponentIdx === item.MUAL_TABCOMP_IDX ? (
            <FroalaEditor
              config={froalaEditorConfig}
              model={item.COMP_OPTION.ANSWER}
              onModelChange={text => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.ANSWER', text)}
            />
          ) : (
            <FroalaEditorView model={item.COMP_OPTION.ANSWER} />
          )}
        </div>
      </div>
    );
  }
}

QnA.propTypes = {
  item: PropTypes.object.isRequired,
  selectedComponentIdx: PropTypes.number.isRequired,
  handleChangeCompValue: PropTypes.func.isRequired,
};

export default QnA;
