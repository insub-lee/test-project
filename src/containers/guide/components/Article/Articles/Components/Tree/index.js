import React from 'react';
import * as comp from '../../../ArticleComponents/components';
import ExCreator from '../ExampleCreator';
import * as Ex1 from './Ex1';

const ArticleTree = () => (
  <div>
    <comp.ArticleHead txt="Tree 컴포넌트 가이드 페이지" />
    <comp.ArticleText txt="현재 포탈에서 사용중인 Tree 컴포넌트에 대한 사용방법 및 설명입니다." />
    <ExCreator Ex={Ex1} />
  </div>
);

export default ArticleTree;
