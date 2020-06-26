import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import TableTypeSelector from '../../TableTypeSelector';

class MsdsIngredientComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiList: [],
      leftTableColumns: [
        { dataIndex: 'MTRL_NM', title: '물질명', search: true, width: 150, align: 'center' },
        { dataIndex: 'COMPONENT_ITEM_CD', title: 'MSDS코드', search: true, width: 100, align: 'center' },
        { dataIndex: 'MOLECULAR_FORMULA', title: '분자식', search: true, width: 150, align: 'center' },
        { dataIndex: 'CAS_NO', title: 'CAS-NO', search: true, width: 150, align: 'center' },
        { dataIndex: 'UN_NO', title: 'UN-NO', search: true, width: 100, align: 'center' },
        { dataIndex: 'ITEM_NM', title: '제품명', search: true, width: 200, align: 'center' },
        { dataIndex: 'WRK_CMPNY_NM', title: 'Vendor', search: true, width: 150, align: 'center' },
      ],
      rightTableColumns: [
        { dataIndex: 'ITEM_NM', title: 'ITEM', width: 150 },
        { dataIndex: 'MOLECULAR_FORMULA', title: '분자식', width: 150 },
        { dataIndex: 'CAS_NO', title: 'CAS-NO', width: 150 },
      ],
      applyList: [],
    };
  }

  componentDidMount() {
    const { getExtraApiData, sagaKey: id, viewPageData } = this.props;
    const viewType = (viewPageData && viewPageData.viewType) || '';
    const task_seq = (viewPageData && viewPageData.taskSeq) || 0;

    const apiValue = [
      {
        key: 'MsdsList',
        url: '/api/eshs/v1/common/EshsMsds',
        type: 'GET',
      },
      {
        key: 'applyList',
        url: `/api/eshs/v1/common/EshsMsdsByTaskSeq/${task_seq}`,
        type: 'GET',
      },
    ];

    getExtraApiData(id, apiValue, this.setList);
  }

  setList = sagaKey => {
    const { extraApiData, viewPageData } = this.props;
    const viewType = (viewPageData && viewPageData.viewType) || '';
    const apiList = (extraApiData && extraApiData.MsdsList && extraApiData.MsdsList.list) || [];
    const applyList = (extraApiData && extraApiData.applyList && extraApiData.applyList.list) || [];
    this.setState({
      apiList,
      applyList,
    });
  };

  handleApply = applyList => {
    const { sagaKey: id, changeFormData, viewPageData } = this.props;
    const taskSeq = (viewPageData && viewPageData.taskSeq) || 0;
    const newAry = applyList.map(a => ({ ...a, PARENTS_TASK_SEQ: taskSeq }));
    this.setState({
      applyList: newAry,
    });
    changeFormData(id, 'applyList', newAry);
  };

  handleInputOnChange = (e, targetIdx) => {
    const { sagaKey: id, changeFormData } = this.props;
    const { applyList } = this.state;
    const changeList = applyList.map((a, idx) => (idx === targetIdx ? { ...a, RATIO: e.target.value } : a));
    this.setState({
      applyList: changeList,
    });
    changeFormData(id, 'applyList', applyList);
  };

  render() {
    const { CONFIG, visible, isSearch, searchCompRenderer, viewPageData } = this.props;
    const { apiList, leftTableColumns, rightTableColumns, applyList } = this.state;
    const viewType = (viewPageData && viewPageData.viewType) || '';

    return visible ? (
      <>
        <StyledHtmlTable className="tableWrapper">
          <table className="table-border">
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <thead>
              {viewType === 'INPUT' || viewType === 'MODIFY' ? (
                <tr textAlign="left">
                  <td colSpan={4}>
                    <TableTypeSelector
                      leftTableColumns={leftTableColumns}
                      rightTableColumns={rightTableColumns}
                      apiList={apiList}
                      applyList={applyList}
                      handleApply={this.handleApply}
                      btnText="구성성분 등록"
                      modalTitle="MSDS 검색"
                      rowKey="TASK_SEQ"
                    />
                  </td>
                </tr>
              ) : (
                ''
              )}
              <tr>
                <th>ITEM</th>
                <th>분자식</th>
                <th>CAS_NO</th>
                <th>구성비율</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan={4}>{applyList.length} 건</td>
              </tr>
            </tfoot>
            <tbody>
              {applyList.map((a, index) => (
                <tr key={`ingreDient_${index}`}>
                  <td>{a.ITEM_NM}</td>
                  <td>{a.MOLECULAR_FORMULA}</td>
                  <td>{a.CAS_NO}</td>
                  <td>
                    {viewType === 'INPUT' || viewType === 'MODIFY' ? (
                      <p>
                        <Input style={{ width: '50px' }} onChange={e => this.handleInputOnChange(e, index)} value={a.RATIO || ''} />%
                      </p>
                    ) : (
                      <span>{a.RATIO || ''} %</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyledHtmlTable>
      </>
    ) : (
      ''
    );
  }
}

MsdsIngredientComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  id: PropTypes.any,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  compProp: PropTypes.any,
  changeSearchData: PropTypes.any,
};

export default MsdsIngredientComp;
