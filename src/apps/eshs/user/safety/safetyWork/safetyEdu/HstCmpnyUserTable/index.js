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
    this.state = {
      searchType: 'SQ_SWTB_HST_CMPNY_EMP',
      searchValue: '',
      searchResult: props.eshsHstCmpnyUserList,
    };
  }

  search = () => {
    const { eshsHstCmpnyUserList } = this.props;
    const { searchValue, searchType } = this.state;
    if (searchValue === '') {
      this.setState({
        searchResult: eshsHstCmpnyUserList,
      });
      return;
    }
    this.setState({
      searchResult: eshsHstCmpnyUserList.filter(item => item[searchType] === searchValue),
    });
  };

  render() {
    const { searchType, searchResult } = this.state;
    const { eshsHstCmpnyUserList, rowOnclick } = this.props;
    const columns = [
      {
        title: '사번',
        dataIndex: 'SQ_SWTB_HST_CMPNY_EMP',
        width: '10%',
        align: 'center',
      },
      {
        title: '이름',
        dataIndex: 'EMP_NM',
        width: '20%',
        align: 'center',
      },
      {
        title: '직책',
        dataIndex: 'DUTY',
        width: '20%',
        align: 'center',
      },
      {
        title: '전화',
        dataIndex: 'TEL',
        width: '20%',
        align: 'center',
      },
      {
        title: '소속',
        dataIndex: 'BELONG',
        width: '30%',
        align: 'center',
      },
    ];
    return (
      <Styled>
        <div>
          <span className="input-label">검색구분</span>
          <StyledSelect style={{ display: 'inline' }}>
            <Select defaultValue={searchType} style={{ width: '120px' }} onChange={e => this.setState({ searchType: e })}>
              <Option value="SQ_SWTB_HST_CMPNY_EMP">사번</Option>
              <Option value="EMP_NM">이름</Option>
              <Option value="DUTY">직책</Option>
              <Option value="TEL">전화</Option>
              <Option value="DEPT_NM">부서명</Option>
              <Option value="HST_CMPNY_CD">부서코드</Option>
            </Select>
          </StyledSelect>
          <span className="input-label">검색어</span>
          <AntdInput className="ant-input-sm" style={{ width: '200px', display: 'inline' }} onChange={e => this.setState({ searchValue: e.target.value })} />
          <StyledButton className="btn-primary btn-sm btn-first" onClick={() => this.search()} style={{ marginBottom: '5px' }}>
            검색
          </StyledButton>
        </div>
        <ContentsWrapper>
          <AntdTable
            columns={columns}
            dataSource={searchResult}
            onRow={record => ({
              onClick: () => rowOnclick(record),
            })}
            footer={() => (
              <div style={{ textAlign: 'center' }}>{`총 ${
                eshsHstCmpnyUserList && eshsHstCmpnyUserList.length === 0 ? 0 : eshsHstCmpnyUserList.length
              } 명`}</div>
            )}
          />
        </ContentsWrapper>
      </Styled>
    );
  }
}

HstCmpnySelectTable.propTypes = {
  eshsHstCmpnyUserList: PropTypes.array,
  handleFormDataOnchange: PropTypes.func,
  OnClick: PropTypes.func,
};

HstCmpnySelectTable.defaultProps = {
  handleFormDataOnchange: () => false,
  OnClick: () => false,
};

export default HstCmpnySelectTable;
