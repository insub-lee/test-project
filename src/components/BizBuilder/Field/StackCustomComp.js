import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, InputNumber } from 'antd';
import TableTypeSelector from '../../TableTypeSelector';
import MsdsIngredientCompStyled from '../styled/compStyled/MsdsIngredientCompStyled';

class MsdsIngredientComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiList: [],
      leftTableColumns: [
        { dataIndex: 'GAS_NM', title: 'Gas 명', search: true, width: 150 },
        { dataIndex: 'GAS_WEIGHT', title: '분자량', search: true, width: 90 },
        { dataIndex: 'PERMISSION_DENSITY', title: '법적배출허용농도', search: true, width: 200 },
        { dataIndex: 'UNIT', title: '단위', search: true, width: 150 },
      ],
      rightTableColumns: [{ dataIndex: 'GAS_NM', title: 'Gas 명', search: true, width: 150 }],
      applyList: [],
    };
  }

  componentDidMount() {
    const { getExtraApiData, sagaKey: id, viewPageData, fromData } = this.props;
    const viewType = (viewPageData && viewPageData.viewType) || '';
    const apiTaskSeq = (viewPageData && viewPageData.taskSeq) || 0;
    const apiValue = [
      {
        key: 'gasType',
        url: '/api/eshs/v1/common/eshsgastype',
        type: 'GET',
      },
      viewType === 'MODIFY' || viewType === 'VIEW'
        ? {
            key: 'applyList',
            url: `/api/eshs/v1/common/eshsstackcd?PARENT_TASK_SEQ=${apiTaskSeq}`,
            type: 'GET',
          }
        : '',
    ];

    getExtraApiData(id, apiValue, this.setList);
  }

  setList = sagaKey => {
    const { extraApiData, viewPageData } = this.props;
    let applyList = [];
    const apiList = (extraApiData && extraApiData.gasType && extraApiData.gasType.list) || [];
    if ((viewPageData && viewPageData.viewType === 'MODIFY') || (viewPageData && viewPageData.viewType === 'VIEW')) {
      applyList = (extraApiData && extraApiData.applyList && extraApiData.applyList.list) || [];
    }
    this.setState({
      apiList,
      applyList,
    });
  };

  handleApply = applyList => {
    const { sagaKey: id, changeFormData, viewPageData, formData } = this.props;
    const taskSeq = (viewPageData && viewPageData.taskSeq) || 0;
    const newAry = applyList.map(a => ({ ...a, PARENT_TASK_SEQ: taskSeq, STACK_CD: formData && formData.STACK_CD }));
    this.setState({
      applyList: newAry,
    });
    changeFormData(id, 'applyList', newAry);
  };

  handleInputOnChange = (e, data) => {
    const { sagaKey: id, changeFormData } = this.props;
    const { applyList } = this.state;
    const changeList = applyList.map(a => (a.GAS_CD === data.GAS_CD ? { ...a, CHEMICAL_NM: e.target.value } : a));
    this.setState(
      {
        applyList: changeList,
      },
      () => changeFormData(id, 'applyList', this.state.applyList),
    );
  };

  handleEFFChange = (e, data) => {
    const { sagaKey: id, changeFormData } = this.props;
    const { applyList } = this.state;
    const changeList = applyList.map(a => (a.GAS_CD === data.GAS_CD ? { ...a, TREAT_EFF: e } : a));
    this.setState(
      {
        applyList: changeList,
      },
      () => changeFormData(id, 'applyList', this.state.applyList),
    );
  };

  handleDENChange = (e, data) => {
    const { sagaKey: id, changeFormData } = this.props;
    const { applyList } = this.state;
    const changeList = applyList.map(a => (a.GAS_CD === data.GAS_CD ? { ...a, TREAT_DENSITY: e } : a));
    this.setState(
      {
        applyList: changeList,
      },
      () => changeFormData(id, 'applyList', this.state.applyList),
    );
  };

  render() {
    const { CONFIG, visible, isSearch, searchCompRenderer, viewPageData } = this.props;
    const { apiList, leftTableColumns, rightTableColumns, applyList } = this.state;
    const viewType = (viewPageData && viewPageData.viewType) || '';
    return visible ? (
      <>
        {viewType === 'INPUT' || viewType === 'MODIFY' ? (
          <TableTypeSelector
            leftTableColumns={leftTableColumns}
            rightTableColumns={rightTableColumns}
            apiList={apiList}
            applyList={applyList}
            handleApply={this.handleApply}
            btnText="배출가스 등록"
            modalTitle="배출가스 검색"
            rowKey="GAS_CD"
          />
        ) : (
          ''
        )}
        <MsdsIngredientCompStyled>
          {applyList.length ? (
            <div style={{ width: '100%', height: '200px', overflowY: 'scroll' }}>
              <table className="msdsIngreDientTable" style={{ width: '100%', textAlign: 'center' }}>
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
                      <td style={{ width: '25%' }}>{a.GAS_CD}</td>
                      {viewType === 'INPUT' || viewType === 'MODIFY' ? (
                        <>
                          <td style={{ textAlign: 'Left', width: '200px' }}>
                            <InputNumber style={{ width: '80%' }} value={a.TREAT_DENSITY || 0} min={0} max={100} onChange={e => this.handleDENChange(e, a)} />
                            <span style={{ marginLeft: 5, width: 50 }}>{a.UNIT || ''}</span>
                          </td>
                          <td>
                            <InputNumber style={{ width: '100%' }} value={a.TREAT_EFF || 0} min={0} max={100} onChange={e => this.handleEFFChange(e, a)} />
                          </td>
                          <td>
                            <Input onChange={e => this.handleInputOnChange(e, a)} value={a.CHEMICAL_NM || ''} />
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ textAlign: 'Left' }}>
                            <span style={{ marginRight: 5 }}>{a.TREAT_DENSITY || 0}</span>
                            {a.UNIT || ''}
                          </td>
                          <td>{a.TREAT_EFF || 0}</td>
                          <td>{a.CHEMICAL_NM || ''}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>등록된 배출가스가 없습니다.</p>
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
