import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { Select, DatePicker, Popover, Button, Input, Transfer, Breadcrumb, Radio } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import locale from 'utils/pickerLang';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'apps/hypm_common/css/gipms.css';
import * as feed from 'components/Feedback/functions';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import AntRadiobox from './radiobox.style';
import Grid from './grid.js';

const Options = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const startDate = moment().add('month', -1);
const endDate = moment();
const RadioGroup = AntRadiobox(Radio.Group);
const isNull = value => value === '' || value === undefined || value === null;

class PmSheetList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      defaultBox: [],
      fab: undefined,
      team: undefined,
      sdpt: [],
      fl: [],
      model: [],
      auart: [],
      downType: [],
      inspLotStatus: [],
      createGb: undefined,
      periodDates: [startDate, endDate],
      targetKeys: [],
      radioValue: '1',
      popoverVisible: false,
      eqIdValue: '',
      eqIdSearchWord: '',
      role: '',
      roleDetail: '',
      defaultSet: false,
    };

    this.props.handleLoadingFabParam();
    this.props.handleLoadingUserDefine();
  }

  componentWillReceiveProps(nextProps) {
    // default Set
    if (this.props.userDefine !== nextProps.userDefine) {
      const userDefine = nextProps.userDefine;
      nextProps.handleLoadingDefaultParam(userDefine.BEBER, userDefine.STAND);
      this.setState({ defaultSet: true });
    }
    if (this.state.defaultSet && _.isArray(nextProps.sdptList)) {//&& _.isArray(nextProps.flList) 제외
      const userDefine = nextProps.userDefine;
      const sdpt = _.filter(nextProps.sdptList, { CODE: userDefine.ARBPL });
      // const fl = _.filter(nextProps.flList, { CODE: userDefine.TPLNR });
      this.setState({
        fab: userDefine.BEBER,
        team: userDefine.STAND,
        sdpt: sdpt.map(o => ({ label: o.NAME, value: o.CODE })),
        // fl: fl.map(o => ({ label: o.NAME, value: o.CODE })),
        defaultSet: false,
      });
    }
    // eqId
    const { targetKeys } = this.state;
    if (this.props.tidnList !== nextProps.tidnList) {
      if (targetKeys.length > 0) {
        const newTargetKeys = targetKeys;
        const newTidnList = _.cloneDeep(nextProps.tidnList);
        const beforeTidnList = _.cloneDeep(this.props.tidnList);
        for (let i = 0; i < targetKeys.length; i += 1) {
          let modifyCount = 0;
          for (let j = 0; j < newTidnList.length; j += 1) {
            if (newTidnList[j].title === beforeTidnList[targetKeys[i]].title) {
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
          }
        }
        this.setState({ targetKeys: newTargetKeys });
      }
    }
  }

  handleFabChange = (event) => {
    const { handleLoadingParam } = this.props;
    handleLoadingParam(event);
    this.setState({
      fab: event,
      team: undefined,
      sdpt: [],
      fl: [],
      model: [],
      targetKeys: [],
      eqIdValue: '',
      eqIdSearchWord: '',
    });
  }

  handleTeamChange = (event) => {
    const { handleLoadingTeamParam } = this.props;
    handleLoadingTeamParam(event);
    this.setState({
      team: event,
      sdpt: [],
      fl: [],
      model: [],
      targetKeys: [],
      eqIdValue: '',
      eqIdSearchWord: '',
    });
  }

  handleSdptChange = (event) => {
    const { handleLoadingSdptParam, sdptList } = this.props;
    const prevState = _.cloneDeep(this.state.sdpt);
    const sList = sdptList.map(key => ({ label: key.NAME, value: key.CODE }));
    const indexOf = _.findIndex(event, { label: 'ALL' });
    const selected = this.handleSelected(event, prevState, sdptList);
    const value = this.handleCheckAll(sList, event, selected, indexOf);
    const param = this.handleParam(sList, event, selected, indexOf);
    this.setState({
      sdpt: value,
      model: [],
      targetKeys: [],
      eqIdValue: '',
      eqIdSearchWord: '',
    });
    handleLoadingSdptParam(param);
  }

  handleFlChange = (event) => {
    const { flList } = this.props;
    const prevState = _.cloneDeep(this.state.fl);
    const sList = flList.map(key => ({ label: key.NAME, value: key.CODE }));
    const indexOf = _.findIndex(event, { label: 'ALL' });
    const selected = this.handleSelected(event, prevState, flList);
    const value = this.handleCheckAll(sList, event, selected, indexOf);
    this.setState({
      fl: value,
      targetKeys: [],
      eqIdValue: '',
      eqIdSearchWord: '',
    });
  }

  handleModelChange = (event) => {
    const { modelList } = this.props;
    const prevState = _.cloneDeep(this.state.model);
    const sList = modelList.map(key => ({ label: key.NAME, value: key.CODE }));
    const indexOf = _.findIndex(event, { label: 'ALL' });
    const selected = this.handleSelected(event, prevState, modelList);
    const value = this.handleCheckAll(sList, event, selected, indexOf);
    this.setState({
      model: value,
      targetKeys: [],
      eqIdValue: '',
      eqIdSearchWord: '',
    });
  }

  handleAuartChange = (event) => {
    const { handleLoadingAuartParam, auartList } = this.props;
    const prevState = _.cloneDeep(this.state.auart);
    const sList = auartList.map(key => ({ label: key.NAME, value: key.CODE }));
    const indexOf = _.findIndex(event, { label: 'ALL' });
    const selected = this.handleSelected(event, prevState, auartList);
    const value = this.handleCheckAll(sList, event, selected, indexOf);
    const param = this.handleParam(sList, event, selected, indexOf);
    this.setState({
      auart: value,
      downType: [],
    });
    handleLoadingAuartParam(param);
  }

  handleDownTypeChange = (event) => {
    const { downTypeList } = this.props;
    const prevState = _.cloneDeep(this.state.downType);
    const sList = downTypeList.map(key => ({ label: key.NAME, value: key.CODE }));
    const indexOf = _.findIndex(event, { label: 'ALL' });
    const selected = this.handleSelected(event, prevState, downTypeList);
    const value = this.handleCheckAll(sList, event, selected, indexOf);
    this.setState({
      downType: value,
    });
  }

  handleInspLotStatusChange = (event) => {
    const { inspLotStatusList } = this.props;
    const prevState = _.cloneDeep(this.state.inspLotStatus);
    const sList = inspLotStatusList.map(key => ({ label: key.NAME, value: key.CODE }));
    const indexOf = _.findIndex(event, { label: 'ALL' });
    const selected = this.handleSelected(event, prevState, inspLotStatusList);
    const value = this.handleCheckAll(sList, event, selected, indexOf);
    this.setState({
      inspLotStatus: value,
    });
  }

  handleCreateGbChange = (event) => {
    const { createGbList } = this.props;
    const prevState = _.cloneDeep(this.state.createGb);
    const sList = createGbList.map(key => ({ label: key.NAME, value: key.CODE }));
    const indexOf = _.findIndex(event, { label: 'ALL' });
    const selected = this.handleSelected(event, prevState, createGbList);
    const value = this.handleCheckAll(sList, event, selected, indexOf);
    this.setState({
      createGb: value,
    });
  }

  handleOnPeriodChange = (dates) => {
    const dateFrom = dates[0];
    let dateTo = dates[1];
    if (moment(dateTo).add('month', -1) > dateFrom) {
      dateTo = moment(dateFrom).add('month', 1);
      // feed.error('검색 기간은 3개월 입니다.');
    }
    this.setState({
      periodDates: [dateFrom, dateTo],
    });
  }

  handlePopoverVisibleChange = (visible) => {
    const {
      fab,
    } = this.state;
    if (isNull(fab)) {
      feed.error('FAB은 필수 값입니다.');
    } else {
      this.setState({ popoverVisible: visible });
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

  handleEqIdChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  handleEqIdConfirm = () => {
    let eqIdtempValue = '';
    for (let i = 0; i < this.state.targetKeys.length; i += 1) {
      eqIdtempValue += `, ${this.props.tidnList[this.state.targetKeys[i]].NAME}`;
    }
    this.setState({
      popoverVisible: false,
      eqIdValue: eqIdtempValue.substring(2),
    });
  }

  // EqId Search
  handleEqIdSearch = () => {
    const { handleLoadingTidnParam } = this.props;
    const {
      radioValue,
      eqIdSearchWord,
      sdpt,
      model,
      fl,
      fab,
      team,
    } = this.state;
    if (isNull(eqIdSearchWord)) {
      feed.error('검색어를 한자리이상 입력해주세요.');
    } else {
      const param = {
        MULTI_PARAM_ARBPL: sdpt && sdpt.length > 0 ? sdpt.map(e => `'${e.value}'`).join(',') : '',
        MULTI_PARAM_EQART: model && model.length > 0 ? model.map(e => `'${e.value}'`).join(',') : '',
        MULTI_PARAM_TPLNR: fl && fl.length > 0 ? fl.map(e => `'${e.value}'`).join(',') : '',
        PARAM_BEBER: fab,
        PARAM_LIKE_SEARCH_WORD: eqIdSearchWord,
        PARAM_STAND: team,
        comboType: 'COMBO_TECHNICAL_ID_NUMBER',
        pick: radioValue,
        searchLength: 1,
      };
      handleLoadingTidnParam(param);
    }
  }

  // pmSheetList Search
  handleSearch = () => {
    const { handlePmSheetSearch } = this.props;
    const {
      fab,
      team,
      sdpt,
      fl,
      model,
      // eqId,
      auart,
      downType,
      inspLotStatus,
      periodDates,
      createGb,
      targetKeys,
    } = this.state;
    const {
      tidnList,
    } = this.props;
    if (fab === undefined || team === undefined) {
      feed.error('FAB, Team은 필수 값입니다.');
    } else {
      const paramEqunr = targetKeys && targetKeys.length > 0 ? this.defineEqIdKey(targetKeys, tidnList, 'EQUNR') : [];
      const paramTplnr = fl && fl.length > 0 ? this.defineKey(fl, 'TPLNR') : [];
      const paramArbpl = sdpt && sdpt.length > 0 ? this.defineKey(sdpt, 'ARBPL') : [];
      const paramEqart = model && model.length > 0 ? this.defineKey(model, 'EQART') : [];
      const paramAuart = auart && auart.length > 0 ? this.defineKey(auart, 'AUART') : [];
      const paramIlart = downType && downType.length > 0 ? this.defineKey(downType, 'ILART') : [];
      const param = {
        INSP_LOT_STATUS: inspLotStatus && inspLotStatus.length > 0 ? inspLotStatus.map(e => `'${e.value}'`).join(',') : '',
        IV_CREATE_GB: createGb && createGb.length > 0 ? createGb : '',
        IV_GSTRP_BEG: moment(periodDates[0]).format('YYYYMMDD'),
        IV_GSTRP_END: moment(periodDates[1]).format('YYYYMMDD'),
        IV_STORT: team && team.length > 0 ? team : '',
        MULTI_PARAM_EQUNR: paramEqunr,
        list: {
          IT_EQUNR: paramEqunr,
          IT_TPLNR: paramTplnr,
          IT_ARBPL: paramArbpl,
          IT_EQART: paramEqart,
          IT_AUART: paramAuart,
          IT_ILART: paramIlart,
        },
      };
      handlePmSheetSearch(param);
    }
  }

  defineKey = (list, newKey) => {
    const obj = _.cloneDeep(list);
    const targetKey = 'value';
    _.forEach(obj, (o) => {
      Object.defineProperty(o, newKey, Object.getOwnPropertyDescriptor(o, targetKey));
      const arryKey = Object.getOwnPropertyNames(o);
      _.forEach(arryKey, (keyName) => {
        if (keyName !== newKey) {
          Reflect.deleteProperty(o, keyName);
        }
      });
    });
    return obj;
  }

  defineEqIdKey = (arryIdx, tidnList, newKey) => {
    const clone = _.cloneDeep(tidnList);
    const targetKey = 'CODE';
    const obj = [];
    _.forEach(arryIdx, (a) => {
      const findArry = _.find(clone, { key: a });
      obj.push(findArry);
    });
    _.forEach(obj, (o) => {
      Object.defineProperty(o, newKey, Object.getOwnPropertyDescriptor(o, targetKey));
      const arryKey = Object.getOwnPropertyNames(o);
      _.forEach(arryKey, (keyName) => {
        if (keyName !== newKey) {
          Reflect.deleteProperty(o, keyName);
        }
      });
    });
    return obj;
  }

  handleOnGridReady = (obj) => {
    this.gridApi = obj.api;
  }

  handleExcelDown = () => {
    const { pmSheetDataList } = this.props;
    if (pmSheetDataList.length > 0) {
      const dateString = moment().format('YYYYMMDDHHmmss');
      const params = {
        columnGroups: true,
        allColumns: false,
        fileName: 'fabPMSheetListExcel'.concat(dateString),
      };
      this.gridApi.exportDataAsCsv(params);
    }
  }

  // select check all 임시
  handleSelected = (event, prevState, list) => {
    const all = [{ label: 'ALL', value: '' }];
    const diifInter = _.intersectionWith(event, all, _.isEqual);
    const diifXor = _.xorWith(event, prevState, _.isEqual);
    const diifResult = event.length === list.length ? diifInter : diifXor;
    const selected = diifResult.map(o => o.label).toString();
    return selected;
  }

  handleCheckAll = (sList, event, selected, indexOf) => {
    let value = [];
    if (indexOf !== -1 && selected === 'ALL') {
      value = sList;
    } else if (indexOf === -1 && selected === 'ALL') {
      value = [];
    } else {
      value = event;
    }
    return value;
  }

  handleParam = (sList, event, selected, indexOf) => {
    const all = [{ label: 'ALL', value: '' }];
    const diifList = _.differenceWith(sList, all, _.isEqual);
    const diifEvent = _.differenceWith(event, all, _.isEqual);
    const list = (indexOf !== -1 && selected === 'ALL') || event.length === 0 ? diifList : diifEvent;
    const param = event.length !== sList.length ? list.map(e => `'${e.value}'`).join(',') : [];
    return param;
  }

  render() {
    const {
      defaultBox,
      fab,
      team,
      sdpt,
      fl,
      model,
      auart,
      downType,
      inspLotStatus,
      createGb,
      periodDates,
      radioValue,
      popoverVisible,
      targetKeys,
      eqIdValue,
      eqIdSearchWord,
    } = this.state;

    const {
      fabList,
      teamList,
      sdptList,
      flList,
      modelList,
      auartList,
      downTypeList,
      inspLotStatusList,
      createGbList,
      pmSheetDataList,
      tidnList,
    } = this.props;

    const eqIdcontent = (
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
            style={{ width: 250, height: 25 }}
            value={eqIdSearchWord}
            onChange={this.handleInputOnChange}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                this.handleEqIdSearch();
              }
            }}
          />
          <Button
            icon="search"
            style={{ width: 25, height: 25 }}
            onClick={this.handleEqIdSearch}
          />
        </div>
        <div>
          <Transfer
            dataSource={tidnList}
            listStyle={{
              width: 200,
              height: 300,
            }}
            targetKeys={targetKeys}
            onChange={this.handleEqIdChange}
            render={item => `${item.NAME}`}
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

    return (
      <section className="gipms">
        <header>
          <h2 className="title">PM Sheet List</h2>
          <Breadcrumb>
            <Breadcrumb.Item>FAB</Breadcrumb.Item>
            <Breadcrumb.Item>PM Information</Breadcrumb.Item>
            <Breadcrumb.Item>PM Sheet List</Breadcrumb.Item>
          </Breadcrumb>
        </header>
        <section className="search-area">
          <div className="search-item-area">
            {/* 검색 옵션 search-item */}
            <div className="search-item">
              <span className="search-label required">FAB</span>
              <span className="search-select">
                <Select
                  defaultValue={defaultBox}
                  value={fab}
                  onChange={this.handleFabChange}
                  notFoundContent="Select 하세요."
                  placeholder="Select 하세요."
                  defaultActiveFirstOption={false}
                >
                  { fabList.map(factoryKey => <Options key={factoryKey.CODE}>{factoryKey.NAME}</Options>) }
                </Select>
              </span>
            </div>
            <div className="search-item">
              <span className="search-label required">Team</span>
              <span className="search-select">
                <Select
                  defaultValue={this.state.defaultBox}
                  value={team}
                  onChange={this.handleTeamChange}
                  notFoundContent="All"
                  placeholder="All"
                  defaultActiveFirstOption={false}
                >
                  { teamList.map(detailFactoryKey => <Options value={detailFactoryKey.CODE}>{detailFactoryKey.NAME}</Options>) }
                </Select>
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">SDPT</span>
              <span className="search-select">
                <ReactMultiSelectCheckboxes
                  placeholderButtonLabel="ALL"
                  defaultValue={defaultBox}
                  value={sdpt}
                  onChange={this.handleSdptChange}
                  hideSearch={true}
                  options={sdptList.map(sdptKey => ({ label: sdptKey.NAME, value: sdptKey.CODE }))}
                  width={150}
                />
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">Fl</span>
              <span className="search-select">
                <ReactMultiSelectCheckboxes
                  placeholderButtonLabel="ALL"
                  defaultValue={defaultBox}
                  value={fl}
                  onChange={this.handleFlChange}
                  hideSearch={true}
                  options={flList.map(flKey => ({ label: flKey.NAME, value: flKey.CODE }))}
                  width={150}
                />
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">Model</span>
              <span className="search-select">
                <ReactMultiSelectCheckboxes
                  placeholderButtonLabel="ALL"
                  defaultValue={defaultBox}
                  value={model}
                  onChange={this.handleModelChange}
                  hideSearch={true}
                  options={modelList.map(modelKey => ({ label: modelKey.NAME, value: modelKey.CODE }))}
                  width={150}
                />
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">EQ ID</span>
              <span className="search-select">
                <Popover
                  content={eqIdcontent}
                  trigger="click"
                  visible={popoverVisible}
                  onVisibleChange={this.handlePopoverVisibleChange}
                >
                  <Input
                    style={{ width: '80%' }}
                    value={eqIdValue}
                  />
                  <Button icon="search" style={{ width: 30 }} />
                </Popover>
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">W/O 유형</span>
              <span className="search-select">
                <ReactMultiSelectCheckboxes
                  placeholderButtonLabel="ALL"
                  defaultValue={defaultBox}
                  value={auart}
                  onChange={this.handleAuartChange}
                  hideSearch={true}
                  options={auartList.map(auartKey => ({ label: auartKey.NAME, value: auartKey.CODE }))}
                  width={150}
                />
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">Down Type</span>
              <span className="search-select">
                <ReactMultiSelectCheckboxes
                  placeholderButtonLabel="ALL"
                  defaultValue={defaultBox}
                  value={downType}
                  onChange={this.handleDownTypeChange}
                  hideSearch={true}
                  options={downTypeList.map(downTypeKey => ({ label: downTypeKey.NAME, value: downTypeKey.CODE }))}
                  width={150}
                />
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">Sheet 상태</span>
              <span className="search-select">
                <ReactMultiSelectCheckboxes
                  placeholderButtonLabel="ALL"
                  defaultValue={defaultBox}
                  value={inspLotStatus}
                  onChange={this.handleInspLotStatusChange}
                  hideSearch={true}
                  options={inspLotStatusList.map(inspLotStatusKey => ({ label: inspLotStatusKey.NAME, value: inspLotStatusKey.CODE }))}
                  width={150}
                />
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">Date</span>
              <span className="search-select">
                <RangePicker
                  locale={locale}
                  className="RangePicker"
                  format={dateFormat}
                  ranges={{
                    Today: [moment(), moment()],
                    'This Month': [moment(), moment().endOf('month')],
                  }}
                  onChange={this.handleOnPeriodChange}
                  showToday={true}
                  value={periodDates}
                />
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">Auto/Manual</span>
              <span className="search-select">
                <Select
                  defaultValue={defaultBox}
                  value={createGb}
                  onChange={this.handleCreateGbChange}
                  placeholder="ALL"
                  defaultActiveFirstOption={false}
                >
                  { createGbList.map(createGbKey => <Options value={createGbKey.CODE}>{createGbKey.NAME}</Options>) }
                </Select>
              </span>
            </div>
          </div>
          <div className="btn-area">
            <Button
              type="primary"
              className="btn-search"
              title="조회"
              onClick={this.handleSearch}
            >
              조회
            </Button>
          </div>          
        </section>
        <section className="antd-tabs contents">
          <div className="btn-group">
            <div className="right">
              <Button
                type="primary"
                className="btn-apply excel"
                title="엑셀"
                onClick={this.handleExcelDown}
              >
                엑셀
              </Button>
              </div>
          </div>
          <div className="grid-area">
            <div className="ag-theme-balham" style={{ height: '400px', width: '100%' }}>
              <Grid
                pmSheetDataList={pmSheetDataList}
                handleOnGridReady={this.handleOnGridReady}
              />
            </div>
          </div>
          <div style={{ marginTop: 120 }}>
            <span>
              {`총 건수 : ${pmSheetDataList.length}`}
            </span>
          </div>        
        </section>
      </section>
    );
  }
}

