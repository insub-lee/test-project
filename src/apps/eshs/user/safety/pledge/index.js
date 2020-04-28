import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import Input from './pages/InputPage';
import Modify from './pages/ModifyPage';

/*
    안전지킴이 - 기본정보 - 서약서 등록
*/

class pledge extends Component {
  componentDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="pledge" workSeq={6141} viewType="INPUT" CustomInputPage={Input} CustomModifyPage={Modify} />;
  }
}

export default pledge;
