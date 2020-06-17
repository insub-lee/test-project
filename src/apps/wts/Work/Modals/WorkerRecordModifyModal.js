import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import moment from 'moment';
import TimePicker from 'rc-time-picker';
// import 'rc-time-picker/assets/index.css';
import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import Checkbox from 'apps/wts/components/CheckboxGroup/Checkbox';
import service from '../service';
import StyledContent from './StyledContent';

class WorkerRecordModifyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
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
        offYn: [
          { key: 'O', label: 'O' },
          { key: 'X', label: 'X' },
        ],
        workYn: [
          { key: 'O', label: 'O' },
          { key: 'X', label: 'X' },
        ],
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
      writeWork: true,
      writeOverWork: false,
      wstValue: null,
      wetValue: null,
      comment: '',
      record: {
        bsign: '',
        empno: '',
        wst: '',
        wet: '',
        meal: '',
        owcoment: '',
        owet: '',
        owst: '',
        owt: '',
        psign: '',
        usrnm: '',
        vacation: '',
        wampmnnoff: '',
        workdt: '',
        working: '',
        workjo: '',
      },
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleChangeTemp = this.handleChangeTemp.bind(this);
    this.handleDiffTime = this.handleDiffTime.bind(this);
    this.submitData = this.submitData.bind(this);
    this.updateWorkReport = this.updateWorkReport.bind(this);
    this.handleChangeWriteWork = this.handleChangeWriteWork.bind(this);
    this.handleChangeWriteOverWork = this.handleChangeWriteOverWork.bind(this);
    this.disabledHours = this.disabledHours.bind(this);
    this.disabledMinutes = this.disabledMinutes.bind(this);
    this.getDisabledHours = this.getDisabledHours.bind(this);
    this.getDisabledMinutes = this.getDisabledMinutes.bind(this);
    this.handleChangeWorkTime = this.handleChangeWorkTime.bind(this);
    this.handleChangeWorkTimeValue = this.handleChangeWorkTimeValue.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
  }

  handleOpenModal(record) {
    console.debug('# Modify Record', record);
    const { editable } = this.props;
    const { wst, wet, owst, owet, working, bsign } = record;
    const wstValue = moment(wst, 'HHmm'); // 출근시간
    const wetValue = moment(wet, 'HHmm'); // 퇴근시간
    const tempData = {
      start: owst ? moment(owst, 'HHmm') : null,
      end: owet ? moment(owet, 'HHmm') : null,
    };
    let diffTime = 0;
    if (tempData.start && tempData.end) {
      let result = this.checkDiffTime(tempData.end, tempData.start);
      if (record.meal === 'O') {
        result -= 0.5;
      }
      diffTime = result;
    }
    this.setState({
      isOpen: true,
      wstValue,
      wetValue,
      tempData,
      diffTime,
      writeOverWork: tempData.end && tempData.start,
      comment: record.owcoment,
      record,
      writeWork: working === 'O',
      readmode: !(editable || bsign !== 'O'),
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

  checkDiffTime(end, start) {
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
    return result;
  }

  handleDiffTime() {
    const { tempData } = this.state;
    const { start = null, end = null } = tempData;
    if (end && start) {
      let result = this.checkDiffTime(end, start);
      // 식사 유무 체크
      const { value } = document.querySelector('#modify-select-mealYn');
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
    const payload = {
      type: 'manHis',
    };
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
    const { writeOverWork, writeWork } = this.state;
    // Todo - replace with alert
    if (writeWork && !payload.wst) {
      alert('일일근태 시작시간을 넣어주십시요.');
    } else if (writeWork && !payload.wet) {
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
        this.updateWorkReport(payload).then(result => {
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
      payload.owst = '';
      payload.owet = '';
      payload.owcoment = '';
      payload.owt = '';
      payload.meal = 'X';
      this.updateWorkReport(payload).then(result => {
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

  async updateWorkReport(payload) {
    const { apiType } = this.props;
    let apiKey = 'manHis';
    switch (apiType) {
      case 1:
        apiKey = 'manHisChief';
        break;
      case 0:
      default:
        apiKey = 'manHis';
        break;
    }
    let result = false;
    const { response, error } = await service[apiKey].put(payload);
    if (response && !error) {
      const { updateyn } = response;
      result = updateyn;
    }
    return result;
  }

  handleChangeWriteWork() {
    this.setState(
      prevState => ({ writeWork: !prevState.writeWork }),
      () => {
        const { writeWork } = this.state;
        if (writeWork) {
          this.handleChangeWorkTime(document.querySelector('#select-modify-workTime').value);
        } else {
          this.setState({ wstValue: undefined, wetValue: undefined });
        }
      },
    );
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

  handleChangeWorkTime(value) {
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

  handleChangeComment(e) {
    const { value } = e.target;
    this.setState({ comment: value });
  }

  render() {
    const { isOpen, category, diffTime, writeWork, writeOverWork, wstValue, wetValue, record, tempData, comment, readmode } = this.state;
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
              일일 근무이력 수정
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <StyledCommonForm onSubmit={this.submitData} autoComplete="off">
                <input type="hidden" name="searchSite" value={record.site} />
                <input type="hidden" name="empNo" value={record.empno} />
                <input type="hidden" name="usrNm" value={record.usrnm} />
                <input type="hidden" name="working" value={writeWork ? 'O' : 'X'} />
                <input type="hidden" name="vacation" value="X" />
                <div className="sub_form_tit cr">기본정보</div>
                <ul className="sub_form small2 has_margin">
                  <li>
                    <label htmlFor="date" className="title">
                      기간
                    </label>
                    <input type="text" name="workDt" className="input" readOnly value={moment(record.workdt, 'YYYYMMDD').format('YYYY.MM.DD')} />
                  </li>
                  <li>
                    <label htmlFor="select-workShift" className="title">
                      근무조
                    </label>
                    <input type="text" name="workJo" className="input" readOnly value={record.workjo} />
                  </li>
                  <li>
                    <label htmlFor="select-modify-workTime" className="title">
                      구분
                    </label>
                    <select
                      name="wAmpmnnoff"
                      id="select-modify-workTime"
                      defaultValue={record.wampmnnoff}
                      onChange={e => this.handleChangeWorkTime(e.target.value)}
                      disabled={readmode}
                    >
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
                <div className="sub_form_tit cr">
                  <div style={{ float: 'left' }}>일일근태</div>
                  <div style={{ float: 'right' }}>
                    <Checkbox
                      id="modify-work-yn"
                      checked={writeWork}
                      onChange={this.handleChangeWriteWork}
                      labelText="근무여부"
                      noPadding
                      disabled={readmode}
                    />
                  </div>
                  <div className="cr" />
                </div>
                {writeWork && (
                  <ul className="sub_form small2 has_margin">
                    <li className="">
                      <label htmlFor="modify-time-1" className="title">
                        출근시간
                      </label>
                      <div>
                        <TimePicker
                          showSecond={false}
                          id="modify-time-1"
                          style={{
                            marginTop: 10,
                          }}
                          name="wst"
                          value={wstValue}
                          // disabledHours={() => this.disabledHours('wst')}
                          // disabledMinutes={h => this.disabledMinutes(h, 'wst')}
                          onChange={value => this.handleChangeWorkTimeValue(value, 'wst')}
                          focusOnOpen
                          disabled={readmode}
                        />
                      </div>
                    </li>
                    <li className="">
                      <label htmlFor="modify-time-2" className="title">
                        퇴근시간
                      </label>
                      <TimePicker
                        showSecond={false}
                        id="modify-time-2"
                        style={{
                          marginTop: 10,
                        }}
                        name="wet"
                        value={wetValue}
                        // disabledHours={() => this.disabledHours('wet')}
                        // disabledMinutes={h => this.disabledMinutes(h, 'wet')}
                        onChange={value => this.handleChangeWorkTimeValue(value, 'wet')}
                        focusOnOpen
                        disabled={readmode}
                      />
                    </li>
                  </ul>
                )}
                <div className="sub_form_tit cr">
                  <div style={{ float: 'left' }}>연장근무</div>
                  <div style={{ float: 'right' }}>
                    <Checkbox
                      id="modify-use-yn"
                      checked={writeOverWork}
                      onChange={this.handleChangeWriteOverWork}
                      labelText="작성"
                      noPadding
                      disabled={readmode}
                    />
                  </div>
                  <div className="cr" />
                </div>
                {writeOverWork && (
                  <ul className="sub_form small2 has_margin">
                    <li className="">
                      <label htmlFor="modify-time-3" className="title">
                        시작시간
                      </label>
                      <TimePicker
                        showSecond={false}
                        id="modify-time-3"
                        style={{
                          marginTop: 10,
                        }}
                        onChange={value => this.handleChangeTemp(value, 0)}
                        name="owst"
                        value={tempData.start}
                        focusOnOpen
                        minuteStep={30}
                        disabled={readmode}
                      />
                    </li>
                    <li className="">
                      <label htmlFor="modify-time-4" className="title">
                        종료시간
                      </label>
                      <TimePicker
                        showSecond={false}
                        id="modify-time-4"
                        style={{
                          marginTop: 10,
                        }}
                        onChange={value => this.handleChangeTemp(value, 1)}
                        name="owet"
                        value={tempData.end}
                        focusOnOpen
                        minuteStep={30}
                        disabled={readmode}
                      />
                    </li>
                    <li>
                      <label htmlFor="modify-input_owcoment" className="title">
                        내용
                      </label>
                      <textarea
                        id="modify-input_owcoment"
                        className="input"
                        name="owcoment"
                        style={{ height: 100 }}
                        value={comment}
                        onChange={this.handleChangeComment}
                        disabled={readmode}
                      />
                    </li>
                    <li className="">
                      <label htmlFor="modify-input_owt" className="title">
                        총 시간
                      </label>
                      <input type="text" id="modify-input_owt" className="input" name="owt" readOnly value={diffTime} />
                    </li>
                    <li>
                      <label htmlFor="modify-select-mealYn" className="title">
                        식사
                      </label>
                      <select name="meal" id="modify-select-mealYn" onChange={this.handleDiffTime} disabled={readmode}>
                        {category.mealYn.map(option => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </li>
                  </ul>
                )}
                {!readmode && (
                  <div className="btn_wrap">
                    <StyledButton type="submit" className="btn-light btn-xs">
                      수정
                    </StyledButton>
                    <StyledButton type="button" className="btn-light btn-xs" onClick={this.handleCloseModal}>
                      취소
                    </StyledButton>
                  </div>
                )}
              </StyledCommonForm>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

WorkerRecordModifyModal.propTypes = {
  onClose: PropTypes.func,
  apiType: PropTypes.number,
  editable: PropTypes.bool,
};

WorkerRecordModifyModal.defaultProps = {
  onClose: () => false,
  apiType: 0,
  editable: false,
};

export default WorkerRecordModifyModal;
