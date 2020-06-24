import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { TreeSelect, Input, Select, Checkbox, Table, DatePicker } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import moment from 'moment';

import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const AntdLineTable = StyledAntdTable(Table);

const { Option } = Select;
const { RangePicker } = DatePicker;

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
      initInterLock: { IS_DEL: 0, IL_KIND_FORM: '', IL_FUNC: '', REQ_GUBUN: '4', FROM_DT: '', TO_DT: '' },
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
          url: `/api/eshs/v1/common/eshsSqQualInterLock?TASK_SEQ=${taskSeq}`,
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
            width: '5%',
            render: (text, record, index) => (
              <Checkbox checked={text === '1'} onChange={e => this.handleOnChange('IS_DEL', e.target.checked ? '1' : '0', index)}></Checkbox>
            ),
          },
          { title: '해제여부', dataIndex: 'IL_KIND', align: 'center', width: '10%' },
          {
            title: () => (
              <span>
                종류/형식
                <span className="add-row" onClick={this.handlePlusTd}>
                  [+1]
                </span>
              </span>
            ),
            dataIndex: 'IL_KIND_FORM',
            width: '15%',
            align: 'center',
            render: (text, record, index) => (
              <TreeSelect
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={(this && this.state && this.state.treeData) || ''}
                value={record.IL_KIND_FORM || ''}
                onChange={value => this.handleOnChange('IL_KIND_FORM', value, index)}
              />
            ),
          },
          {
            title: '세부기능',
            dataIndex: 'IL_FUNC',
            align: 'center',
            width: '30%',
            render: (text, record, index) => (
              <AntdInput
                className="ant-input-inline ant-input-sm input-left"
                defaultValue={record.IL_FUNC || ''}
                onChange={e => this.handleOnChange('IL_FUNC', e.target.value, index)}
              />
            ),
          },
          {
            title: '신청구분',
            dataIndex: 'REQ_GUBUN',
            align: 'center',
            width: '12%',
            render: (text, record, index) => (
              <Select defaultValue={text} style={{ width: '100%' }} onChange={value => this.handleOnChange('REQ_GUBUN', value, index)}>
                <Option value="4">등록</Option>
                <Option value="1">일정기간해제</Option>
                <Option value="2">영구해제</Option>
                <Option value="3">변경해제</Option>
              </Select>
            ),
          },
          {
            title: '해제신청기간',
            dataIndex: 'FROM_DT',
            align: 'center',
            width: '20%',
            render: (text, record, index) =>
              record.REQ_GUBUN === '1' ? (
                <RangePicker
                  defaultValue={text ? [moment(record.FROM_DT), moment(record.TO_DT)] : [null, null]}
                  onChange={(dateType, stringType) => this.handleRangeOnChange(stringType, index)}
                />
              ) : (
                ''
              ),
          },
          {
            title: '승인상태',
            dataIndex: 'QUAL_STATUS_NM',
            align: 'center',
            width: '8%',
          },
        ];

        columns.push(newColumns);
        break;
      }
      case 'VIEW': {
        const newColumns = [
          {
            title: '선택',
            dataIndex: 'IS_DEL',
            align: 'center',
            width: '5%',
            render: text => <span>{text === '1' ? '선택' : ''}</span>,
          },
          { title: '해제여부', dataIndex: 'IS_DEL', align: 'center', width: '10%', render: text => <span>{text === '1' ? '해제' : ''}</span> },
          {
            title: '종류/형식',
            dataIndex: 'FULL_PATH',
            width: '15%',
            align: 'center',
          },
          {
            title: '세부기능',
            dataIndex: 'IL_FUNC',
            align: 'center',
            width: '30%',
          },
          {
            title: '신청구분',
            dataIndex: 'REQ_GUBUN_NM',
            align: 'center',
            width: '12%',
          },
          {
            title: '해제신청기간',
            dataIndex: 'FROM_DT',
            align: 'center',
            width: '20%',
            render: (text, record) => <span>{record.REQ_GUBUN === '1' ? `${text || ''} ~ ${record.TO_DT || ''}` : ''}</span>,
          },
          {
            title: '승인상태',
            dataIndex: 'QUAL_STATUS_NM',
            align: 'center',
            width: '8%',
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
      formData,
      setFormData,
      CONFIG: {
        property: { INTERLOCK_TYPE },
      },
    } = this.props;
    const { initInterLock } = this.state;
    const treeData = (extraApiData && extraApiData.treeData && extraApiData.treeData.categoryMapList) || [];
    const interLockList = (extraApiData && extraApiData.interLockList && extraApiData.interLockList.list) || [];
    if (!(0 in interLockList) && INTERLOCK_TYPE === 'INPUT') {
      interLockList.push(initInterLock);
    }

    const td = getCategoryMapListAsTree(treeData.filter(x => x.USE_YN === 'Y'));
    const categoryData = td.length > 0 ? td[0] : [];
    this.setState({ treeData: categoryData.children });

    setFormData(id, { ...formData, INTERLOCK_TYPE, interLockList });
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

  handleRangeOnChange = (dateArr, index) => {
    const { sagaKey: id, changeFormData, formData } = this.props;
    const interLockList = (formData && formData.interLockList) || [];

    changeFormData(
      id,
      'interLockList',
      interLockList.map((i, seq) =>
        seq === index
          ? {
              ...i,
              FROM_DT: 0 in dateArr ? dateArr[0] : '',
              TO_DT: 1 in dateArr ? dateArr[1] : '',
            }
          : i,
      ),
    );
  };

  handlePlusTd = () => {
    const { sagaKey: id, changeFormData, formData } = this.props;
    const { initInterLock } = this.state;
    const { interLockList } = formData;
    const initInterLockList = [initInterLock];
    changeFormData(id, 'interLockList', interLockList.concat(initInterLockList));
  };

  render() {
    const { formData, sagaKey: id } = this.props;
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
  setFormData: PropTypes.func,
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
