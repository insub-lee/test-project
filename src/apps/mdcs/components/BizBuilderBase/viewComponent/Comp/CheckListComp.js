import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Modal } from 'antd';

import CheckSelectList from 'apps/mdcs/components/CheckSelectList';

class CheckListComp extends Component {
  state = {
    openModal: false,
    initFlag: true,
    apiFlag: true,
    selectedText: '',
    tempText: '',
    tempValue: '',
    dataSource: [],
  };

  componentDidMount() {
    const {
      getExtraApiData,
      id,
      CONFIG: {
        property: { apiArray },
      },
    } = this.props;
    getExtraApiData(id, apiArray);
  }

  onOpenHandler = () => {
    const { selectedText } = this.state;
    const {
      formData,
      CONFIG: {
        property: { COMP_FIELD },
      },
    } = this.props;
    this.setState({ openModal: true, tempText: selectedText, tempValue: formData[COMP_FIELD] });
  };

  onOkHandler = () => {
    const { tempText, tempValue } = this.state;
    const {
      changeFormData,
      id,
      CONFIG: {
        property: { COMP_FIELD, isRequired, NAME_KOR },
      },
      changeValidationData,
      isCustom,
    } = this.props;
    if (tempValue === ' ' || tempValue === '') {
      return false;
    }
    if (isRequired) {
      changeValidationData(id, COMP_FIELD, tempValue !== ' ', tempValue !== ' ' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, tempValue);
    if (isCustom) {
      const { customOnOkHandler } = this.props;
      customOnOkHandler();
    }
    this.setState({ openModal: false, selectedText: tempText });
  };

  onChangeHandler = (e, type) => {
    const { isCustom } = this.props;
    const { value: selectedValue } = e.target;
    const idx = e.nativeEvent.target.selectedIndex;
    const { text: selectedText } = e.target[idx];
    if (isCustom) {
      const { customOnChangeHandler } = this.props;
      customOnChangeHandler(type.length > 0 && type[0].CODE);
    }
    this.setState({ tempText: selectedText, tempValue: selectedValue });
  };

  onRemoveHandler = () => {
    this.setState({ tempValue: ' ', tempText: ' ' });
  };

  render() {
    const {
      readOnly,
      colData,
      extraApiData,
      isCustom,
      CONFIG: {
        property: { apiArray },
      },
    } = this.props;
    if (this.state.apiFlag) {
      const keyList = apiArray.map(x => x.key);
      if (keyList.filter(key => extraApiData[key] !== undefined).length === keyList.length) {
        const dataSource = keyList.map(key => ({ groupName: key, dataSet: extraApiData[key].categoryMapList }));

        if (this.state.initFlag && colData !== ' ') {
          keyList.find(x => {
            const selectedText = extraApiData[x].categoryMapList.find(y => y.NODE_ID.toString() === colData);
            this.setState({ selectedText: selectedText !== undefined && selectedText.NAME_KOR });
            return selectedText !== undefined;
          });
        }
        this.setState({ apiFlag: false, dataSource });
      }
    }
    return (
      <React.Fragment>
        {readOnly ? (
          <Input value={this.state.selectedText} readOnly></Input>
        ) : (
          <Input
            addonAfter={
              <a onClick={this.onOpenHandler}>
                <Icon type="setting" />
              </a>
            }
            value={this.state.selectedText}
            readOnly
          ></Input>
        )}

        <Modal
          width={417}
          bodyStyle={{ height: '350px', padding: '49px 8px 10px 8px' }}
          visible={this.state.openModal}
          onOk={() => {
            this.onOkHandler();
          }}
          onCancel={() => this.setState({ openModal: false })}
        >
          <CheckSelectList
            dataSource={this.state.dataSource}
            selectedText={this.state.tempText}
            onChange={this.onChangeHandler}
            onRemove={this.onRemoveHandler}
            isCustom={isCustom}
          ></CheckSelectList>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CheckListComp;

CheckListComp.propTypes = {
  getExtraApiData: PropTypes.func,
  id: PropTypes.string,
  CONFIG: PropTypes.object,
  property: PropTypes.object,
  formData: PropTypes.object,
  changeFormData: PropTypes.func,
  extraApiData: PropTypes.object,
  readOnly: PropTypes.bool,
  changeValidationData: PropTypes.func,
  customOnChangeHandler: PropTypes.func,
  isCustom: PropTypes.bool,
};
