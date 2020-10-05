import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import styled from 'styled-components';

const Styled = styled.div`
  .middle-title-wrap {
    margin: 20px 0px 5px 0px;
  }

  .subFormTable-title {
    padding-left: 5px;
    font-weight: 600;
  }
`;

// 용수공급원별 사용량 테이블
class FlowTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, formData } = this.props;
    return (
      <Styled>
        <div className="middle-title-wrap">
          <div className="subFormTable-title-wrap" style={{ display: 'inline-block', width: '20%' }}>
            <span className="subFormTable-title">{title}</span>
          </div>
        </div>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan={1}>
                  <span>구분</span>
                </th>
                <th colSpan={1}>
                  <span>전일지침</span>
                </th>
                <th colSpan={1}>
                  <span>금일지침</span>
                </th>
                <th colSpan={1}>
                  <span>사용량(㎥)</span>
                </th>
                <th colSpan={1}>
                  <span>검침시간</span>
                </th>
              </tr>
              {formData && formData.length > 0 ? (
                formData.map(row => (
                  <tr key={row.GUBUN} className="tr-center">
                    <th colSpan={1}>
                      <span>{row.GUBUN}</span>
                    </th>
                    <td colSpan={1}>
                      <span>{row.THE_DAY_BEFORE_INDEX}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.THE_DAY_INDEX}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.USED_AMOUNT}</span>
                    </td>
                    <td colSpan={1}>
                      <span>{row.INSPECTION_TIME}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="empty" className="tr-center">
                  <td colSpan={5}>
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

FlowTable.propTypes = {
  title: PropTypes.string,
  formData: PropTypes.array,
};

FlowTable.defaultProps = {
  title: '',
  formData: [],
};

export default FlowTable;
