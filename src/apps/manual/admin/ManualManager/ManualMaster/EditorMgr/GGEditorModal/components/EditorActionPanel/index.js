import React, { Component } from 'react';
import _ from 'lodash';
import { withPropsAPI } from 'gg-editor';
import { Button, Icon } from 'antd';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

class EditorActionPanel extends Component {
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
    if (!nodes || !edges) {
      message.warning(<MessageContent>추가된 node, edges가 없음</MessageContent>, 3);
      return false;
    }

    /*
      2) nodes에 step 선택 여부 체크
    */
    // const idx = _.findIndex(nodes, n => !n.step);
    // console.log('idx : ', idx);
    // if (idx > -1) {
    //   message.warning(<MessageContent>step 을 선택해 주세요</MessageContent>, 3);
    //   return false;
    // }

    return true;
  };

  convertData = data => {
    const { nodes, edges } = data;
    // const result = _.map(nodes, _.partialRight(_.pick, ['id']), _.partialRight(_.pick, ['NODE_ID']));

    const result = nodes.map(node => ({
      id: node.id,
      nodeId: node.NODE_ID,
      // step: node.step,
      stepType: node.stepType, // GOURP, USER , parallel
      gubun: node.gubun,
      agreeType: node.agreeType,
      appMember: node.appMember,
      appvAuth: node.appvAuth,
      ruleConfig: node.ruleConfig,
      parentId: '0',
      rejectId: '0',
    }));

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
        FLOWCHART_INFO: obj,
        DESIGN_DATA: data,
      };
      this.props.onflowChartSave(result);
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
      <div style={{ padding: '10px', margin: 'auto' }}>
        <Button type="primary" onClick={this.onClickEvent} style={{ marginRight: '10px', width: '100px' }}>
          <Icon type="save" />
          Save
        </Button>
      </div>
    );
  }
}

export default withPropsAPI(EditorActionPanel);
