import React, { Component } from 'react';
import { Input, Select, Button, Table, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import Styled from './Styled';

const columns = (id, deleteTask, setModifyData, setFormDataId, changeFormData, deleteCallbackFunc) => [
  {
    title: '분류체계',
    dataIndex: 'FULLPATH_NAME',
    render: (text, record, index) => <button onClick={() => setModifyData(setFormDataId, record, changeFormData)}>{text}</button>,
  },
  {
    title: '기안구분',
    dataIndex: 'DRAFT_NAME',
    align: 'center',
  },
  {
    title: '개정범위',
    dataIndex: 'DEGREE_NAME',
    align: 'center',
  },
  {
    title: '결재구분',
    dataIndex: 'APPROVER_TYPE_NAME',
    align: 'center',
  },
  {
    title: '결재자',
    dataIndex: 'APPROVER_NAME',
    align: 'center',
  },
  {
    title: '사용여부',
    dataIndex: 'USED_YN',
    align: 'center',
    render: text => (text === 1 ? 'Y' : 'N'),
  },
  {
    title: '삭제',
    dataIndex: 'delete',
    align: 'center',
    render: (text, record, index) => (
      <Popconfirm title="삭제하시겠습니끼?" onConfirm={() => deleteTask(id, id, record.WORK_SEQ, record.TASK_SEQ, deleteCallbackFunc)}>
        <a>Delete</a>
      </Popconfirm>
    ),
  },
];

const convertNodeFullName = (list, categoryInfo) => list && list.length > 0 && list.map(node => ({ ...node, FULLPATH_NAME: makeFullPath(categoryInfo, node) }));

const makeFullPath = (categoryInfo, item) => {
  const fullPathItem = categoryInfo.filter(filterNode => filterNode.NODE_ID === item.NODE_ID);
  let fullPathName = '';
  const fullPath = fullPathItem && fullPathItem.length > 0 ? fullPathItem[0].FULLPATH : '';
  fullPath
    .split('|')
    .filter(c => c !== '9')
    .forEach(nodeId => {
      const pathinfo = categoryInfo.filter(obj => obj.NODE_ID === Number(nodeId));
      fullPathName += ` > ${pathinfo.map(path => path.NAME_KOR)}`;
    });
  return fullPathName.substring(0);
};

const setModifyData = (setFormDataId, record, changeFormData) => {
  changeFormData(setFormDataId, 'NODE_ID', record.NODE_ID);
  changeFormData(setFormDataId, 'APPROVER_ID', record.APPROVER_ID);
  changeFormData(setFormDataId, 'DEGREE_FLAG', record.DEGREE_FLAG);
  changeFormData(setFormDataId, 'DRAFT_TYPE', record.DRAFT_TYPE);
  changeFormData(setFormDataId, 'USED_YN', `${record.USED_YN}_modify`);
  changeFormData(setFormDataId, 'APPROVER_TYPE', record.APPROVER_TYPE);
};

class List extends Component {
  componentWillMount() {
    const { getExtraApiData, id, localApiArr } = this.props;
    getExtraApiData(id, localApiArr);
  }

  deleteCallbackFunc = id => {
    const { getExtraApiData, localApiArr, setFormDataId } = this.props;
    getExtraApiData(id, localApiArr);
    getExtraApiData(setFormDataId, localApiArr);
    message.success(<MessageContent>삭제되였습니다.</MessageContent>, 2);
  };

  render() {
    const { extraApiData, id, deleteTask, categoryMapInfo, setFormDataId, changeFormData, formData } = this.props;
    const { deleteCallbackFunc } = this;

    return (
      <Styled>
        <Table
          key={`${id}_Table`}
          columns={columns(id, deleteTask, setModifyData, setFormDataId, changeFormData, deleteCallbackFunc)}
          dataSource={convertNodeFullName(extraApiData.listData && extraApiData.listData.list ? extraApiData.listData.list : [], categoryMapInfo.toJS())}
          rowKey={record => record.TASK_SEQ}
          pagination={false}
        />
      </Styled>
    );
  }
}

List.propTypes = {
  extraRes: PropTypes.object.isRequired,
  metaList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

List.defaultProps = {
  localApiArr: [
    {
      key: 'listData',
      url: '/api/mdcs/v1/common/DocApproverManageList',
      type: 'GET',
      params: {},
    },
    {
      key: 'catetest',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=3',
      type: 'GET',
      params: {},
    },
  ],
};

export default List;
