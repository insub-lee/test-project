import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import FroalaEditorView from '../../../components/RichTextEditor/FroalaEditorView';

import Styled from './Styled';

const AntdTable = StyledAntdTable(Table);

const setColumns = columnData =>
  columnData.map(node => (node.dataIndex !== 'ITEM_NAME' ? { ...node, render: (text, record) => <FroalaEditorView model={record[node.dataIndex]} /> } : node));
const CompareView = ({ compareList, templetData }) => (
  <Styled compareCount={compareList.length}>
    <AntdTable columns={setColumns(templetData)} dataSource={compareList} scroll={{ x: compareList.length * 380 + 100 }} pagination={false} />
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
