import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';
import { Input, Button, Popover } from 'antd';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SearchContent from './searchContent';
import * as actions from '../actions';
import * as selectors from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import Axios from 'axios';

export default class searchButton extends PureComponent {
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

  // getCommonCombo = (param) => {
  //   return Axios.post('/api/gipms/v1/common/commonCombo', param);
  // }
  
  componentDidMount() {
    // const { PARAM_KATALOGART, PARAM_ZTPM_KATALOGART, PARAM_CODEGRUPPE, unitCode, typeCode } = this.props;

    // const param = {
    //   PARAM_KATALOGART,
    //   PARAM_ZTPM_KATALOGART,
    //   PARAM_CODEGRUPPE,
    //   PARAM_ARBPL: '',
    //   comboType: this.props.comboType,
    // };

    // this.getCommonCombo(param)
    //   .then(result => {
    //     console.log(result.data);
    //     if ( result.data ) {
          
    //     }
    //   })
  }

  componentWillReceiveProps (prevProps,prevState) {
  }

  getValue() {
    if(this.props.values === 'UNIT') {
      return this.state.unitName;
    } else if(this.props.values === '유형/현상') {
      return this.state.typeName;
    } else if(this.props.values === '원인') {
      return this.state.causeName;
    } else if(this.props.values === '원인부품(군)') {
      return this.state.partName;
    }
  }
  
  // isPopup() {
  //   return true;
  // }

  // handleGetCodeValue = (data) => {
  //   this.setState({
  //     unitCode: data.unitCode,
  //     typeCode: data.typeCode,
  //     causeCode: data.causeCode,
  //     partCode: data.partCode,
  //   });
  // }

  handlePopoverVisibleChange = (visible) => {
    this.setState({ popoverVisible: visible });
    // visible ture 경우 CommonCombo 실행
    if (visible) {
      // const { PARAM_KATALOGART, PARAM_ZTPM_KATALOGART, PARAM_CODEGRUPPE } = this.props;
      // const { unitCode, typeCode } = this.state;
      // if (this.props.values === 'UNIT') {
      //   console.log(this.props);
      //   if (this.props.PARAM_ARBPL.length === 1) {
      //     const param = {
      //       PARAM_KATALOGART,
      //       PARAM_ZTPM_KATALOGART,
      //       PARAM_CODEGRUPPE,
      //       PARAM_ARBPL: this.props.PARAM_ARBPL[0].value,
      //       comboType: this.props.comboType,
      //     };
      //     this.props.agGridReact.props.handleLoadingUnitParam(param);
      //   } else {
      //     const param = {
      //       PARAM_KATALOGART,
      //       PARAM_ZTPM_KATALOGART,
      //       PARAM_CODEGRUPPE,
      //       PARAM_ARBPL: '',
      //       comboType: this.props.comboType,
      //     };
      //     this.props.agGridReact.props.handleLoadingUnitParam(param);
      //   }
      // } else if (this.props.values === '유형/현상') {
      //   if (unitCode) {
      //     if (this.props.PARAM_ARBPL.length === 1) {
      //       const param = {
      //         PARAM_KATALOGART,
      //         PARAM_ZTPM_KATALOGART,
      //         PARAM_CODEGRUPPE,
      //         PARAM_ARBPL: this.props.PARAM_ARBPL[0].value,
      //         comboType: this.props.comboType,
      //         PARAM_CODE: unitCode,
      //       };
      //       this.props.agGridReact.props.handleLoadingTypeParam(param);
      //     } else {
      //       const param = {
      //         PARAM_KATALOGART,
      //         PARAM_ZTPM_KATALOGART,
      //         PARAM_CODEGRUPPE,
      //         PARAM_ARBPL: '',
      //         comboType: this.props.comboType,
      //         PARAM_CODE: unitCode,
      //       };
      //       this.props.agGridReact.props.handleLoadingTypeParam(param);
      //     }
      //   }
      // } else if (this.props.values === '원인') {
      //   if (typeCode) {
      //     if (this.props.PARAM_ARBPL.length === 1) {
      //       const param = {
      //         PARAM_KATALOGART,
      //         PARAM_ZTPM_KATALOGART,
      //         PARAM_CODEGRUPPE,
      //         PARAM_ARBPL: this.props.PARAM_ARBPL[0].value,
      //         comboType: this.props.comboType,
      //         PARAM_CODE: typeCode,
      //       };
      //       this.props.agGridReact.props.handleLoadingCauseParam(param);
      //     } else {
      //       const param = {
      //         PARAM_KATALOGART,
      //         PARAM_ZTPM_KATALOGART,
      //         PARAM_CODEGRUPPE,
      //         PARAM_ARBPL: '',
      //         comboType: this.props.comboType,
      //         PARAM_CODE: typeCode,
      //       };
      //       this.props.agGridReact.props.handleLoadingCauseParam(param);
      //     }
      //   }
      // } else if (this.props.values === '원인부품(군)') {
      //   if (this.props.PARAM_ARBPL.length === 1) {
      //     const param = {
      //       PARAM_KATALOGART,
      //       PARAM_ZTPM_KATALOGART,
      //       PARAM_CODEGRUPPE,
      //       PARAM_ARBPL: this.props.PARAM_ARBPL[0].value,
      //       comboType: this.props.comboType,
      //     };
      //     this.props.agGridReact.props.handleLoadingPartParam(param);
      //   } else {
      //     const param = {
      //       PARAM_KATALOGART,
      //       PARAM_ZTPM_KATALOGART,
      //       PARAM_CODEGRUPPE,
      //       PARAM_ARBPL: '',
      //       comboType: this.props.comboType,
      //     };
      //     this.props.agGridReact.props.handleLoadingPartParam(param);
      //   }
      // }
    }
  }

