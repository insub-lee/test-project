import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, InputNumber } from 'antd';
import TableTypeSelector from '../../TableTypeSelector';
import MsdsIngredientCompStyled from '../styled/compStyled/MsdsIngredientCompStyled';

class TakeOutCustomComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiList: [],
      leftTableColumns: [
        { dataIndex: 'CONTRACT_CD', title: '계약번호', search: true, width: 150 },
        { dataIndex: 'ITEM_NM', title: '품목명', search: true, width: 90 },
        { dataIndex: 'TRANS_VENDOR_NM', title: '운반업체', search: true, width: 200 },
        { dataIndex: 'TERM_FROM_DT', title: '계약기간 From', search: true, width: 150 },
        { dataIndex: 'TERM_TO_DT', title: '계약기간 To', search: true, width: 150 },
        { dataIndex: 'PRICE_UNIT_NM', title: '단가 단위', search: true, width: 150 },
        { dataIndex: 'CONTRACT_NM', title: '실계약번호', search: true, width: 150 },
        { dataIndex: 'SITE_NM', title: '지역', search: true, width: 150 },
      ],
      rightTableColumns: [
        { dataIndex: 'CONTRACT_CD', title: '계약번호', search: true, width: 150 },
        { dataIndex: 'ITEM_NM', title: '품목명', search: true, width: 90 },
      ],
      applyList: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.formData.WRK_CMPNY_CD !== this.props.formData.WRK_CMPNY_CD || prevProps.formData.TAKEOUT_DT !== this.props.formData.TAKEOUT_DT) {
      this.dataList();
    }
  }

  componentDidMount() {
    const { getExtraApiData, sagaKey: id, formData, viewPageData } = this.props;
    if (viewPageData.viewType === 'MODIFY' || viewPageData.viewType === 'VIEW') {
      const apiValue = [
        {
          key: 'eshsContract',
          url: `/api/eshs/v1/common/eshsContract?TRANS_VENDOR_CD=${formData.WRK_CMPNY_CD}&TAKEOUT_DT=${formData.TAKEOUT_DT}`,
          type: 'GET',
        },
        {
          key: 'applyList',
          url: `/api/eshs/v1/common/eshsTakeOutItem?TAKEOUT_CD=${formData.TAKEOUT_CD}&TASK_SEQ=${viewPageData.taskSeq}`,
          type: 'GET',
        },
      ];
      getExtraApiData(id, apiValue, this.setList);
    }
  }

  dataList = () => {
    const { getExtraApiData, sagaKey: id, formData, viewPageData } = this.props;
    const apiValue = [
      {
        key: 'eshsContract',
        url: `/api/eshs/v1/common/eshsContract?TRANS_VENDOR_CD=${formData.WRK_CMPNY_CD}&TAKEOUT_DT=${formData.TAKEOUT_DT}`,
        type: 'GET',
      },
    ];
    getExtraApiData(id, apiValue, this.setList);
  };

  setList = sagaKey => {
    const { extraApiData, viewPageData, changeFormData, sagaKey: id } = this.props;
    let applyList = [];
    const apiList = (extraApiData && extraApiData.eshsContract && extraApiData.eshsContract.list) || [];
    if ((viewPageData && viewPageData.viewType === 'MODIFY') || (viewPageData && viewPageData.viewType === 'VIEW')) {
      applyList = (extraApiData && extraApiData.applyList && extraApiData.applyList.list) || [];
    }
    this.setState({
      apiList,
      applyList,
    });
    changeFormData(id, 'applyList', applyList);
  };

  handleApply = applyList => {
    const { sagaKey: id, changeFormData, viewPageData, formData } = this.props;
    const taskSeq = (viewPageData && viewPageData.taskSeq && viewPageData.taskSeq !== -1) || 0;
    let reasonTemp;
    const newAry = applyList.map(a => {
      switch (a.DISPOSAL_GUBUN) {
        case '980':
          reasonTemp = '유상처리';
          break;
        case '981':
          reasonTemp = '무상처리';
          break;
        default:
          reasonTemp = '매각처리';
          break;
      }
      return {
        ...a,
        PARENT_TASK_SEQ: taskSeq,
        TAKEOUT_CD: formData.TAKEOUT_CD,
        TAKEOUT_QTY: 1,
        TAKEOUT_UNIT: '대',
        TAKEOUT_REASON: reasonTemp,
        WEIGH_UNIT: a.PRICE_UNIT_NM,
        WEIGH_DT: formData.TAKEOUT_DT,
      };
    });

    this.setState({
      applyList: newAry,
    });
    changeFormData(id, 'applyList', newAry);
  };

  handleInputOnChange = (value, data, name) => {
    const { sagaKey: id, changeFormData } = this.props;
    const { applyList } = this.state;
    const changeList = applyList.map(a => (a.CONTRACT_CD === data.CONTRACT_CD ? { ...a, [name]: value } : a));
    this.setState(
      {
        applyList: changeList,
      },
      () => changeFormData(id, 'applyList', this.state.applyList),
    );
  };

  render() {
    const { CONFIG, visible, isSearch, searchCompRenderer, viewPageData, readOnly } = this.props;
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
            btnText="반출품목 등록"
            modalTitle="반출품목 검색"
            rowKey="CONTRACT_CD"
            noDataText="해당 업체는 선택된 기간내에 반출품목이 존재하지 않습니다.
            계약기간이나 업체정보를 다시 확인하시기 바랍니다."
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
                    <td>품목 및 규격</td>
                    <td>계약관리번호</td>
                    <td>수량</td>
                    <td>단위</td>
                    <td>반출사유</td>
                    <td>반출량</td>
                    <td>금액</td>
                  </tr>
                </thead>
                <tbody>
                  {applyList.map((a, index) => (
                    <tr key={index}>
                      <>
                        <td>
                          {a.ITEM_CD || ''}
                          {a.ITEM_NM || ''}
                        </td>
                        <td>{a.CONTRACT_CD || ''}</td>
                        <td>
                          <InputNumber
                            style={{ width: '100px' }}
                            onChange={e => this.handleInputOnChange(e, a, 'TAKEOUT_QTY')}
                            value={a.TAKEOUT_QTY || ''}
                            readOnly
                          />
                        </td>
                        <td>
                          <Input
                            style={{ width: '100px' }}
                            onChange={e => this.handleInputOnChange(e.target.value, a, 'TAKEOUT_UNIT')}
                            value={a.TAKEOUT_UNIT || ''}
                            readOnly
                          />
                        </td>
                        <td>
                          <Input
                            style={{ width: '100px' }}
                            onChange={e => this.handleInputOnChange(e.target.value, a, 'TAKEOUT_REASON')}
                            value={a.TAKEOUT_REASON || ''}
                            readOnly
                          />
                        </td>
                        <td>
                          <InputNumber style={{ width: '100px' }} onChange={e => this.handleInputOnChange(e, a, 'WEIGH')} value={a.WEIGH || ''} readOnly />
                          {a.PRICE_UNIT_NM || ''}
                        </td>
                        <td>
                          {Number(a.DISP_UNIT_PRICE) * Number(a.WEIGH)}
                          {a.MONEY_UNIT_NM}
                        </td>
                      </>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>등록된 반출품목이 없습니다.</p>
          )}
        </MsdsIngredientCompStyled>
      </>
    ) : (
      ''
    );
  }
}

TakeOutCustomComp.propTypes = {
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

export default TakeOutCustomComp;
