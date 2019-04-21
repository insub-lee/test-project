import React from 'react';
import PropTypes from 'prop-types';
import LayoutWrapper from './ArticleUtility/layoutWrapper';
import LayoutContent from './ArticleUtility/layoutContent';
import PageHeader from './ArticleUtility/pageHeader';
import Articles from './Articles';
import './Article.css';

const Article = (props) => {
  let { keyUrl } = props.match.params;
  const { title } = props.match.params;
  console.log(props);
  if (keyUrl === undefined) keyUrl = 'ComponentsMain';
  return (
    <LayoutWrapper>
      <PageHeader title={title} />
      <LayoutContent>
        <Articles keyUrl={keyUrl} />
      </LayoutContent>
    </LayoutWrapper>);
};

Article.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Article;
