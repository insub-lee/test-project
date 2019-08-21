import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect, Row, Col } from 'antd';

class items extends PureComponent {
  HandleCategorieChange = PRNT_ID => {
    this.props.getDetail(PRNT_ID);

    this.resetKeyword();
  };

  render() {
    const { SHOW_PARENT } = TreeSelect;
    const result = [];
    let tempData = {};
    const { item, onCategorieChange } = this.props;
    let first = -1;
    let second = -1;
    const groupItem = item.map(query => {
      let styled;
      const LVL = query.get('LVL');
      const BIZGRP_ID = query.get('BIZGRP_ID');
      const NAME_KOR = query.get('NAME_KOR');
      switch (LVL) {
        case 1:
          second = -1;
          first += 1;
          styled = { cursor: 'pointer', textIndent: `${LVL}em`, fontWeight: 'bold', fontSize: '20px' };
          tempData = { title: NAME_KOR, key: BIZGRP_ID, value: BIZGRP_ID, LVL, children: [] };
          result.push(tempData);
          break;
        case 2:
          second += 1;
          styled = { cursor: 'pointer', textIndent: `${LVL}em`, fontWeight: 'bold' };
          tempData = { title: NAME_KOR, key: BIZGRP_ID, value: BIZGRP_ID, children: [] };
          result[first].children.push(tempData);
          break;
        case 3:
          styled = { textIndent: `${LVL}em` };
          tempData = { title: NAME_KOR, key: BIZGRP_ID, value: BIZGRP_ID, disabled: true };
          result[first].children[second].children.push(tempData);
          break;
        default:
      }

      return (
        <li style={styled} role="presentation">
          {NAME_KOR}
        </li>
      );
    });

    return (
      <Row type="flex">
        <Col span={8}>
          <ul>{groupItem}</ul>
        </Col>
        <Col span={8}>
          <TreeSelect
            treeData={result}
            onChange={onCategorieChange}
            treeCheckable
            showCheckedStrategy={SHOW_PARENT}
            searchPlaceholder="카테고리를 설정해주세요"
            style={{ width: '200px' }}
            treeDefaultExpandAll
          />
        </Col>
      </Row>
    );
  }
}
items.propTypes = {
  item: PropTypes.object,
  onCategorieChange: PropTypes.func,
};

export default items;
