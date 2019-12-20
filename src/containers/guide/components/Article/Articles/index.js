import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import JsxParser from 'react-jsx-parser';
import * as Article from './Articles';

class Articles extends PureComponent {
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const { keyUrl } = this.props;
    return <JsxParser components={{ Article }} renderInWrapper={false} jsx={`<Article.${keyUrl}/>`} />;
  }
}

Articles.propTypes = {
  keyUrl: PropTypes.string.isRequired,
};

export default Articles;
