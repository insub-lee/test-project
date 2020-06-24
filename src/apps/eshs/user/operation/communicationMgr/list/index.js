import React from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Input, DatePicker } from 'antd';
import StyledSelect from 'components/BizBuilder/styled/Form/StyledSelect';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
const AntdDatePicker = StyledDatePicker(DatePicker);
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  columns = [
    {
      title: 'No',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '접수',
      children: [
        {
          title: '접수일자',
          dataIndex: '',
          align: 'center',
        },
        {
          title: '발행처',
          dataIndex: '',
          align: 'center',
        },
        {
          title: '제목 (접수내역)',
          dataIndex: '',
          align: 'center',
        },
      ],
    },
    {
      title: '조치/회신',
      children: [
        {
          title: '회신일자',
          dataIndex: '',
          align: 'center',
        },
        {
          title: '조치/회신내용(방법, 요약)',
          dataIndex: '',
          align: 'center',
        },
        {
          title: '관련문서',
          dataIndex: '',
          align: 'center',
        },
      ],
    },
  ];

  render() {
    const { columns } = this;
    const { dataSource } = this.state;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <span className="text-label">지역</span>
              <AntdSelect className="select-sm" style={{ width: '10%' }}>
                <Select.Option value={317}>청주</Select.Option>
                <Select.Option value={318}>구미</Select.Option>
              </AntdSelect>
            </div>
            <div className="search-input-area mb10">
              <span className="text-label">접수</span>
              <span className="text-label">접수일자</span>
              <AntdDatePicker className="ant-picker-sm" style={{ width: '15%' }} />
              <span className="text-label">발행처</span>
              <AntdInput className="ant-input-sm" style={{ width: '25%' }} placeholder="발행처를 입력하세요." />
              <span className="text-label">제목</span>
              <AntdInput className="ant-input-sm" style={{ width: '25%' }} placeholder="제목을 입력하세요." />
            </div>
            <div className="search-input-area">
              <span className="text-label">조치/회신</span>
              <span className="text-label">회신일자</span>
              <AntdDatePicker className="ant-picker-sm" style={{ width: '15%' }} />
              <span className="text-label">관련문서</span>
              <AntdInput className="ant-input-sm" style={{ width: '25%' }} placeholder="관련문서를 입력하세요." />
              <span className="text-label">조치/회신 내용</span>
              <AntdInput className="ant-input-sm" style={{ width: '25%' }} placeholder="조치/회신 내용을 입력하세요." />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm">검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm mr5">신규등록</StyledButton>
          </StyledButtonWrapper>

          <AntdTable columns={columns} dataSource={dataSource} />
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {};
List.defaultProps = {};

export default List;
