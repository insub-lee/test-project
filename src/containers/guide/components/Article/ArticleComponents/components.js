import React from 'react';
import PropTypes from 'prop-types';
import Prism from './prism';
import './prism.css';

const ArticleText = props => (
  <p className="text mb30">{props.txt}</p>
);
const ArticleHead = props => (
  <h2 className="mb30">{props.txt}</h2>
);
const ArticleImg = props => (
  <p><img src={`${props.txt}`} alt="guideimg" /></p>
);
class ArticleCode extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }
  render() {
    return (
      <div className="highlight">
        <pre>
          <code className="language-jsx">
            {this.props.code}
          </code>
        </pre>
      </div>
    );
  }
}

ArticleCode.propTypes = {
  code: PropTypes.string.isRequired,
};
ArticleText.propTypes = {
  txt: PropTypes.string.isRequired,
};
ArticleHead.propTypes = {
  txt: PropTypes.string.isRequired,
};
ArticleImg.propTypes = {
  txt: PropTypes.string.isRequired,
};
export { ArticleText, ArticleHead, ArticleImg, ArticleCode };
