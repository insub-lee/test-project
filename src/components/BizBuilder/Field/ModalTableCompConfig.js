import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Row, Select, Popconfirm, Button, Input, InputNumber, message, Checkbox, Modal } from 'antd';
import BizMicroDevBase from 'components/BizMicroDevBase';

import Styled from 'apps/WorkBuilderApp/Admin/WorkBuilderDetailPage/ViewDesigner/CompItem/Styled';

const { Option } = Select;

class ComponentConfig extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      fieldApiList: [],
      columnList: [],
      title: '',
      dataIndex: '',
      targetIndex: '',
      align: 'center',
      width: 0,
      changeFormDataYN: false,
      columnHiddenYN: false,
      scrollYN: false,
      modal: false,
    };
  }

  componentDidMount() {
    const {
      getCallDataHandler,
      sagaKey: id,
      apiArray,
      configInfo: { property },
    } = this.props;
    this.setState({ columnList: (property && property.columns) || [], scrollYN: !!(property && property.scrollSet) });
    getCallDataHandler(id, apiArray, this.initData);
  }

  initData = () => {
    const {
      result: { apiList },
    } = this.props;
    this.setState({
      fieldApiList: apiList && apiList.list && apiList.list.filter(item => item.CALL_TYPE === 'F' && item.ISUSED === 'Y'),
    });
  };

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  handleChangeApiData = value => {
    const { fieldApiList } = this.state;
    const temp = fieldApiList.filter(item => value.indexOf(item.API_SEQ) > -1 && item);
    const nApiList = { apiSeq: value, apiInfo: temp };
    this.handleChangeViewCompData('apiData', nApiList);
  };

  insertColumn = () => {
    const {
      configInfo: { property },
    } = this.props;
    const { title, dataIndex, targetIndex, align, width, columnList, changeFormDataYN, columnHiddenYN } = this.state;
    const overlab = property && property.columns && property.columns.findIndex(item => item.dataIndex === dataIndex || item.targetIndex === targetIndex);
    if ((overlab === -1 || overlab === undefined) && title && dataIndex) {
      columnList.push({
        title,
        dataIndex,
        targetIndex,
        align,
        width,
        changeFormDataYN: changeFormDataYN || false,
        columnHiddenYN: columnHiddenYN || false,
      });
      this.setState({ columnList, title: '', dataIndex: '', targetIndex: '', align: 'center', width: 0, changeFormDataYN: false, columnHiddenYN: false });
      this.handleChangeViewCompData('columns', columnList);
      message.info('등록되었습니다.');
      this.handleModalVisible();
    } else if (title && dataIndex) {
      message.warning('중복된 컬럼 또는 중복된 타겟이 존재합니다.');
    } else if (dataIndex) {
      message.warning('컬럼 제목를 입력해주세요.');
    } else {
      message.warning('컬럼명을 입력해주세요.');
    }
  };

  updateColumn = () => {
    const {
      configInfo: { property },
    } = this.props;
    const { title, dataIndex, targetIndex, align, width, columnList, changeFormDataYN, columnHiddenYN } = this.state;
    const updateIndex = property && property.columns && property.columns.findIndex(item => item.dataIndex === dataIndex);
    if (updateIndex !== -1 && title && dataIndex) {
      columnList.splice(updateIndex, 1, {
        title,
        dataIndex,
        targetIndex,
        align,
        width,
        changeFormDataYN: changeFormDataYN || false,
        columnHiddenYN: columnHiddenYN || false,
      });
      this.setState({ columnList, title: '', dataIndex: '', targetIndex: '', align: 'center', width: 0, changeFormDataYN: false, columnHiddenYN: false });
      this.handleChangeViewCompData('columns', columnList);
      message.info('수정되었습니다.');
      this.handleModalVisible();
    } else if (title && dataIndex) {
      message.warning('존재하지 않은 컬럼입니다.');
    } else if (dataIndex) {
      message.warning('컬럼 제목를 입력해주세요.');
    } else {
      message.warning('컬럼명을 입력해주세요.');
    }
  };

  selectedColumn = col => {
    this.setState({
      title: col.title,
      dataIndex: col.dataIndex,
      targetIndex: col.targetIndex,
      align: col.align,
      width: col.width,
      changeFormDataYN: col.changeFormDataYN,
      columnHiddenYN: col.columnHiddenYN,
    });
    this.handleModalVisible();
  };

  deleteColumn = () => {
    const { columnList, dataIndex } = this.state;
    const index = columnList.findIndex(item => item.dataIndex === dataIndex);
    columnList.splice(index, 1);
    this.setState({ columnList });
    this.handleChangeViewCompData('columns', columnList);
    this.handleModalVisible();
  };

  // onChangeInputT = value => {
  //   this.setState({
  //     title: value,
  //   });
  // };

  // onChangeInputI = value => {
  //   this.setState({
  //     dataIndex: value,
  //   });
  // };

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeNumberInput = value => {
    this.setState({ width: value });
  };

  onChangeSelect = value => {
    this.setState({ align: value });
  };

  onChangeFormDataYNCheckbox = value => {
    this.setState({ changeFormDataYN: value });
  };

  onChangeColumnHiddenCheckbox = value => {
    this.setState({ columnHiddenYN: value });
  };

  onChangescrollBarSet = () => {
    const { xline, yline } = this.state;
    this.handleChangeViewCompData('scrollSet', { xline, yline });
    message.info('등록되었습니다.');
  };

  onChangescrollBarSetYN = value => {
    this.setState({ scrollYN: value });
    if (!value) {
      this.handleChangeViewCompData('scrollSet', undefined);
    }
  };

  handleModalVisible = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };

  render() {
    const { configInfo } = this.props;
    const { fieldApiList } = this.state;
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">사용 API</span>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="API를 설정해주세요"
            value={
              configInfo && configInfo.property && configInfo.property.apiData && configInfo.property.apiData.apiSeq
                ? configInfo.property.apiData.apiSeq
                : undefined
            }
            onChange={value => {
              this.handleChangeApiData(value);
            }}
          >
            {fieldApiList.map(item => (
              <Option key={`FieldApi_${item.API_SEQ}`} value={item.API_SEQ}>
                {item.API_NAME}
              </Option>
            ))}
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">Table 추가 설정</span>
          <div className="popoverInnerCom">
            <Checkbox checked={this.state.scrollYN} onChange={e => this.onChangescrollBarSetYN(e.target.checked)}>
              Scroll bar 사용 여부
            </Checkbox>
            {this.state.scrollYN ? (
              <>
                <InputNumber
                  placeholder="x 축"
                  max={3000}
                  value={this.state.xline || (configInfo && configInfo.property && configInfo.property.scrollSet && configInfo.property.scrollSet.xline)}
                  onChange={e => this.setState({ xline: e })}
                  style={{ width: '80%' }}
                />
                <InputNumber
                  placeholder="y 축"
                  max={3000}
                  value={this.state.yline || (configInfo && configInfo.property && configInfo.property.scrollSet && configInfo.property.scrollSet.yline)}
                  onChange={e => this.setState({ yline: e })}
                  style={{ width: '80%' }}
                />
                <Button onClick={() => this.onChangescrollBarSet()}>적용</Button>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">Column 목록</span>
          <div className="popoverInnerCom">
            {configInfo &&
              configInfo.property &&
              configInfo.property.columns &&
              configInfo.property.columns.map(item => <Button onClick={() => this.selectedColumn(item)}>{item.title}</Button>)}
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={this.handleModalVisible}>column 추가</Button>
          </div>
        </div>
        <Modal visible={this.state.modal} width={800} onCancel={this.handleModalVisible} footer={[]}>
          <Styled className="popoverWrapper">
            <div className="popoverInnerInput">
              <p className="popover-tit">Column 추가</p>
              <div className="popoverInnerCom">
                <div className="popoverItem popoverItemInput">
                  <span className="spanLabel">Column 제목</span>
                  <Input value={this.state.title} name="title" onChange={this.onChangeInput} placeholder="컬럼 제목을 입력해주세요." />
                </div>
                <div className="popoverItem popoverItemInput">
                  <span className="spanLabel">Column 명</span>
                  <Input value={this.state.dataIndex} name="dataIndex" onChange={this.onChangeInput} placeholder="List 컬럼 명을 입력해주세요." />
                </div>
                <div className="popoverItem popoverItemInput">
                  <span className="spanLabel">Target 명</span>
                  <Input value={this.state.targetIndex} name="targetIndex" onChange={this.onChangeInput} placeholder="Target 컬럼 명을 입력해주세요." />
                </div>
                <div className="popoverItem popoverItemInput">
                  <span className="spanLabel">Align</span>
                  <Select value={this.state.align} onChange={value => this.onChangeSelect(value)} style={{ width: '100%' }}>
                    <Option value="left">left</Option>
                    <Option value="right">right</Option>
                    <Option value="center">center</Option>
                  </Select>
                </div>
                <div className="popoverItem popoverItemInput">
                  <span className="spanLabel">Column 길이</span>
                  <InputNumber max={1000} value={this.state.width} onChange={e => this.onChangeNumberInput(e)} style={{ width: '100%' }} />
                </div>
                <div className="popoverItem popoverItemInput">
                  <span className="spanLabel">Column 추가 설정</span>
                  <Checkbox checked={this.state.changeFormDataYN} onChange={e => this.onChangeFormDataYNCheckbox(e.target.checked)}>
                    changeFormData 사용여부
                  </Checkbox>
                  <Checkbox checked={this.state.columnHiddenYN} onChange={e => this.onChangeColumnHiddenCheckbox(e.target.checked)}>
                    Hidden Column 여부
                  </Checkbox>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Button onClick={this.insertColumn}>컬럼 등록</Button>
                  <Button onClick={this.updateColumn}>컬럼 수정</Button>
                  <Popconfirm placement="top" title="삭제 하시겠습니까?" onConfirm={this.deleteColumn} okText="Yes" cancelText="No">
                    <Button>컬럼 삭제</Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </Styled>
        </Modal>
      </>
    );
  }
}
const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="ApiPlusConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ComponentConfig}
  ></BizMicroDevBase>
);

ComponentConfig.propTypes = {
  configInfo: PropTypes.any,
  result: PropTypes.any,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  apiArray: PropTypes.array,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

configer.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

ComponentConfig.defaultProps = {
  apiArray: [{ key: 'apiList', url: `/api/builder/v1/work/apimaster`, type: 'GET' }],
};
export default configer;
