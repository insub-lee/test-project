import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';
import TableWrapper from 'commonStyled/AdminStyled/TableWrapper';
import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);
const Detail = ({ sagaKey, formData, changeFormData }) => (
  <TableWrapper>
    <div className="inner">
      <table>
        <tbody>
          <tr className="item">
            <th className="item-title">데이터노드명</th>
            <td className="item-cont">
              <AntdInput value={formData.NAME_KOR} onChange={e => changeFormData(sagaKey, 'NAME_KOR', e.target.value)} />
            </td>
          </tr>
          <tr className="item">
            <th className="item-title">데이터노드 클래스</th>
            <td className="item-cont">
              <AntdInput value={formData.SERVICE_NAME} onChange={e => changeFormData(sagaKey, 'SERVICE_NAME', e.target.value)} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </TableWrapper>
);

export default Detail;
