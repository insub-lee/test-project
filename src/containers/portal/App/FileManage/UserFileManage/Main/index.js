import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Input, Select, Statistic, Card, Row, Col, Progress, TreeSelect } from 'antd';
import { fromJS } from 'immutable';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MinusCircleTwoTone, FileTextOutlined, FileExclamationOutlined } from '@ant-design/icons';

import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import * as feed from 'components/Feedback/functions';
import { BtnRedShare } from 'components/uielements/styles/buttons.style';
import Upload from 'components/Upload';
import StyledButton from 'commonStyled/Buttons/StyledButton';

import * as fileUtil from '../../fileManageUtil';

const AntdSelect = StyledSelect(Select);
const AntdInput = StyledInput(Input);
const { Option } = Select;

class UserMain extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      selectedFolder: undefined,
      tempuploadFiles: [],
      uploadFiles: [],
      expDay: 10,
      dlLimt: 10,
      flag: false,
    };
  }

  componentDidMount() {
    // 메인 데이타
    const { getUserFileManage } = this.props;
    getUserFileManage();
  }

  // 파일 업로드
  onTempFileUploaded = file => {
    const { tempuploadFiles } = this.state;
    const tmpArr = fromJS(tempuploadFiles).toJS();
    // tmpArr.push(file);

    // 파일 용량 체크
    const {
      userFileManage: { UPLOAD_FILE_SIZE, UPLOAD_LIMIT_SIZE, STORAGE_SIZE },
    } = this.props;
    const limit = Number(UPLOAD_LIMIT_SIZE) * 1024 * 1024; // MB
    const storage = Number(STORAGE_SIZE) * 1024 * 1024; // MB

    if (limit <= file.size) {
      feed.error(`업로드 용량 초과 (${fileUtil.getFileSize(limit)} )`);
    } else {
      tmpArr.push(file);
      const reducer = (accumulator, currentValue) => accumulator + currentValue.size;
      if (storage <= tmpArr.reduce(reducer, UPLOAD_FILE_SIZE)) {
        feed.error(`저장 용량 초과 (${fileUtil.getFileSize(storage)})`);
      }
    }
    this.setState({ tempuploadFiles: tmpArr });
  };

  removeTempUploadedFile = seq => {
    const { tempuploadFiles } = this.state;
    const tmpArr = fromJS(tempuploadFiles).toJS();
    this.setState({
      tempuploadFiles: tmpArr.filter(el => el.seq !== seq),
    });
  };

  uploadFile = () => {
    const { uploadFile, getUserFileManage, getUserFolderTree } = this.props;
    const { tempuploadFiles, selectedFolder } = this.state;
    if (selectedFolder && selectedFolder > 0) {
      if (tempuploadFiles.length > 0) {
        const callback = fileArray => {
          this.setState({ tempuploadFiles: [], uploadFiles: fileArray, flag: false });
          // 대시보드, 트리 새로고침
          getUserFileManage();
          getUserFolderTree();
        };
        uploadFile(selectedFolder, tempuploadFiles, 'QUICK', callback);
      } else {
        feed.error('업로드할 파일을 선택해주세요.');
      }
    } else {
      feed.error('업로드할 폴더를 선택해주세요.');
    }
  };

  // 링크 생성
  confirmDownloadLink = () => {
    const { uploadFiles, expDay, dlLimt } = this.state;
    if (uploadFiles.length > 0) {
      const title = uploadFiles.length === 1 ? uploadFiles[0].fileName : `${uploadFiles[0].fileName} 외 ${uploadFiles.length - 1}개`;
      feed.showConfirm(`${title} 파일의 공유 링크를 생성 하시겠습니까?`, '', () => this.getFileShareLink(Number(expDay), Number(dlLimt)));
    } else {
      feed.error('공유할 파일을 업로드 해 주세요.');
    }
  };

  getFileShareLink = (expDay, downloadLimit) => {
    const { getFileShareLink } = this.props;
    const { uploadFiles } = this.state;
    getFileShareLink(uploadFiles, expDay, downloadLimit, this.setDownloadLink);
  };

  setDownloadLink = link => {
    this.setState({ uploadFiles: link, flag: true });
  };

  onTreeChange = value => {
    this.setState({ selectedFolder: value });
  };

  render() {
    const { userFileManage, treeData, menuFixedYn } = this.props;
    const { expDay, dlLimt, tempuploadFiles, selectedFolder, uploadFiles, flag } = this.state;
    const usage = (userFileManage.UPLOAD_FILE_SIZE / 1024 / (userFileManage.STORAGE_SIZE * 1024)) * 100;
    // const usageValue = fileUtil.getFileSize(userFileManage.UPLOAD_FILE_SIZE);
    return (
      <>
        <div className="main-dashboard">
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Usage"
                  precision={0}
                  valueStyle={{ color: '#000000' }}
                  prefix={<Progress type="dashboard" percent={parseFloat(usage.toFixed(1))} width={52} />}
                  value={fileUtil.getFileSize(userFileManage.UPLOAD_FILE_SIZE)}
                  suffix={menuFixedYn === 'N' ? `/ ${userFileManage.STORAGE_SIZE} MB` : ''}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Files"
                  precision={0}
                  valueStyle={{ color: '#000000' }}
                  prefix={<FileTextOutlined style={{ color: '#3ca4a9', fontSize: '50.29px' }} />}
                  value={userFileManage.UPLOAD_FILE_CNT}
                  suffix=""
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Expired"
                  precision={0}
                  valueStyle={{ color: '#000000' }}
                  prefix={<FileExclamationOutlined style={{ color: '#e65656', fontSize: '50.29px' }} />}
                  value={userFileManage.EXPIRED}
                  suffix=""
                />
              </Card>
            </Col>
          </Row>
        </div>
        <div className="quick-menu">
          <h3>Quick Menu</h3>
        </div>
        <div className="quick-menu-main">
          <div className="quick-menu-upload">
            <h3 className="quick-menu-title">파일 업로드</h3>
            <TreeSelect
              value={selectedFolder}
              treeDefaultExpandAll
              treeData={treeData}
              onChange={this.onTreeChange}
              style={{ padding: '10px 0px', width: '100%' }}
              placeholder="업로드할 폴더를 선택하세요."
            />
            <Upload
              style={{ paddingBottom: '20px' }}
              multiple={false} // default true
              onFileUploaded={this.onTempFileUploaded}
              // width={350}
              height={50}
              borderStyle="dashed"
              maxSize={Number(userFileManage.UPLOAD_LIMIT_SIZE) * 1024 * 1024} // byte  UPLOAD_LIMIT_SIZE (MB)
            >
              <p style={{ height: '50px', textAlign: 'center', lineHeight: '50px' }}>Drag 'n' drop some files here, or click to select files</p>
            </Upload>
            <h3 style={{ paddingTop: '20px' }}>Files</h3>
            <ul style={{ marginBottom: '10px', height: '140px', overflowY: 'auto' }}>
              {tempuploadFiles.map(f => (
                <li key={f.seq} style={{ padding: '0 0 5px 0' }}>
                  {f.fileName} | {fileUtil.getFileSize(f.fileSize)}
                  <span style={{ float: 'right' }}>
                    <MinusCircleTwoTone twoToneColor="#eb2f96" onClick={() => this.removeTempUploadedFile(f.seq)} />
                  </span>
                </li>
              ))}
            </ul>
            <div>
              <StyledButton className="btn-primary btn-sm" onClick={this.uploadFile}>
                저장
              </StyledButton>
            </div>
          </div>
          <div className="quick-menu-share">
            <h3 className="quick-menu-title">공유하기</h3>
            <div className="quick-menu-sub">파일 {uploadFiles.length}개</div>
            <List
              style={{ height: '210px', overflowY: 'auto' }}
              itemLayout="horizontal"
              dataSource={uploadFiles}
              size="small"
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={fileUtil.getFileIcon(item.fileExt)}
                    title={item.fileName}
                    description={
                      flag ? (
                        <>
                          <AntdInput style={{ width: '300px' }} readonly value={item.LINK} />
                          <CopyToClipboard text={item.LINK} onCopy={() => feed.success('클립보드에 복사 되었습니다.')}>
                            <BtnRedShare>복사</BtnRedShare>
                          </CopyToClipboard>
                        </>
                      ) : (
                        `사이즈: ${fileUtil.getFileSize(item.size)}`
                      )
                    }
                  />
                </List.Item>
              )}
            />
            <div className="share-opt">
              유효기간 설정
              <AntdSelect
                defaultValue="10"
                value={expDay}
                onChange={value => {
                  this.setState({ expDay: value });
                }}
                style={{ padding: '10px' }}
                readonly={flag}
              >
                <Option value="10">10일</Option>
                <Option value="20">20일</Option>
                <Option value="30">30일</Option>
              </AntdSelect>
              접근횟수 설정
              <AntdSelect
                defaultValue="10"
                value={dlLimt}
                onChange={value => {
                  this.setState({ dlLimt: value });
                }}
                style={{ padding: '10px' }}
                readonly={flag}
              >
                <Option value="10">10회</Option>
                <Option value="20">20회</Option>
                <Option value="30">30회</Option>
              </AntdSelect>
            </div>
            <div>
              <StyledButton style={{ display: flag && 'none' }} className="btn-primary btn-sm" onClick={this.confirmDownloadLink}>
                저장
              </StyledButton>
            </div>
          </div>
        </div>
      </>
    );
  }
}

UserMain.propTypes = {
  uploadFile: PropTypes.func.isRequired,
  getFileShareLink: PropTypes.func.isRequired,
  userFileManage: PropTypes.object.isRequired,
  getUserFileManage: PropTypes.func.isRequired,
  treeData: PropTypes.array.isRequired,
  getUserFolderTree: PropTypes.func.isRequired,
  menuFixedYn: PropTypes.string.isRequired,
};

export default UserMain;
