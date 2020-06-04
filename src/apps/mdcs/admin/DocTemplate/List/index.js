import React, { Component } from 'react';
import { TreeSelect, Button, Table, Popconfirm, Icon, Input, message } from 'antd';

import { getTreeFromFlatData } from 'react-sortable-tree';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdLineTable = StyledAntdTable(Table);
class List extends Component {
  state = {
    searchText: '',
    actionType: 'I',
    taskSeq: 0,
    categoryNodeId: undefined,
    categoryNodeFullPath: [],
    docTemplateNodeId: undefined,
    docTemplateNodeFullPath: [],
    isValidation: false,
  };

  componentDidMount() {
    const { sagaKey, getCallDataHandler, apiAry } = this.props;
    getCallDataHandler(sagaKey, apiAry);
  }

  onSaveComplete = id => {
    const { getCallDataHandler, apiAry, removeStorageReduxState } = this.props;
    getCallDataHandler(id, apiAry);
    removeStorageReduxState(id, 'formData');
    this.setState({
      searchText: '',
      actionType: 'I',
      taskSeq: 0,
      categoryNodeId: undefined,
      categoryNodeFullPath: [],
      docTemplateNodeId: undefined,
      docTemplateNodeFullPath: [],
      isValidation: false,
    });
  };

  getCategoryMapListAsTree = flatData =>
    getTreeFromFlatData({
      flatData: flatData.map(item => ({
        title: item.NAME_KOR,
        value: item.NODE_ID,
        key: item.NODE_ID,
        parentValue: item.PARENT_NODE_ID,
      })),

      getKey: node => node.key,
      getParentKey: node => node.parentValue,
      rootKey: 0,
    });

  onMakeFullPath = (fullPath, item) => {
    let fullPathName = '';
    item &&
      item.CATEGORYFULLPATH.split('|')
        .filter(c => c !== '9')
        .map(nodeId => {
          const pathinfo = fullPath && fullPath.filter(obj => obj.NODE_ID === Number(nodeId));
          fullPathName += ` > ${pathinfo && pathinfo.map(path => path.NAME_KOR)}`;
        });
    return fullPathName.substring(0);
  };

  onMakeFullCode = (fullPath, item) => {
    let codeFormat = '####-####';
    item &&
      item.CATEGORYFULLPATH.split('|').map(nodeId => {
        const pathinfo = fullPath && fullPath.filter(obj => obj.NODE_ID === Number(nodeId));
        codeFormat = codeFormat.replace('#', pathinfo && pathinfo.map(path => path.CODE)[0]);
      });
    return codeFormat;
  };

  onCategoryTreeChange = categoryNodeId => {
    const { sagaKey, changeFormData, result } = this.props;

    const fidx =
      result.docCategoryTempListExtra &&
      result.docCategoryTempListExtra.docCategoryTempList &&
      result.docCategoryTempListExtra.docCategoryTempList.findIndex(cidx => cidx.CATEGORYNODEID === categoryNodeId);
    if (fidx && fidx !== -1) {
      this.setState({
        actionType: 'U',
      });
    } else {
      this.setState({
        actionType: 'I',
      });
    }
    this.setState(
      {
        categoryNodeId,
      },
      () => changeFormData(sagaKey, 'NODE_ID', categoryNodeId),
    );
  };

  onCategoryExpend = keys => {
    this.setState({
      categoryNodeFullPath: keys,
    });
  };

  onDocTemplateTreeChange = docTemplateNodeId => {
    const { sagaKey, changeFormData } = this.props;
    this.setState(
      {
        docTemplateNodeId,
      },
      () => changeFormData(sagaKey, 'DOC_CODE', docTemplateNodeId),
    );
  };

  onDocTemplateExpend = keys => {
    this.setState({
      docTemplateNodeFullPath: keys,
    });
  };

