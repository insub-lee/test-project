import React from 'react';
import PropTypes from 'prop-types';
import { getTreeFromFlatData } from 'react-sortable-tree';

import { Select, TreeSelect } from 'antd';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledTreeSelect from 'components/BizBuilder/styled/Form/StyledTreeSelect';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

const AntdSelect = StyledSelect(Select);
const AntdTreeSelect = StyledTreeSelect(TreeSelect);
class EshsDangerEvalInSafetyImproveComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accidentCauseList: [],
      accientTypes: [],
      categoryList: [],
    };
  }

  getCategoryMapListAsTree = (flatData, flag, viewLang, rootkey) =>
    getTreeFromFlatData({
      flatData: flatData.map(item => ({
        title: item[`NAME_${viewLang && viewLang.length > 0 ? viewLang : 'KOR'}`],
        value: item.NODE_ID,
        key: item.NODE_ID,
        parentValue: item.PARENT_NODE_ID,
        selectable: item.LVL === 7,
      })),

      getKey: node => node.key,
      getParentKey: node => node.parentValue,
      rootKey: rootkey || 0,
    });

  componentDidMount() {
    this.getCategoryList();
  }

  getCategoryList = () => {
    const { sagaKey, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'accidentCauseList',
        type: 'POST',
        url: `/api/admin/v1/common/categoryMapList`,
        params: { PARAM: { NODE_ID: 30433 } },
      },
      {
        key: 'accidentTypes',
        type: 'POST',
        url: `/api/admin/v1/common/categoryMapList`,
        params: { PARAM: { NODE_ID: 30432 } },
      },
      {
        key: 'categories',
        type: 'POST',
        url: '/api/admin/v1/common/categoryChildrenListUseYn',
        params: { PARAM: { NODE_ID: 1831, USE_YN: 'Y' } },
      },
    ];

    getExtraApiData(sagaKey, apiArr, this.setCategory);
  };

  setCategory = () => {
    const { extraApiData } = this.props;
    const tempData = (extraApiData.categories && extraApiData.categories.categoryMapList.slice(1)) || [];
    this.setState({
      accidentCauseList: (extraApiData.accidentCauseList && extraApiData.accidentCauseList.categoryMapList.slice(1)) || [],
      accientTypes: (extraApiData.accidentTypes && extraApiData.accidentTypes.categoryMapList.slice(1)) || [],
      categoryList: this.getCategoryMapListAsTree(tempData, 'N', 'KOR', 1831) || [],
    });
  };

  handleSelectChange = (key, value) => {
    const { sagaKey, changeFormData } = this.props;

    if (key.toUpperCase() === 'DANGERYN') {
      changeFormData(sagaKey, 'ACCIDENT_CAUSE_ID', '');
      changeFormData(sagaKey, 'ACCIDENT_TYPE_ID', '');
      changeFormData(sagaKey, 'EQUIP_ID', undefined);
      changeFormData(sagaKey, 'PROCESS_ID', undefined);
      changeFormData(sagaKey, 'PLACE_ID', undefined);
      changeFormData(sagaKey, 'DIV_ID', undefined);
      changeFormData(sagaKey, 'SDIV_ID', undefined);
    }
    return changeFormData(sagaKey, key.toUpperCase(), value);
  };

  handleTreeSelectChange = value => {
    const { sagaKey, changeFormData, extraApiData } = this.props;
    const treeData = (extraApiData.categories && extraApiData.categories.categoryMapList) || [];

    const processId = treeData.find(f => f.NODE_ID === value);
    const placeId = treeData.find(f => f.NODE_ID === processId.PARENT_NODE_ID);
    const divId = treeData.find(f => f.NODE_ID === placeId.PARENT_NODE_ID);
    const sdivId = treeData.find(f => f.NODE_ID === divId.PARENT_NODE_ID);

    changeFormData(sagaKey, 'EQUIP_ID', value);
    changeFormData(sagaKey, 'PROCESS_ID', processId.NODE_ID);
    changeFormData(sagaKey, 'PLACE_ID', placeId.NODE_ID);
    changeFormData(sagaKey, 'DIV_ID', divId.NODE_ID);
    changeFormData(sagaKey, 'SDIV_ID', sdivId.NODE_ID);
  };

  render() {
    const { handleSelectChange, handleTreeSelectChange } = this;
    const { accidentCauseList, accientTypes, categoryList } = this.state;
    const { formData } = this.props;
    return (
      <>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
              <col width="11%" />
            </colgroup>
            <tbody>
              <tr>
                <th>위험성평가</th>
                <td colSpan={2}>
                  <AntdSelect
                    defaultValue="N"
                    className="select-sm"
                    value={Number(formData.DANGERYN)}
                    onChange={value => handleSelectChange('DANGERYN', value)}
                    style={{ width: '100%' }}
                  >
                    <Select.Option value="Y">실시</Select.Option>
                    <Select.Option value="N">해당 없음</Select.Option>
                  </AntdSelect>
                </td>
                <th>사고의 발생원인</th>
                <td colSpan={2}>
                  <AntdSelect
                    disabled={formData.DANGERYN === 'N'}
                    className="select-sm"
                    value={Number(formData.ACCIDENT_CAUSE_ID)}
                    onChange={value => handleSelectChange('ACCIDENT_CAUSE_ID', value)}
                    style={{ width: '100%' }}
                  >
                    {accidentCauseList.map(cause => (
                      <Select.Option value={cause.NODE_ID}>{cause.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                </td>
                <th>사고의 발생유형</th>
                <td colSpan={2}>
                  <AntdSelect
                    disabled={formData.DANGERYN === 'N'}
                    className="select-sm"
                    value={Number(formData.ACCIDENT_TYPE_ID)}
                    onChange={value => handleSelectChange('ACCIDENT_TYPE_ID', value)}
                    style={{ width: '100%' }}
                  >
                    {accientTypes.map(type => (
                      <Select.Option value={type.NODE_ID}>{type.NAME_KOR}</Select.Option>
                    ))}
                  </AntdSelect>
                </td>
              </tr>
              <tr>
                <th>장비(설비)</th>
                <td colSpan={8}>
                  <AntdTreeSelect
                    // treeData={categoryList.children}
                    treeData={categoryList}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    disabled={formData.DANGERYN === 'N'}
                    className="select-sm"
                    value={formData.EQUIP_ID}
                    onChange={value => handleTreeSelectChange(value)}
                    style={{ width: '100%' }}
                  >
                    {accientTypes.map(type => (
                      <Select.Option value={type.NODE_ID}>{type.NAME_KOR}</Select.Option>
                    ))}
                  </AntdTreeSelect>
                </td>
              </tr>
            </tbody>
          </table>
        </StyledHtmlTable>
      </>
    );
  }
}

EshsDangerEvalInSafetyImproveComp.propTypes = {
  sagaKey: PropTypes.string,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  formData: PropTypes.object,
};

EshsDangerEvalInSafetyImproveComp.defaultProps = {};

export default EshsDangerEvalInSafetyImproveComp;
