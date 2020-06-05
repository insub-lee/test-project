import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import moment from 'moment';
import TimePicker from 'rc-time-picker';
// import 'rc-time-picker/assets/index.css';
import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import Button from 'components/Button';
// import DatePicker from 'components/FormPreview/DatePicker';
import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
import service from '../service';
import StyledContent from './StyledContent';

class WorkerRecordWriterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currentDate: moment(new Date()),
      yesterday: moment(new Date()).subtract(1, 'days'),
      category: {
        workShift: [
          { key: '1조', label: '1조' },
          { key: '2조', label: '2조' },
          { key: '3조', label: '3조' },
          { key: '4조', label: '4조' },
        ],
        workTime: [
          { key: 'MC_A', label: '오전' },
          { key: 'MC_B', label: '오후' },
          { key: 'MC_C', label: '야간' },
        ],
        workYn: [
          { key: 'O', label: 'O' },
          { key: 'X', label: 'X' },
        ],
        // signYn: [{ key: 'Y', label: 'Yes' }, { key: 'N', label: 'No' }],
        mealYn: [
          { key: 'O', label: 'O' },
          { key: 'X', label: 'X' },
        ],
      },
      diffTime: 0,
      tempData: {
        start: null,
        end: null,
      },
      writeOverWork: false,
      wstValue: null,
      wetValue: null,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleChangeTemp = this.handleChangeTemp.bind(this);
    this.handleDiffTime = this.handleDiffTime.bind(this);
    this.submitData = this.submitData.bind(this);
    this.postWorkReport = this.postWorkReport.bind(this);
    this.handleChangeWriteOverWork = this.handleChangeWriteOverWork.bind(this);
    this.disabledHours = this.disabledHours.bind(this);
    this.disabledMinutes = this.disabledMinutes.bind(this);
    this.getDisabledHours = this.getDisabledHours.bind(this);
    this.getDisabledMinutes = this.getDisabledMinutes.bind(this);
    this.handleChangeWorkTime = this.handleChangeWorkTime.bind(this);
    this.handleChangeWorkTimeValue = this.handleChangeWorkTimeValue.bind(this);
  }

  handleOpenModal() {
    const { limited } = this.props;
    console.debug('Limited', limited);
    this.setState({ isOpen: true, currentDate: moment(new Date()), yesterday: moment(new Date()).subtract(1, 'days') }, () => {
      if (limited) window.alert('현재 연장 근무가 2회를 초과합니다.');
    });
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      diffTime: 0,
      tempData: {
        start: null,
        end: null,
      },
      writeOverWork: false,
      wstValue: null,
      wetValue: null,
    });
  }

  handleAfterOpen() {
    const { id } = this.state;
    console.debug('Opened Modal : ', id);
  }

  handleChangeTemp(value, type) {
    switch (type) {
      case 0:
        this.setState(
          prevState => ({
            tempData: {
              ...prevState.tempData,
              start: value,
            },
          }),
          () => this.handleDiffTime(),
        );
        break;
      case 1:
        this.setState(
          prevState => ({
            tempData: {
              ...prevState.tempData,
              end: value,
            },
          }),
          () => this.handleDiffTime(),
        );
        break;
      default:
        break;
    }
  }

  handleDiffTime() {
    const { tempData } = this.state;
    const { start, end } = tempData;
    if (end !== null && start !== null) {
      const diffTime = moment.duration(end.diff(start));
      const diffHours = diffTime.hours();
      const diffMinutes = diffTime.minutes();
      let result = 0;
      if (diffHours < 0) {
        result += 24 - start.hours() + end.hours();
        if (start.minutes() > end.minutes()) result -= 0.5;
        if (start.minutes() < end.minutes()) result += 0.5;
      } else {
        result += diffHours;
        if (diffMinutes === -30) result -= 0.5;
        if (diffMinutes === 30) result += 0.5;
      }
      // 식사 유무 체크
      const { value } = document.querySelector('#select-mealYn');
      if (value === 'O') result -= 0.5;
      this.setState({ diffTime: result });
    } else {
      this.setState({ diffTime: 0 });
    }
  }

  submitData(e) {
    e.stopPropagation();
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {};
    data.forEach((value, key) => {
      switch (key) {
        case 'workDt':
          payload[key] = value ? moment(value, 'YYYY.MM.DD').format('YYYYMMDD') : undefined;
          break;
        case 'wst':
        case 'wet':
        case 'owst':
        case 'owet':
          payload[key] = value ? moment(value, 'HH:mm').format('HHmm') : undefined;
          break;
        default:
          payload[key] = value;
          break;
      }
    });
    const { writeOverWork } = this.state;
    // Todo - replace with alert
    if (!payload.wst) {
      alert('일일근태 시작시간을 넣어주십시요.');
    } else if (!payload.wet) {
      alert('일일근태 종료시간을 넣어주십시요.');
    } else if (writeOverWork) {
      const { owst, owet, owcoment } = payload;
      if (!owst) {
        alert('연장근무 시작시간을 넣어주십시요.');
      } else if (!owet) {
        alert('연장근무 종료시간을 넣어주십시요.');
      } else if (owcoment.trim() === '') {
        alert('연장근무 내용을 입력해 주셔야 합니다.');
      } else {
        this.postWorkReport(payload).then(result => {
          if (result) {
            // Todo - Success
            this.handleCloseModal();
            this.props.onClose();
          } else {
            // Todo - Fail
          }
        });
      }
    } else {
      payload.owst = undefined;
      payload.owet = undefined;
      payload.owcoment = undefined;
      payload.owt = undefined;
      this.postWorkReport(payload).then(result => {
        if (result) {
          // Todo - Success
          this.handleCloseModal();
          const { onClose } = this.props;
          onClose();
        } else {
          // Todo - Fail
        }
      });
    }
  }

  async postWorkReport(payload) {
    let result = false;
    const { response, error } = await service.manHis.post(payload);
    if (response && !error) {
      result = true;
    }
    return result;
  }

  handleChangeWriteOverWork() {
    this.setState(prevState => ({ writeOverWork: !prevState.writeOverWork }));
  }

  generateOptions(end, start = 0) {
    const arr = [];
    let value = start;
    for (value; value <= end; value += 1) {
      arr.push(value);
    }
    return arr;
  }

  getDisabledHours(value, isStart) {
    if (!value) {
      return [];
    }
    const limit = value.split(':')[0];
    return isStart ? this.generateOptions(24, parseInt(limit, 10)) : this.generateOptions(parseInt(limit, 10) - 1, 0);
  }

  getDisabledMinutes(h, value, isStart, onlyHalf) {
    if (!value) {
      return [];
    }
    const [limitHour, limit] = value.split(':');
    if (h === parseInt(limitHour, 10)) {
      return isStart ? this.generateOptions(60, parseInt(limit, 10)) : this.generateOptions(parseInt(limit, 10), 0);
    }
    return [];
  }

  disabledHours(type) {
    switch (type) {
      case 'wst': {
        const { value } = document.querySelector('input[name=wet]');
        return this.getDisabledHours(value, true);
      }
      case 'wet': {
        const { value } = document.querySelector('input[name=wst]');
        return this.getDisabledHours(value, false);
      }
      case 'owst': {
        const { value } = document.querySelector('input[name=owet]');
        return this.getDisabledHours(value, true);
      }
      case 'owet': {
        const { value } = document.querySelector('input[name=owst]');
        return this.getDisabledHours(value, false);
      }
      default:
        return [];
    }
  }

  disabledMinutes(h, type) {
    switch (type) {
      case 'wst': {
        const { value } = document.querySelector('input[name=wet]');
        return this.getDisabledMinutes(h, value, true, false);
      }
      case 'wet': {
        const { value } = document.querySelector('input[name=wst]');
        return this.getDisabledMinutes(h, value, false, false);
      }
      case 'owst': {
        const { value } = document.querySelector('input[name=owet]');
        return this.getDisabledMinutes(h, value, true, true);
      }
      case 'owet': {
        const { value } = document.querySelector('input[name=owst]');
        return this.getDisabledMinutes(h, value, false, true);
      }
      default:
        return [];
    }
  }

  handleChangeWorkTime(e) {
    const { value } = e.target;
    let mustSet = false;
    const time = {};
    switch (value) {
      case 'MC_A': // 오전 07 - 15
        time.wst = '07:00';
        time.wet = '15:00';
        mustSet = true;
        break;
      case 'MC_B': // 오후 15 - 23
        time.wst = '15:00';
        time.wet = '23:00';
        mustSet = true;
        break;
      case 'MC_C': // 야간 23 - 07
        time.wst = '23:00';
        time.wet = '07:00';
        mustSet = true;
        break;
      default:
        break;
    }
    if (mustSet) {
      this.setState({ wstValue: moment(time.wst, 'HH:mm'), wetValue: moment(time.wet, 'HH:mm') });
    }
  }

  handleChangeWorkTimeValue(value, timeKey) {
    switch (timeKey) {
      case 'wst':
        this.setState({ wstValue: value });
        break;
      case 'wet':
        this.setState({ wetValue: value });
        break;
      default:
        break;
    }
  }

  render() {
    const { isOpen, category, diffTime, writeOverWork, wstValue, wetValue, currentDate, yesterday } = this.state;
    const { empNo, usrNm, workJo, site } = this.props;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 500,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              일일 근무이력 작성(근무자)
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <StyledCommonForm onSubmit={this.submitData} autoComplete="off">
                <input type="hidden" name="searchSite" value={site} />
                <input type="hidden" name="empNo" value={empNo} />
                <input type="hidden" name="usrNm" value={usrNm} />
                <input type="hidden" name="working" value="O" />
                <div className="sub_form_tit cr">기본정보</div>
                <ul className="sub_form small2 has_margin">
                  <li>
                    <label htmlFor="date" className="title">
                      기간
                    </label>
                    <select name="workDt" defaultValue={currentDate.format('YYYYMMDD')}>
                      <option value={currentDate.format('YYYYMMDD')}>{currentDate.format('YYYY.MM.DD')}</option>
                      <option value={yesterday.format('YYYYMMDD')}>{yesterday.format('YYYY.MM.DD')}</option>
                    </select>
                    {/*
                    <DatePicker
                      values={[
                        {
                          name: 'workDt',
                          value: moment(new Date()).format('YYYYMMDD'),
                        },
                      ]}
                      single
                    />
                    */}
                  </li>
                  <li>
                    <label htmlFor="select-workShift" className="title">
                      근무조
                    </label>
                    <input type="text" name="workJo" className="input" readOnly value={workJo} />
                    {/*
                    <select name="workJo" id="select-workShift">
                      {category.workShift.map(option => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    */}
                  </li>
                  <li>
                    <label htmlFor="select-workTime" className="title">
                      구분
                    </label>
                    <select name="wAmpmnnoff" id="select-workTime" defaultValue="" onChange={this.handleChangeWorkTime}>
                      <option value="" disabled>
                        근무시간대를 선택해주세요.
                      </option>
                      {category.workTime.map(option => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </li>
                </ul>
                <div className="sub_form_tit cr">일일근태</div>
                <ul className="sub_form small2 has_margin">
                  {/*
                  <li>
                    <label htmlFor="select-workYn" className="title">
                      근태
                    </label>
                    <select name="workYn" id="select-workYn">
                      {category.workYn.map(option => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </li>
                  */}
                  <li className="">
                    <label htmlFor="time-1" className="title">
                      출근시간
                    </label>
                    <div>
                      <TimePicker
                        showSecond={false}
                        id="time-1"
                        style={{
                          marginTop: 10,
                        }}
                        name="wst"
                        value={wstValue}
                        // disabledHours={() => this.disabledHours('wst')}
                        // disabledMinutes={h => this.disabledMinutes(h, 'wst')}
                        onChange={value => this.handleChangeWorkTimeValue(value, 'wst')}
                        focusOnOpen
                      />
                    </div>
                  </li>
                  <li className="">
                    <label htmlFor="time-2" className="title">
                      퇴근시간
                    </label>
                    <TimePicker
                      showSecond={false}
                      id="time-2"
                      style={{
                        marginTop: 10,
                      }}
                      name="wet"
                      value={wetValue}
                      // disabledHours={() => this.disabledHours('wet')}
                      // disabledMinutes={h => this.disabledMinutes(h, 'wet')}
                      onChange={value => this.handleChangeWorkTimeValue(value, 'wet')}
                      focusOnOpen
                    />
                  </li>
                </ul>
                <div className="sub_form_tit cr">
                  <div style={{ float: 'left' }}>연장근무</div>
                  <div style={{ float: 'right' }}>
                    <Checkbox id="use-yn" checked={writeOverWork} onChange={this.handleChangeWriteOverWork} labelText="작성" noPadding />
                  </div>
                  <div className="cr" />
                </div>
                {writeOverWork && (
                  <ul className="sub_form small2 has_margin">
                    <li className="">
                      <label htmlFor="time-3" className="title">
                        시작시간
                      </label>
                      <TimePicker
                        showSecond={false}
                        id="time-3"
                        style={{
                          marginTop: 10,
                        }}
                        onChange={value => this.handleChangeTemp(value, 0)}
                        name="owst"
                        // disabledHours={() => this.disabledHours('owst')}
                        // disabledMinutes={h => this.disabledMinutes(h, 'owst')}
                        focusOnOpen
                        minuteStep={30}
                      />
                    </li>
                    <li className="">
                      <label htmlFor="time-4" className="title">
                        종료시간
                      </label>
                      <TimePicker
                        showSecond={false}
                        id="time-4"
                        style={{
                          marginTop: 10,
                        }}
                        onChange={value => this.handleChangeTemp(value, 1)}
                        name="owet"
                        // disabledHours={() => this.disabledHours('owet')}
                        // disabledMinutes={h => this.disabledMinutes(h, 'owet')}
                        focusOnOpen
                        minuteStep={30}
                      />
                    </li>
                    <li>
                      <label htmlFor="input_owcoment" className="title">
                        내용
                      </label>
                      <textarea id="input_owcoment" className="input" name="owcoment" style={{ height: 100 }} />
                    </li>
                    <li className="">
                      <label htmlFor="input_owt" className="title">
                        총 시간
                      </label>
                      <input type="text" id="input_owt" className="input" name="owt" readOnly value={diffTime} />
                    </li>
                    <li>
                      <label htmlFor="select-mealYn" className="title">
                        식사
                      </label>
                      <select name="meal" id="select-mealYn" onChange={this.handleDiffTime}>
                        {category.mealYn.map(option => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </li>
                  </ul>
                )}
                <div className="btn_wrap">
                  <Button type="submit" size="small" color="primary">
                    확인
                  </Button>
                </div>
              </StyledCommonForm>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

WorkerRecordWriterModal.propTypes = {
  empNo: PropTypes.string,
  usrNm: PropTypes.string,
  onClose: PropTypes.func,
  workJo: PropTypes.string,
  limited: PropTypes.bool,
};

WorkerRecordWriterModal.defaultProps = {
  empNo: '',
  usrNm: '',
  workJo: '',
  onClose: () => false,
  limited: false,
};

export default WorkerRecordWriterModal;
