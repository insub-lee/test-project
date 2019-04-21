import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Select, Popover, Button, Transfer, Input, Radio } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as feed from 'components/Feedback/functions';
import axios from 'axios';
// import ReactExport from 'react-data-export/dist/index.js';
import AntRadiobox from '../../../../../../../containers/store/components/uielements/radiobox.style';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import { BtnSearchDkGray } from './buttons.style';
import Grid from './grid.js';

const Options = Select.Option;
// const ExcelFiles = ReactExport.ExcelFile;
// const ExcelSheets = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumns = ReactExport.ExcelFile.ExcelColumn;
const RadioGroup = AntRadiobox(Radio.Group);
const isNull = value => value === '' || value === undefined || value === null;

class PMSheet extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultBox: [],
      factory: undefined,
      // detailFactory: undefined,
      sdpt: undefined,
      model: undefined,
      version: undefined,
      signStatus: undefined,
      isExcelDownload: 0,
      // uploadFile: undefined,
      extArray: ['XLS', 'XLSX', 'CSV'],
      // mockData: [],
      targetKeys: [],
      radioValue: '1',
      popoverVisible: false,
      eqIdValue: undefined,
      eqIdSearchWord: '',
      openPopover: false,
    };
    this.props.handleLoadingFactoryParam();
  }

  componentWillReceiveProps(nextProps) {
    const { targetKeys } = this.state;
    if (this.props.tidnList !== nextProps.tidnList) {
      if (targetKeys.length > 0) {
        const newTargetKeys = targetKeys;
        const newTidnList = JSON.parse(JSON.stringify(nextProps.tidnList));
        const beforeTidnList = JSON.parse(JSON.stringify(this.props.tidnList));
        for (let i = 0; i < targetKeys.length; i += 1) {
          let modifyCount = 0;
          for (let j = 0; j < newTidnList.length; j += 1) {
            // if (newTidnList[j].CODE === beforeTidnList[targetKeys[i]].CODE) {
            if (newTidnList[j].title === beforeTidnList[targetKeys[i]].title) {
              // if (tempTidnList[j].key.toString() !== this.props.tidnList[targetKeys[i]].key.toString()) {
              if (nextProps.tidnList[j].key !== targetKeys[i]) {
                newTargetKeys[i] = newTidnList[j].key;
              }
              modifyCount += 1;
            }
          }
          if (modifyCount === 0) {
            const tempdata = beforeTidnList[targetKeys[i]];
            tempdata.key = nextProps.tidnList.length;
            newTargetKeys[i] = nextProps.tidnList.length;
            nextProps.tidnList.push(tempdata);
            // const tempdata = {
            //   CODE: beforeTidnList[targetKeys[i]].CODE,
            //   NAME: beforeTidnList[targetKeys[i]].NAME,
            //   EQUNR: beforeTidnList[targetKeys[i]].EQUNR,
            //   TPLNR: beforeTidnList[targetKeys[i]].TPLNR,
            //   key: nextProps.tidnList.length,
            //   title: beforeTidnList[targetKeys[i]].title,
            //   description: beforeTidnList[targetKeys[i]].description,
            //   chosen: beforeTidnList[targetKeys[i]].chosen,
            // };
            // newTargetKeys[i] = nextProps.tidnList.length;
            // nextProps.tidnList.push(tempdata);
          }
        }
        this.setState({ targetKeys: newTargetKeys });
      }
    }
  }

  handleUpload = (event) => {
    const data = new FormData();
    const fileExt = event.target.files[0].name.split('.')[1];
    const { extArray } = this.state;
    let isExt = false;
    let extText = '';
    // console.log(event);
    event.stopPropagation();
    event.preventDefault();
    // this.setState({
    //   uploadFile: event.target.files[0],
    // });
    data.append('file', event.target.files[0]);
    data.append('name', event.target.files[0].name);
    for (let i = 0; i < extArray.length; i += 1) {
      if (fileExt.toUpperCase() === extArray[i]) {
        isExt = true;
      }
      extText = `${extText}, ${extArray[i]}`;
    }
    extText = extText.substring(2);

    if (isExt) {
      axios.post('/api/gipms/v1/pmsheet/PmSheetExcelUpload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    } else {
      feed.error(`엑셀 Upload는 ${extText} 파일 형식 만 가능합니다.`);
    }
    // handlePmSheetExcelUpload(event);
    // handleUploadToServer(event.target.files[0]);
    // http://portalloc.skhynix.com/files/
    // yield call(Axios.post, '/api/gipms/v1/pmsheet/PmSheetExcelUpload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
  }

  handleFactoryChange = (event) => {
    const { handleLoadingParam } = this.props;
    handleLoadingParam(event);
    this.setState({
      factory: event,
      sdpt: undefined,
      model: undefined,
    });
  }

  handleSdptChange = (event) => {
    const { handleLoadingSdptParam } = this.props;
    handleLoadingSdptParam(event);
    this.setState({
      sdpt: event,
      model: undefined,
    });
  }

  handleModelChange = (event) => {
    this.setState({
      model: event,
    });
  }

  handleVersionChange = (event) => {
    this.setState({
      version: event,
    });
  }

  handleSignStatusChange = (event) => {
    this.setState({
      signStatus: event,
    });
  }

  handleSearch = () => {
    const { handlePmSheetSearch } = this.props;
    handlePmSheetSearch();
  }

  handlePopoverVisibleChange = (visible) => {
    const {
      factory,
      sdpt,
      model,
      openPopover,
    } = this.state;

    const comboValdArray = [factory, sdpt, model];
    const comboValdArrayText = ['[FAB]', '[TEAM]', '[SDPT]'];
    let comboValdText = '';

    for (let i = 0; i < comboValdArray.length; i += 1) {
      if (isNull(comboValdArray[i])) {
        comboValdText = `${comboValdText}, ${comboValdArrayText[i]}`;
      }
    }

    if (comboValdText === '') {
      if (openPopover) { //eslint-disable-line
        this.setState({ popoverVisible: true, openPopover: false }); //eslint-disable-line
      } else { //eslint-disable-line
        this.setState({ popoverVisible: visible }); //eslint-disable-line
      }
    } else {
      comboValdText = comboValdText.substring(2);
      feed.error(`${comboValdText} 는(은) 입력 필수값 입니다.`);
    }
  }

  handleRadioOnChange = (e) => {
    this.setState({
      radioValue: e.target.value,
    });
  }

  handleInputOnChange = (e) => {
    this.setState({
      eqIdSearchWord: e.target.value,
    });
  }

  handleEqIdSearch = () => {
    const { handleLoadingTidnParam } = this.props;
    const {
      radioValue,
      eqIdSearchWord,
      targetKeys,
    } = this.state;
    if (isNull(eqIdSearchWord)) {
      this.setState({ openPopover: true });
      feed.error('검색어를 한자리이상 입력해주세요.');
    } else {
      const param = {
        // 기본조회 조건, POP OVER 조건
        tabGubun: 'FAB',
        PARAM_BEBER: '232',
        PARAM_STORT: '',
        PARAM_ARBPL: '',
        MULTI_PARAM_ARBPL: '23006',
        MULTI_PARAM_EQART: '',
        MULTI_PARAM_EQUNR: '',
        MULTI_PARAM_TPLNR: '',
        PARAM_APPROVAL: '',
        PARAM_LIKE_SEARCH_WORD: eqIdSearchWord,
        comboType: 'COMBO_TECHNICAL_ID_NUMBER_MASTERKEY',
        pick: radioValue,
        transferTargetKeys: targetKeys,
      };
      handleLoadingTidnParam(param);
    }
    // ex.
    // MULTI_PARAM_ACTIVE: "'Y','R'" // Version
    // MULTI_PARAM_EQART: "'F00009'"
    // MULTI_PARAM_EQUNR: "'IM0000204627'"
    // MULTI_PARAM_TPLNR: "'M2-03-05-01','M2-03-05-02'" // FL
    // PARAM_APPROVAL: "S"
    // PARAM_ARBPL: "22024" // SDPT
    // PARAM_BEBER: "224" // FAB
    // PARAM_STORT: "P224-01" // TEAM
    // tabGubun: "FAB"
  }

  handleEqIdChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  handleEqIdConfirm = () => {
    let eqIdtempValue = '';
    for (let i = 0; i < this.state.targetKeys.length; i += 1) {
      eqIdtempValue += `, ${this.props.tidnList[this.state.targetKeys[i]].CODE}`;
    }
    this.setState({
      popoverVisible: false,
      eqIdValue: eqIdtempValue.substring(2),
    });
  }

  handleExcelDownloadAgGrid = () => {
    // this.forceUpdate();
    this.setState({
      isExcelDownload: this.state.isExcelDownload + 1,
    });
  }

  handleDownloadFile = () => {
    axios({
      url: 'http://portalloc.skhynix.com/files/test.xlsx',
      method: 'GET',
      responseType: 'blob',
      // timeout
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ExcelTest.xlsx');
      document.body.appendChild(link);
      link.click();
    });
  }

  render() {
    const {
      defaultBox,
      factory,
      // detailFactory,
      sdpt,
      model,
      version,
      signStatus,
      isExcelDownload,
      // uploadFile,
      radioValue,
      popoverVisible,
      targetKeys,
      eqIdValue,
    } = this.state;

    const {
      factoryList,
      sdptList,
      modelList,
      versionList,
      signStatusList,
      pmSheetDataList,
      tidnList,
    } = this.props;
    // console.log(uploadFile);
    // console.log(tidnList);
    // console.log(transferList);
    const factoryOptions = factoryList !== undefined ? factoryList.map(factoryKey => <Options key={factoryKey.CODE_CD}>{factoryKey.NAME_KOR}</Options>) : '';
    // const detailfactoryOption = detailFactory !== undefined ? detailFactory.map(detailFactoryKey => <Options value={detailFactoryKey.CODE_CD}>{detailFactoryKey.NAME_KOR}</Options> : '') : '';
    const sdptOptions = sdptList !== undefined ? sdptList.map(sdptKey => <Options value={sdptKey.CODE_CD}>{sdptKey.NAME_KOR}</Options>) : '';
    const modelOptions = modelList !== undefined ? modelList.map(modelKey => <Options value={modelKey.CODE_CD}>{modelKey.NAME_KOR}</Options>) : '';
    const versionOptions = versionList !== undefined ? versionList.map(versionKey => <Options value={versionKey.CODE_CD}>{versionKey.NAME_KOR}</Options>) : '';
    const signStatusOptions = signStatusList !== undefined ? signStatusList.map(signStatusKey => <Options value={signStatusKey.CODE_CD}>{signStatusKey.NAME_KOR}</Options>) : '';
    const eqIdContent = (
      <div style={{ width: 450, height: 380 }}>
        <div>
          <h4>Search</h4>
        </div>
        <div>
          <RadioGroup
            value={radioValue}
            onChange={this.handleRadioOnChange}
            defaultValue="1"
          >
            <Radio value="1">EQ ID</Radio>
            <Radio value="2">Maker</Radio>
          </RadioGroup>
          <Input
            // value={this.state.eqIdSearchWord}
            style={{ width: 250, height: 20 }}
            onChange={this.handleInputOnChange}
          />
          <Button
            icon="search"
            style={{ width: 20 }}
            onClick={this.handleEqIdSearch}
          />
        </div>
        <div>
          <Transfer
            dataSource={tidnList}
            // showSearch
            listStyle={{
              width: 200,
              height: 300,
            }}
            // operations={['to right', 'to left']}
            targetKeys={targetKeys}
            onChange={this.handleEqIdChange}
            render={item => `${item.title}`}
          />
        </div>
        <div>
          <Button
            style={{ width: 60, float: 'right', alignContent: 'center' }}
            onClick={this.handleEqIdConfirm}
          >
          확인
          </Button>
        </div>
      </div>
    );
    console.log('#### ', pmSheetDataList);
    return (
      <div>
        <div className="PMSheetTitle">
          <h2>PM(TBM) Plan Modeling</h2><br />
        </div>
        <div>
          <div className="SearchBox">
            <table>
              <tbody>
                <tr>
                  <th style={{ width: 55 }} >Factory</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={factory}
                      style={{ width: 180 }}
                      onChange={this.handleFactoryChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      {factoryOptions}
                    </Select>
                  </td>
                  {/* <th style={{ width: 60 }} >세부공정</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={this.state.defaultBox}
                      value={detailFactory}
                      style={{ width: 180 }}
                      onChange={this.handleDetailFactoryChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                    >
                      {detailfactoryOption}
                    </Select>
                  </td> */}
                  <th style={{ width: 55 }} >SDPT</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={sdpt}
                      style={{ width: 180 }}
                      onChange={this.handleSdptChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                    >
                      {sdptOptions}
                    </Select>
                  </td>
                  <th style={{ width: 55 }} >Model</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={this.state.defaultBox}
                      value={model}
                      style={{ width: 180 }}
                      onChange={this.handleModelChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                    >
                      {modelOptions}
                    </Select>
                  </td>
                  {/* <th style={{ width: 55 }} >EQ ID</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={this.state.searchCompCd}
                      value={this.state.searchCompCd}
                      style={{ width: 180 }}
                      onChange={this.handleCompChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      {compOptions}
                    </Select>
                  </td> */}
                  <tr>
                    <td rowSpan="2" style={{ width: 120, alignContent: 'center' }}>
                      <BtnSearchDkGray
                        title="조회"
                        className="searchBtn"
                        onClick={this.handleSearch}
                      >
                      조회
                      </BtnSearchDkGray>
                    </td>
                    {/* <td rowSpan="2" style={{ width: 180, alignContent: 'center' }}>
                      <ExcelFiles element={<BtnSearchDkGray>React Down</BtnSearchDkGray>}>
                        <ExcelSheets data={pmSheetDataList} name="Employees">
                          <ExcelColumns label="USER_ID" value="USER_ID" />
                          <ExcelColumns label="EMP_NO" value="EMP_NO" />
                          <ExcelColumns label="NAME_KOR" value="NAME_KOR" />
                        </ExcelSheets>
                      </ExcelFiles>
                    </td> */}
                    <td rowSpan="2" style={{ width: 180, alignContent: 'center' }}>
                      <BtnSearchDkGray
                        onClick={this.handleExcelDownloadAgGrid}
                      >
                        Grid Down
                      </BtnSearchDkGray>
                    </td>
                    <td rowSpan="2" style={{ width: 180, alignContent: 'center' }}>
                      <BtnSearchDkGray
                        onClick={this.handleDownloadFile}
                      >
                        File Down
                      </BtnSearchDkGray>
                    </td>
                  </tr>
                </tr>
                <tr>
                  <th style={{ width: 55 }} >Version</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={version}
                      style={{ width: 180 }}
                      onChange={this.handleVersionChange}
                      notFoundContent="All"
                      placeholder="All"
                      defaultActiveFirstOption={false}
                    >
                      {versionOptions}
                    </Select>
                  </td>
                  <th style={{ width: 60 }} >결재상태</th>
                  <td style={{ width: 247 }}>
                    <Select
                      defaultValue={defaultBox}
                      value={signStatus}
                      style={{ width: 180 }}
                      onChange={this.handleSignStatusChange}
                      notFoundContent="Select 하세요."
                      placeholder="Select 하세요."
                      defaultActiveFirstOption={false}
                    >
                      {signStatusOptions}
                    </Select>
                  </td>
                  <th style={{ width: 60 }} >EQ ID</th>
                  <td style={{ width: 247 }}>
                    <Popover
                      // title="Search"
                      content={eqIdContent}
                      trigger="click"
                      visible={popoverVisible}
                      onVisibleChange={this.handlePopoverVisibleChange}
                    >
                      <Input
                        style={{ width: 160 }}
                        value={eqIdValue}
                      />
                      <Button icon="search" style={{ width: 20 }} />
                    </Popover>
                  </td>
                  <td
                    style={{
                      align: 'right',
                      alignContent: 'center',
                    }}
                  >
                    <input
                      type="file"
                      id="file"
                      ref={(ref) => { this.upload = ref; }}
                      style={{ display: 'none' }}
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={this.handleUpload}
                    />
                    {/* <BtnSearchDkGray
                      title="FileUpload"
                      className="searchBtn"
                      onClick={() => { this.upload.click(); }}
                    >
                    Upload
                    </BtnSearchDkGray> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <div>
          <Grid
            pmSheetDataList={pmSheetDataList}
            isExcelDownload={isExcelDownload}
          />
        </div>
      </div>
    );
  }
}

PMSheet.propTypes = {
  handleLoadingFactoryParam: PropTypes.func.isRequired,
  handleLoadingParam: PropTypes.func.isRequired,
  handleLoadingSdptParam: PropTypes.func.isRequired,
  handlePmSheetSearch: PropTypes.func.isRequired,
  handleLoadingTidnParam: PropTypes.func.isRequired,
  // handlePmSheetExcelUpload: PropTypes.func.isRequired,
  factoryList: PropTypes.array.isRequired,
  // detailFactoryList: PropTypes.array.isRequired,
  sdptList: PropTypes.array.isRequired,
  modelList: PropTypes.array.isRequired,
  versionList: PropTypes.array.isRequired,
  signStatusList: PropTypes.array.isRequired,
  pmSheetDataList: PropTypes.array,
  tidnList: PropTypes.array.isRequired,
};

PMSheet.defaultProps = {
  pmSheetDataList: [],
};

const mapStateToProps = createStructuredSelector({
  factoryList: selectors.makeFactoryList(),
  detailFactoryList: selectors.makedetailFactory(),
  sdptList: selectors.makeSdptList(),
  modelList: selectors.makeModelList(),
  versionList: selectors.makeVersionList(),
  signStatusList: selectors.makeSignStatusList(),
  pmSheetDataList: selectors.makePmSheetDataList(),
  tidnList: selectors.makeTidnList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingFactoryParam: () => dispatch(actions.loadingFactoryParam()),
    handleLoadingParam: value => dispatch(actions.loadingParam(value)),
    handleLoadingSdptParam: value => dispatch(actions.loadingSdptParam(value)),
    handlePmSheetSearch: () => dispatch(actions.pmSheetSearch()),
    handleLoadingTidnParam: param => dispatch(actions.loadingTidnParam(param)),
  };
}

const withReducer = injectReducer({ key: 'pmsheet', reducer });
const withSaga = injectSaga({ key: 'pmsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(PMSheet);
