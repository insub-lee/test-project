import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Table } from 'antd';

// Common Styled Wrapp - <Styled>JSX</Styled>
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledSelect from 'commonStyled/EshsStyled/Select/StyledSelect';

// Common Styled  - styled(JSX)
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledInput from 'commonStyled/Form/StyledInput';
import Styled from './Styled';

const { Option } = Select;
const AntdInput = StyledInput(Input);
const AntdTable = StyledLineTable(Table);

class HstCmpnySelectTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { eshsHstCmpnyList, OnClick, handleFormDataOnchange } = this.props;
    const columns = [
      {
        title: '코드',
        dataIndex: 'HST_CMPNY_CD',
        width: '10%',
        align: 'center',
      },
      {
        title: '회사명',
        dataIndex: 'HST_CMPNY_NM',
        width: '90%',
        align: 'center',
      },
    ];
    return (
      <Styled>
        <div>
          <span className="input-label">검색구분</span>
          <StyledSelect style={{ display: 'inline' }}>
            <Select style={{ width: '120px' }}>
              <Option value="HST_CMPNY_NM">회사명</Option>
              <Option value="HST_CMPNY_CD">코드</Option>
            </Select>
          </StyledSelect>
          <span className="input-label">검색어</span>
          <AntdInput className="ant-input-sm" style={{ width: '200px', display: 'inline' }} onClick={OnClick} />
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => console.debug('검색')} style={{ marginBottom: '5px' }}>
            검색
          </StyledButton>
        </div>
        <ContentsWrapper>
          <AntdTable
            columns={columns}
            dataSource={eshsHstCmpnyList}
            onRow={record => ({
              onClick: () => handleFormDataOnchange('LECT_CMPNY_CD', record.HST_CMPNY_CD, true),
            })}
            footer={() => (
              <div style={{ textAlign: 'center' }}>{`총 ${eshsHstCmpnyList && eshsHstCmpnyList.length === 0 ? 0 : eshsHstCmpnyList.length} 건`}</div>
            )}
          />
        </ContentsWrapper>
      </Styled>
    );
  }
}

HstCmpnySelectTable.propTypes = {
  eshsHstCmpnyList: PropTypes.array,
  handleFormDataOnchange: PropTypes.func,
  OnClick: PropTypes.func,
};

HstCmpnySelectTable.defaultProps = {
  handleFormDataOnchange: () => false,
  OnClick: () => false,
};

export default HstCmpnySelectTable;
