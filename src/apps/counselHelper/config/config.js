import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect, Row, Col, Button } from 'antd';

class config extends PureComponent {
  render() {
    const { SHOW_PARENT } = TreeSelect;
    const result = [];
    let tempData = {};
    const { categorie, onCategorieChange, onClick, items } = this.props;

    let first = -1;
    let second = -1;
    categorie.map(query => {
      const LVL = query.get('LVL');
      const BIZGRP_ID = query.get('BIZGRP_ID');

      const NAME_KOR = query.get('NAME_KOR');
      switch (LVL) {
        case 1:
          second = -1;
          first += 1;

          tempData = { title: NAME_KOR, key: BIZGRP_ID, value: BIZGRP_ID, LVL, children: [] };
          result.push(tempData);
          break;
        case 2:
          second += 1;

          tempData = { title: NAME_KOR, key: BIZGRP_ID, value: BIZGRP_ID, children: [] };
          result[first].children.push(tempData);
          break;
        case 3:
          tempData = { title: NAME_KOR, key: BIZGRP_ID, value: BIZGRP_ID, disabled: true };
          result[first].children[second].children.push(tempData);
          break;
        default:
      }
      return result;
    });

    return (
      <Row type="flex">
        <Col span={8}>
          <h2>카테고리 목록</h2>
          <TreeSelect
            treeData={result}
            treeCheckable
            showCheckedStrategy={SHOW_PARENT}
            showSearch={false}
            searchPlaceholder="카테고리를 설정해주세요"
            style={{ width: '200px' }}
            treeDefaultExpandAll
            onChange={onCategorieChange}
            defaultValue={items.data.categorie}
          />
        </Col>
        <Col span={8}>
          <h2>적용하기</h2>
          <Button type="primary" onClick={onClick}>
            적용하기
          </Button>
        </Col>
      </Row>
    );
  }
}
config.propTypes = {
  onCategorieChange: PropTypes.func,
};

export default config;
