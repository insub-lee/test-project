import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FroalaEditorView from '../../../../components/RichTextEditor/FroalaEditorView';

class QnAList extends Component {
  componentDidMount() {}

  render() {
    const { index, qnaData } = this.props;

    return (
      <div className="qna-data-wrap">
        <div key={index} className="qna-dl">
          <div className="qna-dt">
            <span className="test">Q</span>
            <p>{qnaData.TITLE}</p>
          </div>
          <div className="qna-dd">
            <span>A</span>
            <div className="text-box">
              <FroalaEditorView model={qnaData.ANSWER} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

QnAList.propTypes = {
  index: PropTypes.number,
  qnaData: PropTypes.object,
};

QnAList.defaultProps = {};

export default QnAList;
