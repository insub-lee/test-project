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

    const setList = listData.map(item => {
      if (item.ACCIDENT_YN === 0) {
        return {
          ...item,
          ACCIDENT_YN: '미발생',
        };
      }
      return {
        ...item,
        ACCIDENT_YN: '발생',
      };
    });

    const columns = [
      /* AS-IS
      { title: '기간', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '지역', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '분기', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '재해발생여부', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '근무시간', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '누적시간', width: { wpx: 100 }, style: { font: { sz: '' } } },
      */
      { title: '기간', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '분기', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '구미', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '청주', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '서울', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '합계', width: { wpx: 100 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      /* AS-IS
      { field: 'WORK_DT', style: { font: { sz: '12' } } },
      { field: 'SITE', style: { font: { sz: '12' } } },
      { field: 'WORK_QUARTER', style: { font: { sz: '12' } } },
      { field: 'ACCIDENT_YN', style: { font: { sz: '12' } } },
      { field: 'WORK_HOURS', style: { font: { sz: '12' } } },
      { field: 'TOTAL_HOURS', style: { font: { sz: '12' } } },
      */
      { field: 'WORK_DT', style: { font: { sz: '12' } } },
      { field: 'WORK_QUARTER', style: { font: { sz: '12' } } },
      { field: 'SITE', style: { font: { sz: '12' } } },
      { field: 'SITE1', style: { font: { sz: '12' } } },
      { field: 'SITE2', style: { font: { sz: '12' } } },
      { field: 'ROW_SUM', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName="무재해시간 리스트"
        btnText="엑셀받기"
        btnSize="btn-sm"
        columns={columns}
        fields={fields}
        listData={setList}
      />
    );
  }
}

Excel.propTypes = {
  listData: PropTypes.array,
};

export default Excel;
