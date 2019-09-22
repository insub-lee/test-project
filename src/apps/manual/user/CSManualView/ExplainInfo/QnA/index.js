import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QnAList from './QnaList';
import StyleQnA from './StyledQna';

class QnA extends Component {
  componentDidMount() {}

  render() {
    const { contents } = this.props;

    const qnaDataList = JSON.parse(contents);

    return (
      <StyleQnA>
        <div className="manual-qna-wrap">
          {qnaDataList.map((data, index) => (
            <QnAList index={index} qnaData={data} />
          ))}
        </div>
      </StyleQnA>
    );
  }
}

QnA.propTypes = {
  contents: PropTypes.object.isRequired,
};

QnA.defaultProps = {};

export default QnA;
