import React from 'react';
import { TreeSelect } from 'antd';

import { InputSearch } from 'components/FormStuff/Input';

import TopbarBtnWrap from '../../components/TopbarBtnWrap';
import Styled from './Styled';

const { TreeNode } = TreeSelect;

const renderOptionGrp = (list, widgetId) =>
  list.map(node => {
    let childNode = null;
    if (node.children && node.children.length > 0) {
      childNode = renderOptionGrp(node.children, widgetId);
    } else if (node.ManualList && node.ManualList.length > 0) {
      childNode = renderOption(node.ManualList, widgetId);
    }
    return (
      <TreeNode
        key={`manualSearch_category_select_${widgetId}_${node.CATEGORY_IDX}`}
        value={node.CATEGORY_IDX}
        title={node.CATEGORY_NAME}
        MUAL_NAME={node.CATEGORY_NAME}
        selectable={false}
      >
        {childNode}
      </TreeNode>
    );
  });

const renderOption = (list, widgetId) =>
  list.map(node => (
    <TreeNode
      key={`manualSearch_select_${widgetId}_${node.MUAL_IDX}`}
      value={node.MUAL_IDX}
      MUAL_ORG_IDX={node.MUAL_ORG_IDX}
      MUAL_NAME={node.MUAL_NAME}
      title={node.MUAL_NAME}
    />
  ));

const Topbar = ({ data, tempItemData, setSelectedMualOrgIdx, setIsViewContents, widgetId }) => (
  <Styled>
    <div className="searchInput">
      {/* <InputSearch placeholder="페이지 내 검색" /> */}
      <TreeSelect
        showSearch
        placeholder="페이지 내 검색"
        searchPlaceholder="검색어 입력"
        style={{ width: '300px' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        allowClear
        treeDefaultExpandAll
        treeNodeFilterProp="MUAL_NAME"
        value={null}
        onSelect={(value, node) => {
          // console.debug(value, node.props.MUAL_ORG_IDX);
          setSelectedMualOrgIdx(value, widgetId, node.props.MUAL_ORG_IDX);
          setIsViewContents(true, widgetId);
        }}
      >
        {renderOptionGrp(tempItemData, widgetId)}
      </TreeSelect>
    </div>
    <TopbarBtnWrap data={data} />
  </Styled>
);

export default Topbar;
