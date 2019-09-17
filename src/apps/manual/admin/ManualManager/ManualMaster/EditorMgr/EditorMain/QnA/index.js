import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { SortablePane, Pane } from 'react-sortable-pane';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import FroalaEditor from '../../../../../../components/RichTextEditor/FroalaEditor';
import FroalaEditorView from '../../../../../../components/RichTextEditor/FroalaEditorView';
import { froalaEditorConfig } from '../../../../../../components/RichTextEditor/FroalaEditorConfig';
import QnAList from './QnaList';

class QnA extends Component {
  componentDidMount() {}

  onClickEdit = e => {
    const { item, handleChangeCompValue } = this.props;
    const editYn = item.COMP_OPTION.EDIT;
  };

  // 저장버튼 (추가버튼)
  onClickSaveBtn = () => {
    const { item, handleChangeCompValue } = this.props;
    const strQnaDataList = item.MUAL_COMPVIEWINFO;

    const orgQnaDataList = JSON.parse(strQnaDataList);
    const newQnaRow = {
      IDX: orgQnaDataList.length,
      TITLE: '',
      ANSWER: '',
      modifyYn: false,
    };
    const newQnaDataList = orgQnaDataList.concat(newQnaRow);
    handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(newQnaDataList));
  };

  // 편집모드 on /off
  onClickModifyBtn = idx => {
    const { item, handleChangeCompValue } = this.props;
    const qnaDataList = JSON.parse(item.MUAL_COMPVIEWINFO);
    const selectedIdx = qnaDataList.findIndex(data => data.IDX === idx);
    const selectedData = qnaDataList[selectedIdx];
    const nextQnaDataList = [...qnaDataList];

    let editYn = false;
    if (selectedData.modifyYn !== true) {
      editYn = true;
    }

    nextQnaDataList[selectedIdx] = {
      ...selectedData,
      modifyYn: editYn,
    };
    handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(nextQnaDataList));
  };

  // 편집 - 제목수정
  onChangeTitleModify = (idx, value) => {
    const { item, handleChangeCompValue } = this.props;
    const qnaDataList = JSON.parse(item.MUAL_COMPVIEWINFO);
    const selectedIdx = qnaDataList.findIndex(data => data.IDX === idx);
    const selectedData = qnaDataList[selectedIdx];
    const nextQnaDataList = [...qnaDataList];

    nextQnaDataList[selectedIdx] = {
      ...selectedData,
      TITLE: value,
    };
    handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(nextQnaDataList));
  };

  // 편집 - 내용수정
  onChangeAnswerModify = (idx, value) => {
    const { item, handleChangeCompValue } = this.props;
    const qnaDataList = JSON.parse(item.MUAL_COMPVIEWINFO);
    const selectedIdx = qnaDataList.findIndex(data => data.IDX === idx);
    const selectedData = qnaDataList[selectedIdx];
    const nextQnaDataList = [...qnaDataList];

    nextQnaDataList[selectedIdx] = {
      ...selectedData,
      ANSWER: value,
    };
    handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(nextQnaDataList));
  };

  // 편집 - 내용삭제
  onClickRemoveBtn = idx => {
    const { item, handleChangeCompValue } = this.props;
    const qnaDataList = JSON.parse(item.MUAL_COMPVIEWINFO);
    const nextList = qnaDataList.filter(data => data.IDX !== idx);
    if (nextList.length === 0) {
      const nextQnaDataList = [{ IDX: 0, TITLE: '', ANSWER: '', modifyYn: false }];
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(nextQnaDataList));
    } else {
      const nextQnaDataList = nextList.map((data, i) => ({ ...data, IDX: i }));
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(nextQnaDataList));
    }
  };

  // dnd 이벤트
  onOrderChange = e => {
    const { item, handleChangeCompValue } = this.props;
    const sortData = e.map(data => JSON.parse(data));
    const newQnaDataList = sortData.map((data, i) => ({ ...data, IDX: i }));
    console.log('바뀐순서', newQnaDataList);
    handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(newQnaDataList));
  };

  reOrder = (startIndex, endIndex) => {
    const { item, handleChangeCompValue } = this.props;
    const qnaDataList = JSON.parse(item.MUAL_COMPVIEWINFO);
    const result = Array.from(qnaDataList);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    const nextQnaDataList = result.map((data, i) => ({ ...data, IDX: i }));
    handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(nextQnaDataList));
  };

  render() {
    const { item, selectedComponentIdx, handleChangeCompValue } = this.props;
    const { onChangeTitleModify, onClickRemoveBtn, onChangeAnswerModify, onClickSaveBtn } = this;

    if (item.MUAL_COMPVIEWINFO === null || item.MUAL_COMPVIEWINFO === undefined || item.MUAL_COMPVIEWINFO === '') {
      const defaultQnaDataList = [{ IDX: 0, TITLE: '', ANSWER: '', modifyYn: false }];
      handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', JSON.stringify(defaultQnaDataList));
    }

    const qnaDataList = JSON.parse(item.MUAL_COMPVIEWINFO);
    const qnaDataLength = qnaDataList.length;
    const action = {
      onChangeTitleModify,
      onChangeAnswerModify,
      onClickRemoveBtn,
      onClickSaveBtn,
    };

    const onDragEnd = result => {
      if (!result.destination) {
        return;
      }
      this.reOrder(result.source.index, result.destination.index);
    };

    return (
      <div className="manualEditorComponent">
        <div className="manual-qna-wrap">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="qnaContent" type="column-item" isDropDisabled={false}>
              {(dropProvided, dropSnapshot) => (
                <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                  {qnaDataList.length > 0 &&
                    qnaDataList.map((data, index) => (
                      <Draggable key={`${data.IDX}`} index={data.IDX} draggableId={`${data.IDX}`}>
                        {(dragProvided, dragSnapshot) => (
                          <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                            <QnAList
                              item={item}
                              index={index}
                              qnaData={data}
                              qnaDataLength={qnaDataLength}
                              action={action}
                              selectedComponentIdx={selectedComponentIdx}
                            />
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
      </div>
    );
  }
}

QnA.propTypes = {
  item: PropTypes.object.isRequired,
  selectedComponentIdx: PropTypes.number.isRequired,
  handleChangeCompValue: PropTypes.func.isRequired,
};

QnA.defaultProps = {};

export default QnA;
