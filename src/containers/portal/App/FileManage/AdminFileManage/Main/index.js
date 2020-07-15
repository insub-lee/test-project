import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Statistic, Card, Row, Col } from 'antd';
import { HddOutlined, UserOutlined, FileTextOutlined, FileExclamationOutlined } from '@ant-design/icons';
import StyledAntdTable from 'commonStyled/Table/StyledAntdTable';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import * as feed from 'components/Feedback/functions';

import * as fileUtil from '../../fileManageUtil';

const AntdTable = StyledAntdTable(Table);
const AntdInput = StyledInput(Input);

class AdminMain extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      page: 1,
      pageSize: 5,
      loading: false,
    };
    this.searchInputRef = React.createRef();
  }

  componentDidMount() {
    const { getAdminMain } = this.props;
    getAdminMain();
    this.getUserFileListFirst();
  }

  fileColumns = [
    {
      title: '파일명',
      dataIndex: 'NAME',
      key: 'NAME',
      width: '20%',
      ellipsis: true,
    },
    {
      title: '크기',
      dataIndex: 'FILE_SIZE',
      key: 'FILE_SIZE',
      align: 'center',
      width: '10%',
      render: text => fileUtil.getFileSize(text),
    },
    {
      title: '파일유형',
      dataIndex: 'EXT',
      key: 'EXT',
      align: 'center',
      width: '10%',
      render: text => fileUtil.getFileIcon(text),
    },
    {
      title: '최종수정',
      dataIndex: 'MOD_DT',
      key: 'MOD_DT',
      width: '20%',
      align: 'center',
    },
    {
      title: '사용자 정보',
      dataIndex: 'EMP_NO',
      key: 'EMP_NO',
      width: '20%',
      align: 'center',
      render: (text, record) => `${record.DEPT_NAME}  / ${text} / ${record.USER_NAME}`,
    },
    {
      title: '기능',
      dataIndex: 'SEQ',
      key: 'SEQ',
      width: '20%',
      align: 'center',
      render: (text, record) => (
        <>
          <StyledButton className="btn-link" onClick={e => fileUtil.confirmDownload(e, text, record.NAME)}>
            파일받기
          </StyledButton>
          <StyledButton className="btn-link" onClick={() => this.deleteFile(record.SEQ, record.NAME, record.USER_ID)}>
            삭제
          </StyledButton>
        </>
      ),
    },
  ];

  // 리스트
  getUserFileListFirst = () => {
    const { getUserFileList } = this.props;
    const { pageSize } = this.state;
    this.setState({ page: 1, loading: true });
    this.searchInputRef.current.state.value = '';
    getUserFileList('', 1, pageSize, this.resetLoading);
  };

  getUserFileList = () => {
    const { getUserFileList } = this.props;
    const { page, pageSize } = this.state;
    this.setState({ loading: true });
    const keyword = this.searchInputRef.current.state.value || '';
    getUserFileList(keyword, page, pageSize, this.resetLoading);
  };

  handleSearch = () => {
    this.setState({ page: 1 }, this.getUserFileList);
  };

  handleOnChange = pagination => {
    this.setState({ page: pagination.current }, this.getUserFileList);
  };

  resetLoading = () => {
    this.setState({ loading: false });
  };

  // 파일 삭제
  deleteFile = (fileSeq, fileName, userId) => {
    const { deleteFile, getAdminMain } = this.props;
    const callback = () => {
      this.getUserFileList();
      getAdminMain();
    };
    feed.showConfirm(`${fileName} 파일을 삭제합니다. 계속 하시겠습니까?`, '', () => deleteFile(fileSeq, userId, callback));
  };

  render() {
    const { list, total, adminMain } = this.props;
    const { page, loading, pageSize } = this.state;
    const size = fileUtil.getFileSize(adminMain.SIZE);
    return (
      <>
        <div className="main-dashboard">
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Usage"
                  value={size.split(' ')[0] || '0'}
                  precision={2}
                  valueStyle={{ color: '#000000' }}
                  prefix={<HddOutlined style={{ color: '#5d5656', fontSize: '50px' }} />}
                  suffix={size.split(' ')[1] || 'GB'}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Users"
                  value={adminMain.USER}
                  precision={0}
                  valueStyle={{ color: '#000000' }}
                  prefix={<UserOutlined style={{ color: '#677ebf', fontSize: '50px' }} />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Sharing"
                  value={adminMain.SHARE}
                  precision={0}
                  valueStyle={{ color: '#000000' }}
                  prefix={<FileTextOutlined style={{ color: '#3ca4a9', fontSize: '50px' }} />}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Expired"
                  value={adminMain.EXPIRED}
                  precision={0}
                  valueStyle={{ color: '#000000' }}
                  prefix={<FileExclamationOutlined style={{ color: '#e65656', fontSize: '50px' }} />}
                  suffix=""
                />
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{ borderBottom: 'solid #344051', marginBottom: '10px', paddingBottom: '10px' }}>
          <h3>최신 업로드 파일 목록</h3>
        </div>
        <div className="search-area">
          <AntdInput
            style={{ width: 200 }}
            className="ant-input-sm ant-input-inline mr5"
            placeholder="검색어를 입력해 주세요."
            onPressEnter={this.handleSearch}
            ref={this.searchInputRef}
            maxLength="50"
          ></AntdInput>
          <StyledButton className="btn-gray btn-sm" onClick={this.handleSearch}>
            검색
          </StyledButton>
        </div>
        <div>
          <AntdTable
            dataSource={list}
            loading={loading}
            columns={this.fileColumns}
            onChange={this.handleOnChange}
            pagination={{ current: page, total, pageSize }}
          />
        </div>
      </>
    );
  }
}

AdminMain.propTypes = {
  list: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  getUserFileList: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  adminMain: PropTypes.object.isRequired,
  getAdminMain: PropTypes.func.isRequired,
};

export default AdminMain;
