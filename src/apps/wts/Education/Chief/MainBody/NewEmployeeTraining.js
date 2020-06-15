import React from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';

import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import { getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';
import Button from 'components/Button';
import service from '../../service';
import EduManageModal from '../../Modals/EduManageModal';
import EduPlanModal from '../../Modals/EduPlanModal';

class NewEmployeeTraining extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };

    this.initData = this.initData.bind(this);
    this.handleOpenManageModal = this.handleOpenManageModal.bind(this);
    this.handleOpenEduPlanModal = this.handleOpenEduPlanModal.bind(this);

    this.eduManageModalRef = React.createRef();
    this.eduPlanModalRef = React.createRef();
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    const { empno } = this.props;
    this.fetchData(empno).then(({ isError, data }) => {
      if (isError) {
        alert('조회하는 과정에서 오류가 발생했습니다.');
      } else {
        console.debug(data);
        this.setState({ data });
      }
    });
  }

  handleOpenManageModal(planseq) {
    this.eduManageModalRef.current.handleOpenModal(planseq, 'admin');
  }

  handleOpenEduPlanModal() {
    this.eduPlanModalRef.current.handleOpenModal();
  }

  async fetchData(empno) {
    const requestQuery = {
      type: 'getEduPlanByUsrId',
      usrId: empno,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manage.get(queryString);
    if (response && !error) {
      const { eduPlanList } = response;
      return {
        data: eduPlanList,
        isError: false,
      };
    }
    return {
      data: [],
      isError: true,
    };
  }

  render() {
    const { data, isLoading } = this.state;
    const { list, empno, site } = this.props;
    const columns = [
      {
        label: '등록번호',
        dataKey: 'plan_seq',
        percentWidth: 10,
      },
      {
        label: '사번',
        dataKey: 'empno',
        percentWidth: 20,
      },
      {
        label: '성명',
        dataKey: 'usrnm',
        percentWidth: 20,
        cellRenderer: ({ rowData }) => (
          <button type="button" className="popable-button" onClick={() => this.handleOpenManageModal(rowData.plan_seq)}>
            {rowData.usrnm}
          </button>
        ),
      },
      {
        label: '직책',
        dataKey: 'position',
        percentWidth: 20,
      },
      {
        label: '성별',
        dataKey: 'sex',
        percentWidth: 10,
      },
      {
        label: 'Mentor',
        dataKey: 'mentor',
        percentWidth: 20,
        cellRenderer: ({ rowData }) => `${rowData.mentonm}(${rowData.mentoid})`,
      },
    ];
    return (
      <>
        <div className="title">
          <span>신입/전배 사원 교육</span>
        </div>
        <div style={{ padding: '5px 0', textAlign: 'right' }}>
          <Button type="button" size="small" color="default" onClick={this.handleOpenEduPlanModal}>
            <i className="fa fa-pen-square" /> 멘토 지정
          </Button>
        </div>
        <StyledVirtualized minHeight={getVirtualizedMinHeight(39, 39, data.length, 500)} headerHeight={39} disableDefaultHover>
          <AutoSizer>
            {({ height, width }) => (
              <Table
                width={width}
                height={height}
                headerHeight={39}
                rowHeight={39}
                rowCount={data.length}
                rowGetter={({ index }) => data[index]}
                headerClassName="virtualized_header"
                gridClassName="virtualized_grid"
                rowClassName="virtualized_row clickable_row"
                noRowsRenderer={() => (
                  <div className="virtualized_noData">
                    <span>{isLoading ? 'Loading...' : 'No Data'}</span>
                  </div>
                )}
              >
                {columns.map(column => (
                  <Column
                    key={column.dataKey}
                    {...column}
                    width={(width * column.percentWidth) / 100}
                    style={{
                      ...column.style,
                      lineHeight: '39px',
                    }}
                  />
                ))}
              </Table>
            )}
          </AutoSizer>
        </StyledVirtualized>
        <EduManageModal ref={this.eduManageModalRef} site={site} />
        <EduPlanModal ref={this.eduPlanModalRef} list={list} empno={empno} site={site} callbackHandler={this.initData} />
      </>
    );
  }
}

export default NewEmployeeTraining;
