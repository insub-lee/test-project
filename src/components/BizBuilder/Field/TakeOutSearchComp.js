import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Button, Modal, Table, DatePicker } from 'antd';
import moment from 'moment';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import StyledSearchInput from 'components/BizBuilder/styled/Form/StyledSearchInput';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';
import StyledModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

const AntdTable = StyledAntdTable(Table);
const AntdSearch = StyledSearchInput(Input.Search);
const AntdModal = StyledModal(Modal);
const { RangePicker } = DatePicker;
const AntdRangPicker = StyledDatePicker(DatePicker.RangePicker);

class TakeOutSearchComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalList: [],
      dates: [moment(), moment()],
      dateStrings: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
    };
  }

  searchList = () => {
    const { getExtraApiData, sagaKey: id } = this.props;
    const { dateStrings } = this.state;
    const apiValue = [
      {
        key: 'TakeOutList',
        url: `/api/eshs/v1/common/eshsTakeOutList?FROM_DATE=${dateStrings[0] || ''}&TO_DATE=${dateStrings[1] || ''}`,
        type: 'GET',
      },
    ];
    getExtraApiData(id, apiValue, this.setList);
  };

  componentDidUpdate() {
    const { changeFormData, sagaKey: id, COMP_FIELD, viewPageData } = this.props;
    if (viewPageData.viewType === 'INPUT') {
      changeFormData(id, COMP_FIELD, '');
    }
  }

  setList = () => {
    const { extraApiData } = this.props;
    const apiList = (extraApiData && extraApiData.TakeOutList && extraApiData.TakeOutList.list) || [];
    this.setState({ modalList: apiList });
  };

  handleModalVisible = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };

  onChangeSave = type => {
    const { saveTask, modifyTask, deleteTask, sagaKey: id, changeViewPage, viewPageData } = this.props;
    if (type === 'S') {
      saveTask(id, id, this.saveTaskAfter);
    } else if (type === 'M') {
      modifyTask(id, this.saveTaskAfter);
    } else if (type === 'D') {
      deleteTask(id, id, viewPageData.workSeq, viewPageData.taskSeq, changeViewPage, this.deleteCallBack);
    }
  };

  deleteCallBack = () => {
    const { sagaKey: id, changeViewPage, viewPageData } = this.props;
    changeViewPage(id, viewPageData.workSeq, -1, 'INPUT');
  };

  saveTaskAfter = (id, workSeq, taskSeq, formData) => {
    const { changeViewPage } = this.props;
    changeViewPage(id, workSeq, taskSeq, 'MODIFY');
  };

  isModalChange = record => {
    const { viewPageData, setViewPageData, sagaKey: id, changeViewPage } = this.props;
    this.handleModalVisible();
    if (viewPageData && viewPageData.viewType === 'VIEW' && record) {
      setViewPageData(id, record.WORK_SEQ, record.TASK_SEQ, 'VIEW');
      changeViewPage(id, record.WORK_SEQ, record.TASK_SEQ, 'VIEW');
    } else if (record) {
      setViewPageData(id, record.WORK_SEQ, record.TASK_SEQ, 'MODIFY');
      changeViewPage(id, record.WORK_SEQ, record.TASK_SEQ, 'MODIFY');
    }
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  modalTableRender = () => {
    const { columns } = this.props;
    const { modalList } = this.state;
    const nColumns = columns.map(nItem => ({ ...nItem, ...this.getColumnSearchProps(nItem.dataIndex) }));
    return (
      <StyledViewDesigner>
        <Sketch>
          <StyledButtonWrapper className="btn-wrap-mb-10">
            <AntdRangPicker
              className="ant-picker-sm mr5"
              defaultValue={this.state.dates}
              format={['YYYY-MM-DD', 'YYYY-MM-DD']}
              onChange={(date, dateStrings) => this.dateChange(dateStrings)}
            />
            <StyledButton className="btn-sm btn-gray" onClick={this.searchList}>
              검색
            </StyledButton>
          </StyledButtonWrapper>
          <AntdTable
            rowKey={modalList.TAKEOUT_CD}
            key={`${modalList.TAKEOUT_CD}_list`}
            columns={nColumns}
            dataSource={modalList || []}
            onRow={record => ({
              onClick: () => {
                this.isModalChange(record);
              },
            })}
          />
        </Sketch>
      </StyledViewDesigner>
    );
  };

  dateChange = dateStrings => {
    this.setState({ dateStrings });
  };

  ButtonRender() {
    const { viewPageData, sagaKey: id, changeViewPage } = this.props;
    let buttonGruop;
    switch (viewPageData && viewPageData.viewType.toUpperCase()) {
      case 'INPUT':
        buttonGruop = (
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.onChangeSave('S')}>
              등록
            </StyledButton>
            <StyledButton className="btn-light btn-sm" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
              Reset
            </StyledButton>
          </StyledButtonWrapper>
        );
        break;
      case 'MODIFY':
        buttonGruop = (
          <StyledButtonWrapper className="btn-wrap-inline">
            <StyledButton className="btn-primary btn-sm mr5" onClick={() => this.onChangeSave('M')}>
              저장
            </StyledButton>
            <StyledButton className="btn-primary btn-sm mr5" onClick={() => changeViewPage(id, viewPageData.workSeq, viewPageData.taskSeq, 'REVISION')}>
              신규등록
            </StyledButton>
            <StyledButton className="btn-light btn-sm mr5" onClick={() => this.onChangeSave('D')}>
              삭제
            </StyledButton>
            <StyledButton className="btn-light btn-sm" onClick={() => changeViewPage(id, viewPageData.workSeq, -1, 'INPUT')}>
              Reset
            </StyledButton>
          </StyledButtonWrapper>
        );
        break;
      default:
        buttonGruop = '';
        break;
    }
    return buttonGruop;
  }

  render() {
    const { CONFIG, visible, colData, viewPageData, sagaKey: id, changeViewPage } = this.props;
    return visible ? (
      <div>
        <AntdSearch
          value={colData}
          readOnly
          className="ant-search-inline input-search-mid mr5"
          style={{ width: 150, display: 'inline-block' }}
          onClick={this.handleModalVisible}
          onSearch={this.handleModalVisible}
        />
        {this.ButtonRender()}
        <AntdModal title="반출증번호 검색" visible={this.state.modal} width={800} height={600} onCancel={this.handleModalVisible} footer={[null]}>
          {this.state.modal && this.modalTableRender()}
        </AntdModal>
      </div>
    ) : (
      ''
    );
  }
}

TakeOutSearchComp.propTypes = {
  CONFIG: PropTypes.any,
  colData: PropTypes.string,
  sagaKey: PropTypes.string,
  visible: PropTypes.bool,
  viewPageData: PropTypes.func,
  changeViewPage: PropTypes.func,
  setViewPageData: PropTypes.func,
  saveTask: PropTypes.func,
  modifyTask: PropTypes.func,
  deleteTask: PropTypes.func,
  columns: PropTypes.array,
};

TakeOutSearchComp.defaultProps = {
  columns: [
    {
      title: '반출증번호',
      dataIndex: 'TAKEOUT_CD',
      align: 'center',
    },
    {
      title: '품목 및 규격',
      dataIndex: 'ITEM_NM',
      align: 'center',
    },
    {
      title: '의뢰팀',
      dataIndex: 'DEPT_NM',
      align: 'center',
    },
    {
      title: '지역',
      dataIndex: 'SITE_NM',
      align: 'center',
    },
    {
      title: '반출일자',
      dataIndex: 'TAKEOUT_DT',
      align: 'center',
    },
    {
      title: '운반업체',
      dataIndex: 'TRANS_VENDOR_NM',
      align: 'center',
    },
  ],
};
export default TakeOutSearchComp;
