import React from 'react';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import { Input, Button, Popover } from 'antd';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
import * as selectors from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

class searchContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverVisible: false,
      unitCode: undefined,
      unitName: undefined,
      typeCode: undefined,
      typeName: undefined,
      causeCode: undefined,
      causeName: undefined,
      partCode: undefined,
      partName: undefined,
      searchData: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const {paramValue} = this.props;
    if (this.props.btnType != nextProps.btnType) {
      if (paramValue === 'UNIT') {
        console.log(nextProps);
      } else if (paramValue === '유형/현상') {
        if (nextProps.btnType === 1) {
          this.handlePopoverVisibleChange(true, nextProps);
        }
      } else if (paramValue === '원인') {
        if (nextProps.btnType === 2) {
          this.handlePopoverVisibleChange(true, nextProps);
        }
      } else if (paramValue === '원인부품(군)') {
        if (nextProps.btnType === 3) {
          this.handlePopoverVisibleChange(true);
        }
      }
    }
  }

  handleClickEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      rowIndex: this.props.valueData.rowIndex,
      value: e.target.title,
      valueName: e.target.textContent,
      codeGroup: e.target.accessKey,
    }
    if(e.target.id === 'UNIT') {
      this.props.handleSetUnitCode(data);
      this.props.handleSaveBtnType(1);
      this.setState({
        unitCode: e.target.title,
        unitName: e.target.textContent,
        popoverVisible: false,
      });
    } else if(e.target.id === '유형/현상') {
      this.props.handleSetTypeCode(data);
      this.props.handleSaveBtnType(2);
      this.setState({
        typeCode: e.target.title,
        typeName: e.target.textContent,
        popoverVisible: false,
      });
    } else if(e.target.id === '원인') {
      this.props.handleSetCauseCode(data);
      this.props.handleSaveBtnType(3);
      this.setState({
        causeCode: e.target.title,
        causeName: e.target.textContent,
        popoverVisible: false,
      });
    } else if(e.target.id === '원인부품(군)') {
      this.props.handleSetPartCode(data);
      this.props.handleSaveBtnType(4);
      this.setState({
        partCode: e.target.title,
        partName: e.target.textContent,
        popoverVisible: false,
      });
    }
    let targetName = e.target.textContent;
    if (!targetName) {
      targetName = '';
    }
    this.props.handleGetName(targetName);
  }

  handlePopoverVisibleChange = (visible, nextProps) => {
    this.setState({
       popoverVisible: visible,
       searchData: '',
    });
    this.props.handleSearchGubun(false);
    // visible ture 경우 CommonCombo 실행
    if (visible) {
      const { PARAM_KATALOGART, PARAM_ZTPM_KATALOGART, PARAM_CODEGRUPPE } = this.props.valueData;
      const { unitCode, typeCode, paramValue } = this.props;
      if (paramValue === 'UNIT') {
        if (this.props.valueData.PARAM_ARBPL.length === 1) {
          const param = {
            PARAM_KATALOGART,
            PARAM_ZTPM_KATALOGART,
            PARAM_CODEGRUPPE,
            PARAM_ARBPL: this.props.valueData.PARAM_ARBPL[0].value,
            comboType: this.props.valueData.comboType,
          };
          this.props.handleLoadingUnitParam(param);
        } else {
          const param = {
            PARAM_KATALOGART,
            PARAM_ZTPM_KATALOGART,
            PARAM_CODEGRUPPE,
            PARAM_ARBPL: '',
            comboType: this.props.valueData.comboType,
          };
          this.props.handleLoadingUnitParam(param);
        }
      } else if (paramValue === '유형/현상') {
        if (nextProps) {
          if (this.props.valueData.PARAM_ARBPL.length === 1) {
            const param = {
              PARAM_KATALOGART,
              PARAM_ZTPM_KATALOGART,
              PARAM_CODEGRUPPE,
              PARAM_ARBPL: this.props.valueData.PARAM_ARBPL[0].value,
              comboType: this.props.valueData.comboType,
              PARAM_CODE: nextProps.unitCode.value,
            };
            this.props.handleLoadingTypeParam(param);
          } else {
            const param = {
              PARAM_KATALOGART,
              PARAM_ZTPM_KATALOGART,
              PARAM_CODEGRUPPE,
              PARAM_ARBPL: '',
              comboType: this.props.valueData.comboType,
              PARAM_CODE: nextProps.unitCode.value,
            };
            this.props.handleLoadingTypeParam(param);
          }
        } else if (unitCode) {
          if (this.props.valueData.PARAM_ARBPL.length === 1) {
            const param = {
              PARAM_KATALOGART,
              PARAM_ZTPM_KATALOGART,
              PARAM_CODEGRUPPE,
              PARAM_ARBPL: this.props.valueData.PARAM_ARBPL[0].value,
              comboType: this.props.valueData.comboType,
              PARAM_CODE: unitCode.value,
            };
            this.props.handleLoadingTypeParam(param);
          } else {
            const param = {
              PARAM_KATALOGART,
              PARAM_ZTPM_KATALOGART,
              PARAM_CODEGRUPPE,
              PARAM_ARBPL: '',
              comboType: this.props.valueData.comboType,
              PARAM_CODE: unitCode.value,
            };
            this.props.handleLoadingTypeParam(param);
          }
        }
      } else if (paramValue === '원인') {
        if (nextProps) {
          if (this.props.valueData.PARAM_ARBPL.length === 1) {
            const param = {
              PARAM_KATALOGART,
              PARAM_ZTPM_KATALOGART,
              PARAM_CODEGRUPPE: nextProps.typeCode.codeGroup,
              PARAM_ARBPL: this.props.valueData.PARAM_ARBPL[0].value,
              comboType: this.props.valueData.comboType,
              PARAM_CODE: nextProps.typeCode.value,
            };
            this.props.handleLoadingCauseParam(param);
          } else {
            const param = {
              PARAM_KATALOGART,
              PARAM_ZTPM_KATALOGART,
              PARAM_CODEGRUPPE: nextProps.typeCode.codeGroup,
              PARAM_ARBPL: '',
              comboType: this.props.valueData.comboType,
              PARAM_CODE: nextProps.typeCode.value,
            };
            this.props.handleLoadingCauseParam(param);
          }
        } else if (typeCode) {
          if (this.props.valueData.PARAM_ARBPL.length === 1) {
            const param = {
              PARAM_KATALOGART,
              PARAM_ZTPM_KATALOGART,
              PARAM_CODEGRUPPE: typeCode.codeGroup,
              PARAM_ARBPL: this.props.valueData.PARAM_ARBPL[0].value,
              comboType: this.props.valueData.comboType,
              PARAM_CODE: typeCode.value,
            };
            this.props.handleLoadingCauseParam(param);
          } else {
            const param = {
              PARAM_KATALOGART,
              PARAM_ZTPM_KATALOGART,
              PARAM_CODEGRUPPE: typeCode.codeGroup,
              PARAM_ARBPL: '',
              comboType: this.props.valueData.comboType,
              PARAM_CODE: typeCode.value,
            };
            this.props.handleLoadingCauseParam(param);
          }
        }
      } else if (paramValue === '원인부품(군)') {
        if (this.props.valueData.PARAM_ARBPL.length === 1) {
          const param = {
            PARAM_KATALOGART,
            PARAM_ZTPM_KATALOGART,
            PARAM_CODEGRUPPE,
            PARAM_ARBPL: this.props.valueData.PARAM_ARBPL[0].value,
            comboType: this.props.valueData.comboType,
          };
          this.props.handleLoadingPartParam(param);
        } else {
          const param = {
            PARAM_KATALOGART,
            PARAM_ZTPM_KATALOGART,
            PARAM_CODEGRUPPE,
            PARAM_ARBPL: '',
            comboType: this.props.valueData.comboType,
          };
          this.props.handleLoadingPartParam(param);
        }
      }
    }
    this.props.handleSaveBtnType(0);
  }

  handleSearchDataChange = (event) => {
    this.setState({
      searchData: event.target.value,
    });
  }

  handleSearch = () => {
    const {paramValue} = this.props;
    const {searchData} = this.state;
    if ( searchData === ''){
      this.props.handleSearchGubun(false);
    } else {
      if (paramValue === 'UNIT') {
        let searchUnitList = this.props.unitList;
        searchUnitList = searchUnitList.filter(data => data.NAME.toUpperCase().match(searchData.toUpperCase()));
        this.props.handleSearchUnitList(searchUnitList);
        this.props.handleSearchGubun(true);
      } else if (paramValue === '유형/현상') {
          let searchTypeList = this.props.typeList;
          searchTypeList = searchTypeList.filter(data => data.NAME.toUpperCase().match(searchData.toUpperCase()));
          this.props.handleSearchTypeList(searchTypeList);
          this.props.handleSearchGubun(true);
      } else if (paramValue === '원인') {
          let searchCauseList = this.props.causeList;
          searchCauseList = searchCauseList.filter(data => data.NAME.toUpperCase().match(searchData.toUpperCase()));
          this.props.handleSearchCauseList(searchCauseList);
          this.props.handleSearchGubun(true);
      } else if (paramValue === '원인부품(군)') {
          let searchPartList = this.props.partList;
          searchPartList = searchUnitList.filter(data => data.NAME.toUpperCase().match(searchData.toUpperCase()));
          this.props.handleSearchPartList(searchPartList);
          this.props.handleSearchGubun(true);
      }
    }
  }

  render() {
    const {
      popoverVisible,
      searchData,
    } = this.state;
    const {
        unitList,
        typeList,
        causeList,
        partList,
        paramValue,
        searchUnitList,
        searchTypeList,
        searchCauseList,
        searchPartList,
        searchGubun,
    } = this.props; 

    let searchcontent = '';
    if ( searchGubun ) {
      searchcontent = (
        <div style={{ width: 250, height: 380 }}>
          <div>
            <h4>{paramValue} Search</h4>
          </div>
        <div>
          <Input 
            style={{ width: 200 }}
            value={searchData}
            onChange={this.handleSearchDataChange}
          />
          <Button
            icon="search"
            style={{ width: 30 }}
            onClick={this.handleSearch}
          />
        </div>
        <div>
          <ScrollBar style={{ height: 320 }}>
            <ul>
            {
              paramValue === '원인부품(군)' ?
              searchPartList && searchPartList.map(partKey => (<li onClick={this.handleClickEvent} accessKey={partKey.CODEGROUP} id={this.props.valueData.values} title={partKey.CODE.toString()}>{partKey.NAME}</li>)) :
              paramValue === '원인' ?  
              searchCauseList && searchCauseList.map(causeKey => (<li onClick={this.handleClickEvent} accessKey={causeKey.CODEGROUP} id={this.props.valueData.values} title={causeKey.CODE.toString()}>{causeKey.NAME}</li>)) :  
              paramValue === '유형/현상' ?  
              searchTypeList && searchTypeList.map(typeKey => (<li onClick={this.handleClickEvent} accessKey={typeKey.CODEGROUP} id={this.props.valueData.values} title={typeKey.CODE.toString()}>{typeKey.NAME}</li>)) : 
              paramValue === 'UNIT' ? 
              searchUnitList && searchUnitList.map(unitKey => (<li onClick={this.handleClickEvent} accessKey={unitKey.CODEGROUP} id={this.props.valueData.values} title={unitKey.CODE.toString()}>{unitKey.NAME}</li>)) : 
              false 
            }
              </ul>
            </ScrollBar>
          </div>
        </div>
      );
    } else {
      searchcontent = (
        <div style={{ width: 250, height: 380 }}>
          <div>
            <h4>{paramValue} Search</h4>
          </div>
        <div>
          <Input 
            style={{ width: 200 }}
            value={searchData}
            onChange={this.handleSearchDataChange}
          />
          <Button
            icon="search"
            style={{ width: 30 }}
            onClick={this.handleSearch}
          />
        </div>
        <div>
          <ScrollBar style={{ height: 320 }}>
            <ul>
            {
              paramValue === '원인부품(군)' ?
              partList && partList.map(partKey => (<li onClick={this.handleClickEvent} accessKey={partKey.CODEGROUP} id={this.props.valueData.values} title={partKey.CODE.toString()}>{partKey.NAME}</li>)) :
              paramValue === '원인' ?  
              causeList && causeList.map(causeKey => (<li onClick={this.handleClickEvent} accessKey={causeKey.CODEGROUP} id={this.props.valueData.values} title={causeKey.CODE.toString()}>{causeKey.NAME}</li>)) :  
              paramValue === '유형/현상' ?  
              typeList && typeList.map(typeKey => (<li onClick={this.handleClickEvent} accessKey={typeKey.CODEGROUP} id={this.props.valueData.values} title={typeKey.CODE.toString()}>{typeKey.NAME}</li>)) : 
              paramValue === 'UNIT' ? 
              unitList && unitList.map(unitKey => (<li onClick={this.handleClickEvent} accessKey={unitKey.CODEGROUP} id={this.props.valueData.values} title={unitKey.CODE.toString()}>{unitKey.NAME}</li>)) : 
              false 
            }
              </ul>
            </ScrollBar>
          </div>
        </div>
      );
    }

    return (
      <span>
        { 
          paramValue === '원인부품(군)' ?  
          <Input style={{ width: 200 }} readOnly="readOnly" value={this.state.partName}/> :
          paramValue === '원인' ?  
          <Input style={{ width: 200 }} readOnly="readOnly" value={this.state.causeName}/> :
          paramValue === '유형/현상' ?  
          <Input style={{ width: 200 }} readOnly="readOnly" value={this.state.typeName}/> :
          paramValue === 'UNIT' ? 
          <Input style={{ width: 200 }} readOnly="readOnly" value={this.state.unitName}/> : 
          false
        }
        <Popover
          content={searchcontent}
          trigger="click"
          visible={popoverVisible}
          onVisibleChange={this.handlePopoverVisibleChange}
        >
          <Button icon="search" style={{ width: 30 }} />
        </Popover>
      </span>
    )
  }
}

