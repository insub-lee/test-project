import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Button, Icon, Popconfirm } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';

import Edit from './Edit';
import Styled from './Styled';

const AntdTable = StyledAntdTable(Table);
const ButtonGroup = Button.Group;

class List extends Component {
  componentDidMount() {
    const { id, getCallDataHanlder, apiAry, changeFormData } = this.props;
    changeFormData(id, 'actionType', 'I');
    getCallDataHanlder(id, apiAry);
  }

  onMakeFullPath = (fullPath, nodeKey) => {
    let fullPathName = '';
    const item = fullPath && fullPath.categoryMapList && fullPath.categoryMapList.filter(nodeId => nodeId.NODE_ID === nodeKey);
    item &&
      item.length > 0 &&
      item[0].FULLPATH.split('|')
        .filter(c => c !== '9')
        .forEach(nodeId => {
          const pathinfo = fullPath && fullPath.categoryMapList && fullPath.categoryMapList.filter(obj => obj.NODE_ID === Number(nodeId));
          fullPathName += ` > ${pathinfo && pathinfo.map(path => path.NAME_KOR)}`;
        });
    return fullPathName.substring(0);
  };

  getTableColumns = () => [
    {
      title: '분류체계',
      dataIndex: 'CATEGORYFULLNAMEPATH',
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
        <ButtonGroup>
          <Button type="primary" icon="edit" onClick={() => this.onUpdateDo(record)} />
          <Popconfirm title="삭제하시겠습니끼?" onConfirm={() => this.onRemoveDo(record)}>
            <Button icon="delete" />
          </Popconfirm>
        </ButtonGroup>
      ),
    },
  ];

  onUpdateDo = record => {
    const { id, setFormData } = this.props;
    const nformData = { ...record, APPROVER_ID: record.APPROVER_ID, actionType: 'U' };
    setFormData(id, nformData);
  };

  onComplete = id => {
    const { getCallDataHanlder, apiAry } = this.props;
    getCallDataHanlder(id, apiAry);
  };

  onRemoveDo = record => {
    const { id, submitHadnlerBySaga } = this.props;
    const param = { PARAM: { ...record } };
    submitHadnlerBySaga(id, 'POST', '/api/mdcs/v1/common/DocApproverDelete', param, this.onComplete);
  };

  render() {
    const { result } = this.props;
    const totalData = [];
    result.docApprover &&
      result.docApprover.list &&
      result.docApprover.list.map(item => {
        totalData.push({
          ...item,
          CATEGORYFULLNAMEPATH: this.onMakeFullPath(result.categoryList, item.NODE_ID),
        });
      });

    return (
      <Styled>
        <div className="searchBox">
          <Edit {...this.props} />
        </div>
        <div>
          <AntdTable pagination={false} dataSource={totalData} columns={this.getTableColumns()} />
        </div>
      </Styled>
    );
  }
}

class DocApproverManage extends Component {
  render() {
    return <BizMicroDevBase id="distMgntList" component={List} />;
  }
}

List.propTypes = {
  id: PropTypes.string,
  apiAry: PropTypes.array,
  result: PropTypes.shape({
    docApprover: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  getCallDataHanlder: PropTypes.func,
  submitHadnlerBySaga: PropTypes.func,
  actionType: PropTypes.string,
};

List.defaultProps = {
  id: 'distMgntList',
  apiAry: [
    {
      key: 'docApprover',
      url: '/api/mdcs/v1/common/DocApproverManageList',
      type: 'GET',
      params: {},
    },
    {
      key: 'categoryList',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=1',
      type: 'GET',
      params: {},
    },
    {
      key: 'draftTypes',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=3',
      type: 'GET',
      params: {},
    },
    {
      key: 'dgreeTypes',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=4',
      type: 'GET',
      params: {},
    },
    {
      key: 'appvSteps',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=5',
      type: 'GET',
      params: {},
    },
  ],

  getCallDataHanlder: () => {},
  formData: {},
  setFormData: () => {},
  actionType: 'I',
};

export default DocApproverManage;
