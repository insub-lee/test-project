import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { Button, TreeSelect, Row, Col, Select, Checkbox, Table, Popconfirm } from 'antd';

import Organization from 'containers/portal/components/Organization';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';

import Styled from './Styled';

const AntdTable = StyledAntdTable(Table);
const { Option } = Select;

const columnInfo = (setSecurityList, securityList, saveSecurityRow, removeSecurityRow) => [
  {
    title: '구분',
    dataIndex: 'ACNT_NAME',
    align: 'center',
  },
  {
    title: '적용대상',
    dataIndex: 'ACCOUNT_NAME',
    key: 'ACCOUNT_ID',
    align: 'center',
  },
  {
    title: '하위상속',
    dataIndex: 'ISINHERITANCE',
    align: 'center',
    render: (text, record) => (
      <Checkbox checked={record.ISINHERITANCE === 'Y'} onChange={e => handdleChangeChackBox(e, record, setSecurityList, securityList, 'ISINHERITANCE')} />
    ),
  },
  {
    title: '조회',
    dataIndex: 'ISREAD',
    align: 'center',
    render: (text, record) => (
      <Checkbox checked={record.ISREAD === 'Y'} onChange={e => handdleChangeChackBox(e, record, setSecurityList, securityList, 'ISREAD')} />
    ),
  },
  {
    title: '입력',
    dataIndex: 'ISCREATE',
    align: 'center',
    render: (text, record) => (
      <Checkbox checked={record.ISCREATE === 'Y'} onChange={e => handdleChangeChackBox(e, record, setSecurityList, securityList, 'ISCREATE')} />
    ),
  },
  {
    title: '수정',
    dataIndex: 'ISUPDATE',
    align: 'center',
    render: (text, record) => (
      <Checkbox checked={record.ISUPDATE === 'Y'} onChange={e => handdleChangeChackBox(e, record, setSecurityList, securityList, 'ISUPDATE')} />
    ),
  },
  {
    title: '삭제',
    dataIndex: 'ISDELETE',
    align: 'center',
    render: (text, record) => (
      <Checkbox checked={record.ISDELETE === 'Y'} onChange={e => handdleChangeChackBox(e, record, setSecurityList, securityList, 'ISDELETE')} />
    ),
  },
  {
    title: '관리',
    dataIndex: 'ISADMIN',
    align: 'center',
    render: (text, record) => (
      <Checkbox checked={record.ISADMIN === 'Y'} onChange={e => handdleChangeChackBox(e, record, setSecurityList, securityList, 'ISADMIN')} />
    ),
  },
  {
    title: '하위적용',
    dataIndex: 'ISADMIN',
    align: 'center',
    render: (text, record) => <Button onClick={() => saveSecurityRow(record, 'Y')}>적용</Button>,
  },
  {
    title: '권한삭제',
    align: 'center',
    render: (text, record) => (
      <Popconfirm title="삭제하시겠습니까? 하위상속한경우 하위권한 일괄 삭제됩니다" onConfirm={() => removeSecurityRow(record)}>
        <Button>Delete</Button>
      </Popconfirm>
    ),
  },
];

const handdleChangeChackBox = (event, record, setSecurityList, securityList, selectKey) => {
  const findIdx = securityList.findIndex(findNode => findNode.ACCOUNT_ID === record.ACCOUNT_ID);
  if (findIdx > -1) {
    const retNode = { ...record };
    const retList = [...securityList];
    retNode[selectKey] = record[selectKey] === 'N' ? 'Y' : 'N';
    retList[findIdx] = retNode;
    setSecurityList(fromJS(retList));
  }
};

const makeTreeSelectData = (list, valueKey, titleKey) => {
  const retList = [...list];
  return retList.map(node => {
    const retNode = { ...node, title: node[titleKey], value: node[valueKey], key: node[valueKey] };
    if (node.children && node.children.length > 0) {
      retNode.children = makeTreeSelectData(node.children, valueKey, titleKey);
    }
    return retNode;
  });
};

