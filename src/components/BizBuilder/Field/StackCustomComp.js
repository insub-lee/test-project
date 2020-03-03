import * as PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import TableTypeSelector from '../../TableTypeSelector';
import MsdsIngredientCompStyled from '../styled/compStyled/MsdsIngredientCompStyled';

class MsdsIngredientComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiList: [],
      modalTableColumns: [
        { dataIndex: 'GAS_NM', title: 'Gas 명', search: true, width: 150 },
        { dataIndex: 'GAS_WEIGHT', title: '분자량', search: true, width: 90 },
        { dataIndex: 'PERMISSION_DENSITY', title: '법적배출허용농도', search: true, width: 200 },
        { dataIndex: 'UNIT', title: '단위', search: true, width: 150 },
      ],
      applyList: [],
    };
  }

  componentDidMount() {
    const { getExtraApiData, sagaKey: id, viewPageData } = this.props;
    const viewType = (viewPageData && viewPageData.viewType) || '';
    const apiTaskSeq = (viewPageData && viewPageData.taskSeq) || 0;
    let apiValue = [];
    if (viewType === 'INPUT') {
      apiValue = [
        {
          key: 'gasType',
          url: '/api/eshs/v1/common/eshsgastype',
          type: 'GET',
        },
        viewType === 'MODIFY'
          ? {
              key: 'applyList',
              url: `/api/eshs/v1/common/eshsstackcd?TASK_SEQ=${apiTaskSeq}`,
              type: 'GET',
            }
          : '',
      ];
    }
    getExtraApiData(id, apiValue, this.setList);
  }

  setList = sagaKey => {
    const { extraApiData, viewPageData } = this.props;
    let applyList = [];
    console.log(extraApiData && extraApiData.gasType && extraApiData.gasType.list, 'gasType');
    const apiList = (extraApiData && extraApiData.gasType && extraApiData.gasType.list) || [];
    if (viewPageData && viewPageData.viewType === 'MODIFY') {
      applyList = (extraApiData && extraApiData.applyList && extraApiData.applyList.list) || [];
    }
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

  handleInputOnChange = (e, data) => {
    const { sagaKey: id, changeFormData } = this.props;
    const { applyList } = this.state;
    const changeList = applyList.map(a => (a.STACK_CD === data.STACK_CD && a.GAS_CD === data.GAS_CD ? { ...a, CHEMICAL_NM: e.target.value } : a));
    this.setState(
      {
        applyList: changeList,
      },
      () => changeFormData(id, 'applyList', this.state.applyList),
    );
  };

  render() {
    const { CONFIG, visible, isSearch, searchCompRenderer, viewPageData } = this.props;
    const { apiList, modalTableColumns, applyList } = this.state;
    const viewType = (viewPageData && viewPageData.viewType) || '';

    return visible ? (
      <>
        {viewType === 'INPUT' || viewType === 'MODIFY' ? (
          <TableTypeSelector
            leftTableColumns={modalTableColumns}
            rightTableColumns={modalTableColumns}
            apiList={apiList}
            applyList={applyList}
            handleApply={this.handleApply}
            btnText="배출가스 등록"
            modalTitle="배출가스 검색"
          />
        ) : (
          ''
        )}
        <MsdsIngredientCompStyled>
          <p>구성성분</p>
          {applyList.length ? (
            <table className="msdsIngreDientTable">
              <thead>
                <tr>
                  <td>가스종류</td>
                  <td>처리농도</td>
                  <td>처리효율</td>
                  <td>사용약품</td>
                </tr>
              </thead>
              <tbody>
                {applyList.map((a, index) => (
                  <tr key={index}>
                    <td>{a.GAS_NM}</td>
                    <td>{a.TREART_DENSITY}</td>
                    <td>{a.TREAT_EFF}</td>
                    <td>
                      {viewType === 'INPUT' || viewType === 'MODIFY' ? (
                        <p>
                          <Input style={{ width: '50px' }} onChange={e => this.handleInputOnChange(e, a)} value={a.CHEMICAL_NM || ''} />
                        </p>
                      ) : (
                        <span>{a.RATIO || ''}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>등록된 구성성분이 없습니다.</p>
          )}
        </MsdsIngredientCompStyled>
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
