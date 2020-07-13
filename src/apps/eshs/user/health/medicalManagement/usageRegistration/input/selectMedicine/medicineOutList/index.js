import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Table } from 'antd';
import moment from 'moment';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledPicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);
const AntdPicker = StyledPicker(DatePicker.RangePicker);
class MedicineOutList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
        .startOf('month')
        .format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      dataSource: [],
    };
  }

  columns = [
    {
      title: '부서',
      dataIndex: 'DEPT_NAME_KOR',
      align: 'center',
    },
    {
      title: '이름',
      dataIndex: 'PATIENT_NAME',
      align: 'center',
    },
    {
      title: '제공량',
      dataIndex: 'OUT_QTY',
      align: 'center',
    },
    {
      title: '제공날짜',
      dataIndex: 'OUT_DATE',
      align: 'center',
    },
  ];

  componentDidMount() {
    this.getDataSource();
  }

  getDataSource = () => {
    const { startDate, endDate } = this.state;
    const { sagaKey, getCallDataHandler, record } = this.props;

    const url = `/api/eshs/v1/common/health-usage-meidicine-out-list`;
    const queryString = `DRUG_CD=${record.DRUG_CD}&START_DATE=${startDate}&END_DATE=${endDate}`;
    const apiArr = [
      {
        key: 'medicineOutList',
        url: `${url}?${queryString}`,
        type: 'GET',
      },
    ];

    getCallDataHandler(sagaKey, apiArr, this.setDataSource);
  };

  setDataSource = () => {
    const { result } = this.props;
    this.setState({
      dataSource: (result.medicineOutList && result.medicineOutList.list) || [],
    });
  };

  handleDateChange = (date, dateString) => {
    this.setState({
      startDate: dateString[0],
      endDate: dateString[1],
    });
  };

  render() {
    const { columns } = this;
    const { getDataSource, handleDateChange } = this;
    const { dataSource, startDate, endDate } = this.state;
    const { handleModalClose } = this.props;
    return (
      <>
        <StyledContentsWrapper>
          <StyledCustomSearchWrapper>
            <div className="search-input-area mb10">
              <span className="text-label">기간</span>
              <AntdPicker defaultValue={[moment(startDate), moment(endDate)]} onChange={handleDateChange} style={{ width: '85%' }} />
            </div>
            <div className="btn-area">
              <StyledButton className="btn-gray btn-sm" onClick={getDataSource}>
                검색
              </StyledButton>
            </div>
          </StyledCustomSearchWrapper>
          <AntdTable columns={columns} dataSource={dataSource} footer={() => <span>{`${dataSource.length || 0} 건`}</span>} />
          <StyledButtonWrapper className="btn-wrap-center btn-wrap-mt-20 btn-wrap-mb-10">
            <StyledButton className="btn-gray btn-sm mr5" onClick={handleModalClose}>
              확인
            </StyledButton>
          </StyledButtonWrapper>
        </StyledContentsWrapper>
      </>
    );
  }
}

MedicineOutList.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  record: PropTypes.object,
  result: PropTypes.object,
  handleModalClose: PropTypes.func,
};

MedicineOutList.defaultProps = {};

export default MedicineOutList;
