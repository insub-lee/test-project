import React from 'react';
import PropTypes from 'prop-types';

import { Input, Select } from 'antd';
import TableWrapper from 'commonStyled/AdminStyled/TableWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const { Option } = Select;
const ApiInput = ({ sagaKey, formData, changeFormData }) => (
  <TableWrapper>
    <div className="inner">
      <table>
        <tbody>
          <tr className="item">
            <th className="item-title">API명</th>
            <td className="item-cont">
              <AntdInput value={formData.API_NAME} onChange={e => changeFormData(sagaKey, 'API_NAME', e.target.value)} />
            </td>
          </tr>
          <tr className="item">
            <th className="item-title">API 경로</th>
            <td className="item-cont">
              <AntdInput value={formData.API_SRC} onChange={e => changeFormData(sagaKey, 'API_SRC', e.target.value)} />
            </td>
          </tr>
          <tr className="item">
            <th className="item-title">Method Type</th>
            <td className="item-cont">
              <Select
                value={formData.METHOD_TYPE}
                placeholder="선택해주세요"
                onChange={val => changeFormData(sagaKey, 'METHOD_TYPE', val)}
                style={{ width: '300px' }}
              >
                <Option value="get">GET</Option>
                <Option value="post">POST</Option>
                <Option value="put">PUT</Option>
                <Option value="delete">DELETE</Option>
              </Select>
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

export default ApiInput;
