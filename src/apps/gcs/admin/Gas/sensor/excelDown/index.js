import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createExcelListData = dataList => {
    const ExcelListData = dataList.map(item => ({
      ...item,
      SENSOR_CYCLE: `${item.SENSOR_CYCLE}회/년(점검, 교정)`,
    }));
    return ExcelListData || [];
  };

  render() {
    const { dataList } = this.props;
    const excelDataSet = this.createExcelListData(dataList);
    const columns = [
      { title: '감지기번호', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '감지대상', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Fab', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Area', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: 'Key-No', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Model', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Monitor', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: 'Position', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '작동시간', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '측정방식', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '경보설정값', width: { wpx: 300 }, style: { font: { sz: '' } } },
      { title: '경보기위치', width: { wpx: 120 }, style: { font: { sz: '' } } },
      { title: '정밀도', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '경보시 조치내용', width: { wpx: 400 }, style: { font: { sz: '' } } },
      { title: '유지관리', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: 'TWA-TLV', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '참고사항', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '교체점검일', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '교체점검 예정일', width: { wpx: 150 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'SENSORNO', style: { font: { sz: '12' } } },
      { field: 'SENSORSEL', style: { font: { sz: '12' } } },
      { field: 'FAB', style: { font: { sz: '12' } } },
      { field: 'AREA', style: { font: { sz: '12' } } },
      { field: 'KEY_NO', style: { font: { sz: '12' } } },
      { field: 'MODEL', style: { font: { sz: '12' } } },
      { field: 'MONITOR', style: { font: { sz: '12' } } },
      { field: 'POSITION', style: { font: { sz: '12' } } },
      { field: 'SENSORTIME', style: { font: { sz: '12' } } },
      { field: 'SENSORPUMP', style: { font: { sz: '12' } } },
      { field: 'SENSORSET1', style: { font: { sz: '12' } } },
      { field: 'SENSOR_AREA', style: { font: { sz: '12' } } },
      { field: 'SENSOR_PERCENT', style: { font: { sz: '12' } } },
      { field: 'SENSOR_COMENT', style: { font: { sz: '12' } } },
      { field: 'SENSOR_AS', style: { font: { sz: '12' } } },
      { field: 'SENSOR_TWA', style: { font: { sz: '12' } } },
      { field: 'SENSOR_ADD', style: { font: { sz: '12' } } },
      { field: 'SENSOR_CHECKDT', style: { font: { sz: '12' } } },
      { field: 'SENSOR_SCHEDT', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName="Gas_Leak_Detector"
        btnText="Excel"
        btnSize="btn-sm"
        columns={columns}
        fields={fields}
        listData={excelDataSet}
      />
    );
  }
}

Excel.propTypes = {
  dataList: PropTypes.array,
};

export default Excel;
