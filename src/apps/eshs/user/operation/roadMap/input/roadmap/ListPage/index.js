import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Table, Modal, Select, InputNumber, Popconfirm } from 'antd';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledInputNumber from 'components/BizBuilder/styled/Form/StyledInputNumber';
import { callBackAfterPost, callBackAfterPut } from 'apps/eshs/user/environment/chemicalMaterialManagement/input/submitCallbackFunc';

const AntdInputNumber = StyledInputNumber(InputNumber);
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
      modalVisible: false,
      requestValue: {},
      selectedYear: Number(moment().format('YYYY')),
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
      render: (text, record) =>
        record.IS_CONFIRMED === 'Y' ? (
          <span>입력완료</span>
        ) : (
          <>
            <Popconfirm title="완료하시겠습니까?" onConfirm={() => this.handleConfirmClick(record)} onCancel={null}>
              <StyledButton className="btn-primary btn-sm mr5">완료</StyledButton>
            </Popconfirm>
            <StyledButton className="btn-primary btn-sm" onClick={() => this.handleRowClick(record)}>
              수정
            </StyledButton>
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
    this.createYearList();
  }

  getDataSource = () => {
    const { selectedCategory, selectedYear } = this.state;
    const { sagaKey, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'dataSource',
        url: `/api/eshs/v1/common/selectinputroadmap?CATEGORY=${selectedCategory}&CHK_DATE=${selectedYear}`,
        type: 'GET',
      },
    ];

    getExtraApiData(sagaKey, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { extraApiData } = this.props;
    this.setState(() => {
      const dataSource = (extraApiData.dataSource && extraApiData.dataSource.roadmap) || [];
      return {
        dataSource: dataSource || [],
        nextDate: (dataSource[0] && dataSource[0].CHK_DATE && moment(dataSource[0].CHK_DATE).add(1, 'month')) || moment(),
      };
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

  handleSelectChange = (key, value) => {
    this.setState(
      {
        [key]: value,
      },
      this.getDataSource,
    );
  };

  handleAddClick = () => {
    this.setState({ modalVisible: true });
  };

  createYearList = () => {
    const initYear = moment()
      .subtract(5, 'year')
      .format('YYYY');
    const endYear = moment().format('YYYY');
    const yearList = [];
    for (let i = Number(initYear); i <= Number(endYear) + 3; i += 1) {
      yearList.push(i);
    }

    return yearList;
  };

  handleModalClose = () => {
    this.setState({
      modalVisible: false,
      requestValue: {},
      isModified: false,
    });
  };

  handleSaveClick = () => {
    const { requestValue, selectedCategory } = this.state;
    const { sagaKey, submitExtraHandler, profile } = this.props;

    const submitCallbackFunc = () => {
      this.getDataSource();
      this.handleModalClose();
    };

    this.setState(
      prevState => ({
        requestValue: Object.assign(prevState.requestValue, {
          CHK_DATE: moment(prevState.nextDate).unix(),
          REG_USER_ID: profile.USER_ID,
          REG_USER_NAME: profile.NAME_KOR,
          UPD_USER_ID: profile.USER_ID,
          UPD_USER_NAME: profile.NAME_KOR,
          CATEGORY: selectedCategory,
        }),
      }),
      () =>
        submitExtraHandler(sagaKey, 'POST', `/api/eshs/v1/common/selectinputroadmap`, requestValue, (id, response) =>
          callBackAfterPost(id, response, submitCallbackFunc),
        ),
    );
  };

  handleInputChange = (key, value) => {
    console.debug(this.state.dataSource, { [key]: value });
    this.setState(prevState => ({ requestValue: Object.assign(prevState.requestValue, { [key]: value }) }));
  };

  handleRowClick = record => {
    this.setState(prevState => ({
      modalVisible: true,
      requestValue: Object.assign(prevState.requestValue, record),
      isModified: true,
    }));
  };

  handleConfirmClick = record => {
    const { sagaKey, submitExtraHandler } = this.props;
    const taskSeq = { CP_TASK_SEQ: record.CP_TASK_SEQ, GP_TASK_SEQ: record.GP_TASK_SEQ };
    const submitCallbackFunc = () => {
      this.getDataSource();
      this.handleModalClose();
    };

    submitExtraHandler(sagaKey, 'PUT', '/api/eshs/v1/common/updateroadmapisconfirmed', taskSeq, (id, response) =>
      callBackAfterPost(id, response, submitCallbackFunc),
    );
  };

  handleModifyClick = () => {
    const { requestValue } = this.state;
    const { sagaKey, submitExtraHandler } = this.props;

    const submitCallbackFunc = () => {
      this.getDataSource();
      this.handleModalClose();
    };

    submitExtraHandler(sagaKey, 'PUT', '/api/eshs/v1/common/updateroadmapvalue', requestValue, (id, response) =>
      callBackAfterPut(id, response, submitCallbackFunc),
    );
  };

  render() {
    const { columns } = this;
    const { handleSelectChange, handleAddClick, createYearList, handleModalClose, handleSaveClick, handleInputChange, handleModifyClick } = this;
    const { dataSource, categories, modalVisible, nextDate, requestValue, isModified } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area">
              <span className="text-label">항목</span>
              <AntdSelect className="select-mid" defaultValue={387} onChange={value => handleSelectChange('selectedCategory', value)} style={{ width: '15%' }}>
                {categories.map(category => (
                  <Select.Option value={category.NODE_ID}>{category.NAME_KOR}</Select.Option>
                ))}
              </AntdSelect>
              <span className="text-label">연도</span>
              <AntdSelect
                className="select-mid"
                defaultValue={Number(moment().format('YYYY'))}
                onChange={value => handleSelectChange('selectedYear', value)}
                style={{ width: '15%' }}
              >
                {createYearList().map(year => (
                  <Select.Option value={year}>{year}년</Select.Option>
                ))}
              </AntdSelect>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm" onClick={handleAddClick}>
              항목 추가
            </StyledButton>
          </StyledButtonWrapper>
          <AntdTable columns={columns} dataSource={dataSource} pagination={{ pageSize: 12 }} />
          <AntdModal visible={modalVisible} title={isModified ? 'Roadmap 수정' : 'Roadmap 등록'} onCancel={handleModalClose} footer={null} destroyOnClose>
            <StyledContentsWrapper>
              <StyledHtmlTable>
                <div className="tableWrapper">
                  <table>
                    <tbody>
                      <tr>
                        <th>연도</th>
                        <td>{isModified ? moment(requestValue.CHK_DATE).format('YYYY') : moment(nextDate).format('YYYY')}년</td>
                      </tr>
                      <tr>
                        <th>월</th>
                        <td>{isModified ? moment(requestValue.CHK_DATE).format('MM') : moment(nextDate).format('MM')}월</td>
                      </tr>
                      <tr>
                        <th>청주</th>
                        <td>
                          <AntdInputNumber
                            className="ant-input-number-sm"
                            value={requestValue.CP_VALUE}
                            onChange={value => handleInputChange('CP_VALUE', value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>구미</th>
                        <td>
                          <AntdInputNumber
                            className="ant-input-number-sm"
                            value={requestValue.GP_VALUE}
                            onChange={value => handleInputChange('GP_VALUE', value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </StyledHtmlTable>
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <StyledButton className="btn-primary btn-sm mr5" onClick={isModified ? handleModifyClick : handleSaveClick}>
                  {isModified ? '수정' : '저장'}
                </StyledButton>
                <StyledButton className="btn-light btn-sm" onClick={handleModalClose}>
                  취소
                </StyledButton>
              </div>
            </StyledContentsWrapper>
          </AntdModal>
        </StyledContentsWrapper>
      </>
    );
  }
}

ListPage.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
  submitExtraHandler: PropTypes.func,
  profile: PropTypes.object,
};

ListPage.defaultProps = {};

export default ListPage;
