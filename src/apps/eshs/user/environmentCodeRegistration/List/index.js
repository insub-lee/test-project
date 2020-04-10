import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Popconfirm, TreeSelect } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledTreeSelect from 'commonStyled/Form/StyledTreeSelect';

const AntdTable = StyledLineTable(Table);
const AntdInput = StyledInput(Input);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectTree: [],
      selectedIndex: -1,
      selectedCategory: 1950,
      inputCode: '',
      dataSource: [
        {
          status: '',
          code: '',
        },
      ],
    };
  }

  columns = [
    {
      title: '상태',
      dataIndex: 'IS_DELETE',
      key: 'IS_DELETE',
      align: 'center',
      width: 200,
    },
    {
      title: '코드',
      dataIndex: 'CODE_ID',
      key: 'CODE_ID',
      align: 'center',
      width: 200,
    },
    {
      title: '코드명',
      dataIndex: 'NAME_KOR',
      key: 'NAME_KOR',
      render: (text, record, index) => {
        const { handleInputChange, handleAddClick, handleModifyClick, handleDeleteClick, handleResetClick } = this;
        const { inputCode } = this.state;
        if (index === 0) {
          return (
            <div>
              <AntdInput className="ant-input-inline mr5 ant-input-sm" value={inputCode} onChange={handleInputChange} style={{ width: 200 }} />
              <StyledButtonWrapper className="btn-wrap-inline">
                <StyledButton className="btn-primary btn-first btn-sm" onClick={handleAddClick}>
                  추가
                </StyledButton>
                <Popconfirm title="수정하시겠습니까?" onConfirm={handleModifyClick}>
                  <StyledButton className="btn-primary btn-first btn-sm">수정</StyledButton>
                </Popconfirm>
                <Popconfirm title="사용상태를 변경하시겠습니까?" onConfirm={handleDeleteClick}>
                  <StyledButton className="btn-primary btn-first btn-sm btn-light">상태변경</StyledButton>
                </Popconfirm>
                <StyledButton className="btn-primary btn-first btn-sm btn-light" onClick={handleResetClick}>
                  Reset
                </StyledButton>
                <StyledButton className="btn-primary btn-sm btn-light" onClick={() => console.debug('@@@@EXCEL DOWNLOAD@@@@')}>
                  엑셀받기
                </StyledButton>
              </StyledButtonWrapper>
            </div>
          );
        }
        return <div>{text}</div>;
      },
    },
  ];

  componentDidMount() {
    this.getListData();
    this.getCategoryList();
  }

  getCategoryList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'codeCategory',
        type: 'POST',
        url: `/api/admin/v1/common/categoryMapList`,
        params: { PARAM: { NODE_ID: 1949 } },
      },
    ];

    getCallDataHandler(id, apiArr, this.setCategory);
  };

  setCategory = () => {
    const { result } = this.props;
    const category = this.getCategoryMapListAsTree(result.codeCategory.categoryMapList, 1949);
    this.setState({
      selectTree: category,
    });
  };

  getCategoryMapListAsTree = (flatData, rootkey = 0) =>
    getTreeFromFlatData({
      flatData: flatData.map(item => ({
        title: item.NAME_KOR,
        value: item.NODE_ID,
        key: item.NODE_ID,
        parentValue: item.PARENT_NODE_ID,
        selectable: true,
        code: item.CODE,
      })),
      getKey: node => node.key,
      getParentKey: node => node.parentValue,
      rootKey: rootkey,
    });

  commonDataHandler = (key, type, param) => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key,
        type: type.toUpperCase(),
        url: `/api/eshs/v1/common/eshschemicalmaterialcode`,
        params: { PARAM: param },
      },
    ];
    getCallDataHandler(id, apiArr, this.getListData);
  };

  getListData = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const { selectedCategory } = this.state;
    const apiArr = [
      {
        key: 'chemicalMaterialList',
        type: 'GET',
        url: `/api/eshs/v1/common/eshschemicalmaterialcode?CATEGORY=${selectedCategory}`,
      },
    ];
    getCallDataHandler(id, apiArr, this.changeDataSource);
  };

  changeDataSource = () => {
    const { result } = this.props;
    this.setState({
      dataSource: (result.chemicalMaterialList && result.chemicalMaterialList.list && [{}, ...result.chemicalMaterialList.list]) || [],
    });
  };

  handleInputChange = e => {
    this.setState({
      inputCode: e.target.value,
    });
    return e.target.value;
  };

  handleAddClick = () => {
    const { inputCode, selectedCategory } = this.state;
    const data = {
      NAME_KOR: inputCode,
      CATEGORY: selectedCategory,
    };
    this.setState({
      inputCode: '',
      selectedIndex: -1,
    });
    this.commonDataHandler('postData', 'post', data);
  };

  handleModifyClick = () => {
    const { selectedIndex, dataSource, inputCode } = this.state;
    const modifiedRow = Object.assign(dataSource[selectedIndex], { NAME_KOR: inputCode });
    this.commonDataHandler('updateData', 'put', modifiedRow);
    this.setState({
      inputCode: '',
      selectedIndex: -1,
    });
  };

  handleDeleteClick = () => {
    const { selectedIndex, dataSource } = this.state;
    const params = { CODE: dataSource[selectedIndex].CODE, IS_DELETE: dataSource[selectedIndex].IS_DELETE === '사용' ? 'Y' : 'N' };
    this.commonDataHandler('deleteData', 'delete', params);
    this.setState({
      inputCode: '',
      selectedIndex: -1,
    });
  };

  handleResetClick = () => {
    this.setState({
      inputCode: '',
      selectedIndex: -1,
    });
  };

  handleRowClick = (record, index) => ({
    onClick: () => {
      if (index) {
        this.setState({
          inputCode: record.NAME_KOR,
          selectedIndex: index,
        });
      }
    },
  });

  handleSelectChange = value => {
    this.setState(
      {
        selectedCategory: value,
      },
      this.getListData,
    );
  };

  render() {
    const { dataSource, selectTree } = this.state;
    const { columns } = this;
    const dataLength = dataSource.length - 1;
    return (
      <ContentsWrapper>
        <AntdTreeSelect
          treeData={selectTree}
          value={this.state.selectedCategory}
          onChange={this.handleSelectChange}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          className="select-mid"
          dropdownClassName="inner-ant-select-dropdown"
        />
        <AntdTable
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          onRow={this.handleRowClick}
          footer={() => <span>{`총 ${dataLength.toLocaleString()} 건`}</span>}
        />
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.object,
};

List.defaultProps = {
  sagaKey: '',
};

export default List;
