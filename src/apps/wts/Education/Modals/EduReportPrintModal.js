import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';
import { fromJS } from 'immutable';
import moment from 'moment';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import DatePicker from 'apps/wts/components/DatePicker';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledTable from '../../StyledTable';

import StyledContent from './StyledContent';

const datePicker = fromJS({
  edudt: {
    values: [
      {
        name: 'edudt',
        value: moment(new Date()).format('YYYY.MM.DD'),
      },
    ],
  },
});

class EduReportPrintModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.printWrap = React.createRef();
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
    });
  }

  handleEduReportPrint = () => {
    const app = document.getElementById('root');
    const printContents = this.printWrap.current.innerHTML;
    const printDiv = document.createElement('DIV');
    document.body.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    app.style.display = 'none';
    window.print();
    app.style.display = 'block';
    printDiv.style.display = 'none';
    printDiv.innerHTML = '';
  };

  render() {
    const { isOpen } = this.state;
    const { report, eduPlanInfo } = this.props;
    let datePickerOption = datePicker.getIn(['edudt', 'values']);
    datePickerOption = datePickerOption.setIn([0, 'value'], moment(report.edudt, 'YYYYMMDD').format('YYYY.MM.DD')).setIn([0, 'readOnly'], true);

    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 700,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
        getContainer={() => document.querySelector('#EduReportModal')}
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              교육내용 레포트
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="btn_wrap" style={{ textAlign: 'right', padding: '10px 20px 0px 0px' }}>
              <StyledButton type="button" className="btn-primary btn-xs" onClick={this.handleEduReportPrint}>
                인쇄
              </StyledButton>
            </div>
            <div className="pop_con" ref={this.printWrap}>
              <StyledTable className="ta_wrap">
                <table className="tb02">
                  <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                  </colgroup>
                  <tbody>
                    <tr className="bd">
                      <th>A R E A</th>
                      <td>{eduPlanInfo.area}</td>
                      <th>근무조</th>
                      <td>{eduPlanInfo.workjo}</td>
                    </tr>
                    <tr className="bd">
                      <th>근 무 BAY</th>
                      <td>{eduPlanInfo.bay}</td>
                      <th>사 번</th>
                      <td>{eduPlanInfo.empno}</td>
                    </tr>
                    <tr className="bd">
                      <th>성 명</th>
                      <td>{eduPlanInfo.usrnm}</td>
                      <th>멘 토 사 원</th>
                      <td>{`${eduPlanInfo.mentonm}(${eduPlanInfo.mentoid})`}</td>
                    </tr>
                    <tr className="bd">
                      <th>최 종 확 인</th>
                      <td colSpan={3}>{`${eduPlanInfo.step3_edusdt === 'O' ? '최종합격' : ''}`}</td>
                    </tr>
                  </tbody>
                </table>
              </StyledTable>
              <br />
              <StyledCommonForm autoComplete="off">
                <ul className="sub_form small2 has_margin">
                  <li>
                    <label className="title" htmlFor="form-curriculum">
                      과정명
                    </label>
                    <input type="text" className="input" name="curriculum" id="form-curriculum" defaultValue={report ? report.curriculum : ''} readOnly />
                  </li>
                  <li>
                    <label className="title" htmlFor="form-edudt">
                      교육일자
                    </label>
                    <div style={{ width: 150 }}>
                      <DatePicker values={datePickerOption} single />
                    </div>
                  </li>
                  <li style={{ padding: 0 }}>
                    <label className="" htmlFor="form-study_content">
                      교 육 내 용
                    </label>
                    <div style={{ padding: '10px 0' }}>
                      <textarea
                        name="study_content"
                        id="form-study_content"
                        cols="30"
                        rows="10"
                        maxLength={3000}
                        placeholder="교육내용을 작성하세요.(3000자 내)"
                        defaultValue={report ? report.study_content : ''}
                        readOnly
                      />
                    </div>
                  </li>
                  <li style={{ padding: 0 }}>
                    <label className="" htmlFor="form-study_feel">
                      소감
                    </label>
                    <div style={{ padding: '10px 0' }}>
                      <textarea
                        name="study_feel"
                        id="form-study_feel"
                        cols="30"
                        rows="10"
                        maxLength={200}
                        placeholder="소감을 작성하세요.(200자 내)"
                        defaultValue={report ? report.study_feel : ''}
                        readOnly
                      />
                    </div>
                  </li>
                </ul>
              </StyledCommonForm>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

EduReportPrintModal.propTypes = {
  callbackHandler: PropTypes.func,
};

EduReportPrintModal.defaultProps = {
  callbackHandler: () => false,
};

export default EduReportPrintModal;
const abc = [
  {
    key: 0,
    title: '1. Diffusion(확산)에 대한 설명 중 잘못된 것은?',
    total: 40,
    answers: [
      '확산속도를 결정하는 것은 온도와 물질의 고유 확산 계수이다',
      '온도가 낮을수록 확산 속도는 증가한다',
      '산화막 공정 (Oxidation)은 확산 공정 중 하나이다',
      '농도 차이에 의한 물질의 이동 현상이다',
    ],
    correctAnswer: '온도가 낮을수록 확산 속도는 증가한다',
    originAnswers: [
      '온도가 낮을수록 확산 속도는 증가한다',
      '확산속도를 결정하는 것은 온도와 물질의 고유 확산 계수이다',
      '농도 차이에 의한 물질의 이동 현상이다',
      '산화막 공정 (Oxidation)은 확산 공정 중 하나이다',
    ],
    selectedAnswer: '온도가 낮을수록 확산 속도는 증가한다',
  },
  {
    key: 1,
    title: '2. 다음 중 RTP 와 Furnace 차이점으로 잘못된 것은?',
    total: 30,
    answers: [
      'Heating 방식 : RTP - Lamp / Furnace - Heating Coil',
      '온도 check : RTP - Wafer / Furnace - chamber 안',
      'W/F loading : RTP - Single / Furnace - Batch',
      '온도 변화 : RTP - 작다 / Furnace - 크다',
    ],
    correctAnswer: 'W/F loading : RTP - Single / Furnace - Batch',
    originAnswers: [
      'W/F loading : RTP - Single / Furnace - Batch',
      'Heating 방식 : RTP - Lamp / Furnace - Heating Coil',
      '온도 변화 : RTP - 작다 / Furnace - 크다',
      '온도 check : RTP - Wafer / Furnace - chamber 안',
    ],
    selectedAnswer: 'W/F loading : RTP - Single / Furnace - Batch',
  },
  {
    key: 2,
    title: '3. NO-Gate 공정에서 N의 역할은?',
    total: 30,
    answers: ['uniformity 개선', 'Boron침투 방지', '오염 방지', '두께 성장 억제'],
    correctAnswer: 'Boron침투 방지',
    originAnswers: ['Boron침투 방지', '두께 성장 억제', '오염 방지', 'uniformity 개선'],
    selectedAnswer: 'Boron침투 방지',
  },
];
