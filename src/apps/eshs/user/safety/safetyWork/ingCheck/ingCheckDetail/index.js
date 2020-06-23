import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select, InputNumber } from 'antd';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdInputNumber = StyledInputNumber(InputNumber);
const AntdTable = StyledLineTable(Table);
const AntdSelect = StyledSelect(Select);

const { Option } = Select;

class IngCheckListComp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { ingCheckDetail, handleChangeDetailFormData, handleRemoveDetailFormData } = this.props;
    const columns = [
      {
        title: '삭제',
        dataIndex: '',
        width: '10%',
        align: 'center',
        render: (value, record, index) => (
          <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => handleRemoveDetailFormData(index)}>
            삭제
          </StyledButton>
        ),
      },
      {
        title: '항목',
        dataIndex: 'ITEM_NM',
        width: '60%',
        align: 'center',
      },
      {
        title: '벌점',
        dataIndex: 'PENALTY',
        width: '10%',
        align: 'center',
      },
      {
        title: '위반횟수',
        dataIndex: 'BREAK_COUNT',
        width: '10%',
        align: 'center',
        render: (value, record, index) => (
          <AntdInputNumber
            className="input-number-xs ant-input-number-inline"
            value={value}
            style={{ width: '100px' }}
            onChange={e => handleChangeDetailFormData(index, 'BREAK_COUNT', e)}
          />
        ),
      },
      {
        title: '대상',
        dataIndex: 'PENALTY_TARGET_GB',
        width: '10%',
        align: 'center',
        render: (value, record, index) => (
          <AntdSelect className="select-xs" style={{ width: '100px' }} value={value} onChange={e => handleChangeDetailFormData(index, 'PENALTY_TARGET_GB', e)}>
            <Option value={1}>발주팀</Option>
            <Option value={2}>작업업체</Option>
            <Option value={3}>발주+업체</Option>
          </AntdSelect>
        ),
      },
    ];

    return (
      <AntdTable
        pagination={false}
        columns={columns}
        dataSource={ingCheckDetail}
        footer={() => <div style={{ textAlign: 'center' }}>{`총 ${ingCheckDetail.length === 0 ? 0 : ingCheckDetail.length} 건`}</div>}
      />
    );
  }
}
IngCheckListComp.propTypes = {
  ingCheckDetail: PropTypes.array,
  handleChangeDetailFormData: PropTypes.func,
  handleRemoveDetailFormData: PropTypes.func,
};

IngCheckListComp.defaultProps = {
  ingCheckDetail: [],
  handleChangeDetailFormData: () => false,
  handleRemoveDetailFormData: () => false,
};

export default IngCheckListComp;
