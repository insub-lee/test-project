import React from 'react';
import { Button, Input, Radio } from 'antd';
import FroalaEditor from '../../../../../components/RichTextEditor/FroalaEditor';
import FroalaEditorView from '../../../../../components/RichTextEditor/FroalaEditorView';

import { froalaEditorConfig } from '../../../../../components/RichTextEditor/FroalaEditorConfig';
import QnA from './QnA';

const onClickComponent = (e, selectItem, selectedComponentIdx, handleChangeCompIdx) => {
  e.stopPropagation();
  if (selectItem.MUAL_TABCOMP_IDX !== selectedComponentIdx) handleChangeCompIdx(selectItem.MUAL_TABCOMP_IDX);
};

const RenderEditorComponent = (item, handleChangeCompValue, handleChangeCompIdx, selectedComponentIdx, focusComponetIdx, addAreaIdx) => {
  let innerContent = '';
  switch (item.TYPE) {
    case 'editor':
      innerContent = (
        <div className="manualEditorComponent">
          {selectedComponentIdx === item.MUAL_TABCOMP_PIDX || selectedComponentIdx === item.MUAL_TABCOMP_IDX ? (
            <FroalaEditor
              config={froalaEditorConfig}
              model={item.MUAL_COMPVIEWINFO}
              onModelChange={text => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', text)}
            />
          ) : (
            <FroalaEditorView model={item.MUAL_COMPVIEWINFO} />
          )}
        </div>
      );
      break;
    case 'index':
      innerContent = (
        <div className="manualEditorComponent">
          <div className="manualIndexWrapper">
            <div className="manualIndexTitle">
              {selectedComponentIdx === item.MUAL_TABCOMP_IDX ? (
                <Input
                  type="text"
                  defaultValue={item.MUAL_COMPVIEWINFO}
                  placeholder="목차명을 입력해주세요"
                  onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', e.target.value)}
                />
              ) : (
                item.MUAL_COMPVIEWINFO || '목차명을 입력해주세요'
              )}
              {/* <div className="manualIndexTitleButtonWrapper">
                <Button>목차 추가</Button>
              </div> */}
            </div>
          </div>
        </div>
      );
      break;
    case 'indexLink':
      innerContent = (
        <div className="manualEditorComponent">
          <div className="manualIndexWrapper">
            <div className="manualIndexTitle">
              {selectedComponentIdx === item.MUAL_TABCOMP_IDX ? (
                <Input
                  type="text"
                  defaultValue={item.MUAL_COMPVIEWINFO}
                  placeholder="목차명을 입력해주세요"
                  onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', e.target.value)}
                />
              ) : (
                item.MUAL_COMPVIEWINFO || '목차명을 입력해주세요'
              )}
            </div>
            <div className="manualIndexContent">
              <div className="manualLinkIndexContent">
                <div>
                  <span>URL 정보 : </span>
                  <Input
                    type="text"
                    value={item.COMP_OPTION.URL || ''}
                    placeholder="URL을 입력해주세요"
                    onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.URL', e.target.value)}
                  />
                </div>
                <div>
                  <span>조회방법 : </span>
                  <Radio.Group
                    onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.VIEW_TYPE', e.target.value)}
                    value={item.COMP_OPTION.VIEW_TYPE}
                  >
                    <Radio value="popup">popup</Radio>
                    <Radio value="inline">inline</Radio>
                  </Radio.Group>
                </div>
                <div>
                  <span>action 대상 : </span>
                  <Radio.Group
                    onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.ACTION_TYPE', e.target.value)}
                    value={item.COMP_OPTION.ACTION_TYPE}
                  >
                    <Radio value="title">목차명</Radio>
                    <Radio value="menu">목차메뉴 & 목차명</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      break;
    case 'indexFile':
      innerContent = (
        <div className="manualEditorComponent">
          <div className="manualIndexWrapper">
            <div className="manualIndexTitle">
              {selectedComponentIdx === item.MUAL_TABCOMP_IDX ? (
                <Input
                  type="text"
                  defaultValue={item.MUAL_COMPVIEWINFO}
                  placeholder="목차명을 입력해주세요"
                  onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'MUAL_COMPVIEWINFO', e.target.value)}
                />
              ) : (
                item.MUAL_COMPVIEWINFO || '목차명을 입력해주세요'
              )}
            </div>
            <div className="manualIndexContent">
              <div className="manualLinkIndexContent">
                <div>
                  <span>조회방법 : </span>
                  <Radio.Group
                    onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.VIEW_TYPE', e.target.value)}
                    value={item.COMP_OPTION.VIEW_TYPE || 'link'}
                  >
                    <Radio value="link">파일링크</Radio>
                    <Radio value="file">파일첨부</Radio>
                  </Radio.Group>
                </div>
                {item.COMP_OPTION.VIEW_TYPE === 'file' ? (
                  <div>
                    <span>파일첨부 : </span>
                    첨부영역
                  </div>
                ) : (
                  <div>
                    <span>파일링크 : </span>
                    <Input
                      type="text"
                      value={item.COMP_OPTION.URL || ''}
                      placeholder="파일 URL을 입력해주세요"
                      onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.URL', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
      break;
    case 'qna':
      innerContent = <QnA item={item} selectedComponentIdx={selectedComponentIdx} handleChangeCompValue={handleChangeCompValue} />;
      break;
    default:
      innerContent = '';
      break;
  }
  return (
    <div
      key={`editorCompKey_${item.MUAL_TAB_IDX}_${item.MUAL_TABCOMP_IDX}`}
      id={`editorCompID_${item.MUAL_TAB_IDX}_${item.MUAL_TABCOMP_IDX}`}
      className={`editorComponent${addAreaIdx === item.MUAL_TABCOMP_IDX ? ' on' : ''}${focusComponetIdx === item.MUAL_TABCOMP_IDX ? ' focus' : ''}${
        item.TYPE.indexOf('index') === -1 && selectedComponentIdx === item.MUAL_TABCOMP_PIDX ? ' buttonOn' : ''
      }`}
      onClick={e => onClickComponent(e, item, selectedComponentIdx, handleChangeCompIdx)}
    >
      {innerContent}
    </div>
  );
};

export default RenderEditorComponent;
