import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import { Icon, Spin } from 'antd';
import { getVirtualizedMinHeight, jsonToQueryString } from 'utils/helpers';
import { AutoSizer, Column, Table } from 'react-virtualized';
import StyledVirtualized from 'apps/wts/components/CommonStyledElement/StyledVirtualized';
import StyledContent from './StyledContent';
import EduManageModal from './EduManageModal';
import service from '../service';

class UserEduManageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      data: [],
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleEduManageModal = this.handleEduManageModal.bind(this);

    this.eduManageModalRef = React.createRef();
  }

  handleOpenModal(empno) {
    this.setState({ isOpen: true, isLoading: true }, () => {
      this.fetchData(empno).then(({ data, isError }) => {
        if (isError) {
          this.handleCloseModal();
        } else {
          this.setState({ data, isLoading: false });
        }
      });
    });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleEduManageModal(planseq, reportAuth) {
    this.eduManageModalRef.current.handleOpenModal(planseq, reportAuth);
  }

  async fetchData(empno) {
    const requestQuery = {
      type: 'eduPlanInfo',
      empNo: empno,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.user.get(queryString);
    if (response && !error) {
      const { eduPlanInfo } = response;
      return {
        data: eduPlanInfo,
        isError: false,
      };
    }
    return {
      isError: true,
    };
  }

  render() {
    const { isOpen, isLoading, data } = this.state;
    const { site } = this.props;
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
          <button type="button" className="popable-button" onClick={() => this.handleEduManageModal(rowData.plan_seq, 'user')}>
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
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 700,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              신입/전배 교육
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <Spin tip="Loading..." indicator={<Icon type="loading" spin />} spinning={isLoading}>
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
              </Spin>
            </div>
            <EduManageModal ref={this.eduManageModalRef} site={site} />
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

UserEduManageModal.propTypes = {
  callbackHandler: PropTypes.func,
};

UserEduManageModal.defaultProps = {
  callbackHandler: () => false,
};

export default UserEduManageModal;