const handleSelectData = (acntType, value, node, securityList, categoryIdx, setSecurityList) => {
  const setList = [...securityList];
  if (acntType === 'U') {
    if (securityList.findIndex(findNode => findNode.ACCOUNT_ID === value) === -1) {
      const addNode = {
        ACCOUNT_ID: value,
        ACCOUNT_NAME: node.props.children ? node.props.children.split('(')[0] : '',
        ACNT_NAME: '사용자',
        ACNT_TYPE: acntType,
        GUBUN: 'WMF',
        ISADMIN: 'N',
        ISCREATE: 'N',
        ISDELETE: 'N',
        ISINHERITANCE: 'N',
        ISREAD: 'N',
        ISUPDATE: 'N',
        REGISTEDATE: new Date(),
        SEIDX: -1,
        TARGETKEY: categoryIdx,
        INHERITANCEKEY: categoryIdx,
      };
      setList.push(addNode);

      setSecurityList(fromJS(setList));
    }
  } else {
    let acntName = '';
    switch (acntType) {
      case 'D':
        acntName = '부서';
        break;
      case 'V':
        acntName = '가상그룹';
        break;
      case 'P':
        acntName = '직위';
        break;
      case 'T':
        acntName = '직책';
        break;
      default:
    }
    value.forEach((element, idx) => {
      if (securityList.findIndex(findNode => findNode.ACCOUNT_ID === element) === -1) {
        const addNode = {
          ACCOUNT_ID: element,
          ACCOUNT_NAME: node[idx] || '',
          ACNT_NAME: acntName,
          ACNT_TYPE: acntType,
          GUBUN: 'WMF',
          ISADMIN: 'N',
          ISCREATE: 'N',
          ISDELETE: 'N',
          ISINHERITANCE: 'N',
          ISREAD: 'N',
          ISUPDATE: 'N',
          REGISTEDATE: new Date(),
          SEIDX: -1,
          TARGETKEY: categoryIdx,
          INHERITANCEKEY: categoryIdx,
        };
        setList.push(addNode);
      }
    });
    setSecurityList(fromJS(setList));
  }
};

const SecurityManage = ({
  listDept,
  listGrp,
  listPstn,
  listDuty,
  listUser,
  securityList,
  categoryIdx,
  setSecurityList,
  saveSecurity,
  saveSecurityRow,
  removeSecurityRow,
}) => (
  <Styled>
    <Row>
      <Col span={4}>부서</Col>
      <Col span={8}>
        <TreeSelect
          className="securityTreeSelect"
          treeData={makeTreeSelectData(listDept, 'DEPT_ID', 'NAME_KOR')}
          onChange={(value, node) => handleSelectData('D', value, node, securityList, categoryIdx, setSecurityList)}
          // treeCheckable
          multiple
          showSearch={false}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="select me"
          allowClear
        />
      </Col>
      <Col span={4}>가상그룹</Col>
      <Col span={8}>
        <TreeSelect
          className="securityTreeSelect"
          treeData={makeTreeSelectData(listGrp, 'key', 'NAME_KOR')}
          onChange={(value, node) => handleSelectData('V', value, node, securityList, categoryIdx, setSecurityList)}
          // treeCheckable
          multiple
          showSearch={false}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="select me"
          allowClear
        />
      </Col>
    </Row>
    <Row>
      <Col span={4}>직위</Col>
      <Col span={8}>
        <TreeSelect
          className="securityTreeSelect"
          treeData={makeTreeSelectData(listPstn, 'PSTN_ID', 'NAME_KOR')}
          onChange={(value, node) => handleSelectData('P', value, node, securityList, categoryIdx, setSecurityList)}
          // treeCheckable
          multiple
          showSearch={false}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="select me"
          allowClear
        />
      </Col>
      <Col span={4}>직책</Col>
      <Col span={8}>
        <TreeSelect
          className="securityTreeSelect"
          treeData={makeTreeSelectData(listDuty, 'DUTY_ID', 'NAME_KOR')}
          onChange={(value, node) => handleSelectData('T', value, node, securityList, categoryIdx, setSecurityList)}
          // treeCheckable
          multiple
          showSearch={false}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="select me"
          allowClear
        />
      </Col>
    </Row>
    <Row>
      <Col span={4}>사용자</Col>
      <Col span={20}>
        <Select
          className="securityTreeSelect"
          placeholder="select me"
          allowClear
          onChange={(value, node) => handleSelectData('U', value, node, securityList, categoryIdx, setSecurityList)}
        >
          {listUser &&
            listUser.length > 0 &&
            listUser.map(node => (
              <Option
                key={`securityUserSelect_${node.USER_ID}`}
                value={node.USER_ID}
              >{`${node.NAME_KOR}(${node.EMP_NO} ${node.DEPT_NAME_KOR}/${node.PSTN_NAME_KOR}/${node.DUTY_NAME_KOR})`}</Option>
            ))}
        </Select>
      </Col>
    </Row>
    <Row>
      <Col>
        <AntdTable
          columns={columnInfo(setSecurityList, securityList, saveSecurityRow, removeSecurityRow)}
          dataSource={securityList}
          rowKey={record => record.ACCOUNT_ID}
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <Button onClick={() => saveSecurity()}>Save</Button>
      </Col>
    </Row>

    {/* <Organization
          show={this.state.isOpen}
          userTab
          selectedUsers={[]}
          checkedDept={[]}
          checkedPstn={[]}
          checkedDuty={[]}
          checkedGrp={[]}
          onlyUser
          selectSingleUser
          closeModal={() => console.debug('close!!!')}
          getDataFromOrganization={result => console.debug(result)}
        /> */}
  </Styled>
);

export default SecurityManage;
