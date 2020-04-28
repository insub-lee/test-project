import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Input } from 'antd';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledInput from 'components/BizBuilder/styled/Form/StyledInput';
import Styled from './Styled';

const AntInput = StyledInput(Input);

class QuestionnaireView extends Component {
  componentDidMount() {}

  render() {
    return (
      <Styled>
        <StyledContentsWrapper>
          <div className="text-area">
            <p>* 검진 대상자는 문진 문항을 빠짐없이 표시하여야만 정확한 건강 위험 평과 결과를 통보받으실 수 있습니다.</p>
            <p>* 귀하께서는 국민건강보험공단 또는 보건소에서 제공하는 건강 관련 정보 및 사업 안내를 메일 또는 우편 등으로 받아 보는 것에 동의하십니까?</p>
          </div>
          <div className="examination-area">
            <p className="examinaion-title">질환력(과거력, 가족력)</p>
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">1.</span>다음과 같은 질병으로&nbsp;
                <b>
                  진단을 받았거나, <span className="point">현재</span> 약물 치료 중
                </b>
                이십니까?
              </p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '40%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>진단</th>
                    <th>약물치료</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="radio-tr">
                    <th>뇌졸중(중풍)</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>심근경색/협심증</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>고혈압</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>당뇨병</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>이상지질혈증</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>폐결핵</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>기타(암포함)</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">2.</span>
                <b>부모, 형제, 자매 중에 다음 질환을 앓았거나 해당 질환으로 사망한 경우</b>가 있으십니까?
              </p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '40%' }} />
                </colgroup>
                <tbody>
                  <tr className="radio-tr">
                    <th>뇌졸중(중풍)</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>심근경색/협심증</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>고혈압</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>당뇨병</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>기타(암포함)</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">3.</span>
                <b>B형간염 바이러스 보유자</b>입니까?
              </p>
              <div className="question-article">
                <Radio.Group defaultValue="a">
                  <Radio value="a">예</Radio>
                  <Radio value="b">
                    <b>아니오</b>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">흡연 및 전자담배</p>
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">4.</span>지금까지&nbsp;
                <b>평생 총 5갑(100개비) 이상</b>의 <b>일반담배(궐련)</b>를 피운 적이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group defaultValue="a">
                  <Radio value="a">
                    <b>아니오 (☞ 5번 문항으로 가세요)</b>
                  </Radio>
                  <Radio value="b">
                    예, 지금은 끊었음 <b>(☞ 4-1번 문항으로 가세요)</b>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">4-1.</span>
                <b>현재 일반담배(궐련)</b>을 피우십니까?
              </p>
              <Radio.Group defaultValue="a">
                <table className="question-table">
                  <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '20%' }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <Radio value="a" className="radio-item"></Radio>
                      </td>
                      <td className="td-left">1. 현재 피움</td>
                      <td>
                        총 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 년
                      </td>
                      <td className="td-left">
                        흡연했을 때 하루 평균 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 개비
                      </td>
                      <td>
                        끊은 지 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 년
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Radio value="b" className="radio-item"></Radio>
                      </td>
                      <td className="td-left">2. 과거에는 피웠으나 현재에는 피우지 않음</td>
                      <td>
                        총 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 년
                      </td>
                      <td className="td-left">
                        하루 평균 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 개비
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </Radio.Group>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">5.</span>지금까지&nbsp;
                <b>궐련형 전자담배(가열담배, 예) 아이코스, 글로, 릴 등)을</b>&nbsp;피운 적이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group defaultValue="a">
                  <Radio value="a">
                    <b>아니오 (☞ 6번 문항으로 가세요)</b>
                  </Radio>
                  <Radio value="b">
                    예, 지금은 끊었음 <b>(☞ 5-1번 문항으로 가세요)</b>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">5-1.</span>
                <b>현재 일반 궐련형 전자담배(가열담배)</b>을 피우십니까?
              </p>
              <Radio.Group defaultValue="a">
                <table className="question-table">
                  <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '20%' }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <Radio value="a" className="radio-item"></Radio>
                      </td>
                      <td className="td-left">1. 현재 피움</td>
                      <td>
                        총 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 년
                      </td>
                      <td className="td-left">
                        흡연했을 때 하루 평균 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 개비
                      </td>
                      <td>
                        끊은 지 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 년
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Radio value="b" className="radio-item"></Radio>
                      </td>
                      <td className="td-left">2. 과거에는 피웠으나 현재에는 피우지 않음</td>
                      <td>
                        총 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 년
                      </td>
                      <td className="td-left">
                        하루 평균 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 개비
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </Radio.Group>
            </div>
            {/* question-item */}
            <div className="question-item">
              <p className="question-txt">
                <span className="question-num">6.</span>
                <b>액상형 전자담배</b>를 사용한 경험이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group defaultValue="a">
                  <Radio value="a">
                    예 <b>(☞ 6-1번 문항으로 가세요)</b>
                  </Radio>
                  <Radio value="b">
                    <b>아니오</b>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">6-1.</span>
                <b>최근 한 달 동안 액상형 전자담배</b>를 사용한 경험이 있습니까?
              </p>
              <div className="question-article">
                <Radio.Group defaultValue="a">
                  <Radio value="a">
                    <b>아니오</b>
                  </Radio>
                  <Radio value="b">월 1~2일</Radio>
                  <Radio value="c">월 3~9일</Radio>
                  <Radio value="d">월 10~29일</Radio>
                  <Radio value="e">매일</Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">음주 관련 문항</p>
            <div className="question-item">
              <p className="add-title">※ 지난 1년간</p>
              <p className="question-txt">
                <span className="question-num">7.</span>술을 마시는 횟수는 어느 정도입니까? (1개만 응답)
              </p>
              <div className="question-article">
                <Radio.Group>
                  <Radio value="a">
                    일주일에 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 번
                  </Radio>
                  <Radio value="b">
                    한 달에 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 번
                  </Radio>
                  <Radio value="c">
                    1년에 <AntInput className="ant-input-xs ant-input-inline ml5" style={{ width: 50 }} /> 번
                  </Radio>
                  <Radio value="d">
                    <b>술을 마시지 않는다</b>
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">7-1.</span>술을 마시는 날은 보통 어느 정도 마십니까?
                <span className="point span-block span-sm">
                  * 잔 또는 병 또는 캔 또는 cc 중 한 곳에만 작성해 주십시오.
                  <br />
                  &nbsp;&nbsp;(술 종류는 복수 응답 가능, 기타 술 종류는 비슷한 술 종류에 표기)
                </span>
              </p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '24%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>술 종류</th>
                    <th>잔</th>
                    <th>병</th>
                    <th>캔</th>
                    <th>cc</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>소주</th>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                  </tr>
                  <tr>
                    <th>맥주</th>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                  </tr>
                  <tr>
                    <th>양주</th>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                  </tr>
                  <tr>
                    <th>막걸리</th>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                  </tr>
                  <tr>
                    <th>와인</th>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
            <div className="question-item pad-extend">
              <p className="question-txt">
                <span className="question-num">7-2.</span>가장 많이 마셨던 하루 음주량은 어느 정도입니까?
                <span className="point span-block span-sm">
                  * 잔 또는 병 또는 캔 또는 cc 중 한 곳에만 작성해 주십시오.
                  <br />
                  &nbsp;&nbsp;(술 종류는 복수 응답 가능, 기타 술 종류는 비슷한 술 종류에 표기)
                </span>
              </p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '24%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '19%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>술 종류</th>
                    <th>잔</th>
                    <th>병</th>
                    <th>캔</th>
                    <th>cc</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>소주</th>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                  </tr>
                  <tr>
                    <th>맥주</th>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                  </tr>
                  <tr>
                    <th>양주</th>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                  </tr>
                  <tr>
                    <th>막걸리</th>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                  </tr>
                  <tr>
                    <th>와인</th>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                    <td className="td-pad-none">
                      <AntInput className="ant-input-xs ant-input-inline ant-input-full" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
          <div className="examination-area">
            <p className="examinaion-title">
              정신건강(우울증) 평가도구
              <span className="point">(만 20, 30, 40, 50, 60, 70세 해당)</span>
            </p>
            <div className="question-item">
              <p className="question-txt">2주 동안, 아래 나열되는 증상들에 얼마나 자주 시달렸습니까?</p>
              <table className="question-table">
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '40%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>진단</th>
                    <th>약물치료</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="radio-tr">
                    <th>뇌졸중(중풍)</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>심근경색/협심증</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>고혈압</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>당뇨병</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>이상지질혈증</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>폐결핵</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                  <tr className="radio-tr">
                    <th>기타(암포함)</th>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                    <td>
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">예</Radio.Button>
                        <Radio.Button value="b">아니오</Radio.Button>
                      </Radio.Group>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* question-item */}
          </div>
          {/* examination-area */}
        </StyledContentsWrapper>
        <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20">
          <StyledButton className="btn-light mr5" onClick={this.props.onCancelPopup}>
            닫기
          </StyledButton>
          <StyledButton className="btn-primary">저장</StyledButton>
        </StyledButtonWrapper>
      </Styled>
    );
  }
}

QuestionnaireView.propTypes = {
  onCancelPopup: PropTypes.func,
};

QuestionnaireView.defaultProps = {
  onCancelPopup: () => {},
};

export default QuestionnaireView;