PmSheetList.propTypes = {
  handleLoadingFabParam: PropTypes.func.isRequired,
  handleLoadingDefaultParam: PropTypes.func.isRequired,
  handleLoadingParam: PropTypes.func.isRequired,
  handleLoadingTeamParam: PropTypes.func.isRequired,
  handleLoadingSdptParam: PropTypes.func.isRequired,
  handleLoadingAuartParam: PropTypes.func.isRequired,
  handlePmSheetSearch: PropTypes.func.isRequired,
  handleLoadingTidnParam: PropTypes.func.isRequired,
  fabList: PropTypes.array,
  teamList: PropTypes.array,
  sdptList: PropTypes.array,
  flList: PropTypes.array,
  modelList: PropTypes.array,
  auartList: PropTypes.array,
  downTypeList: PropTypes.array,
  inspLotStatusList: PropTypes.array,
  createGbList: PropTypes.array,
  pmSheetDataList: PropTypes.array,
  tidnList: PropTypes.array.isRequired,
  userDefine: PropTypes.array.isRequired,
};

PmSheetList.defaultProps = {
  fabList: [],
  teamList: [],
  sdptList: [],
  flList: [],
  modelList: [],
  auartList: [],
  downTypeList: [],
  inspLotStatusList: [],
  createGbList: [],
  pmSheetDataList: [],
  tidnList: [],
  userDefine: [],
};

