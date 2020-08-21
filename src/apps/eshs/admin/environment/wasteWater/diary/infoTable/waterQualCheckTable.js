import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Input } from 'antd';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
// import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
// import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import styled from 'styled-components';

// const AntdInput = StyledInput(Input);

const Styled = styled.div`
  .middle-title-wrap {
    margin: 20px 0px 5px 0px;
  }

  .subFormTable-title {
    padding-left: 5px;
    font-weight: 600;
  }
`;

// 용폐수 - 관리 - 일지 - 오염물질 측정 내용
class AdditionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  listDataSet = listData => {
    console.debug('리스트데이터', listData);
    const itemList = []; // col render를 위한 측정 Item list
    const nextListData = []; // row render를 위한 데이터
    if (!Array.isArray(listData) || (listData && listData.length === 0)) {
      return { chkItemList: [], listData: [] };
    }
    listData.forEach(row => {
      // col 렌더를 위한 측정 Item
      if (!itemList.includes(row.ITEM_NM)) {
        itemList.push(row.ITEM_NM);
      }

      const targetIdx = nextListData.findIndex(item => item.MEASUREMENT_POINT === row.MEASUREMENT_POINT);
      if (targetIdx === -1) {
        const newItem = {
          MEASUREMENT_POINT: row.MEASUREMENT_POINT,
          [row.ITEM_NM]: row.CHK_VALUE,
          ANALYSIS_DT: row.ANALYSIS_DT,
        };
        nextListData.push(newItem);
      } else {
        const targetItem = nextListData[targetIdx]; // 같은 측정포인트
        nextListData[targetIdx] = {
          ...targetItem,
          [row.ITEM_NM]: row.CHK_VALUE,
        };
      }
    });
    return { chkItemList: itemList, listData: nextListData };
  };

  render() {
    const { formData } = this.props;
    /*
      asis에 데이터가 존재하지 않아 임의로 데이터 만들어서 프론트 테스트
      const sampleData = [
        {
          MEASUREMENT_POINT: '측정포인트1',
          ITEM_NM: 'COD',
          ITEM_CD: 1,
          CHK_VALUE_LAW: 12,
          CHK_VALUE: 24,
          ANALYSIS_DT: '날짜',
        },
        {
          MEASUREMENT_POINT: '측정포인트2',
          ITEM_NM: 'COD',
          ITEM_CD: 1,
          CHK_VALUE_LAW: 12,
          CHK_VALUE: 24,
          ANALYSIS_DT: '날짜',
        },
        {
          MEASUREMENT_POINT: '측정포인트2',
          ITEM_NM: 'COD2',
          ITEM_CD: 2,
          CHK_VALUE_LAW: 12,
          CHK_VALUE: 24,
          ANALYSIS_DT: '날짜',
        },
      ];
    */

    const { chkItemList, listData } = this.listDataSet(formData || []);

    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">오염물질 측정 내용</span>
          </div>
        </div>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col />
              {chkItemList && chkItemList.length > 0 && chkItemList.map(row => <col key={`${row}`} />)}
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>측정 Point</span>
                </th>
                {chkItemList && chkItemList.length > 0 && chkItemList.map(itemNm => <th key={`${itemNm}`}>{itemNm}</th>)}
                <th colSpan={1}>
                  <span>분석일</span>
                </th>
              </tr>
              {listData && listData.length > 0 ? (
                listData.map(row => (
                  <tr key={row.MEASUREMENT_POINT} className="tr-center">
                    <td colSpan={1}>
                      <span>{row.MEASUREMENT_POINT}</span>
                    </td>
                    {chkItemList && chkItemList.length > 0 && chkItemList.map(item => <td key={`${item}`}>{row[item]}</td>)}
                    <td colSpan={1}>
                      <span>{row.ANALYSIS_DT}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="empty" className="tr-center">
                  <td colSpan={2 + chkItemList.length}>
                    <span>조회된 데이터가 없습니다.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </StyledHtmlTable>
      </Styled>
    );
  }
}

AdditionTable.propTypes = {
  formData: PropTypes.array,
};

AdditionTable.defaultProps = {
  formData: [],
};

export default AdditionTable;
