import React from 'react';
import PropTypes from 'prop-types';

import { Input, Select } from 'antd';
import TableWrapper from 'commonStyled/AdminStyled/TableWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const { Option } = Select;
const ClassNameInput = ({ sagaKey, formData, changeFormData }) => (
  <TableWrapper>
    <div className="inner">
      <table>
        <tbody>
          <tr className="item">
            <th className="item-title">Class 명</th>
            <td className="item-cont">
              <AntdInput value={formData.CLASS_NAME} onChange={e => changeFormData(sagaKey, 'CLASS_NAME', e.target.value)} />
            </td>
          </tr>
          <tr className="item">
            <th className="item-title">사용여부</th>
            <td className="item-cont">
              <Select
                value={formData.ISUSED}
                placeholder="사용여부를 선택해주세요"
                onChange={val => changeFormData(sagaKey, 'ISUSED', val)}
                style={{ width: '300px' }}
              >
                <Option value="Y">사용</Option>
                <Option value="N">미사용</Option>
              </Select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </TableWrapper>
);

export default ClassNameInput;
