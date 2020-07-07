import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';
import StyledLineTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
const AntdLineTable = StyledLineTable(Table);
const columns = [
  {
    title: '세부평가번호',
    align: 'center',
    dataIndex: 'DA_REG_NO',
  },
  {
    title: '순번',
    align: 'center',
    dataIndex: 'SEQ',
  },
  {
    title: '장비(설비)',
    align: 'center',
    dataIndex: 'EQUIP_NM',
  },
  {
    title: '작업조건',
    align: 'center',
    dataIndex: 'WOKRCND',
  },
  {
    title: '위험요인',
    align: 'center',
    dataIndex: 'DANGFACT',
  },
  {
    title: '발생형태',
    align: 'center',
    dataIndex: 'EQUIP_NM',
  },
  {
    title: '현재안전조치',
    align: 'center',
    dataIndex: 'EQUIP_NM',
  },
  {
    title: '위험빈도',
    align: 'center',
    dataIndex: 'DAN_FREQC',
  },
  {
    title: '위험강도',
    align: 'center',
    dataIndex: 'DAN_STRGT',
  },
  {
    title: '위험등급',
    align: 'center',
    dataIndex: 'DANGRAD',
  },
  {
    title: '개선대책',
    align: 'center',
    dataIndex: 'AP_IMPROVE',
  },
  {
    title: '완료예정일',
    align: 'center',
    dataIndex: 'AP_ENDDATE',
  },
  {
    title: '개선 첨부파일',
    align: 'center',
    dataIndex: 'EQUIP_NM',
  },
  {
    title: '작성일',
    align: 'center',
    dataIndex: 'EQUIP_NM',
  },
  {
    title: '평가횟수',
    align: 'center',
    dataIndex: 'VERSION',
  },
];
const ReAppriseList = ({ reAppriseList }) => (
  <AntdLineTable
    rowKey="UNIQUE_SEQ"
    columns={columns}
    dataSource={reAppriseList || []}
    bordered
    footer={() => <span>{`${(reAppriseList && reAppriseList.length) || 0} 건`}</span>}
  />
);

ReAppriseList.propTypes = {
  reAppriseList: PropTypes.array,
};

ReAppriseList.defaultProps = {};

export default ReAppriseList;
