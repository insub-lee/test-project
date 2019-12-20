import React, { Component } from 'react';
import { Descriptions, Icon, Popconfirm, Button } from 'antd';
import StyledSearchViewer from 'apps/mdcs/styled/StyledSearchViewer';
import StyledButton from 'apps/mdcs/styled/StyledButton';
import View from '../../Favorite/List/View';

const attachDataLine = attachDataList => {
  const labelNames = ['본문내용', '서식지/기술자료', '기술자료'];
  return attachDataList.map((item, index) => (
    <Descriptions.Item label={labelNames[index]}>
      {item.DETAIL.length > 0 ? (
        <div>
          <div className="attachBtnGroup" style={{ display: 'inline-block' }}>
            <StyledButton className="btn-light btn-sm btn-first" onClick={() => alert('준비중입니다.')}>
              <Icon type="arrow-right" size="small" /> 내용보기
            </StyledButton>
            <StyledButton className="btn-light btn-sm" onClick={() => (window.location.href = `${item.DETAIL[0].down}`)}>
              <Icon type="arrow-right" size="small" /> 다운로드
            </StyledButton>
          </div>
          <div className={`fileInfo_${index}`} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px' }}>
            <span>원본파일 : </span>
            <span style={{ marginLeft: '5px' }}>{`${item.DETAIL[0].name}`}</span>
          </div>
        </div>
      ) : (
        <span>등록된 내용이 없습니다.</span>
      )}
    </Descriptions.Item>
  ));
};

class Viewer extends Component {
  componentDidMount() {}

  render() {
    const { formData, responseData, closeBtnFunc, closeBtnUseYn } = this.props;

    let typeName = '';
    if (Object.prototype.hasOwnProperty.call(responseData, 'work')) {
      typeName = responseData.work.NAME_KOR;
    }

    // 별첨자료 정보 배열(ATTACH, ATTACH2, ATTACH3)
    const attachDetailList = [];
    if (Object.prototype.hasOwnProperty.call(formData, 'ATTACH')) {
      for (const key in formData) {
        {
          key.includes('ATTACH') && typeof formData[key] === 'object' && attachDetailList.push(formData[key]);
        }
      }
    }

    return (
      <StyledSearchViewer>
        <div className="viewer_header" style={{ textAlign: 'right', marginBottom: '10px' }}>
          <StyledButton className="btn-primary" onClick={() => alert('서비스 준비중')}>
            <Icon type="download" /> 파일 다운로드 신청
          </StyledButton>
        </div>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="문서종류">{typeName}</Descriptions.Item>
          <Descriptions.Item label="문서번호">{formData.SP_ID}</Descriptions.Item>
          <Descriptions.Item label="개정번호">{formData.VERSION && formData.VERSION.split('.')[0]}</Descriptions.Item>
          <Descriptions.Item label="제목">{formData.TITLE}</Descriptions.Item>
          <Descriptions.Item label="표지보기">
            <Button onClick={this.props.clickCoverView}>표지보기</Button>
          </Descriptions.Item>
          {attachDetailList.length > 0 && attachDataLine(attachDetailList)}
          <Descriptions.Item label="표준 관리실">SAMPLE DATA</Descriptions.Item>
        </Descriptions>
        {closeBtnUseYn && (
          <div className="viewer_bottom" style={{ textAlign: 'center', marginTop: '20px' }}>
            <StyledButton className="btn-light" onClick={() => closeBtnFunc()}>
              닫기
            </StyledButton>
          </div>
        )}
      </StyledSearchViewer>
    );
  }
}

export default Viewer;