  onSave = () => {
    const { sagaKey, formData, submitHandlerBySaga } = this.props;
    const { NODE_ID, DOC_CODE } = formData;

    if (NODE_ID !== undefined && DOC_CODE !== '') {
      message.success('success!!', 0.5);
      const apiUrl = '/api/mdcs/v1/common/DocCategoryTemplHandler';
      const submitData = {
        PARAM: {
          formData,
        },
      };
      submitHandlerBySaga(sagaKey, 'POST', apiUrl, submitData, this.onSaveComplete);
    } else {
      message.error('분류체계를 선택해주세요!!', 0.5);
    }
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder="Search "
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm)} icon="search" size="small" style={{ width: 90, marginRight: 8 }}>
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  columns = [
    {
      title: '문서경로',
      dataIndex: 'CATEGORYFULLNAMEPATH',
      key: 'CATEGORYFULLNAMEPATH',
    },
    {
      title: '분류체계명',
      dataIndex: 'CATEGORYNAME',
      key: 'CATEGORYNAME',
      ...this.getColumnSearchProps('CATEGORYNAME'),
    },
    {
      title: '분류체계 코드',
      dataIndex: 'CATEGORYFULLCODEPATH',
      key: 'CATEGORYFULLCODEPATH',
    },
    {
      title: '표준양식명',
      dataIndex: 'DOCTEMPLATENAME',
      key: 'DOCTEMPLATENAME',
      ...this.getColumnSearchProps('DOCTEMPLATENAME'),
    },
    {
      title: '편집',
      dataIndex: 'edit',
      key: 'edit',
      align: 'center',
      render: (text, rowitem) => (
        <a role="button" onClick={e => this.onEditEvent(rowitem)}>
          Edit
        </a>
      ),
    },
    {
      title: '삭제',
      dataIndex: 'delete',
      key: 'delete',
      align: 'center',
      render: (text, rowitem) => (
        <Popconfirm title="삭제하시겠습니끼?" onConfirm={() => this.onDeleteEvent(rowitem)}>
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  onCancel = () => {
    this.setState({
      actionType: 'I',
      categoryNodeId: undefined,
      categoryNodeFullPath: [],
      docTemplateNodeId: undefined,
      docTemplateNodeFullPath: [],
    });
  };

  onEditEvent = rowItem => {
    const { sagaKey, changeFormData } = this.props;
    this.setState(
      {
        actionType: 'U',
        categoryNodeId: rowItem.CATEGORYNODEID,
        categoryNodeFullPath: rowItem.CATEGORYFULLPATH.split('|'),
        docTemplateNodeId: rowItem.DOCTEMPLATENODEID,
        docTemplateNodeFullPath: rowItem.DOCTEMPLATEFULLPATH.split('|'),
      },
      () => {
        changeFormData(sagaKey, 'NODE_ID', rowItem.CATEGORYNODEID);
        changeFormData(sagaKey, 'DOC_CODE', rowItem.DOCTEMPLATENODEID);
      },
    );
  };

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onUpdate = () => {
    const { sagaKey, formData, submitHandlerBySaga } = this.props;
    const { NODE_ID, DOC_CODE } = formData;
    if (NODE_ID !== undefined && DOC_CODE !== '') {
      message.success('success!!', 0.5);
      const apiUrl = '/api/mdcs/v1/common/DocCategoryTemplHandler';
      const submitData = {
        PARAM: {
          formData,
        },
      };

      submitHandlerBySaga(sagaKey, 'PUT', apiUrl, submitData, this.onSaveComplete);
    } else {
      message.error('분류체계를 선택해주세요!!', 0.5);
    }
  };

  onDeleteEvent = rowitem => {
    const { sagaKey, formData, submitHandlerBySaga } = this.props;
    const apiUrl = '/api/mdcs/v1/common/DocCategoryTemplDeleteHandler';
    const submitData = {
      PARAM: {
        formData: {
          NODE_ID: rowitem.CATEGORYNODEID,
        },
      },
    };
    submitHandlerBySaga(sagaKey, 'POST', apiUrl, submitData, this.onSaveComplete);
  };

  render() {
    console.debug('props!!!! : ', this.props);
    const { result } = this.props;
    const { docCategoryTempListExtra, categoryMapInfoExtra, docMapInfoExtra } = result;

    const categoryData = [];
    if (categoryMapInfoExtra && categoryMapInfoExtra.categoryMapList) {
      const source = this.getCategoryMapListAsTree(categoryMapInfoExtra.categoryMapList.filter(x => x.USE_YN === 'Y'));
      source.length > 0 && source[0].children.map(x => categoryData.push(x));
    }

    const docData = [];
    if (docMapInfoExtra && docMapInfoExtra.categoryMapList) {
      const source = this.getCategoryMapListAsTree(docMapInfoExtra.categoryMapList.filter(x => x.USE_YN === 'Y'));
      source.length > 0 && source[0].children.map(x => docData.push(x));
    }

    const totalData = [];
    if (docCategoryTempListExtra && docCategoryTempListExtra.list) {
      docCategoryTempListExtra.list.map(item => {
        totalData.push({
          ...item,
          CATEGORYFULLNAMEPATH: this.onMakeFullPath(categoryMapInfoExtra && categoryMapInfoExtra.categoryMapList, item),
          CATEGORYFULLCODEPATH: this.onMakeFullCode(categoryMapInfoExtra && categoryMapInfoExtra.categoryMapList, item),
        });
      });
    }
    console.debug('docCategoryTempListExtra', docCategoryTempListExtra);
    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> 표준문서 템플릿관리
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          <div className="select-save-wrapper">
            <TreeSelect
              name="code1"
              style={{ width: 300, marginRight: 10 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              allowClear
              placeholder="분류체계를 선택해주세요"
              treeData={categoryData}
              value={this.state.categoryNodeId}
              treeExpandedKeys={this.state.categoryNodeFullPath}
              onChange={this.onCategoryTreeChange}
              onTreeExpand={this.onCategoryExpend}
            />
            <TreeSelect
              name="code2"
              style={{ width: 300, marginRight: 10 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              allowClear
              placeholder="기안양식을 선택해주세요"
              treeData={docData}
              value={this.state.docTemplateNodeId}
              treeExpandedKeys={this.state.docTemplateNodeFullPath}
              onChange={this.onDocTemplateTreeChange}
              onTreeExpand={this.onDocTemplateExpend}
            />
            <StyledButton className="btn-primary btn-sm" style={{ display: this.state.actionType === 'I' ? 'inline' : 'none' }} onClick={this.onSave}>
              저장하기
            </StyledButton>

            <StyledButton
              className="btn-primary btn-sm ml5"
              style={{ display: this.state.actionType === 'I' ? 'none' : 'inline', marginRight: 10 }}
              onClick={this.onUpdate}
            >
              수정
            </StyledButton>
            <StyledButton
              className="btn-light btn-sm ml5"
              onClick={this.onCancel}
              style={{ display: this.state.actionType === 'I' ? 'none' : 'inline', marginRight: 10 }}
            >
              취소
            </StyledButton>
          </div>

          <AntdLineTable rowKey="DT_IDX" pagination={false} columns={this.columns} dataSource={totalData} />
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {};

List.defaultProps = {
  apiAry: [
    {
      key: 'docCategoryTempListExtra',
      url: '/api/mdcs/v1/common/DocCategoryTemplHandler',
      type: 'GET',
      params: {},
    },
    {
      key: 'categoryMapInfoExtra',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=1',
      type: 'GET',
      params: {},
    },
    {
      key: 'docMapInfoExtra',
      url: '/api/admin/v1/common/categoryMapList?MAP_ID=2',
      type: 'GET',
      params: {},
    },
  ],
};

export default List;
// const getCategoryMapListAsTree = flatData =>
//   getTreeFromFlatData({
//     flatData: flatData.map(item => ({
//       title: item.NAME_KOR,
//       value: item.NODE_ID,
//       key: item.NODE_ID,
//       parentValue: item.PARENT_NODE_ID,
//     })),

//     getKey: node => node.key,
//     getParentKey: node => node.parentValue,
//     rootKey: 0,
//   });

// const onMakeFullPath = (fullPath, item) => {
//   let fullPathName = '';
//   item &&
//     item.CATEGORYFULLPATH.split('|')
//       .filter(c => c !== '9')
//       .map(nodeId => {
//         const pathinfo = fullPath && fullPath.filter(obj => obj.NODE_ID === Number(nodeId));
//         fullPathName += ` > ${pathinfo && pathinfo.map(path => path.NAME_KOR)}`;
//       });
//   return fullPathName.substring(0);
// };

// const onMakeFullCode = (fullPath, item) => {
//   let codeFormat = '####-####';
//   item &&
//     item.CATEGORYFULLPATH.split('|').map(nodeId => {
//       const pathinfo = fullPath && fullPath.filter(obj => obj.NODE_ID === Number(nodeId));
//       codeFormat = codeFormat.replace('#', pathinfo && pathinfo.map(path => path.CODE)[0]);
//     });
//   return codeFormat;
// };

// class List extends Component {
//   state = {
//     searchText: '',
//     actionType: 'I',
//     taskSeq: 0,
//     categoryNodeId: undefined,
//     categoryNodeFullPath: [],
//     docTemplateNodeId: undefined,
//     docTemplateNodeFullPath: [],
//     isValidation: false,
//   };

//   handleSearch = (selectedKeys, confirm) => {
//     confirm();
//     this.setState({ searchText: selectedKeys[0] });
//   };

//   handleReset = clearFilters => {
//     clearFilters();
//     this.setState({ searchText: '' });
//   };

//   getColumnSearchProps = dataIndex => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           ref={node => {
//             this.searchInput = node;
//           }}
//           placeholder="Search "
//           value={selectedKeys[0]}
//           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm)} icon="search" size="small" style={{ width: 90, marginRight: 8 }}>
//           Search
//         </Button>
//         <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//           Reset
//         </Button>
//       </div>
//     ),
//     filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
//     onFilter: (value, record) =>
//       record[dataIndex]
//         .toString()
//         .toLowerCase()
//         .includes(value.toLowerCase()),
//     onFilterDropdownVisibleChange: visible => {
//       if (visible) {
//         setTimeout(() => this.searchInput.select());
//       }
//     },
//   });

//   // ##################################
//   // #      Table Search sm.lee
//   // ##################################

//   columns = [
//     {
//       title: '문서경로',
//       dataIndex: 'CATEGORYFULLNAMEPATH',
//       key: 'CATEGORYFULLNAMEPATH',
//     },
//     {
//       title: '분류체계명',
//       dataIndex: 'CATEGORYNAME',
//       key: 'CATEGORYNAME',
//       ...this.getColumnSearchProps('CATEGORYNAME'),
//     },
//     {
//       title: '분류체계 코드',
//       dataIndex: 'CATEGORYFULLCODEPATH',
//       key: 'CATEGORYFULLCODEPATH',
//     },
//     {
//       title: '표준양식명',
//       dataIndex: 'DOCTEMPLATENAME',
//       key: 'DOCTEMPLATENAME',
//       ...this.getColumnSearchProps('DOCTEMPLATENAME'),
//     },
//     {
//       title: '편집',
//       dataIndex: 'edit',
//       key: 'edit',
//       align: 'center',
//       render: (text, rowitem) => (
//         <a role="button" onClick={e => this.onEditEvent(rowitem)}>
//           Edit
//         </a>
//       ),
//     },
//     {
//       title: '삭제',
//       dataIndex: 'delete',
//       key: 'delete',
//       align: 'center',
//       render: (text, rowitem) => (
//         <Popconfirm title="삭제하시겠습니끼?" onConfirm={() => this.onDeleteEvent(rowitem)}>
//           <a>Delete</a>
//         </Popconfirm>
//       ),
//     },
//   ];

//   onEditEvent = rowItem => {
//     this.setState({
//       actionType: 'E',
//       taskSeq: rowItem.TASK_SEQ,
//       categoryNodeId: rowItem.CATEGORYNODEID,
//       categoryNodeFullPath: rowItem.CATEGORYFULLPATH.split('|'),
//       docTemplateNodeId: rowItem.DOCTEMPLATENODEID,
//       docTemplateNodeFullPath: rowItem.DOCTEMPLATEFULLPATH.split('|'),
//     });
//   };

//   onDeleteEvent = rowItem => {
//     const { id, deleteTask } = this.props;
//     deleteTask(id, rowItem.WORK_SEQ, rowItem.TASK_SEQ);
//   };

//   onCategoryTreeChange = categoryNodeId => {
//     const { id, changeFormData } = this.props;
//     this.setState(
//       {
//         categoryNodeId,
//       },
//       () => changeFormData(id, 'NODE_ID', categoryNodeId),
//     );
//   };

//   onCategoryExpend = keys => {
//     this.setState({
//       categoryNodeFullPath: keys,
//     });
//   };

//   onDocTemplateTreeChange = docTemplateNodeId => {
//     const { id, changeFormData } = this.props;
//     this.setState(
//       {
//         docTemplateNodeId,
//       },
//       () => changeFormData(id, 'DOC_CODE', docTemplateNodeId),
//     );
//   };

//   onDocTemplateExpend = keys => {
//     this.setState({
//       docTemplateNodeFullPath: keys,
//     });
//   };

//   onCancel = () => {
//     this.setState({
//       actionType: 'I',
//       taskSeq: 0,
//       categoryNodeId: undefined,
//       categoryNodeFullPath: [],
//       docTemplateNodeId: undefined,
//       docTemplateNodeFullPath: [],
//     });
//   };

//   onSave = () => {
//     const { id, formData, saveTask } = this.props;
//     const { NODE_ID, DOC_CODE } = formData;

//     if (NODE_ID !== undefined && DOC_CODE !== '') {
//       saveTask(id);
//       message.success('success!!', 0.5);
//     } else {
//       message.error('분류체계를 선택해주세요!!', 0.5);
//     }
//   };

//   componentDidMount() {
//     const { id, getExtraApiData, apiArr } = this.props;
//     getExtraApiData(id, apiArr);
//   }

//   render() {
//     const { extraApiData } = this.props;
//     const { docCategoryTempListExtra, categoryMapInfoExtra, docMapInfoExtra } = extraApiData;
//     console.debug('##this.props', this.props);

//     const categoryData = [];
//     if (categoryMapInfoExtra && categoryMapInfoExtra.categoryMapList) {
//       const source = getCategoryMapListAsTree(categoryMapInfoExtra.categoryMapList.filter(x => x.USE_YN === 'Y'));
//       source[0].children.map(x => categoryData.push(x));
//     }

//     const docData = [];
//     if (docMapInfoExtra && docMapInfoExtra.categoryMapList) {
//       const source = getCategoryMapListAsTree(docMapInfoExtra.categoryMapList.filter(x => x.USE_YN === 'Y'));
//       source[0].children.map(x => docData.push(x));
//     }

//     const totalData = [];
//     if (docCategoryTempListExtra && docCategoryTempListExtra.docCategoryTempList) {
//       docCategoryTempListExtra.docCategoryTempList.map(item => {
//         totalData.push({
//           ...item,
//           CATEGORYFULLNAMEPATH: onMakeFullPath(categoryMapInfoExtra && categoryMapInfoExtra.categoryMapList, item),
//           CATEGORYFULLCODEPATH: onMakeFullCode(categoryMapInfoExtra && categoryMapInfoExtra.categoryMapList, item),
//         });
//       });
//     }

//     return (
//       <div style={{ padding: '10px', backgroundColor: 'white' }}>
//         <div style={{ padding: '10px 0' }}>
//           <TreeSelect
//             name="code1"
//             style={{ width: 300, marginRight: 10 }}
//             dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
//             allowClear
//             placeholder="분류체계를 선택해주세요"
//             treeData={categoryData}
//             value={this.state.categoryNodeId}
//             treeExpandedKeys={this.state.categoryNodeFullPath}
//             onChange={this.onCategoryTreeChange}
//             onTreeExpand={this.onCategoryExpend}
//           />
//           <TreeSelect
//             name="code2"
//             style={{ width: 300, marginRight: 10 }}
//             dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
//             allowClear
//             placeholder="기안양식을 선택해주세요"
//             treeData={docData}
//             value={this.state.docTemplateNodeId}
//             treeExpandedKeys={this.state.docTemplateNodeFullPath}
//             onChange={this.onDocTemplateTreeChange}
//             onTreeExpand={this.onDocTemplateExpend}
//           />
//           <Button style={{ display: this.state.actionType === 'I' ? 'inline' : 'none', marginRight: 10 }} onClick={this.onSave}>
//             저장하기
//           </Button>

//           <Button style={{ display: this.state.actionType === 'I' ? 'none' : 'inline', marginRight: 10 }}>수정</Button>
//           <Button onClick={this.onCancel} style={{ display: this.state.actionType === 'I' ? 'none' : 'inline', marginRight: 10 }}>
//             취소
//           </Button>
//         </div>

//         <Table rowKey="TASK_SEQ" pagination={false} columns={this.columns} dataSource={totalData} />
//       </div>
//     );
//   }
// }

// List.propTypes = {
//   workSeq: PropTypes.number,
//   categoryMapId: PropTypes.number,
//   docMapId: PropTypes.number,
//   categoryMapInfo: PropTypes.object,
//   docMapInfo: PropTypes.object,
//   getCategoryMapListBySaga: PropTypes.func,
//   responseData: PropTypes.object,
//   extraRes: PropTypes.object,
// };

// List.defaultProps = {
//   workSeq: 1011,
//   categoryMapId: 3,
//   docMapId: 2,
//   categoryMapInfo: {},
//   getCategoryMapListBySaga: () => false,
// };

// export default List;
