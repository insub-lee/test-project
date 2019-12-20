import React, { Component } from 'react';
import { Table, Input } from 'antd';
import PropTypes from 'prop-types';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
// import IconCollection from 'components/IconCollection';
import Button from '../../../styled/StyledButton';

import Styled from './Styled';

const AntdTable = StyledAntdTable(Table);
const { Search } = Input;

class List extends Component {
  rowClick = item => {
    const { onChangeMovePageHandler } = this.props;
    onChangeMovePageHandler('VIEW', item.WORK_SEQ, item.TASK_SEQ);
  };

  columns = [
    {
      title: '제목',
      dataIndex: 'TITLE',
      key: 'TITLE',
      render: (text, record) => (
        <Button type="button" className="btn-sm" onClick={() => this.rowClick(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: '등록자',
      dataIndex: 'REG_NAME_KOR',
      key: 'REG_NAME_KOR',
      align: 'center',
      width: 150,
    },
    {
      title: '등록일',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      align: 'center',
      width: 150,
    },
  ];

  componentDidMount() {}

  render() {
    console.log('this.props : ', this.props);
    const { responseData } = this.props;
    const { list } = responseData;
    return (
      <Styled>
        <div className="list-btn list-top-btn" style={{ padding: '5px' }}>
          <Search placeholder="input search text" onSearch={value => console.log(value)} style={{ width: 200 }} />
          <Button type="button" className="btn-primary" onClick={() => this.props.onChangeMovePageHandler('EDIT', -1, -1)}>
            글쓰기
          </Button>
          {/* <Button type="button" className="btn-primary">
            <IconCollection className="icon-postdata" />
            <span>게시자료</span>
          </Button>
          <Button type="button" className="btn-outline-primary">
            <IconCollection className="icon-registration" />
            <span>나의 등록글</span>
          </Button>
          <Button type="button" className="btn-outline-primary">
            <IconCollection className="icon-timeover" />
            <span>게시만료글</span>
          </Button> */}
        </div>
        <div>
          <AntdTable columns={this.columns} dataSource={list} />
        </div>
      </Styled>
    );
  }
}

List.propTypes = {
  responseData: PropTypes.object,
  // onChangePage: PropTypes.func,
  // onChangeMovePage: PropTypes.func,
  onChangeMovePageHandler: PropTypes.func,
};

List.defaultProps = {
  // onChangePage: () => false,
  // onChangeMovePage: () => false,
};

export default List;
