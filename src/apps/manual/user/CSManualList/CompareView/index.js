import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import FroalaEditorView from '../../../components/RichTextEditor/FroalaEditorView';

import Styled from './Styled';

const AntdTable = StyledAntdTable(Table);

const setColumns = columnData => {
  if (columnData.length < 4) {
    for (let i = 0; 4 - columnData.length; i++) {
      columnData.push({ dataIndex: 'noCompareData', title: '비교대상 없음', width: 380 });
    }
  }
  return columnData.map(node =>
    node.dataIndex !== 'ITEM_NAME' ? { ...node, render: (text, record) => <FroalaEditorView model={record[node.dataIndex]} /> } : node,
  );
};

const CompareView = ({ compareList, templetData }) => (
  <Styled>
    <AntdTable
      columns={setColumns(templetData)}
      dataSource={compareList}
      scroll={templetData.length > 4 ? { x: (templetData.length - 1) * 380 + 100 } : false}
      pagination={false}
    />
  </Styled>
);

CompareView.propTypes = {
  compareList: PropTypes.arrayOf(PropTypes.object),
  templetData: PropTypes.object,
};

CompareView.defaultProps = {
  compareList: [],
  templetData: {},
};

export default CompareView;
