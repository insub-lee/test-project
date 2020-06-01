import React from 'react';
import PropTypes from 'prop-types';
import { Select, Input, DatePicker, InputNumber } from 'antd';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledPicker from 'commonStyled/Form/StyledPicker';
import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdSelect = StyledSelect(Select);
const AntdPicker = StyledPicker(DatePicker.RangePicker);
const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
class ModalContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="tableWrapper">
          <StyledHtmlTable>
            <table>
              <colgroup>
                <col width="10%" />
                <col width="20%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>지역</th>
                  <td>
                    <AntdSelect className="select-sm"></AntdSelect>
                  </td>
                </tr>
                <tr>
                  <th>품목</th>
                  <td></td>
                </tr>
                <tr>
                  <th>모델</th>
                  <td>
                    <AntdInput className="ant-input-sm" />
                  </td>
                </tr>
                <tr>
                  <th>사이즈</th>
                  <td>
                    <AntdInput className="ant-input-sm" />
                  </td>
                </tr>
                <tr>
                  <th>검정번호</th>
                  <td>
                    <AntdInput className="ant-input-sm" />
                  </td>
                </tr>
                <tr>
                  <th>Vendor</th>
                  <td>
                    <AntdInput className="ant-input-sm" />
                  </td>
                </tr>
                <tr>
                  <th>Maker</th>
                  <td>
                    <AntdInput className="ant-input-sm" />
                  </td>
                </tr>
                <tr>
                  <th>단위</th>
                  <td>
                    <AntdInput className="ant-input-sm" />
                  </td>
                </tr>
                <tr>
                  <th>입고일</th>
                  <td>
                    <AntdPicker className="ant-picker-sm" />
                  </td>
                </tr>
                <tr>
                  <th>단가</th>
                  <td>
                    <AntdInputNumber className="ant-input-number-sm" />
                  </td>
                </tr>
                <tr>
                  <th>수량</th>
                  <td>
                    <AntdInputNumber className="ant-input-number-sm" />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
        </div>
      </>
    );
  }
}

ModalContents.propTypes = {};

ModalContents.defatulProps = {};

export default ModalContents;
