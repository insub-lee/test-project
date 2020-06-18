import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';
import moment from 'moment';

import { Table, Input, Popconfirm, TreeSelect } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledTreeSelect from 'commonStyled/Form/StyledTreeSelect';
import { callBackAfterPost, callBackAfterPut, callBackAfterDelete } from 'apps/eshs/user/environment/chemicalMaterialManagement/input/submitCallbackFunc';

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
      isModified: false,
    };
  }

  columnDefs = [
    { title: '코드', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '', bold: true } } },
    { title: '코드명', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '', bold: true } } },
    { title: '상태', width: { wpx: 100 }, style: { fill: { fgColor: { rgb: 'D6EBFF' } }, font: { sz: '', bold: true } } },
  ];

  fields = [
    { field: 'CODE_ID', style: { font: { sz: '12' } } },
    { field: 'NAME_KOR', style: { font: { sz: '12' } } },
    { field: 'IS_DELETE', style: { font: { sz: '12' } } },
  ];

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
        const { columnDefs, fields } = this;
        const { handleInputChange, handleAddClick, handleModifyClick, handleDeleteClick, handleResetClick } = this;
        const { inputCode, isModified, dataSource } = this.state;
        if (index === 0) {
          return (
            <div>
              <AntdInput className="ant-input-inline mr5 ant-input-sm" value={inputCode} onChange={handleInputChange} style={{ width: 200 }} />
              <StyledButtonWrapper className="btn-wrap-inline">
                <StyledButton className="btn-primary btn-first btn-sm" onClick={handleAddClick}>
                  추가
                </StyledButton>
                <Popconfirm title={isModified ? '수정하시겠습니까?' : '코드를 선택하세요.'} onConfirm={isModified ? handleModifyClick : null}>
                  <StyledButton className="btn-primary btn-first btn-sm">수정</StyledButton>
                </Popconfirm>
                <Popconfirm title={isModified ? '사용상태를 변경하시겠습니까?' : '코드를 선택하세요.'} onConfirm={isModified ? handleDeleteClick : null}>
                  <StyledButton className="btn-primary btn-first btn-sm btn-light">상태변경</StyledButton>
                </Popconfirm>
                <StyledButton className="btn-primary btn-first btn-sm btn-light" onClick={handleResetClick}>
                  Reset
                </StyledButton>
                <ExcelDownloadComp
                  isBuilder={false}
                  fileName={`${moment().format('YYYYMMDD')}_화학물질 코드`}
                  className="testClassName"
                  btnText="엑셀 다운로드"
                  sheetName="화관법(유해)"
                  listData={dataSource}
                  btnSize="btn-sm"
                  fields={fields}
                  columns={columnDefs}
                />
              </StyledButtonWrapper>
            </div>
          );
        }
        return <div>{text}</div>;
      },
    },
  ];

  componentDidMount() {
    this.getAllCodeList();
    this.getListData();
    this.getCategoryList();
  }

  getAllCodeList = () => {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiArr = [
      {
        key: 'allList',
        url: '/api/eshs/v1/common/eshschemicalmaterialcodeall',
        type: 'GET',
      },
    ];

    getCallDataHandler(id, apiArr, this.setAllCodeList);
  };

  setAllCodeList = () => {
    const { result } = this.props;
    const codeList = (result.allList && result.allList.list) || [];
    const categoryList = (result.codeCategory && result.codeCategory.categoryMapList) || [];
    console.debug(codeList, categoryList);
  };

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
    const { sagaKey: id, submitHandlerBySaga } = this.props;
    submitHandlerBySaga(id, type.toUpperCase(), `/api/eshs/v1/common/eshschemicalmaterialcode`, { PARAM: param }, (apiKey, response) =>
      callBackAfterPost(apiKey, response, this.getListData),
    );
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
      isModified: false,
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
      isModified: false,
    });
  };

  handleDeleteClick = () => {
    const { selectedIndex, dataSource } = this.state;
    const params = { CODE_ID: dataSource[selectedIndex].CODE_ID, IS_DELETE: dataSource[selectedIndex].IS_DELETE === '사용' ? 'Y' : 'N' };
    this.commonDataHandler('deleteData', 'delete', params);
    this.setState({
      inputCode: '',
      selectedIndex: -1,
      isModified: false,
    });
  };

  handleResetClick = () => {
    this.setState({
      inputCode: '',
      selectedIndex: -1,
      isModified: false,
    });
  };

  handleRowClick = (record, index) => ({
    onClick: () => {
      if (index) {
        this.setState({
          inputCode: record.NAME_KOR,
          selectedIndex: index,
          isModified: true,
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
        <span className="selSaveWrapper alignLeft">코드 분류</span>
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
  submitHandlerBySaga: PropTypes.func,
};

List.defaultProps = {
  sagaKey: '',
};

export default List;
