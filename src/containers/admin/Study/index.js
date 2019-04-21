import React from 'react';
import { Route } from 'react-router-dom';
import Sample from './Sample';

const Study = () => (
  <div>
    <Route path="/admin/study/sample" component={Sample} />
  </div>
);

export default Study;
