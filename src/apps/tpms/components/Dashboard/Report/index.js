import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StyledReport from './StyledReport';
import icons from './icons';
import service from './service';
import alertMessage from '../../Notification/Alert';
import useSignList from '../../../hooks/useSignList';
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

const Report = ({ title, report, onSetting, noTitle }) => {
  const [number, setNumber] = useState(0);
  const [list, setList] = useState([]);
  const [hookParams, setHookParams] = useState({ is_temp: 0, menu_id: 'register', step: 2 });

  useEffect(() => {
    const delayFetch = setTimeout(fetchData, 1000);
    return () => {
      clearTimeout(delayFetch);
    };
  }, []);

  const fetchData = async () => {
    switch (report.icon) {
      case 'iconMiddle1': // 등록하기
        setHookParams({ is_temp: 0, menu_id: 'register', step: 2 });
        break;
      case 'iconMiddle2': // 임시저장
        setHookParams({ is_temp: 1, menu_id: 'temp', step: 1 });
        break;
      case 'iconMiddle3': // 수정요청
        setHookParams({ is_temp: 0, menu_id: 'modify', step: 9 });
        break;
      case 'iconMiddle4': // 미결재
        setHookParams({ is_temp: 0, menu_id: 'insuspense', step: 99 });
        break;
      case 'iconMiddle5': // 진행중
        setHookParams({ is_temp: 0, menu_id: 'inprogress', step: 2 });
        break;
      case 'iconMiddle6': // 완료보고 미작성
        setHookParams({ is_temp: 0, menu_id: 'complete', step: 7 });
        break;
      default:
        break;
    }
    // if (hookParams !== '') {
    //   const { response, error } = await service.signTask.get(mnuid);
    //   if (response && !error) {
    //     console.debug('>>> response', response);
    //     if (this.mounted) {
    //       this.setState({
    //         number: response.pagination.total,
    //       });
    //     }
    //   } else {
    //     console.error('>>> error', error);
    //     alertMessage.alert('Server Error');
    //   }
    // }
  };

  const { pagination } = useSignList(hookParams);

  return (
    <StyledReport bgColor={report.bgColor}>
      <div className={`main_banner ${report.bgClass}`}>
        {/*
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
          */}
        <Link to={report.to}>
          <span className="report_icon">
            <img src={icons[report.icon]} alt={title} className="report_img" />
          </span>
          <span className="report_tit">{`${noTitle ? '' : title}`}</span>
          <span className="report_en">{report.enTitle}</span>
          <span className="report_num">
            {pagination?.total}
            <span className="report_num_com">건</span>
          </span>
        </Link>
      </div>
    </StyledReport>
  );
};

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
    to: PropTypes.string,
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
    to: '',
  },
  onSetting: false,
  noTitle: false,
};

export default Report;
