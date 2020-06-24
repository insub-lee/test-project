import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Input } from 'antd';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdInput = StyledInput(Input);
const AntdTable = StyledLineTable(Table);
const AntdSelect = StyledSelect(Select);

const { Option } = Select;

class BfCheckDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData, handleChangeDetailFormData, handleRemoveDetailFormData } = this.props;
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
        title: '작업종류',
        dataIndex: 'WCATEGORY',
        width: '10%',
        align: 'center',
      },
      {
        title: '항목명',
        dataIndex: 'ITEM_NM',
        width: '40%',
        align: 'center',
      },
      {
        title: '점검여부',
        dataIndex: 'CHECK_RESULT',
        width: '10%',
        align: 'center',
        render: (value, record, index) => (
          <AntdSelect className="select-xs" style={{ width: '100px' }} value={value} onChange={e => handleChangeDetailFormData(index, 'CHECK_RESULT', e)}>
            <Option value="N/A">N/A</Option>
            <Option value="적합">적합</Option>
            <Option value="부적합">부적합</Option>
          </AntdSelect>
        ),
      },
      {
        title: '점검결과',
        dataIndex: 'CHECK_CONTENT',
        width: '30%',
        align: 'center',
        render: (value, record, index) => (
          <AntdInput className="ant-input-xs" value={value} onChange={e => handleChangeDetailFormData(index, 'CHECK_CONTENT', e.target.value)} />
        ),
      },
    ];
    return (
      <AntdTable
        pagination={false}
        columns={columns}
        dataSource={formData}
        footer={() => <div style={{ textAlign: 'center' }}>{`총 ${formData.length === 0 ? 0 : formData.length} 건`}</div>}
      />
    );
  }
}
BfCheckDetail.propTypes = {
  formData: PropTypes.array,
  handleChangeDetailFormData: PropTypes.func,
  handleRemoveDetailFormData: PropTypes.func,
};

BfCheckDetail.defaultProps = {
  formData: [],
  handleChangeDetailFormData: () => false,
  handleRemoveDetailFormData: () => false,
};

export default BfCheckDetail;