  handleClickBtn = (data) => {
    if (this.props.values === 'UNIT') {
      this.setState({
        unitCode: data.unitCode,
        unitName: data.unitName,
        popoverVisible: data.popoverVisible,
      });
    } else if (this.props.values === '유형/현상') {
      this.setState({
        typeCode: data.typeCode,
        typeName: data.typeName,
        popoverVisible: data.popoverVisible,
      });
    } else if (this.props.values === '원인') {
      this.setState({
        causeCode: data.causeCode,
        causeName: data.causeName,
        popoverVisible: data.popoverVisible,
      });
    } else if (this.props.values === '원인부품(군)') {
      this.setState({
        partCode: data.partCode,
        partName: data.partName,
        popoverVisible: data.popoverVisible,
      });
    }
  }

  render() {
    const {
      popoverVisible,
    } = this.state;
    const searchcontent = (
      <SearchContent 
        values={this.props.values}
        rowIndex={this.props.rowIndex}
        handleClickBtn={this.handleClickBtn}
        props={this.props}
      />
    );
    return (
      <span>
        { 
          this.props.values === '원인부품(군)' ?  
          <Input style={{ width: 200 }} readOnly="readOnly" value={this.state.partName}/> :
          this.props.values === '원인' ?  
          <Input style={{ width: 200 }} readOnly="readOnly" value={this.state.causeName}/> :
          this.props.values === '유형/현상' ?  
          <Input style={{ width: 200 }} readOnly="readOnly" value={this.state.typeName}/> :
          this.props.values === 'UNIT' ? 
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
    );
  }
}

searchButton.propTypes = {
  // handleLoadingUnitParam: PropTypes.func.isRequired,
  // handleLoadingTypeParam: PropTypes.func.isRequired,
  // handleLoadingCauseParam: PropTypes.func.isRequired,
  // handleLoadingPartParam: PropTypes.func.isRequired,
  // handleSetUnitCode: PropTypes.func.isRequired,
  // handleSetTypeCode: PropTypes.func.isRequired,
  // handleSetCauseCode: PropTypes.func.isRequired,
  // handleSetPartCode: PropTypes.func.isRequired,
  searchState: PropTypes.object,
};

searchButton.defaultProps = {
  searchState: {},
  // unitCode: undefined,
  // typeCode: undefined,
  // causeCode: undefined,
  // partCode: undefined,
};

