import React, { PureComponent } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Input } from 'antd';

const { TextArea } = Input;

class techSafeView extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { techSafeDetail } = this.props;
    return (
      <div>
        {/* popup contnent */}
        <main className="popup-content">
          {/* Data Table */}
          <table className="data-table">
            <tr>
              <th>EQ TEAM</th>
              <td>
                {techSafeDetail.EQ_TEAM}
              </td>
              <th>EQ SPDT</th>
              <td>
                {techSafeDetail.EQ_SDPT}
              </td>
              <th>EQ ID</th>
              <td>
                {techSafeDetail.EQ_ID_NM}
              </td>
              <th>Model</th>
              <td>
                {techSafeDetail.MODEL}
              </td>
            </tr>
            <tr>
              <th>Down</th>
              <td>
                {techSafeDetail.NOTI_TYPE_NAME}
              </td>
              <th>Down Type</th>
              <td>
                {techSafeDetail.CODING_NAME}
              </td>
              <th>Auto/Manual</th>
              <td>
                {techSafeDetail.IS_MANUAL}
              </td>
              <th>작업 STATUS</th>
              <td>
                {techSafeDetail.IF_STATUS_NAME}
              </td>
            </tr>
            <tr>
              <th>M/C Down Time</th>
              <td>
                {techSafeDetail.DOWN_TIME}
              </td>
              <th>Require Time</th>
              <td>
                {techSafeDetail.CREATE_TIME}
              </td>
              <th>Complete Time</th>
              <td>
                {techSafeDetail.COMPLETE_TIME}
              </td>
              <th>M/C Up Time</th>
              <td>
                {techSafeDetail.UP_TIME}
              </td>
            </tr>
            <tr>
              <th>Down Comment</th>
              <td colSpan="3">
                {techSafeDetail.NOTE_COMMENT}
              </td>
              <th>작업시간</th>
              <td>
                {techSafeDetail.INTERVAL_C}
              </td>
              <th>PUMP/SCRUBBER</th>
              <td>
                {techSafeDetail.REQ_ITEM_NM}
              </td>
            </tr>
            <tr>
              <th>조치내용<br />(기술안전)</th>
              <td colSpan="7">
                <TextArea
                  value={techSafeDetail.HLTEXT}
                />
              </td>
            </tr>
            <tr>
              <th>조치내용<br />(도급사)</th>
              <td colSpan="7">
                <TextArea
                  value={techSafeDetail.HLTEXT_CTRT}
                />
              </td>
            </tr>
            <tr>
              <th>Remark</th>
              <td colspan="7">
							  <TextArea
                  value={techSafeDetail.REMARK}
                />
						  </td>
            </tr>
            <tr>
              <th>EQ Inform</th>
              <td>
                {techSafeDetail.fncLpadZeroCode}
                {/* {~fncLpadZeroCode(U_ID_FAB,12)} */}
              </td>
              <th>W/O #</th>
              <td>
                {techSafeDetail.AUFNR_NM}
              </td>
              <th>PM Sheet</th>
              <td>
                {techSafeDetail.INSP_LOT}
              </td>
              <th>PM Sheet Status</th>
              <td>
                {techSafeDetail.INSP_LOT_STATUS_NM}
              </td>
            </tr>
          </table>
        </main>
      </div>
    );
  }
}

export default techSafeView;
