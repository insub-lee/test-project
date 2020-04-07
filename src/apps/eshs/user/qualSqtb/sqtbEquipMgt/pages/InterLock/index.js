import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { TreeSelect, Input, Button, Checkbox, Table } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';

import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const AntdLineTable = StyledLineTable(Table);

const getCategoryMapListAsTree = flatData =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: item.CHILDREN_CNT === 0,
    })),

    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: 633,
  });

class InterLock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      interLockTable: [],
      initInterLock: { IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '' },
      columns: [
        { title: '삭제', dataIndex: '', align: 'center', width: '10%', render: (text, record) => <Checkbox key={record.INDEX}></Checkbox> },
        { title: '해제취소', dataIndex: '', align: 'center', width: '10%', render: (text, record) => <span></span> },
        {
          title: '종류/형식',
          dataIndex: 'IL_KIND_FORM',
          width: '20%',
          align: 'center',
          render: (text, record) => {
            if (this.props.viewPageData.viewType !== 'VIEW') {
              return (
                <TreeSelect
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={(this && this.state && this.state.treeData) || ''}
                  value={record.IL_KIND_FORM || ''}
                  onChange={value => this.onChangeHandler(value, record.INDEX)}
                />
              );
            }
            return <span>{record.FULL_PATH || ''}</span>;
          },
        },
        {
          title: '세부기능',
          dataIndex: 'IL_FUNC',
          align: 'center',
          width: '60%',
          render: (text, record) => {
            if (this.props.viewPageData.viewType !== 'VIEW') {
              return (
                <AntdInput
                  className="ant-input-inline ant-input-sm input-left"
                  defaultValue={record.IL_FUNC || ''}
                  onChange={e => this.handleInputChange(e, record.INDEX)}
                />
              );
            }

            return <span>{record.IL_FUNC || ''}</span>;
          },
        },
      ],
    };
    this.debounceHandelSetTable = debounce(this.debounceHandelSetTable, 300);
    this.debounceHandelInputChange = debounce(this.debounceHandelInputChange, 300);
  }

  componentDidMount() {
    const { getExtraApiData, id, apiArray, formData, changeFormData } = this.props;
    const taskSeq = (formData && formData.TASK_PREV_SEQ) || (formData && formData.TASK_SEQ) || 0;

    changeFormData(id, 'interLockReload', qaulTaskSeq => {
      getExtraApiData(
        id,
        apiArray.concat({
          key: 'interLockList',
          type: 'GET',
          url: `/api/eshs/v1/common/eshsGetInterLockList/${qaulTaskSeq}`,
        }),
        this.appStart,
      );
    });
    if (taskSeq > 0) {
      getExtraApiData(
        id,
        apiArray.concat({
          key: 'interLockList',
          type: 'GET',
          url: `/api/eshs/v1/common/eshsGetInterLockList/${taskSeq}`,
        }),
        this.appStart,
      );
    } else {
      getExtraApiData(id, apiArray, this.appStart);
    }
  }

  appStart = () => {
    const { extraApiData, id, changeFormData, viewPageData } = this.props;
    const treeData = (extraApiData && extraApiData.treeData && extraApiData.treeData.categoryMapList) || [];
    const interLockList = (extraApiData && extraApiData.interLockList && extraApiData.interLockList.list) || [];
    const viewType = (viewPageData && viewPageData.viewType) || '';
    if (!interLockList.length && viewType !== 'VIEW') {
      interLockList.push({ IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '', INDEX: 0 });
      interLockList.push({ IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '', INDEX: 1 });
      interLockList.push({ IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '', INDEX: 2 });
    }
    const td = getCategoryMapListAsTree(treeData.filter(x => x.USE_YN === 'Y'));
    const categoryData = td.length > 0 ? td[0] : [];
    this.setState({ treeData: categoryData.children });
    changeFormData(id, 'interLockList', interLockList);
    this.debounceHandelSetTable();
  };

  onChangeHandler = (value, key) => {
    const { id, changeFormData, formData } = this.props;
    const { interLockList } = formData;
    changeFormData(
      id,
      'interLockList',
      interLockList.map((i, index) => (index === key ? { ...i, IL_KIND_FORM: value } : i)),
    );
    this.debounceHandelSetTable();
  };

  handleInputChange = (e, key) => {
    const { id, changeFormData, formData } = this.props;
    const { interLockList } = formData;
    changeFormData(
      id,
      'interLockList',
      interLockList.map((i, index) => (index === key ? { ...i, IL_FUNC: e.target.value } : i)),
    );
  };

  handlePlusTd = () => {
    const { id, changeFormData, formData } = this.props;
    const { initInterLock } = this.state;
    const { interLockList } = formData;
    let index = interLockList.length;
    const initInterLockList = [
      { ...initInterLock, INDEX: index++ },
      { ...initInterLock, INDEX: index++ },
      { ...initInterLock, INDEX: index++ },
    ];
    changeFormData(id, 'interLockList', interLockList.concat(initInterLockList));
    this.debounceHandelSetTable();
  };

  debounceHandelSetTable = () => {
    const { formData, sagaKey: id } = this.props;
    const { columns } = this.state;
    const { interLockList } = formData;
    return this.setState({
      interLockTable: [
        <AntdLineTable
          key={`${id}_interLock`}
          className="tableWrapper"
          rowKey={interLockList && interLockList.INDEX}
          columns={columns}
          dataSource={interLockList || []}
          bordered
          pagination={{ pageSize: 10 }}
          footer={() => <span>{`${interLockList.length} 건`}</span>}
        />,
      ],
    });
  };

  handleInputChange = (e, rowIndex) => {
    e.persist();
    this.debounceHandelInputChange(e, rowIndex);
  };

  debounceHandelInputChange = (e, rowIndex) => {
    const { id, changeFormData, formData } = this.props;
    const { interLockList } = formData;
    changeFormData(
      id,
      'interLockList',
      interLockList.map((i, index) => (index === rowIndex ? { ...i, IL_FUNC: e.target.value } : i)),
    );
  };

  render() {
    const { viewPageData, formData } = this.props;
    const { interLockTable } = this.state;
    const viewType = (viewPageData && viewPageData.viewType) || '';
    return (
      <>
        <span>InterLock {viewType !== 'VIEW' && <Button onClick={this.handlePlusTd}>[+3]</Button>}</span>
        {interLockTable}
      </>
    );
  }
}

InterLock.propTypes = {
  id: PropTypes.string,
  viewType: PropTypes.string,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  apiArray: PropTypes.array,
  extraApiData: PropTypes.object,
  viewPageData: PropTypes.object,
  sagaKey: PropTypes.string,
};

InterLock.defaultProps = {
  apiArray: [
    {
      key: 'treeData',
      type: 'POST',
      url: '/api/admin/v1/common/categoryMapList',
      params: { PARAM: { NODE_ID: 1493 } },
    },
  ],
  sagaKey: '',
};
export default InterLock;
