import React, { Component } from 'react';
import { Input, Button, Select, Tag, TreeSelect, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createStructuredSelector } from 'reselect';

import { fromJS } from 'immutable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';
import Styled from './Styled';

const { TextArea } = Input;

class ConfigBizBuilder extends Component {
  onApply = () => {
    const { setBizBuilderWidgetSettingBySaga, item, size, sizeArr, user, BizBuilderConfigInfo, type, updateBizGroupChgYn } = this.props;
    const result = {
      WIDGETID: item.id,
      ITEM_VALUE: {
        size,
        sizeArr,
        user,
        data: BizBuilderConfigInfo,
        type,
      },
    };
    console.debug(result);
    setBizBuilderWidgetSettingBySaga(result);
    if (type !== 'mypage') {
      // 업무 그룹 변화 감지 함수
      // updateBizGroupChgYn();
      console.debug(type);
    }
  };

  onChange = workSeq => {
    const { setBizBuilderConfigChangeValueByReducr, getWorkMetaBySaga, item } = this.props;
    setBizBuilderConfigChangeValueByReducr(item.id, 'WORK_SEQ', workSeq);
    getWorkMetaBySaga(item.id, workSeq);
  };

  onListColsChange = items => {
    const { setBizBuilderConfigChangeValueByReducr, workMeta, item } = this.props;
    setBizBuilderConfigChangeValueByReducr(item.id, 'listCols', items);
    const { list } = workMeta;
    const colsListDesignInfo = items.map(i => list.filter(lt => lt.META_SEQ.toString() === i)[0]);
    setBizBuilderConfigChangeValueByReducr(item.id, 'colsListDesignInfo', colsListDesignInfo);
  };

  onViewListColsChange = items => {
    const { setBizBuilderConfigChangeValueByReducr, workMeta, item } = this.props;
    setBizBuilderConfigChangeValueByReducr(item.id, 'viewListCols', items);
    const { list } = workMeta;
    const colsListDesignInfo = items.map(i => list.filter(lt => lt.META_SEQ.toString() === i)[0]);
    setBizBuilderConfigChangeValueByReducr(item.id, 'colsViewListDesignInfo', colsListDesignInfo);
  };

