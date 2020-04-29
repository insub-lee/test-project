import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { TreeSelect, Input, Button, Checkbox, Table } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const AntdLineTable = StyledAntdTable(Table);

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

class EshsInterLockComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      interLockTable: [],
      initInterLock: { IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '' },
      columns: [],
    };
    this.debounceHandelSetTable = debounce(this.debounceHandelSetTable, 300);
    this.debounceHandelInputChange = debounce(this.debounceHandelInputChange, 300);
  }

  componentDidMount() {
    const { sagaKey: id, getExtraApiData, apiArray, formData, changeFormData } = this.props;
    const taskSeq =
      (formData && formData.CHILDREN_TASK_SEQ) ||
      (formData && formData.TASK_PREV_SEQ) ||
      (formData && formData.EQUIP_TASK_SEQ) ||
      (formData && formData.TASK_SEQ) ||
      0;

    changeFormData(id, 'interLockReload', qaulTaskSeq => {
      getExtraApiData(
        id,
        apiArray.concat({
          key: 'interLockList',
          type: 'GET',
          url: `/api/eshs/v1/common/eshsGetInterLockList/${qaulTaskSeq}`,
        }),
        this.setColumns,
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
        this.setColumns,
      );
    } else {
      getExtraApiData(id, apiArray, this.setColumns);
    }
  }

  setColumns = () => {
    const {
      CONFIG: {
        property: { INTERLOCK_COLUMN, INTERLOCK_TYPE, BTN_FLAG },
      },
    } = this.props;

    const columns = [];
    switch (INTERLOCK_COLUMN) {
      case 'DEFAULT': {
        const newColumns = [
          { title: '삭제', dataIndex: '', align: 'center', width: '10%', render: (text, record) => <Checkbox key={record.INDEX}></Checkbox> },
          { title: '해제취소', dataIndex: '', align: 'center', width: '10%', render: (text, record) => <span></span> },
          {
            title: () => (
              <span>
                종류/형식
                {BTN_FLAG === 'Y' && <span onClick={this.handlePlusTd}>[+3]</span>}
              </span>
            ),
            dataIndex: 'IL_KIND_FORM',
            width: '20%',
            align: 'center',
            render: (text, record) => {
              if (INTERLOCK_TYPE !== 'VIEW') {
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
              if (INTERLOCK_TYPE !== 'VIEW') {
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
        ];

        columns.push(newColumns);
        break;
      }
      default:
        break;
    }
    this.setState({ columns: 0 in columns ? columns[0] : [] }, this.appStart);
  };

  appStart = () => {
    const {
      extraApiData,
      sagaKey: id,
      changeFormData,
      CONFIG: {
        property: { INTERLOCK_COLUMN, INTERLOCK_TYPE, BTN_FLAG, DEFAULT_LIST },
      },
    } = this.props;
    const treeData = (extraApiData && extraApiData.treeData && extraApiData.treeData.categoryMapList) || [];
    const interLockList = (extraApiData && extraApiData.interLockList && extraApiData.interLockList.list) || [];
    if (!interLockList.length && DEFAULT_LIST === 'Y' && INTERLOCK_TYPE !== 'VIEW') {
      interLockList.push({ IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '' });
      interLockList.push({ IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '' });
      interLockList.push({ IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '' });
    }

    const td = getCategoryMapListAsTree(treeData.filter(x => x.USE_YN === 'Y'));
    const categoryData = td.length > 0 ? td[0] : [];
    this.setState({ treeData: categoryData.children });
    changeFormData(
      id,
      'interLockList',
      interLockList.map((i, index) => ({ ...i, INDEX: index })),
    );
    this.debounceHandelSetTable();
  };

  onChangeHandler = (value, key) => {
    const { sagaKey: id, changeFormData, formData } = this.props;
    const { interLockList } = formData;
    changeFormData(
      id,
      'interLockList',
      interLockList.map((i, index) => (index === key ? { ...i, IL_KIND_FORM: value } : i)),
    );
    this.debounceHandelSetTable();
  };

  // handleInputChange = (e, key) => {
  //   const { id, changeFormData, formData } = this.props;
  //   const { interLockList } = formData;
  //   changeFormData(
  //     id,
  //     'interLockList',
  //     interLockList.map((i, index) => (index === key ? { ...i, IL_FUNC: e.target.value } : i)),
  //   );
  // };

  handlePlusTd = () => {
    const { sagaKey: id, changeFormData, formData } = this.props;
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
    const { formData, id } = this.props;
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
          scroll={{ y: 135 }}
          pagination={false}
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
    const { sagaKey: id, changeFormData, formData } = this.props;
    const { interLockList } = formData;
    changeFormData(
      id,
      'interLockList',
      interLockList.map((i, index) => (index === rowIndex ? { ...i, IL_FUNC: e.target.value } : i)),
    );
  };

  render() {
    const { CONFIG } = this.props;
    const { interLockTable } = this.state;
    return <>{interLockTable}</>;
  }
}

EshsInterLockComp.propTypes = {
  CONFIG: PropTypes.object,
  id: PropTypes.string,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
  apiArray: PropTypes.array,
  extraApiData: PropTypes.object,
  viewPageData: PropTypes.object,
  sagaKey: PropTypes.string,
};

EshsInterLockComp.defaultProps = {
  CONFIG: {},
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
export default EshsInterLockComp;
