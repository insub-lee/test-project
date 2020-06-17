import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Select } from 'antd';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';

const AntdModal = StyledAntdModal(Modal);
const AntdTable = StyledAntdTable(Table);
const AntdSelect = StyledSelect(Select);
class ListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      categories: [],
      selectedCategory: 387,
    };
  }

  columns = [
    {
      title: '항목',
      dataIndex: 'CATEGORY_NAME',
      align: 'center',
    },
    {
      title: '연도',
      dataIndex: 'YEAR',
      align: 'center',
    },
    {
      title: '월',
      dataIndex: 'MONTH',
      align: 'center',
    },
    {
      title: '지역',
      children: [
        {
          title: '청주',
          dataIndex: 'CP_VALUE',
          align: 'center',
        },
        {
          title: '구미',
          dataIndex: 'GP_VALUE',
          align: 'center',
        },
      ],
    },
    {
      title: '입력여부',
      align: 'center',
      render: (text, record, index) => (
        <>
          <StyledButton className="btn-primary btn-sm mr5">완료</StyledButton>
          <StyledButton className="btn-primary btn-sm">수정</StyledButton>
        </>
      ),
      width: '15%',
    },
    {
      title: '작성자',
      dataIndex: 'REG_USER_NAME',
      align: 'center',
    },
  ];

  componentDidMount() {
    this.getDataSource();
    this.getCategories();
  }

  getDataSource = () => {
    const { selectedCategory } = this.state;
    const { sagaKey, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'dataSource',
        url: `/api/eshs/v1/common/selectinputroadmap?CATEGORY=${selectedCategory}`,
        type: 'GET',
      },
    ];

    getExtraApiData(sagaKey, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { extraApiData } = this.props;
    this.setState({
      dataSource: (extraApiData.dataSource && extraApiData.dataSource.roadmap) || [],
    });
  };

  getCategories = () => {
    const { sagaKey, getExtraApiData } = this.props;
    const roadMapCategoryMapId = 50;
    const apiArr = [
      {
        key: 'categories',
        url: `/api/admin/v1/common/categoryMap?MAP_ID=${roadMapCategoryMapId}`,
        type: 'GET',
      },
    ];

    getExtraApiData(sagaKey, apiArr, this.setCategories);
  };

  setCategories = () => {
    const { extraApiData } = this.props;
    this.setState({
      categories: (extraApiData.categories && extraApiData.categories.categoryMapList && extraApiData.categories.categoryMapList.slice(1)) || [],
    });
  };

  handleSelectChange = value => {
    this.setState({
      selectedCategory: value,
    });
  };

  handleAddClick = () => {
    console.debug('@@@@ADD@@@@');
  };

  render() {
    const { columns } = this;
    const { handleSelectChange, handleAddClick } = this;
    const { dataSource, categories } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <span className="text-label">항목</span>
              <AntdSelect className="select-mid" defaultValue={387} onChange={value => handleSelectChange(value)} style={{ width: '15%' }}>
                {categories.map(category => (
                  <Select.Option value={category.NODE_ID}>{category.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
            </div>
            <div className="btn-area">
              <StyledButton className="btn-primary btn-sm" onClick={handleAddClick} pagination={{ pageSize: 12 }}>
                항목 추가
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable columns={columns} dataSource={dataSource} />
        </StyledContentsWrapper>
      </>
    );
  }
}

ListPage.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
};

ListPage.defaultProps = {};

export default ListPage;
