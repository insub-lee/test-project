import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { isJSON } from 'utils/helpers';
import WriteTab from '../../../../../../components/WritePage/WriteTab';
import WriteTabTitle from '../../../../../../components/WritePage/WriteTab/WriteTabTitle';
import StyledWriteTabPanel from '../../../../../../components/WritePage/StyledWriteTabPanel';
import FroalaEditor from '../../../../../../components/RichTextEditor/FroalaEditor';
import FroalaEditorView from '../../../../../../components/RichTextEditor/FroalaEditorView';
import { froalaEditorConfig } from '../../../../../../components/RichTextEditor/FroalaEditorConfig';
import Styled from './Styled';
class Tab extends PureComponent {
  state = {
    selectedIndex: 0,
  };

  handlerSetIndex = number => {
    this.setState({ selectedIndex: number });
  };

  handlerOnClick = e => {
    e.stopPropagation();
    const { item, handleChangeCompValue } = this.props;
    const data = item.MUAL_COMPVIEWINFO;
    let lastId;
    let lastIndex;

    if (isJSON(data)) {
      const parseData = JSON.parse(data);
      lastIndex = parseData.length - 1;
      if (lastIndex < 0) {
        lastId = -1;
      } else {
        lastId = parseData[lastIndex].id;
      }
      parseData.push({ id: lastId + 1, title: 'New Tab', board: '' });
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(parseData));
    } else {
      console.log('Insert 버그테스트');
    }
    this.handlerSetIndex(lastIndex + 1);
  };

  handlerBoardChange = (value, id) => {
    const { item, handleChangeCompValue } = this.props;
    const data = item.MUAL_COMPVIEWINFO;
    let findIndex;
    if (isJSON(data)) {
      const parseData = JSON.parse(data);
      findIndex = parseData.findIndex(findData => findData.id === id);
      parseData[findIndex].board = value;
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(parseData));
    } else {
      console.log('Board 버그테스트');
    }
  };

  handlerTitleChange = (e, id) => {
    e.stopPropagation();
    const { value } = e.target;
    const { item, handleChangeCompValue } = this.props;
    const data = item.MUAL_COMPVIEWINFO;
    let findIndex;
    if (isJSON(data)) {
      const parseData = JSON.parse(data);

      findIndex = parseData.findIndex(findData => findData.id === id);
      parseData[findIndex].title = value;
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(parseData));
    } else {
      console.log('title 버그테스트');
    }
  };

  handlerRemove = (e, id) => {
    e.stopPropagation();
    const { item, handleChangeCompValue } = this.props;
    const data = item.MUAL_COMPVIEWINFO;
    let filteredData;
    if (isJSON(data)) {
      const parseData = JSON.parse(data);
      filteredData = parseData.filter(parData => parData.id !== id);
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(filteredData));
    } else {
      console.log('Remove 버그테스트');
    }
    this.handlerSetIndex(0);
  };

  removeFlag = data => {
    if (data.length === 1) {
      return true;
    }
    return false;
  };

  maxFlag = data => {
    if (data.length === 5) {
      return true;
    }
    return false;
  };

  lengData = data => data.length;

  render() {
    const { item, selectedComponentIdx, handleChangeCompValue } = this.props;
    let tabData;
    if (item.MUAL_COMPVIEWINFO === null || item.MUAL_COMPVIEWINFO === undefined || item.MUAL_COMPVIEWINFO === '') {
      tabData = [{ id: 0, title: 'New Tab', board: '' }];
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(tabData));
    } else if (isJSON(item.MUAL_COMPVIEWINFO)) {
      tabData = JSON.parse(item.MUAL_COMPVIEWINFO);
    } else {
      tabData = [{ id: 0, title: 'New Tab', board: '' }];
    }

    const removeFlag = this.removeFlag(tabData);
    const maxFlag = this.maxFlag(tabData);
    const length = this.lengData(tabData);
    const WriteTabData = tabData.map(data => ({
      id: data.id,
      TabComponent: (
        <WriteTabTitle
          title={<Input value={data.title} onChange={e => this.handlerTitleChange(e, data.id)} />}
          onRemove={e => {
            this.handlerRemove(e, data.id);
          }}
          flag={removeFlag ? 'noShow' : 'show'}
        ></WriteTabTitle>
      ),
      TabPanelComponent: <FroalaEditor config={froalaEditorConfig} model={data.board} onModelChange={value => this.handlerBoardChange(value, data.id)} />,
      disabled: false,
    }));

    const noSelected = tabData.map(data => ({
      id: data.id,
      TabComponent: (
        <WriteTabTitle
          title={<div className="titleWrap">{data.title}</div>}
          onRemove={e => {
            this.handlerRemove(e, data.id);
          }}
          flag="noShow"
        />
      ),
      TabPanelComponent: (
        <StyledWriteTabPanel>
          <FroalaEditorView model={data.board} />
        </StyledWriteTabPanel>
      ),
      disabled: false,
    }));

    return (
      <Styled className="manualEditorComponent">
        {selectedComponentIdx === item.MUAL_TABCOMP_IDX ? (
          <WriteTab
            tabs={WriteTabData}
            keyName="id"
            onClick={this.handlerOnClick}
            selectedIndex={this.state.selectedIndex}
            setIndex={this.handlerSetIndex}
            flag={maxFlag ? 'noShow' : 'show'}
            length={length}
          ></WriteTab>
        ) : (
          <WriteTab
            tabs={noSelected}
            keyName="id"
            onClick={this.handlerOnClick}
            selectedIndex={this.state.selectedIndex}
            setIndex={this.handlerSetIndex}
            flag={maxFlag ? 'noShow' : 'show'}
            length={length}
          ></WriteTab>
        )}
      </Styled>
    );
  }
}

Tab.propTypes = {
  item: PropTypes.object.isRequired,
  selectedComponentIdx: PropTypes.number.isRequired,
  handleChangeCompValue: PropTypes.func.isRequired,
};
export default Tab;
