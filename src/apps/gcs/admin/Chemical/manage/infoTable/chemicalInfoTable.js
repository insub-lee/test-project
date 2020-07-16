import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

class useInfoViewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData } = this.props;
    const chemmdt = moment(`${formData.CHEMMDT}+01`, 'YYYYMMDD');
    const endDay = chemmdt.endOf('month').format('DD');
    return (
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
                <span>사용 월</span>
              </th>
              <td colSpan={4}>
                <span>{moment(formData.CHEMMDT, 'YYYYMM').format('YYYY.MM')}</span>
                <span style={{ color: 'rgb(255, 102, 102)', marginLeft: '10px' }}>{`※ 해당 월은 ${endDay}일 까지 존재합니다.`}</span>
              </td>
            </tr>
            <tr>
              <th colSpan={4}>
                <span>Chemical 공급장치 정보</span>
              </th>
              <th colSpan={1} rowSpan={2}>
                <span>Chemical 품명</span>
              </th>
            </tr>
            <tr>
              <th colSpan={1}>
                <span>공급자번호</span>
              </th>
              <th colSpan={1}>
                <span>Chemical Name</span>
              </th>
              <th colSpan={1}>
                <span>위치</span>
              </th>
              <th colSpan={1}>
                <span>기타 정보</span>
              </th>
            </tr>
            <tr className="tr-center">
              <td colSpan={1}>
                <span>{formData.GONGNO || ''}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.PRODNM || ''}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.GONGAREA || ''}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.GONGINFO || ''}</span>
              </td>
              <td colSpan={1}>
                <span>{formData.CHEMNM || ''}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </StyledHtmlTable>
    );
  }
}

useInfoViewTable.propTypes = {
  formData: PropTypes.object,
};

useInfoViewTable.defaultProps = {};

export default useInfoViewTable;
