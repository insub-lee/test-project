/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Input, Select, Button, InputNumber, Checkbox, Popconfirm, message } from 'antd';

const { Option } = Select;
const numberFormat = /(\d+)(\d{3})/;

class NaturalItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelections: [],
    };
  }

  componentDidMount = () => {};

  handleInputOnChange = e => {};

  handleAction = type => {
    switch (type) {
      case 'SAVE':
        break;
      case 'UPDATE':
        break;
      case 'DELETE':
        break;
      case 'RESET':
        break;
      case 'EXCEL_DOWNLOAD':
        message.warning('미구현');
        break;
      case 'EXCEL_UPLOAD':
        message.warning('미구현');
        break;
      default:
        break;
    }
  };

  handleRowSelection = seq => {
    const { rowSelections } = this.state;
    if (rowSelections.indexOf(seq) >= 0) {
      this.setState({ rowSelections: rowSelections.filter(r => r !== seq && r) });
    } else {
      rowSelections.push(seq);
      this.setState({ rowSelections });
    }
  };

  render() {
    const { formData } = this.props;
    const { rowSelections } = this.state;
    const searchFlag = (formData && formData.searchFlag) || false;
    return (
      <div className="MaterialItemTable">
        <table>
          <colgroup>
            <col width="4%" />
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
            <col width="16%" />
          </colgroup>
          <thead>
            <tr>
              <td colSpan={11}>
                <Button onClick={() => this.handleAction('EXCEL_DOWNLOAD')}>Excel Download</Button>
                {!searchFlag && (
                  <>
                    <Button onClick={() => this.handleAction('EXCEL_UPLOAD')}>Excel Upload</Button>
                    <Button onClick={() => this.handleAction('SAVE')}>추가</Button>
                    <>
                      <Button onClick={() => this.handleAction('UPDATE')}>수정</Button>
                      <Popconfirm
                        title="선택하신 내용을(를) 정말로 삭제하시겠습니끼?"
                        onConfirm={() => this.handleAction('DELETE')}
                        okText="확인"
                        cancelText="취소"
                      >
                        <Button>삭제</Button>
                      </Popconfirm>
                      <Button onClick={() => this.handleAction('RESET')}>Reset</Button>
                    </>
                  </>
                )}
              </td>
            </tr>
            <tr>
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
                <InputNumber style={{ width: '100%' }} />
              </td>
              <td>
                <Input />
              </td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={2}>구분</td>
              <td rowSpan={2}>사용처</td>
              <td rowSpan={2}>부하율</td>
              <td colSpan={2}>사용량(月)</td>
            </tr>
            <tr>
              <td></td>
              <td>대분류</td>
              <td>소분류</td>
              <td>사용량</td>
              <td>단위</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7}>0 건</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
NaturalItemTable.defaultProps = {};
export default NaturalItemTable;
