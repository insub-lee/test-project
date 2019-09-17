import React, { Component } from 'react';

import { Input } from 'antd';
import WriteTab from '../../../../../../components/WritePage/WriteTab';
import WriteTabTitle from '../../../../../../components/WritePage/WriteTab/WriteTabTitle';
import StyledWriteTabPanel from '../../../../../../components/WritePage/StyledWriteTabPanel';
import FroalaEditor from '../../../../../../components/RichTextEditor/FroalaEditor';
import FroalaEditorView from '../../../../../../components/RichTextEditor/FroalaEditorView';
import { froalaEditorConfig } from '../../../../../../components/RichTextEditor/FroalaEditorConfig';
import Styled from './Styled';
class Tab extends Component {
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
    if (typeof data === 'string') {
      const parseData = JSON.parse(data);
      lastIndex = parseData.length - 1;
      if (lastIndex < 0) {
        lastId = -1;
      } else {
        lastId = parseData[lastIndex].id;
      }
      parseData.push({ id: lastId + 1, title: 'New Tab', board: '' });
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', parseData);
    } else {
      lastIndex = data.length - 1;
      if (lastIndex < 0) {
        lastId = -1;
      } else {
        lastId = data[lastIndex].id;
      }
      data.push({ id: lastId + 1, title: 'New Tab', board: '' });
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', data);
    }

    this.handlerSetIndex(lastIndex + 1);
  };

  handlerBoardChange = (value, id) => {
    const { item, handleChangeCompValue } = this.props;
    const data = item.MUAL_COMPVIEWINFO;

    let findIndex;
    if (typeof data === 'string') {
      const parseData = JSON.parse(data);
      findIndex = parseData.findIndex(findData => findData.id === id);
      parseData[findIndex].board = value;
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', parseData);
    } else {
      findIndex = data.findIndex(findData => findData.id === id);

      // 이벤트가 왜 2번발생하는지모르겟음;
      if (findIndex === -1) {
        return;
      }
      data[findIndex].board = value;
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', data);
    }
  };

  handlerTitleChange = (value, id, e) => {
    e.stopPropagation();
    const { item, handleChangeCompValue } = this.props;
    const data = item.MUAL_COMPVIEWINFO;
    let findIndex;
    if (typeof data === 'string') {
      const parseData = JSON.parse(data);
      findIndex = parseData.findIndex(findData => findData.id === id);
      parseData[findIndex].title = value;
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', parseData);
    } else {
      findIndex = data.findIndex(findData => findData.id === id);

      if (findIndex === -1) {
        return;
      }
      data[findIndex].title = value;
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', data);
    }
  };

  handlerRemove = (e, id) => {
    e.stopPropagation();
    const { item, handleChangeCompValue } = this.props;
    const data = item.MUAL_COMPVIEWINFO;

    let filteredData;
    if (typeof data === 'string') {
      const parseData = JSON.parse(data);
      filteredData = parseData.filter(parData => parData.id !== id);
    } else {
      filteredData = data.filter(fData => fData.id !== id);
    }
    this.handlerSetIndex(0);
    handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', filteredData);
  };

  initData = data => {
    const { item, handleChangeCompValue } = this.props;
    if (!data) {
      const newData = [{ id: 0, title: 'New Tab', board: '' }];
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', newData);
      return newData;
    }
    if (typeof data === 'string') {
      return JSON.parse(data);
    }

    return data;
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

  render() {
    const { item, selectedComponentIdx, handleChangeCompValue } = this.props;
    const tabData = this.initData(item.MUAL_COMPVIEWINFO);
    const removeFlag = this.removeFlag(tabData);
    const maxFlag = this.maxFlag(tabData);
    const WriteTabData = tabData.map(data => ({
      id: data.id,
      TabComponent: (
        <WriteTabTitle
          title={<Input value={data.title} onChange={e => this.handlerTitleChange(e.target.value, data.id, e)} />}
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
          flag={removeFlag ? 'noShow' : 'show'}
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
      <Styled>
        {selectedComponentIdx === item.MUAL_TABCOMP_IDX ? (
          <WriteTab
            tabs={WriteTabData}
            keyName="id"
            onClick={this.handlerOnClick}
            selectedIndex={this.state.selectedIndex}
            setIndex={this.handlerSetIndex}
            flag={maxFlag ? 'noShow' : 'show'}
          ></WriteTab>
        ) : (
          <WriteTab
            tabs={noSelected}
            keyName="id"
            onClick={this.handlerOnClick}
            selectedIndex={this.state.selectedIndex}
            setIndex={this.handlerSetIndex}
            flag={maxFlag ? 'noShow' : 'show'}
          ></WriteTab>
        )}
      </Styled>
    );
  }
}
export default Tab;