searchContent.propTypes = {
  handleLoadingUnitParam: PropTypes.func.isRequired,
  handleLoadingTypeParam: PropTypes.func.isRequired,
  handleLoadingCauseParam: PropTypes.func.isRequired,
  handleLoadingPartParam: PropTypes.func.isRequired,
  handleSetUnitCode: PropTypes.func.isRequired,
  handleSetTypeCode: PropTypes.func.isRequired,
  handleSetCauseCode: PropTypes.func.isRequired,
  handleSetPartCode: PropTypes.func.isRequired,
  handleGetName: PropTypes.func,
  handleSearchUnitList: PropTypes.func,
  handleSearchTypeList: PropTypes.func,
  handleSearchCauseList: PropTypes.func,
  handleSearchPartList: PropTypes.func,
  handleSearchGubun: PropTypes.func,
  handleSaveBtnType: PropTypes.func,
};
  
searchContent.defaultProps = {
  unitist: [],
  typeList: [],
  causeList: [],
  partList: [],
  searchState: {},
  unitCode: undefined,
  typeCode: undefined,
  causeCode: undefined,
  partCode: undefined,
  btnType: 0,
};

const mapStateToProps = createStructuredSelector({
  unitList: selectors.makeUnitList(),
  typeList: selectors.makeTypeList(),
  causeList: selectors.makeCauseList(),
  partList: selectors.makePartList(),
  unitCode: selectors.makeUnitCode(),
  typeCode: selectors.makeTypeCode(),
  causeCode: selectors.makeCauseCode(),
  partCode: selectors.makePartCode(),
  searchUnitList: selectors.makeSearchUnitList(),
  searchTypeList: selectors.makeSearchTypeList(),
  searchCauseList: selectors.makeSearchCauseList(),
  searchPartList: selectors.makeSearchPartList(),
  btnType: selectors.makeBtnType(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingUnitParam: value => dispatch(actions.loadingUnitParam(value)),
    handleLoadingTypeParam: value => dispatch(actions.loadingTypeParam(value)),
    handleLoadingCauseParam: value => dispatch(actions.loadingCauseParam(value)),
    handleLoadingPartParam: value => dispatch(actions.loadingPartParam(value)),
    handleSetUnitCode: value => dispatch(actions.loadingSetUnitCode(value)),
    handleSetTypeCode: value => dispatch(actions.loadingSetTypeCode(value)),
    handleSetCauseCode: value => dispatch(actions.loadingSetCauseCode(value)),
    handleSetPartCode: value => dispatch(actions.loadingSetPartCode(value)),
    handleSearchUnitList: value => dispatch(actions.searchUnitList(value)),
    handleSearchTypeList: value => dispatch(actions.searchTypeList(value)),
    handleSearchCauseList: value => dispatch(actions.searchCauseList(value)),
    handleSearchPartList: value => dispatch(actions.searchPartList(value)),
    handleSaveBtnType: value => dispatch(actions.saveBtnType(value)),
  };
}

const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(searchContent);
