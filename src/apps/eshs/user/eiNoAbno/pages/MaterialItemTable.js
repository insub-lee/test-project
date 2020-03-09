/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, Button, Table } from 'antd';

class MaterialItemTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { searchFlag } = this.props;
    return (
      <div className="MaterialItemTable">
        <table>
          <thead>
            <tr>
              <td colSpan={11}>
                <Button>Excel Download</Button>
                {!searchFlag && (
                  <>
                    <Button>Excel Upload</Button>
                    <Button>추가</Button>
                    <Button>수정</Button>
                    <Button>삭제</Button>
                    <Button>Reset</Button>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
                <Input />
              </td>
              <td>
                <Input />
              </td>
              <td>
                <Input />
              </td>
              <td>
                <Input />
              </td>
              <td>
                <Input />
              </td>
              <td>
                <Input />
              </td>
              <td>
                <Input />
              </td>
              <td>
                <Input />
              </td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>
                <span>삭제</span>
              </td>
              <td rowSpan={2}>
                <span>Seq</span>
              </td>
              <td rowSpan={2}>
                <span>구분</span>
              </td>
              <td rowSpan={2}>
                <span>
                  영향구분
                  <br />
                  (정상/비정상)
                </span>
                )
              </td>
              <td colSpan={5}>
                <span>IN-PUT</span>
              </td>
              <td colSpan={2}>
                <span>OUT-PUT</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>물질명</span>
              </td>
              <td>
                <span>구성성분</span>
              </td>
              <td>
                <span>사용량</span>
              </td>
              <td>
                <span>단위</span>
              </td>
              <td>
                <span>투입형태</span>
              </td>
              <td>
                <span>배출형태</span>
              </td>
              <td>
                <span>배출처</span>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}
MaterialItemTable.defaultProps = {
  deptList: [],
};
export default MaterialItemTable;
