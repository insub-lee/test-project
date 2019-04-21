import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'containers/guide/components/Article/Abstraction/portalComponents';
import * as feed from 'components/Feedback/functions';
import { Input, Button, Transfer } from 'antd';

const RadioGroup = Radio.Group;
const isNull = value => value === '' || value === undefined || value === null;

class EqidSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eqIdSearchWord: '',
      radioValue: '1',
      targetKeys: this.props.targetKeys,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { targetKeys } = this.state;
    if (nextProps.tidnList.length > 0) {
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
  }

  onKeyDownEvent = (e) => {
    if (e.keyCode === 13) {
      this.handleEqIdSearch();
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
      this.props.popClose();
      // this.setState({ openPopover: true });
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
  }

  handleEqIdChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  handleEqIdConfirm = () => {
    let eqIdtempValue = '';
    for (let i = 0; i < this.state.targetKeys.length; i += 1) {
      eqIdtempValue += `, ${this.props.tidnList[this.state.targetKeys[i]].CODE}`;
    }
    this.props.close(eqIdtempValue.substring(2));
    this.setState({
      eqIdSearchWord: '',
    });
  }

  render() {
    return (
      <div style={{ width: 450, height: 380 }}>
        <div>
          <h4>Search</h4>
        </div>
        <div>
          <RadioGroup
            value={this.state.radioValue}
            onChange={this.handleRadioOnChange}
            defaultValue="1"
          >
            <Radio value="1">EQ ID</Radio>
            <Radio value="2">Maker</Radio>
          </RadioGroup>
          <Input
            value={this.state.eqIdSearchWord}
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
            dataSource={this.props.tidnList}
            // showSearch
            listStyle={{
              width: 200,
              height: 300,
            }}
            // operations={['to right', 'to left']}
            targetKeys={this.state.targetKeys}
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
  }
}
EqidSearch.propTypes = {
  handleLoadingTidnParam: PropTypes.func.isRequired,
  tidnList: PropTypes.array.isRequired,
  targetKeys: PropTypes.array.isRequired,
  popClose: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default EqidSearch;
