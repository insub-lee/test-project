import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import FroalaEditor from '../../../../../../components/RichTextEditor/FroalaEditor';
import FroalaEditorView from '../../../../../../components/RichTextEditor/FroalaEditorView';
import { froalaEditorConfig } from '../../../../../../components/RichTextEditor/FroalaEditorConfig';

class QnAList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
  }

  setHover = value => {
    this.setState({ isHover: value });
  };

  render() {
    const { setHover } = this;
    const { isHover } = this.state;
    const { item, index, qnaData, qnaDataLength, action, selectedComponentIdx } = this.props;

    if (selectedComponentIdx !== item.MUAL_TABCOMP_IDX) {
      if (isHover === true) {
        setHover(false);
      }
    }

    return (
      <div className="qna-data-wrap">
        <div key={index} className="qna-dl">
          <div className="qna-dt">
            <span className="test">Q</span>
            {isHover ? (
              <p>
                <input
                  type="text"
                  value={qnaData.TITLE}
                  placeholder="질문을 입력해주세요"
                  onChange={e => {
                    action.onChangeTitleModify(qnaData.IDX, e.target.value);
                  }}
                  name="name"
                />
              </p>
            ) : (
              <p onClick={() => setHover(true)}>{qnaData.TITLE}</p> || <p onClick={() => setHover(true)}>질문을 입력해주세요</p>
            )}
            <div className="edit-btn-wrap">
              <Button
                shape="circle"
                type="button"
                className="btn-sm btn-outline-danger"
                onClick={e => {
                  e.stopPropagation();
                  action.onClickRemoveBtn(qnaData.IDX);
                }}
              >
                <Icon type="close" />
              </Button>
            </div>
          </div>
          <div className="qna-dd">
            <span>A</span>
            {isHover ? (
              <FroalaEditor config={froalaEditorConfig} model={qnaData.ANSWER} onModelChange={text => action.onChangeAnswerModify(qnaData.IDX, text)} />
            ) : (
              <div className="text-box" onClick={() => setHover(true)}>
                <FroalaEditorView model={qnaData.ANSWER} />
              </div>
            )}
          </div>
          {qnaDataLength === index + 1 && (
            <div className="btn-wrap">
              <Button
                shape="circle"
                type="button"
                className="btn-primary"
                onClick={() => {
                  action.onClickSaveBtn();
                }}
              >
                <Icon type="plus" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

QnAList.propTypes = {
  index: PropTypes.number,
  qnaData: PropTypes.object,
  qnaDataLength: PropTypes.number,
  action: PropTypes.object,
  selectedYn: PropTypes.bool,
};

QnAList.defaultProps = {
  action: {
    onChangeTitleModify: () => false,
    onChangeAnswerModify: () => false,
    onClickRemoveBtn: () => false,
    onClickSaveBtn: () => false,
  },
  selectedYn: false,
};

export default QnAList;
