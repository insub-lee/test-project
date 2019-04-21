import React from 'react';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import { Input, Button } from 'antd';
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
    };
  }

  componentDidMount(){
    const { PARAM_KATALOGART, PARAM_ZTPM_KATALOGART, PARAM_CODEGRUPPE } = this.props.props;
    const { unitCode, typeCode } = this.props;
    if (this.props.values === 'UNIT') {
      console.log(this.props);
      if (this.props.props.PARAM_ARBPL.length === 1) {
        const param = {
          PARAM_KATALOGART,
          PARAM_ZTPM_KATALOGART,
          PARAM_CODEGRUPPE,
          PARAM_ARBPL: this.props.props.PARAM_ARBPL[0].value,
          comboType: this.props.props.comboType,
        };
        this.props.handleLoadingUnitParam(param);
      } else {
        const param = {
          PARAM_KATALOGART,
          PARAM_ZTPM_KATALOGART,
          PARAM_CODEGRUPPE,
          PARAM_ARBPL: '',
          comboType: this.props.props.comboType,
        };
        this.props.handleLoadingUnitParam(param);
      }
    } else if (this.props.values === '유형/현상') {
      if (unitCode.value) {
        if (this.props.props.PARAM_ARBPL.length === 1) {
          const param = {
            PARAM_KATALOGART,
            PARAM_ZTPM_KATALOGART,
            PARAM_CODEGRUPPE,
            PARAM_ARBPL: this.props.props.PARAM_ARBPL[0].value,
            comboType: this.props.props.comboType,
            PARAM_CODE: unitCode.value,
          };
          this.props.handleLoadingTypeParam(param);
        } else {
          const param = {
            PARAM_KATALOGART,
            PARAM_ZTPM_KATALOGART,
            PARAM_CODEGRUPPE,
            PARAM_ARBPL: '',
            comboType: this.props.props.comboType,
            PARAM_CODE: unitCode.value,
          };
          this.props.handleLoadingTypeParam(param);
        }
      }
    } else if (this.props.values === '원인') {
      if (typeCode.value) {
        if (this.props.props.PARAM_ARBPL.length === 1) {
          const param = {
            PARAM_KATALOGART,
            PARAM_ZTPM_KATALOGART,
            PARAM_CODEGRUPPE,
            PARAM_ARBPL: this.props.props.PARAM_ARBPL[0].value,
            comboType: this.props.props.comboType,
            PARAM_CODE: typeCode.value,
          };
          this.props.handleLoadingCauseParam(param);
        } else {
          const param = {
            PARAM_KATALOGART,
            PARAM_ZTPM_KATALOGART,
            PARAM_CODEGRUPPE,
            PARAM_ARBPL: '',
            comboType: this.props.props.comboType,
            PARAM_CODE: typeCode.value,
          };
          this.props.handleLoadingCauseParam(param);
        }
      }
    } else if (this.props.values === '원인부품(군)') {
      if (this.props.props.PARAM_ARBPL.length === 1) {
        const param = {
          PARAM_KATALOGART,
          PARAM_ZTPM_KATALOGART,
          PARAM_CODEGRUPPE,
          PARAM_ARBPL: this.props.props.PARAM_ARBPL[0].value,
          comboType: this.props.props.comboType,
        };
        this.props.handleLoadingPartParam(param);
      } else {
        const param = {
          PARAM_KATALOGART,
          PARAM_ZTPM_KATALOGART,
          PARAM_CODEGRUPPE,
          PARAM_ARBPL: '',
          comboType: this.props.props.comboType,
        };
        this.props.handleLoadingPartParam(param);
      }
    }
  }
  handleClickEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      rowIndex: this.props.rowIndex,
      value: e.target.title,
      valueName: e.target.textContent,
    }
    if(e.target.id === 'UNIT') {
      const tData = {
        unitCode: e.target.title,
        unitName: e.target.textContent,
        popoverVisible: false,
      }
      this.props.handleSetUnitCode(data);
      this.props.handleClickBtn(tData);
    } else if(e.target.id === '유형/현상') {
      const tData = {
        typeCode: e.target.title,
        typeName: e.target.textContent,
        popoverVisible: false,
      }
      this.props.handleSetTypeCode(data);
      this.props.handleClickBtn(tData);
    } else if(e.target.id === '원인') {
      const tData = {
        causeCode: e.target.title,
        causeName: e.target.textContent,
        popoverVisible: false,
      }
      this.props.handleSetCauseCode(data);
      this.props.handleClickBtn(tData);
    } else if(e.target.id === '원인부품(군)') {
      const tData = {
        partCode: e.target.title,
        partName: e.target.textContent,
        popoverVisible: false,
      }
      this.props.handleSetPartCode(data);
      this.props.handleClickBtn(tData);
    }
  }
  render() {
    console.log(this.props);
    const {
        Item,
        unitList,
        typeList,
        causeList,
        partList,
    } = this.props; 
    return (
      <div style={{ width: 250, height: 380 }}>
        <div>
          <h4>{this.props.values} Search</h4>
        </div>
      <div>
        <Input style={{ width: 200 }} />
        <Button
          icon="search"
          style={{ width: 30 }}
          // onClick={this.handleEqIdSearch}
        />
      </div>
      <div>
        <ScrollBar style={{ height: 320 }}>
          <ul>
          {
            this.props.values === '원인부품(군)' ?
            partList && partList.map(partKey => (<li onClick={this.handleClickEvent} id={this.props.values} title={partKey.CODE.toString()}>{partKey.NAME}</li>)) :
            this.props.values === '원인' ?  
            causeList && causeList.map(causeKey => (<li onClick={this.handleClickEvent} id={this.props.values} title={causeKey.CODE.toString()}>{causeKey.NAME}</li>)) :  
            this.props.values === '유형/현상' ?  
            typeList && typeList.map(typeKey => (<li onClick={this.handleClickEvent} id={this.props.values} title={typeKey.CODE.toString()}>{typeKey.NAME}</li>)) : 
            this.props.values === 'UNIT' ? 
            unitList && unitList.map(unitKey => (<li onClick={this.handleClickEvent} id={this.props.values} title={unitKey.CODE.toString()}>{unitKey.NAME}</li>)) : 
            false 
          }
            </ul>
          </ScrollBar>
        </div>
      </div>
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
  handleClickBtn: PropTypes.func,
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
};

const mapStateToProps = createStructuredSelector({
  unitList: selectors.makeUnitList(),
  typeList: selectors.makeTypeList(),
  causeList: selectors.makeCauseList(),
  partList: selectors.makePartList(),
  // unitCode: selectors.makeUnitCode(),
  // typeCode: selectors.makeTypeCode(),
  // causeCode: selectors.makeCauseCode(),
  // partCode: selectors.makePartCode(),
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
  };
}

const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(searchContent);

