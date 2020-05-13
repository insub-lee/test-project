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
      initInterLock: { IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '' },
      columns: [],
    };
    this.handleOnChange = debounce(this.handleOnChange, 300);
  }

  componentDidMount() {
    const {
      sagaKey: id,
      getExtraApiData,
      apiArray,
      viewPageData: { taskSeq },
    } = this.props;

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
        property: { INTERLOCK_TYPE, BTN_FLAG },
      },
    } = this.props;

    const columns = [];
    switch (INTERLOCK_TYPE) {
      case 'INPUT': {
        const newColumns = [
          {
            title: '선택',
            dataIndex: 'IS_DEL',
            align: 'center',
            width: '10%',
            render: (text, record, index) => <Checkbox checked={text === '1'} onChange={e => this.handleCheckedOnChange(e.target.checked, index)}></Checkbox>,
          },
          { title: '해제여부', dataIndex: 'IL_KIND', align: 'center', width: '10%' },
          {
            title: () => (
              <span>
                종류/형식
                {BTN_FLAG === 'Y' && (
                  <span className="add-row" onClick={this.handlePlusTd}>
                    [+1]
                  </span>
                )}
              </span>
            ),
            dataIndex: 'IL_KIND_FORM',
            width: '20%',
            align: 'center',
            render: (text, record, index) => {
              if (INTERLOCK_TYPE !== 'VIEW') {
                return (
                  <TreeSelect
                    style={{ width: '100%' }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={(this && this.state && this.state.treeData) || ''}
                    defaultValue={record.IL_KIND_FORM || ''}
                    onChange={value => this.handleOnChange('IL_KIND_FORM', value, index)}
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
            render: (text, record, index) => {
              if (INTERLOCK_TYPE === 'INPUT') {
                return (
                  <AntdInput
                    className="ant-input-inline ant-input-sm input-left"
                    defaultValue={record.IL_FUNC || ''}
                    onChange={e => this.handleOnChange('IL_FUNC', e.target.value, index)}
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
        property: { INTERLOCK_TYPE },
      },
    } = this.props;
    const treeData = (extraApiData && extraApiData.treeData && extraApiData.treeData.categoryMapList) || [];
    const interLockList = (extraApiData && extraApiData.interLockList && extraApiData.interLockList.list) || [];
    if (INTERLOCK_TYPE === 'INPUT') {
      interLockList.push({ IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '' });
    }

    const td = getCategoryMapListAsTree(treeData.filter(x => x.USE_YN === 'Y'));
    const categoryData = td.length > 0 ? td[0] : [];
    this.setState({ treeData: categoryData.children });
    changeFormData(id, 'interLockList', interLockList);
  };

  handleOnChange = (key, value, index) => {
    const { sagaKey: id, changeFormData, formData } = this.props;
    const interLockList = (formData && formData.interLockList) || [];

    changeFormData(
      id,
      'interLockList',
      interLockList.map((i, seq) => (seq === index ? { ...i, [key]: value } : i)),
    );
  };

  handleCheckedOnChange = (value, index) => {
    const { sagaKey: id, changeFormData, formData } = this.props;
    const interLockList = (formData && formData.interLockList) || [];

    if (value) {
      changeFormData(
        id,
        'interLockList',
        interLockList.map((i, seq) => (seq === index ? { ...i, IS_DEL: '1' } : { ...i, IS_DEL: '0' })),
      );
    } else {
      changeFormData(
        id,
        'interLockList',
        interLockList.map(i => ({ ...i, IS_DEL: '0' })),
      );
    }
  };

  handlePlusTd = () => {
    const { sagaKey: id, changeFormData, formData } = this.props;
    const { initInterLock } = this.state;
    const { interLockList } = formData;
    const initInterLockList = [initInterLock];
    changeFormData(id, 'interLockList', interLockList.concat(initInterLockList));
  };

  render() {
    const { CONFIG, formData, sagaKey: id } = this.props;
    const { columns } = this.state;
    const interLockList = (formData && formData.interLockList) || [];
    return (
      <>
        <AntdLineTable
          key={`${id}_interLock`}
          className="tableWrapper"
          columns={columns}
          dataSource={interLockList || []}
          bordered
          scroll={{ y: 270 }}
          pagination={false}
          footer={() => <span>{`${interLockList.length} 건`}</span>}
        />
      </>
    );
  }
}

EshsInterLockComp.propTypes = {
  CONFIG: PropTypes.object,
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