  componentDidMount() {
    const { getBizBuilderWidgetSettingBySaga, getWorkListBySaga, item } = this.props;
    getBizBuilderWidgetSettingBySaga(item);
    getWorkListBySaga(item.id);
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  onListDragEnd = dropResult => {
    const { BizBuilderConfigInfo, setBizBuilderConfigChangeValueByReducr, item } = this.props;
    if (!dropResult.destination) {
      return;
    }
    const { colsListDesignInfo } = BizBuilderConfigInfo;
    const result = this.reorder(colsListDesignInfo, dropResult.source.index, dropResult.destination.index);
    setBizBuilderConfigChangeValueByReducr(item.id, 'colsListDesignInfo', result);
  };

  onViewListDragEnd = dropResult => {
    const { BizBuilderConfigInfo, setBizBuilderConfigChangeValueByReducr, item } = this.props;
    if (!dropResult.destination) {
      return;
    }
    const { colsViewListDesignInfo } = BizBuilderConfigInfo;
    const result = this.reorder(colsViewListDesignInfo, dropResult.source.index, dropResult.destination.index);
    setBizBuilderConfigChangeValueByReducr(item.id, 'colsViewListDesignInfo', result);
  };

  render() {
    const { BizBuilderConfigInfo, workList, workMeta } = this.props;
    const { list } = workMeta;
    const cols = [];
    const { Option } = Select;
    // eslint-disable-next-line no-unused-expressions
    list &&
      list
        .filter(f => f.COMP_TYPE === 'FIELD')
        .map(item =>
          cols.push(
            <Option key={item.META_SEQ}>
              {item.NAME_KOR} [{item.COMP_FIELD}]
            </Option>,
          ),
        );

    const workListOpt = [];

    for (let i = 0; i < workList.length; i += 1) {
      workListOpt.push(
        <Option key={workList[i].WORK_SEQ}>
          {workList[i].NAME_KOR} [테이블명 : {workList[i].WORK_ID}]
        </Option>,
      );
    }

    const { colsListDesignInfo, colsViewListDesignInfo } = BizBuilderConfigInfo;

    return (
      <table style={{ margin: '30px', padding: '10px' }}>
        <tbody>
          <tr>
            <td>업무빌더 선택 : </td>
            <td>
              <Select onChange={e => this.onChange(e)} placeholder="chooes bizbuilder" style={{ width: '500px' }} value={BizBuilderConfigInfo.WORK_SEQ}>
                {workListOpt}
              </Select>
            </td>
          </tr>
          <tr>
            <td>리스트 컬럼정의</td>
            <td>
              <Select
                mode="multiple"
                onChange={this.onListColsChange}
                style={{ width: '300px' }}
                value={BizBuilderConfigInfo.listCols}
                placeholder="리스트 컬럼정보을 선택 해주세요"
              >
                {cols}
              </Select>
            </td>
          </tr>
          <tr>
            <td>Widget리스트 화면정의</td>
            <td>
              <div>
                <DragDropContext onDragEnd={this.onListDragEnd}>
                  <Droppable droppableId="process" direction="horizontal">
                    {dropProvided => (
                      <div {...dropProvided.droppableProps} ref={dropProvided.innerRef} style={{ height: '50px', display: 'flex' }}>
                        {colsListDesignInfo &&
                          colsListDesignInfo.map((item, index) => (
                            <Draggable key={item.META_SEQ} draggableId={item.META_SEQ} index={index}>
                              {dragProvided => (
                                <div {...dragProvided.draggableProps} {...dragProvided.dragHandleProps} ref={dragProvided.innerRef}>
                                  <Tag>{item.NAME_KOR}</Tag>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {dropProvided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </td>
          </tr>
          <tr>
            <td>View List 컬럼정의</td>
            <td>
              <Select
                mode="multiple"
                onChange={this.onViewListColsChange}
                style={{ width: '100%' }}
                value={BizBuilderConfigInfo.viewListCols}
                placeholder="리스트 컬럼정보을 선택 해주세요"
              >
                {cols}
              </Select>
            </td>
          </tr>
          <tr>
            <td>상세화면내 리스트화면 정의: </td>
            <td>
              <div>
                <DragDropContext onDragEnd={this.onViewListDragEnd}>
                  <Droppable droppableId="process" direction="horizontal">
                    {dropProvided => (
                      <div {...dropProvided.droppableProps} ref={dropProvided.innerRef} style={{ height: '50px', display: 'flex' }}>
                        {colsViewListDesignInfo &&
                          colsViewListDesignInfo.map((item, index) => (
                            <Draggable key={item.META_SEQ} draggableId={item.META_SEQ} index={index}>
                              {dragProvided => (
                                <div {...dragProvided.draggableProps} {...dragProvided.dragHandleProps} ref={dragProvided.innerRef}>
                                  <Tag>{item.NAME_KOR}</Tag>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {dropProvided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button onClick={this.onApply}>적용</Button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

ConfigBizBuilder.propTypes = {
  item: PropTypes.object,
  size: PropTypes.string,
  sizeArr: PropTypes.array,
  user: PropTypes.object,
  data: PropTypes.object,
  setBizBuilderWidgetSettingBySaga: PropTypes.func,
  setBizBuilderConfigChangeValueByReducr: PropTypes.func,
  BizBuilderConfigInfo: PropTypes.object,
  type: PropTypes.string,
  getBizBuilderWidgetSettingBySaga: PropTypes.func,
  setBizBuillderWidgetSettingAsJSON: PropTypes.func,
  getWorkListBySaga: PropTypes.func,
  workList: PropTypes.array,
  getWorkMetaBySaga: PropTypes.func,
  workMeta: PropTypes.object,
};

ConfigBizBuilder.defaultProps = {
  item: { id: '11541' },
  size: '2X1',
  sizeArr: ['2X1'],
  user: {
    isTitle: true,
    skin: '1',
  },
  data: {},
  setBizBuilderWidgetSettingBySaga: () => false,
  setBizBuilderConfigChangeValueByReducr: () => false,
  BizBuilderConfigInfo: fromJS({}),
  type: 'common',
  getBizBuilderWidgetSettingBySaga: () => false,
  setBizBuillderWidgetSettingAsJSON: () => false,
  getWorkListBySaga: () => false,
  workList: [],
  getWorkMetaBySaga: () => false,
  workMeta: {},
};

const mapStateToProps = createStructuredSelector({
  BizBuilderConfigInfo: selectors.makeSelectBizBuilderConfigInfo(),
  workList: selectors.makeSelectWorkList(),
  workMeta: selectors.makeSelectWorkMeta(),
});

const mapDispatchToProps = dispatch => ({
  setBizBuilderWidgetSettingBySaga: (widgetId, data) => dispatch(actions.setBizBuilderWidgetSettingBySaga(widgetId, data)),
  setBizBuilderConfigChangeValueByReducr: (widgetId, key, value) => dispatch(actions.setBizBuilderConfigChangeValueByReducr(widgetId, key, value)),
  getBizBuilderWidgetSettingBySaga: item => dispatch(actions.getBizBuilderWidgetSettingBySaga(item)),
  getWorkListBySaga: widgetId => dispatch(actions.getWorkListBySaga(widgetId)),
  getWorkMetaBySaga: (widgetId, workSeq) => dispatch(actions.getWorkMetaBySaga(widgetId, workSeq)),
});

const withReducer = injectReducer({ key: 'apps-manual-user-BizBuilderWidget-ConfigBizBuilder-reducer', reducer });
const withSaga = injectSaga({ key: 'apps-manual-user-BizBuilderWidget-ConfigBizBuilder-saga', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(ConfigBizBuilder);
