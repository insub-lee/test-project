import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExcelDownloadComp from 'components/BizBuilder/Field/ExcelDownloadComp';

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataList } = this.props;
    const setDataList = dataList.map(data => ({ ...data, menu: data.menu.list.join(', '), cal: data.menu.cal }));

    const columns = [
      { title: '날짜', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '시간', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '종류', width: { wpx: 100 }, style: { font: { sz: '' } } },
      { title: '메뉴', width: { wpx: 500 }, style: { font: { sz: '' } } },
      { title: '칼로리', width: { wpx: 100 }, style: { font: { sz: '' } } },
    ];

    const fields = [
      { field: 'day', style: { font: { sz: '12' } } },
      { field: 'mealtype', style: { font: { sz: '12' } } },
      { field: 'daydiv', style: { font: { sz: '12' } } },
      { field: 'menu', style: { font: { sz: '12' } } },
      { field: 'cal', style: { font: { sz: '12' } } },
    ];

    return (
      <ExcelDownloadComp
        isBuilder={false}
        fileName="주간메뉴"
        className=""
        btnText="주간메뉴 다운로드"
        btnSize="btn-sm"
        sheetName="주간메뉴"
        columns={columns}
        fields={fields}
        listData={setDataList}
      />
    );
  }
}

Excel.propTypes = {
  dataList: PropTypes.array,
};

export default Excel;
