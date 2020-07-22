import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData } = this.props;
    const columns = [
      { title: '발생일시', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: 'FAB', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: 'No', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: 'Chemical Name', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: 'DOWN 시간', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: 'UP 시간', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '문제점', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '조치사항', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: 'Run 피해', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '작업자', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '비고', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '생산장비 통보여부', width: { wpx: 100 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'OCCURDT', style: { font: { sz: '12' } } },
      { field: 'FAB', style: { font: { sz: '12' } } },
      { field: 'GONGNO', style: { font: { sz: '12' } } },
      { field: 'PRODNM', style: { font: { sz: '12' } } },
      { field: 'DOWNTIME', style: { font: { sz: '12' } } },
      { field: 'UPTIME', style: { font: { sz: '12' } } },
      { field: 'PROBLEM', style: { font: { sz: '12' } } },
      { field: 'MEASURE', style: { font: { sz: '12' } } },
      { field: 'DAMAGE', style: { font: { sz: '12' } } },
      { field: 'OWNID', style: { font: { sz: '12' } } },
      { field: 'BIGO', style: { font: { sz: '12' } } },
      { field: 'EQUIPNOTI', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp isBuilder={false} fileName="gas_history" btnText="Excel" btnSize="btn-sm" columns={columns} fields={fields} listData={listData} />
    );
  }
}

Excel.propTypes = {
  listData: PropTypes.array,
};

export default Excel;
