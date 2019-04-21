import React from 'react';
import { Button, Cascader } from 'antd';
import '../../style/bookroom.css';
import StyleBookroom from '../../style/styleBookroom';

const options = [{
  value: '사업장1',
  label: '사업장1',
  children: [{
    value: '건물이름이길면',
    label: '건물이름이길면',
    children: [{
      value: '1층',
      label: '1층',
    }],
  }],
}, {
  value: '사업장2',
  label: '사업장2',
  children: [{
    value: '건물2',
    label: '건물2',
    children: [{
      value: '1층',
      label: '1층',
    }],
  }],
}];

class Favorate extends React.PureComponent {
  render() {
    return (
      <StyleBookroom>
        <section className="br-now">
          <header>
            <span className="btn-home">Home</span>
            {/* 추후 홈 버튼으로 바꾸겠음. 현재 아이콘 없음 */}
            <h1>회의 NOW</h1>
          </header>
          <main className="favor-select">
            <div className="container">
              <h2>회의시 선호하는 건물과 층을 <br />설정해주세요</h2>
              <p>설정하시는 건물과 층이 기본조회 조건으로<br /> 사용됩니다. 최대 3개까지 선택 가능하며 추후<br /> [선호 위치 설정]에서 수정가능합니다.</p>
              <ul className="select-area">
                <li><Cascader popupClassName="br-now" options={options} placeholder="사업장/건물/층을 선택해주세요" /></li>
                <li><Cascader popupClassName="br-now" options={options} placeholder="사업장/건물/층을 선택해주세요" /></li>
                <li><Cascader popupClassName="br-now" options={options} placeholder="사업장/건물/층을 선택해주세요" /></li>
              </ul>
              <div className="btn-area">
                <Button className="btn-cancel">취소</Button>
                <Button className="btn-confirm">확인</Button>
              </div>
            </div>
          </main>
        </section>
      </StyleBookroom>
    );
  }
}

export default Favorate;
