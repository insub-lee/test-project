import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StyledReport from './StyledReport';
import icons from './icons';
import service from './service';
import alertMessage from '../../Notification/Alert';

const linkSelector = icon => {
  switch (icon) {
    case 'iconMiddle1': // 등록함
      return '/TPMS1030';
    case 'iconMiddle2': // 임시저장함
      return '/TPMS1020';
    case 'iconMiddle3': // 수정요청함
      return '/TPMS1040';
    case 'iconMiddle4': // 미결함
      return '/TPMS1050';
    case 'iconMiddle5': // 진행함
      return '/TPMS1060';
    case 'iconMiddle6': // 완료보고함
      return '/TPMS1070';
    default:
      return '/';
  }
};

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      list: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    // this.fetchData();
    this.mounted = true;
    this.delayFetch = setTimeout(this.fetchData, 1000);
  }

  componentWillUnmount() {
    this.mounted = true;
    clearTimeout(this.delayFetch);
  }

  async fetchData() {
    const { report } = this.props;
    let mnuid = '';
    switch (report.icon) {
      case 'iconMiddle1': // 등록하기 TPMS1030
        mnuid = 'TPMS1030';
        break;
      case 'iconMiddle2': // 임시저장 TPMS1020
        mnuid = 'TPMS1020';
        break;
      case 'iconMiddle3': // 수정요청 TPMS1040
        mnuid = 'TPMS1040';
        break;
      case 'iconMiddle4': // 미결재 TPMS1050
        mnuid = 'TPMS1050';
        break;
      case 'iconMiddle5': // 진행중 TPMS1060
        mnuid = 'TPMS1060';
        break;
      case 'iconMiddle6': // 완료보고 미작성 TPMS1070
        mnuid = 'TPMS1070';
        break;
      default:
        break;
    }
    if (mnuid !== '') {
      const { response, error } = await service.signTask.get(mnuid);
      if (response && !error) {
        console.debug('>>> response', response);
        if (this.mounted) {
          this.setState({
            number: response.pagination.total,
          });
        }
      } else {
        console.error('>>> error', error);
        alertMessage.alert('Server Error');
      }
    }
  }

  render() {
    const { number, list } = this.state;
    const { title, report, onSetting, noTitle } = this.props;
    console.debug('report', report, title);
    return (
      <StyledReport bgColor={report.bgColor}>
        <div className={`main_banner ${report.bgClass}`}>
          <Link to={linkSelector(report.icon)}>
            <span className="report_icon">
              <img src={icons[report.icon]} alt={title} className="report_img" />
            </span>
            <span className="report_tit">{`${noTitle ? '' : title}`}</span>
            <span className="report_en">{report.enTitle}</span>
            <span className="report_num">
              {number}
              <span className="report_num_com">건</span>
            </span>
          </Link>
          {/*
          <Links links={list} title={title} />
          */}
        </div>
      </StyledReport>
    );
  }
}

Report.propTypes = {
  title: PropTypes.string,
  report: PropTypes.shape({
    key: PropTypes.number,
    bgClass: PropTypes.string,
    bgColor: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    enTitle: PropTypes.string,
    num: PropTypes.number,
  }),
  onSetting: PropTypes.bool,
  noTitle: PropTypes.bool,
};

Report.defaultProps = {
  title: '',
  report: {
    key: -1,
    bgclass: '',
    bgColor: '',
    icon: '',
    name: '',
    title: '',
    enTitle: '',
    num: 0,
  },
  onSetting: false,
  noTitle: false,
};

export default Report;
