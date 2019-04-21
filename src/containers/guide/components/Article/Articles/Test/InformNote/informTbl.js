import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Input } from 'antd';

const { TextArea } = Input;

class InformTbl extends PureComponent {
  render() {
    const {
      pmSheetDataList,
    } = this.props;
    return (
      <div className="message">
        <Scrollbars
          className="custom-scrollbar"
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMax={342}
        >
          <div className="resultsTableWrapper">
            {
              pmSheetDataList.map(pmSheet => (
                <table className="pmSheetTbl">
                  <tbody>
                    <tr style={{ cursor: 'pointer' }}>
                      <th>
                        EQ ID
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.USER_ID}
                        </p>
                      </td>
                      <th>
                        Model
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.EMP_NO}
                        </p>
                      </td>
                      <th>
                        Down Time
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.NAME_KOR}
                        </p>
                      </td>
                      <th>
                        Up Time
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.EMAIL}
                        </p>
                      </td>
                    </tr>
                    <tr style={{ cursor: 'pointer' }}>
                      <th>
                        Down
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.MOBILE_TEL_NO}
                        </p>
                      </td>
                      <th>
                        Down Type
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.COM_CD}
                        </p>
                      </td>
                      <th>
                        Auto/Manual
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.JOB_CD}
                        </p>
                      </td>
                      <th>
                        첨부파일
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.EAI_YN}
                        </p>
                      </td>
                    </tr>
                    <tr style={{ cursor: 'pointer' }}>
                      <th>
                        Total Time
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.MOBILE_TEL_NO}
                        </p>
                      </td>
                      <th>
                        Work Time
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.COM_CD}
                        </p>
                      </td>
                      <th>
                        Lot ID
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.JOB_CD}
                        </p>
                      </td>
                      <th>
                        Wafer ID
                      </th>
                      <td style={{ width: 247 }}>
                        <p>
                          {pmSheet.EAI_YN}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        조치 상세 내용
                      </th>
                      <td colSpan="7" style={{ width: '100vw' }}>
                        <TextArea
                          value="조치 상세 내용"
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 8 }}
                          id=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        remark
                      </th>
                      <td colSpan="7" style={{ width: '100vw' }}>
                        <TextArea
                          value="비고"
                          readOnly={true}
                          autosize={{ minRows: 1, maxRow: 8 }}
                          id=""
                        />
                      </td>
                    </tr>
                    <br />
                    <br />
                  </tbody>
                </table>
              ))
            }
          </div>
        </Scrollbars>
      </div>
    );
  }
}

InformTbl.defaultProps = {
  pmSheetDataList: [],
};

InformTbl.propTypes = {
  pmSheetDataList: PropTypes.array,
};
export default InformTbl;
