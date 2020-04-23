import React, { Component } from 'react';
import { Input, Modal, Descriptions, Checkbox } from 'antd';
import { CaretDownOutlined, AppstoreTwoTone } from '@ant-design/icons';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledModalWrapper from 'commonStyled/EshsStyled/Modal/StyledSelectModal';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import Styled from './Styled';

// safetyWork Tables
import SafetyWorkInfo from '../SafetyWorkInfo';

const AntdModal = StyledModalWrapper(Modal);

class SafetyWorkMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    console.debug('렌더링');
    return (
      <Styled>
        <StyledSearchWrap>
          <div className="search-group-layer">
            <div className="searchCmpnyWrap">
              <label>
                작업번호
                <Input className="ant-input-sm" style={{ width: '150px', marginLeft: '5px', marginRight: '5px' }} readOnly />
              </label>
            </div>
            <div
              className="searchCmpnyBtn"
              tabIndex={0}
              onClick={() => console.debug('임시')}
              onKeyPress={() => console.debug('임시')} // esLint
              role="button" // esLint
            >
              <CaretDownOutlined />
            </div>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('검색')} style={{ marginBottom: '5px' }}>
              검색
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('추가 / 연장')} style={{ marginBottom: '5px' }}>
              추가 / 연장
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('안전교육 서약서')} style={{ marginBottom: '5px' }}>
              안전교육 서약서
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('(청주) 중량물 작업계획서')} style={{ marginBottom: '5px' }}>
              (청주) 중량물 작업계획서
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('(청주) 밀폐공간 체크리스트')} style={{ marginBottom: '5px' }}>
              (청주) 밀폐공간 체크리스트
            </StyledButton>
            <StyledButton className="btn-primary btn-xs btn-first" onClick={() => console.debug('(청주) 안전계획/절차서')} style={{ marginBottom: '5px' }}>
              (청주) 안전계획/절차서
            </StyledButton>
          </div>
        </StyledSearchWrap>
        <ContentsWrapper>
          <SafetyWorkInfo />
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            <span className="middleTitleText">작업자</span>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => console.debug('+버튼')}>
              작업자 인원 추가
            </StyledButton>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => console.debug('안전교육 등록')}>
              안전교육 등록
            </StyledButton>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => console.debug('안전교육 수료자')}>
              안전교육 수료자 가져오기
            </StyledButton>
          </div>
          <div>작업자 테이블 들어올곳</div>
          <div className="middleTitle">
            <AppstoreTwoTone style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            <span className="middleTitleText">투입장비</span>
            <StyledButton className="btn-primary btn-xxs btn-first" onClick={() => console.debug('+버튼')}>
              투입 장비 추가
            </StyledButton>
          </div>
          <div>투입장비 테이블 들어올곳</div>
        </ContentsWrapper>
      </Styled>
    );
  }
}

export default SafetyWorkMain;
