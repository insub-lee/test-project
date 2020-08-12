import React from 'react';
import { Select } from 'antd';

import TableWrapper from 'commonStyled/AdminStyled/TableWrapper';
import message from 'components/Feedback/message';

const { Option } = Select;

const validText = (event, key, changeFormData) => {
  const reg = /[^A-Za-z0-9_-]/gi;
  if (reg.test(event.target.value)) {
    message.info('영문 대문자, 숫자, -, _만 사용가능');
    event.target.value = event.target.value.replace(/[^A-Za-z0-9_-]/gi, '').toUpperCase();
  } else {
    const vals = event.target.value.toUpperCase();
    changeFormData('TOTAL_BUILDER_ID', vals);
  }
};

const InputModal = ({ formData, changeFormData }) => (
  <TableWrapper>
    <div className="inner">
      <table>
        <tbody>
          <tr className="item">
            <th className="item-title">ID</th>
            <td className="item-cont">
              <input className="styled-input" value={formData.TOTAL_BUILDER_ID} onChange={e => validText(e, 'TOTAL_BUILDER_ID', changeFormData)} />
            </td>
          </tr>
          <tr className="item">
            <th className="item-title">빌드 구분명</th>
            <td className="item-cont">
              <input className="styled-input" value={formData.TOTAL_BUILDER_NAME} onChange={e => changeFormData('TOTAL_BUILDER_NAME', e.target.value)} />
            </td>
          </tr>
          <tr className="item">
            <th className="item-title">사용여부</th>
            <td className="item-cont">
              <Select value={formData.ISUSED} placeholder="사용여부를 선택해주세요" onChange={val => changeFormData('ISUSED', val)} style={{ width: '300px' }}>
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

export default InputModal;
