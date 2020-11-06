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
      { title: 'Gas 명', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: 'Gas Cabinet', width: { wpx: 200 }, style: { font: { sz: '' } } },
      { title: 'KDK', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: 'KSC', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '대성', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '노블', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '합계', width: { wpx: 100 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'prodnm', style: { font: { sz: '12' } } },
      { field: 'cabino', style: { font: { sz: '12' } } },
      { field: 'kdk', style: { font: { sz: '12' } } },
      { field: 'ksc', style: { font: { sz: '12' } } },
      { field: 'daesung', style: { font: { sz: '12' } } },
      { field: 'noble', style: { font: { sz: '12' } } },
      { field: 'total', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName="CF4_Gas_status"
        btnText="CF4 Excel"
        btnSize="btn-sm"
        columns={columns}
        fields={fields}
        listData={listData}
      />
    );
  }
}

Excel.propTypes = {
  listData: PropTypes.array,
};

export default Excel;
