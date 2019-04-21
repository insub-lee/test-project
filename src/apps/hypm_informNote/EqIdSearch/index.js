import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Popover, Button, Transfer, Input, Radio } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as feed from 'components/Feedback/functions';
import AntRadiobox from './radiobox.style';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

const RadioGroup = AntRadiobox(Radio.Group);
const isNull = value => value === '' || value === undefined || value === null;

class EqIdSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      targetKeys: [],
      radioValue: '1',
      popoverVisible: false,
      eqIdValue: undefined,
      eqIdSearchWord: '',
    };
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
    if (this.props.tidnConfirmList !== nextProps.tidnConfirmList) {
      const { tidnConfirmList } = nextProps;
      this.props.tidnList.splice(0, this.props.tidnList.length);
      this.setState({
        targetKeys: [],
        eqIdValue: tidnConfirmList && tidnConfirmList.length > 0 ? tidnConfirmList.map(t => t.CODE).join(',') : '',
      });
    }
  }

  onKeyDownEvent = (e) => {
    if (e.keyCode === 13) {
      this.handleEqIdSearch();
    }
  }

  handlePopoverVisibleChange = (visible) => {
    const {
      sdpt,
      isDisabled,
    } = this.props;

    if (isNull(sdpt)) {
      feed.error('SDPT는 필수 값입니다.');
    } else if (!isDisabled) {
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

  handleEqIdSearch = () => {
    const {
      handleLoadingTidnParam,
      fab,
      team,
      sdpt,
      fl,
      model,
    } = this.props;

    const {
      radioValue,
      eqIdSearchWord,
      targetKeys,
    } = this.state;
    if (isNull(eqIdSearchWord)) {
      feed.error('검색어를 한자리이상 입력해주세요.');
    } else {
      const param = {
        // 기본조회 조건, POP OVER 조건
        tabGubun: 'FAB',
        PARAM_BEBER: fab,
        PARAM_STORT: team,
        PARAM_ARBPL: sdpt,
        MULTI_PARAM_ARBPL: '',
        MULTI_PARAM_TPLNR: fl && fl.length > 0 ? fl.map(f => `'${f.value}'`).join(',') : '',
        MULTI_PARAM_EQART: model && model.length > 0 ? model.map(m => `'${m.value}'`).join(',') : '',
        PARAM_LIKE_SEARCH_WORD: eqIdSearchWord,
        comboType: 'COMBO_TECHNICAL_ID_NUMBER_MASTERKEY',
        pick: radioValue,
        transferTargetKeys: targetKeys,
      };
      handleLoadingTidnParam(param);
    }
  }

  handleEqIdChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  handleEqIdConfirm = () => {
    let eqIdtempValue = '';
    const { tidnConfirmList } = this.props;

    // 반환할 EqId리스트 초기화
    tidnConfirmList.splice(0, tidnConfirmList.length);

    for (let i = 0; i < this.state.targetKeys.length; i += 1) {
      eqIdtempValue += `, ${this.props.tidnList[this.state.targetKeys[i]].CODE}`;
      tidnConfirmList.push(this.props.tidnList[this.state.targetKeys[i]]);
    }
    this.setState({
      popoverVisible: false,
      eqIdValue: eqIdtempValue.substring(2),
    });
  }

  render() {
    const {
      radioValue,
      popoverVisible,
      targetKeys,
      eqIdValue,
    } = this.state;

    const {
      tidnList,
      isDisabled,
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
            // value={this.state.eqIdSearchWord}
            style={{ width: 250, height: 20 }}
            onChange={this.handleInputOnChange}
            onKeyDown={this.onKeyDownEvent}
          />
          <Button
            icon="search"
            style={{ width: 30 }}
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
    return (
      <Popover
        // title="Search"
        content={eqIdcontent}
        trigger="click"
        visible={popoverVisible}
        onVisibleChange={this.handlePopoverVisibleChange}
      >
        <Input
          style={{ width: 160 }}
          value={eqIdValue}
          disabled={isDisabled}
        />
        <Button icon="search" style={{ width: 30, display: isDisabled ? 'none' : '' }} />
      </Popover>
    );
  }
}

EqIdSearch.propTypes = {
  handleLoadingTidnParam: PropTypes.func.isRequired,
  tidnList: PropTypes.array,
  tidnConfirmList: PropTypes.array,
  fab: PropTypes.string,
  team: PropTypes.string,
  sdpt: PropTypes.string,
  fl: PropTypes.array,
  model: PropTypes.array,
  isDisabled: PropTypes.bool,
};

EqIdSearch.defaultProps = {
  tidnList: [],
  tidnConfirmList: [],
  fab: '',
  team: '',
  sdpt: '',
  fl: [],
  model: [],
  isDisabled: false,
};

const mapStateToProps = createStructuredSelector({
  tidnList: selectors.makeTidnList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingTidnParam: param => dispatch(actions.loadingTidnParam(param)),
  };
}

const withReducer = injectReducer({ key: 'EqIdSearch', reducer });
const withSaga = injectSaga({ key: 'EqIdSearch', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(EqIdSearch);
