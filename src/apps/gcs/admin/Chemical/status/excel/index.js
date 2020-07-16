import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData, site } = this.props;
    const columns = [
      { title: '장치번호', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '장치명', width: { wpx: 200 }, style: { font: { sz: '' } } },
      { title: '위치', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '기타정보', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: 'KEY-NO', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: 'BAY', width: { wpx: 150 }, style: { font: { sz: '' } } },
      { title: '공정명', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '공급일', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: 'Point', width: { wpx: 50 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'GONGNO', style: { font: { sz: '12' } } },
      { field: 'PRODNM', style: { font: { sz: '12' } } },
      { field: 'GONGAREA', style: { font: { sz: '12' } } },
      { field: 'GONGINFO', style: { font: { sz: '12' } } },
      { field: 'FAB_KEYNO', style: { font: { sz: '12' } } },
      { field: 'FAB_AREA', style: { font: { sz: '12' } } },
      { field: 'FAB_PROC', style: { font: { sz: '12' } } },
      { field: 'GONGDT', style: { font: { sz: '12' } } },
      { field: 'POINTCNT', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName={`${site}_Chemical_status`}
        btnText="Excel"
        btnSize="btn-sm"
        columns={columns}
        fields={fields}
        listData={listData}
      />
    );
  }
}

Excel.propTypes = {
  site: PropTypes.string,
  listData: PropTypes.array,
};

export default Excel;
