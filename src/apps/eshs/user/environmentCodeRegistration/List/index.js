import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Popconfirm, TreeSelect } from 'antd';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledInput from 'commonStyled/Form/StyledInput';

import selectTree from './industrialSafetyLawList';

const AntdTable = StyledLineTable(Table);
const AntdInput = StyledInput(Input);
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
      selectedCategory: 'HC',
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
      dataIndex: 'CODE',
      key: 'CODE',
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
              <AntdInput className="ant-input-inline " value={inputCode} onChange={handleInputChange} style={{ width: 200 }} />
              <StyledButtonWrapper className="btn-wrap-inline">
                <StyledButton className="btn-primary btn-first btn-sm" onClick={handleAddClick}>
                  추가
                </StyledButton>
                <Popconfirm title="수정하시겠습니까?" onConfirm={handleModifyClick}>
                  <StyledButton className="btn-primary btn-first btn-sm">수정</StyledButton>
                </Popconfirm>
                <Popconfirm title="삭제하시겠습니까?" onConfirm={handleDeleteClick}>
                  <StyledButton className="btn-primary btn-first btn-sm btn-light">삭제</StyledButton>
                </Popconfirm>
                <StyledButton className="btn-primary btn-sm btn-light" onClick={handleResetClick}>
                  Reset
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
  }

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
        url: `/api/eshs/v1/common/eshschemicalmaterialcode?category=${selectedCategory}`,
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
      CATEGORY: selectedCategory.toUpperCase(),
      CODE_VALUE: selectedCategory.substring(0, 2),
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
    this.commonDataHandler('deleteData', 'delete', { CODE: dataSource[selectedIndex].CODE, IS_DELETE: 'Y' });
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
    const { dataSource } = this.state;
    const { columns } = this;
    const dataLength = dataSource.length - 1;
    return (
      <ContentsWrapper>
        <TreeSelect treeData={selectTree} value={this.state.selectedCategory} treeDefaultExpandAll onChange={this.handleSelectChange} />
        <AntdTable columns={columns} dataSource={dataSource} pagination={false} onRow={this.handleRowClick} />
        <div className="alignCenter">{`총 ${dataLength.toLocaleString()} 건`}</div>
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
