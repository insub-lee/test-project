import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const getStepTypeName = stepType => {
  let stepTypeNm = '사용자';
  if (stepType === 'D') stepTypeNm = '부서';
  else if (stepType === 'V') stepTypeNm = '그룹';
  return stepTypeNm;
};

const getGubunName = gubun => {
  let gubunNm = '결재';
  if (gubun === 2) gubunNm = '합의(개인)';
  else if (gubun === 3) gubunNm = '합의(부서)';
  else if (gubun === 4) gubunNm = '전결';
  return gubunNm;
};

class SignLine extends Component {
  componentDidMount() {}

  render() {
    const { signline } = this.props;
    const columns = [
      {
        title: '단계',
        dataIndex: 'STEP',
        key: 'step',
        width: '10%',
        render: text => `${text}단계`,
      },
      // {
      //   title: '유형',
      //   dataIndex: 'STEP_TYPE',
      //   key: 'stepType',
      //   width: '10%',
      //   render: text => getStepTypeName(text),
      // },
      {
        title: '결재구분',
        dataIndex: 'GUBUN',
        key: 'gubun',
        width: '10%',
        render: text => getGubunName(text),
      },
      {
        title: '결재자',
        dataIndex: 'NAME_KOR',
        key: 'name_kor',
        render: (text, record) => <span>{record.GUBUN === 3 ? `${record.PSTN_NAME_KOR}` : `${text} ${record.PSTN_NAME_KOR}`}</span>,
      },
      {
        title: '상태',
        dataIndex: 'APPV_STATUS_NM',
        key: 'appvStatus',
        width: '10%',
      },
      {
        title: '승인일시',
        dataIndex: 'APPV_DTTM',
        key: 'appvDttm',
        width: '15%',
      },
    ];

    return (
      <div style={{ marginTop: '10px' }}>
        {/* <PageHeader title="결재선" /> */}
        <div>
          <Table columns={columns} dataSource={signline.map((item, index) => ({ ...item, key: index }))} bordered pagination={false} size="small" />
        </div>
      </div>
    );
  }
}

SignLine.propTypes = {
  signline: PropTypes.array,
};

SignLine.defaultProps = {
  signline: [],
};

export default SignLine;
