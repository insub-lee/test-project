import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Checkbox, Input, Modal, Button, Icon } from 'antd';
import StyledModalWrapper from 'apps/mdcs/styled/Modals/StyledModalWrapper';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import StyledButton from 'apps/mdcs/styled/StyledButton';

const AntdModal = StyledModalWrapper(Modal);
const AntdTable = StyledAntdTable(Table);

class DocSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      setInitYn: true,
      modalVisible: false,
      searchValue: '',
      tableData: [],
      leftSelection: [],
      rightSelection: [],
      selectedData: [],
      initSelectedData: [],
    };
  }

  componentDidMount() {
    const { colData, CONFIG, id, getExtraApiData, extraApiData } = this.props;
    const { searchApiType } = CONFIG.property;
    if (colData === undefined && colData.trim() !== '') {
      const getApi = {
        key: `selected_${searchApiType}`,
        url: `/api/mdcs/v1/common/MdcsStandard/subData`,
        type: 'POST',
        params: { list: colData.split(','), type: `${searchApiType}` },
      };
      getExtraApiData(id, [getApi]);
    }
  }

  onClickModalBtn = bool => {
    const { initSelectedData } = this.state;
    this.setState({
      modalVisible: bool,
      selectedData: initSelectedData,
      searchValue: '',
    });
  };

  onChangeSearchValue = value => {
    this.setState({
      searchValue: value,
    });
  };

  onSearchDoc = () => {
    const { id, getExtraApiData, CONFIG } = this.props;
    const { searchApiType, searchApiResultKey } = CONFIG.property;
    const searchApi = {
      key: `${searchApiResultKey}`,
      url: `/api/mdcs/v1/common/MdcsStandard/${searchApiType}/${this.state.searchValue}`,
      type: 'GET',
      params: {},
    };
    getExtraApiData(id, [searchApi]);
  };

  onClickRight = () => {
    const { leftSelection, selectedData } = this.state;
    const addData = leftSelection.filter(item => selectedData.find(row => row.TASK_SEQ === item.TASK_SEQ) === undefined);
    this.setState({
      selectedData: selectedData.concat(addData),
    });
  };

  onClickLeft = () => {
    const { selectedData, rightSelection } = this.state;
    const nextSelectedData = selectedData.filter(item => rightSelection.find(row => row.TASK_SEQ === item.TASK_SEQ) === undefined);
    this.setState({
      selectedData: nextSelectedData,
    });
  };

  onClickDone = () => {
    const { selectedData } = this.state;
    this.setState(
      {
        modalVisible: false,
        searchValue: '',
        tableData: selectedData,
        initSelectedData: selectedData,
      },
      () => this.formDataChange(),
    );
  };

  formDataChange = () => {
    const { id, changeFormData, CONFIG } = this.props;
    const { tableData } = this.state;
    const form = tableData.map(item => item.TASK_SEQ).join(',');
    changeFormData(id, CONFIG.property.COMP_FIELD, form);
  };

  render() {
    const { CONFIG, extraApiData } = this.props;
    const { compTitle, modalTitle, searchApiType, searchApiResultKey } = CONFIG.property;
    const { tableData, modalVisible, searchValue, selectedData, setInitYn } = this.state;
    const columns = [
      {
        dataIndex: 'SP_ID',
        align: 'center',
        width: '20%',
        title: '문서번호',
      },
      {
        dataIndex: 'SP_REV',
        align: 'center',
        width: '10%',
        title: 'REV',
      },
      {
        dataIndex: 'TITLE',
        align: 'center',
        width: '60%',
        title: '제목',
        render: text => <div>{text}</div>,
      },
    ];

    const leftRowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          leftSelection: selectedRows,
        });
      },
    };

    const rightRowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          rightSelection: selectedRows,
        });
      },
    };

    let leftTableData = [];
    if (extraApiData && extraApiData[searchApiResultKey] && extraApiData[searchApiResultKey][searchApiResultKey]) {
      const apiData = extraApiData[searchApiResultKey][searchApiResultKey];
      leftTableData = apiData.map(item => ({ ...item, key: item.TASK_SEQ }));
    }

    if (extraApiData && extraApiData[`selected_${searchApiType}`] && setInitYn) {
      const orgSelectionList = extraApiData[`selected_${searchApiType}`].dataList;
      const defaultSelection = orgSelectionList.map(item => ({
        key: item.task_seq,
        SP_ID: item.sp_id,
        SP_REV: item.sp_rev,
        TASK_SEQ: item.task_seq,
        WORK_SEQ: item.work_seq,
        TITLE: item.title,
      }));

      this.setState({
        setInitYn: false,
        selectedData: defaultSelection,
        tableData: defaultSelection,
        initSelectedData: defaultSelection,
      });
    }

    return (
      <>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            {compTitle}
            <StyledButton className="btn-gray btn-sm" onClick={() => this.onClickModalBtn(true)} style={{ float: 'right' }}>
              {modalTitle}
            </StyledButton>
          </Col>
        </Row>
        <Row>
          <Table columns={columns} dataSource={tableData} pagination={false} />
        </Row>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          visible={modalVisible}
          footer={null}
          width={800}
          onCancel={() => this.onClickModalBtn(false)}
          destroyOnClose
        >
          <>
            <div className="pop_tit">{modalTitle} 선택</div>
            <div className="pop_con">
              <Row>검색 키워드를 입력하세요.</Row>
              <Row style={{ marginBottom: '10px' }}>
                <Input.Search value={searchValue} onChange={e => this.onChangeSearchValue(e.target.value)} onSearch={() => this.onSearchDoc()}></Input.Search>
              </Row>
              <Row>
                <Col span={11}>
                  <AntdTable rowSelection={leftRowSelection} columns={columns} dataSource={leftTableData} pagination={{ size: 'small', pageSize: 7 }} />
                </Col>
                <Col span={2} style={{ textAlign: 'center', marginTop: '80px' }}>
                  <>
                    <div>
                      <Button size="small" onClick={this.onClickRight} style={{ border: 'none', marginBottom: '10px' }}>
                        <span>
                          <Icon type="right" />
                        </span>
                      </Button>
                    </div>
                    <div>
                      <Button size="small" onClick={this.onClickLeft} style={{ border: 'none' }}>
                        <span>
                          <Icon type="left" />
                        </span>
                      </Button>
                    </div>
                  </>
                </Col>
                <Col span={11}>
                  <AntdTable rowSelection={rightRowSelection} columns={columns} dataSource={selectedData} pagination={{ size: 'small', pageSize: 7 }} />
                </Col>
              </Row>
              <Row>
                <StyledButton className="btn-primary btn-sm" onClick={() => this.onClickDone()} style={{ float: 'right', marginTop: '10px' }}>
                  확인
                </StyledButton>
              </Row>
            </div>
          </>
        </AntdModal>
      </>
    );
  }
}

DocSelect.propTypes = {
  id: PropTypes.string,
  getExtraApiData: PropTypes.func,
  changeFormData: PropTypes.func,
  changeValidationData: PropTypes.func,
  CONFIG: PropTypes.object,
  readOnly: PropTypes.bool,
  colData: PropTypes.any,
  formData: PropTypes.object,
  compProps: PropTypes.object,
  extraApiData: PropTypes.object,
};

DocSelect.defaultProps = {
  readOnly: false,
  colData: '',
  id: 'checkbox_testComp',
  getExtraApiData: () => false,
  changeFormData: () => false,
  changeValidationData: () => false,
  extraApiData: {},
  CONFIG: {
    property: {
      isRequired: true,
      compTitle: 'SPEC', // Drawing
      modalTitle: '사내표준', // 도면
      searchApiType: 'spec', // dw
      searchApiResultKey: 'specData', // 'dwData'
    },
  },
};

export default DocSelect;
