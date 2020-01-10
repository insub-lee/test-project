import React, { Component } from 'react';
import _ from 'lodash';
import { withPropsAPI } from 'gg-editor';

class test extends React.Component {
  componentDidMount() {
    const { propsAPI } = this.props;

    console.log(propsAPI);
  }

  isValid = data => {
    console.log('isValid data : ', data);
    const { nodes, edges } = data;
    /*
      1) 추가된 node, edges가 없을 때,
    */
    if (!nodes || !edges) return false;
    /*
      2) nodes에 step 선택 여부 체크
    */
    const idx = _.findIndex(nodes, n => !n.step);
    console.log('idx : ', idx);
    if (idx > -1) return false;

    return true;
  };

  convertData = data => {
    const { nodes, edges } = data;
    const result = _.map(nodes, _.partialRight(_.pick, ['id']));
    console.log('result : ', result);
    edges.forEach(e => {
      // end 일 때, 저장X
      // const endIdx = _.findIndex(result, r => (e.label === 'END' && r.id === e.target));
      // console.log('endIdx : ', endIdx);
      // if (endIdx > -1) {
      //   return;
      // }

      if (e.process === 'approval') {
        // 승인 일 때, target 인 데이터에 parentId = source
        const idx = _.findIndex(result, r => r.id === e.target);
        result[idx].parentId = e.source;
      }
      if (e.process === 'reject') {
        // 거절 일 때, source 인 데이터에 rejectId = target
        const idx = _.findIndex(result, r => r.id === e.source);
        result[idx].rejectId = e.target;
      }
    });
    return result;
  };

  onClickEvent = () => {
    const { propsAPI } = this.props;
    console.log('propsAPI : ', propsAPI);
    // propsAPI.read((data) => {
    //     console.log('data : ',data);
    // });
    const data = propsAPI.save();
    if (this.isValid(data)) {
      /*
        데이터 가공
      */
      const obj = this.convertData(data);
      const result = {
        tree: obj,
        originData: data,
      };
      console.log('onClickEvent result : ', result);
      this.props.onSubmit(result);
    }
  };

  read = () => {
    const { propsAPI } = this.props;
    const { data } = this.state;
    console.log('data : ', data);
    propsAPI.read(data);
  };

  render() {
    return (
      <div>
        <button onClick={this.onClickEvent}>click</button>
        <button onClick={this.read}>read</button>
        <button
          onClick={() => {
            this.setState({ data: undefined });
          }}
        >
          clear
        </button>
      </div>
    );
  }
}

export default withPropsAPI(test);
