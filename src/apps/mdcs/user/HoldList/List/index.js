import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import moment from 'moment';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledHeaderWrapper from 'components/BizBuilder/styled/Wrapper/StyledHeaderWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

const AntdTable = StyledAntdTable(Table);
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holdList: [],
    };
  }

  columns = [
    {
      title: '표준번호',
      dataIndex: 'docnumber',
      key: 'docnumber',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Rev.',
      dataIndex: 'version',
      key: 'version',
      align: 'center',
      width: '5%',
      render: (text, record) => text.split('.')[0],
    },
    {
      title: 'Title',
      dataIndex: 'draft_title',
      key: 'draft_title',
      width: '38%',
    },
    {
      title: '기안자',
      dataIndex: 'reg_user_name',
      key: 'reg_user_name',
      align: 'center',
      width: '10%',
    },
    {
      title: '기안부서',
      dataIndex: 'reg_dept_name',
      key: 'reg_dept_name',
      align: 'center',
      width: '15%',
    },
    {
      title: '결재상태',
      dataIndex: 'statusnm',
      key: 'statusnm',
      align: 'center',
      width: '7%',
    },
    {
      title: '결재자',
      dataIndex: 'appv_user_name',
      key: 'appv_user_name',
      align: 'center',
      width: '7%',
    },
    {
      title: '결재일',
      dataIndex: 'appv_dttm',
      key: 'appv_dttm',
      align: 'center',
      width: '10%',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  initDataBind = (id, response) => {
    const { result } = response;
    console.debug('response', response);
    this.setState({ holdList: result });
  };

  componentDidMount() {
    console.debug('this.props', this.props);
    const { sagaKey, submitHandlerBySaga } = this.props;
    const fixUrl = '/api/workflow/v1/common/HoldListHandler';
    submitHandlerBySaga(sagaKey, 'GET', fixUrl, {}, this.initDataBind);
  }

  render() {
    const { holdList } = this.state;
    return (
      <>
        <StyledHeaderWrapper>
          <div className="pageTitle">
            <p>
              <Icon type="form" /> Hold History List.
              <div className="btnPositonMid">
                <StyledButton className="btn-gray btn-sm" onClick={this.onClickSave}>
                  <SaveOutlined /> excel Load
                </StyledButton>
              </div>
            </p>
          </div>
        </StyledHeaderWrapper>
        <StyledContentsWrapper>
          {holdList && holdList.length > 0 && (
            <AntdTable
              columns={this.columns}
              dataSource={holdList}
              expandedRowRender={record => <div>홀드사유: {record.opinion}</div>}
              pagination={false}
              bordered
              defaultExpandAllRows
            />
          )}
        </StyledContentsWrapper>
      </>
    );
  }
}

export default List;
