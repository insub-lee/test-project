import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import locale from 'antd/es/locale/ko_KR';
import moment from 'moment';
import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import Button from 'components/Button';
import service from '../service';
import { vacationTypes } from '../codes';

const { RangePicker } = DatePicker;

const disabledDate = current =>
  moment()
    .endOf('day')
    .diff(current.startOf('day'), 'days') > 0;
// return current && current - 1 < moment().endOf('day');
class SchedulerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      hoverValue: [],
      isSingleDay: false,
      isHalf: false,
      date: [],
      dateRange: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  submitData(e) {
    e.stopPropagation();
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    const { date, dateRange, isSingleDay } = this.state;
    const { callbackHandler } = this.props;
    const [startDate, endDate] = date;
    if (!startDate || !endDate) {
      alert('휴기 기간을 등록해주십시요.');
    } else {
      const filteredVationType = vacationTypes.filter(type => type.value === payload.vacationcd);
      payload.startDate = startDate.format('YYYYMMDD');
      payload.endDate = endDate.format('YYYYMMDD');
      payload.dateRange = dateRange + 1;
      payload.isVacation = true;
      payload.vacationnm = filteredVationType.length > 0 ? filteredVationType[0].label : '';
      if (!isSingleDay) {
        payload.vacationgubun = '1';
      }
      this.postVacation(payload).then(result => {
        if (result) {
          alert('등록 되었습니다.');
          callbackHandler();
        }
      });
    }
  }

  onChange(date) {
    if (date.length === 2) {
      const dateRange = date[1].diff(date[0], 'days');
      this.setState(prevState => ({ date, isSingleDay: dateRange === 0, dateRange, isHalf: dateRange === 0 && prevState.isHalf }));
    } else {
      this.setState({ date: [], isSingleDay: false, dateRange: 0, isHalf: false });
    }
  }

  handleChangeType(e) {
    const { value } = e.target;
    switch (value) {
      case '1':
        this.setState({ isHalf: false });
        break;
      case '0.5':
        this.setState({ isHalf: true });
        break;
      default:
        this.setState({ isHalf: false });
        break;
    }
  }

  async postVacation(payload) {
    const { response, error } = await service.manHis.post(payload);
    let result = false;
    if (response && !error) {
      result = true;
    }
    return result;
  }

  render() {
    const { isSingleDay, isHalf } = this.state;
    const { empNo, usrNm, banjangId, isAutoBanSign, site, workjo } = this.props;
    return (
      <StyledCommonForm onSubmit={this.submitData} autoComplete="off">
        <input type="hidden" name="searchsite" value={site} />
        <input type="hidden" name="empNo" value={empNo} />
        <input type="hidden" name="usrNm" value={usrNm} />
        <input type="hidden" name="banjangId" value={banjangId} />
        <input type="hidden" name="workJo" value={workjo} />
        <input type="hidden" name="vacation" value="O" />
        {isAutoBanSign && <input type="hidden" name="bansign" value="O" />}
        <ul className="sub_form small2 has_margin">
          <li>
            <label htmlFor="date" className="title">
              기간
            </label>
            <div>
              <RangePicker
                locale={locale}
                onChange={this.onChange}
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
                style={{ display: 'inline-block', marginTop: 7 }}
              />
            </div>
          </li>
          {isSingleDay && (
            <>
              <li>
                <label htmlFor="vacationgubun" className="title">
                  휴가 구분
                </label>
                <select id="vacationgubun" name="vacationgubun" style={{ width: 352 }} onChange={this.handleChangeType}>
                  <option value="1">휴가</option>
                  <option value="0.5">반차</option>
                </select>
              </li>
              {isHalf && (
                <li>
                  <label htmlFor="vacationampm" className="title">
                    반차 구분
                  </label>
                  <select id="vacationampm" name="vacationampm" style={{ width: 352 }}>
                    <option value="A">오전</option>
                    <option value="P">오후</option>
                    <option value="N">야간</option>
                  </select>
                </li>
              )}
            </>
          )}
          <li>
            <label htmlFor="reqeust-type" className="title">
              휴가형태
            </label>
            <div>
              <select name="vacationcd" defaultValue="" style={{ width: 352 }}>
                <option value="" disabled>
                  휴가형태를 선택해주세요.
                </option>
                {vacationTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </li>
          <li>
            <label htmlFor="reason" className="title">
              사유
            </label>
            <div>
              <textarea name="vacationmsg" id="reason" cols="30" rows="10" placeholder="휴가 사유를 작성하세요." />
            </div>
          </li>
        </ul>
        <div className="btn_wrap">
          <Button type="submit" color="default" size="small">
            신청하기
          </Button>
        </div>
      </StyledCommonForm>
    );
  }
}

SchedulerForm.propTypes = {
  callbackHandler: PropTypes.func,
  isAutoBanSign: PropTypes.bool,
};

SchedulerForm.defaultProps = {
  callbackHandler: () => false,
  isAutoBanSign: false,
};

export default SchedulerForm;
