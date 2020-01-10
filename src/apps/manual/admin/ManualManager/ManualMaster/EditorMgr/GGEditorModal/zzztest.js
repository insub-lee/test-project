import React, { Component } from 'react';
import { Button } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
export default class ComponentConfig extends Component {
  componentDidMount() {}

  render() {
    console.log(this.props, '테스ㅡ!!');
    return (
      <>
        <GGEditor>
          <Flow></Flow>
        </GGEditor>
      </>
    );
  }
}
