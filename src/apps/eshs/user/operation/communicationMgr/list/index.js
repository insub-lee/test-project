import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
    this.state = {};
  }

  columns = [
    {
      title: 'No',
      dataIndex: 'RNUM',
      align: 'center',
      width: '5%',
    },
    {
      title: '접수',
      children: [
        {
          title: '접수일자',
          dataIndex: 'RECEIVE_DATE',
          align: 'center',
          render: record => moment(record.RECEIVE_DATE).format('YYYY-MM-DD'),
          width: '15%',
        },
        {
          title: '발행처',
          dataIndex: 'PUBLICATION',
          align: 'center',
          width: '20%',
        },
        {
          title: '제목 (접수내역)',
          dataIndex: 'TITLE',
          align: 'center',
          width: '20%',
          ellipsis: true,
        },
      ],
    },
    {
      title: '조치/회신',
      children: [
        {
          title: '회신일자',
          dataIndex: 'REPLY_DATE',
          align: 'center',
          render: record => moment(record.REPLY_DATE).format('YYYY-MM-DD'),
          width: '15%',
        },
        {
          title: '조치/회신내용(방법, 요약)',
          dataIndex: 'REPLY_CONTENT',
          align: 'center',
          width: '20%',
          ellipsis: true,
        },
        {
          title: '관련문서',
          dataIndex: 'FILE_NAME',
          align: 'center',
          width: '15%',
        },
      ],
    },
  ];

  render() {
    const { columns } = this;
    // const { dataSource } = this.state;
    const { listData } = this.props;
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
              <AntdDatePicker className="ant-picker-mid" defaultValue={moment()} style={{ width: '15%' }} />
              <span className="text-label">발행처</span>
              <AntdInput className="ant-input-mid" style={{ width: '25%' }} placeholder="발행처를 입력하세요." />
              <span className="text-label">제목</span>
              <AntdInput className="ant-input-mid" style={{ width: '25%' }} placeholder="제목을 입력하세요." />
            </div>
            <div className="search-input-area">
              <span className="text-label">조치/회신</span>
              <span className="text-label">회신일자</span>
              <AntdDatePicker className="ant-picker-mid" defaultValue={moment()} style={{ width: '15%' }} />
              <span className="text-label">관련문서</span>
              <AntdInput className="ant-input-mid" style={{ width: '25%' }} placeholder="관련문서를 입력하세요." />
              <span className="text-label">조치/회신 내용</span>
              <AntdInput className="ant-input-mid" style={{ width: '25%' }} placeholder="조치/회신 내용을 입력하세요." />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm">검색</StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <StyledButtonWrapper className="btn-wrap-right btn-wrap-mb-10">
            <StyledButton className="btn-primary btn-sm mr5">신규등록</StyledButton>
          </StyledButtonWrapper>
          <AntdTable columns={columns} dataSource={listData} />
        </StyledContentsWrapper>
      </>
    );
  }
}

List.propTypes = {
  listData: PropTypes.arrayOf('object'),
};
List.defaultProps = {
  listData: [],
};

export default List;
