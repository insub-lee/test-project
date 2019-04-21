import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class searchRejectComment extends PureComponent {
  constructor(props) {
    super(props);
    const { match } = props;
    const { params } = match;
    const { PARAM } = params;
    const arryParam = PARAM.split('|');
    this.state = {
      eqId: arryParam[0],
      pmSheetNo: arryParam[1],
      reqName: arryParam[2],
      appName: arryParam[3],
      appComment: arryParam[4],
    };
  }

  render() {
    const {
      eqId,
      pmSheetNo,
      reqName,
      appName,
      appComment,
    } = this.state;
    return (
      <div>
        <div>
          <h1>PM Sheet 부결내역</h1>
        </div>
        <div>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>EQ ID</th>
                  <td><span>{eqId}</span></td>
                  <th>PM Sheet No</th>
                  <td><span>{pmSheetNo}</span></td>
                </tr>
                <tr>
                  <th>기안자</th>
                  <td><span>{reqName}</span></td>
                  <th>승인자</th>
                  <td><span>{appName}</span></td>
                </tr>
                <tr>
                  <th>부결사유</th>
                  <td><span>{appComment}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
searchRejectComment.propTypes = {
  match: PropTypes.object.isRequired,
};

export default searchRejectComment;