const mapStateToProps = createStructuredSelector({
  fabList: selectors.makeFabList(),
  teamList: selectors.makeTeamList(),
  sdptList: selectors.makeSdptList(),
  flList: selectors.makeFlList(),
  modelList: selectors.makeModelList(),
  auartList: selectors.makeAuartList(),
  downTypeList: selectors.makeDownTypelList(),
  inspLotStatusList: selectors.makeInspLotStatusList(),
  createGbList: selectors.makeCreateGbList(),
  pmSheetDataList: selectors.makePmSheetDataList(),
  tidnList: selectors.makeTidnList(),
  userDefine: selectors.userDefine(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingFabParam: () => dispatch(actions.loadingFabParam()),
    handleLoadingDefaultParam: (beber, stand) => dispatch(actions.loadingDefaultParam(beber, stand)),
    handleLoadingParam: value => dispatch(actions.loadingParam(value)),
    handleLoadingTeamParam: value => dispatch(actions.loadingTeamParam(value)),
    handleLoadingSdptParam: value => dispatch(actions.loadingSdptParam(value)),
    handleLoadingAuartParam: value => dispatch(actions.loadingAuartParam(value)),
    handlePmSheetSearch: param => dispatch(actions.pmSheetSearch(param)),
    handleLoadingTidnParam: param => dispatch(actions.loadingTidnParam(param)),
    handleLoadingUserDefine: () => dispatch(actions.getUserCompanyDefine()),
  };
}

const withReducer = injectReducer({ key: 'PmSheetList', reducer });
const withSaga = injectSaga({ key: 'PmSheetList', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(PmSheetList);
