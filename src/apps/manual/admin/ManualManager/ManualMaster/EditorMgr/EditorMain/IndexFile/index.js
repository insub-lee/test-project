import React from 'react';
import { Input, Radio, Button } from 'antd';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Upload from 'components/FormStuff/Upload';

const IndexFile = ({ item, selectedComponentIdx, handleChangeCompValue, handlePushCompValue, handleRemoveCompValue }) => (
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
              <div className="manualEditorUpload">
                <Upload
                  readOnly={false}
                  defaultValue={{ DETAIL: item.COMP_OPTION.FILE || [] }}
                  saveTempContents={fileList => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.FILE', fromJS(fileList))}
                />
              </div>
            </div>
          ) : (
            <div className="manualEditorFileLinkWrap">
              <span>파일링크 : </span>
              <div>
                {item.COMP_OPTION.URL.map((linkItem, itemIdx) => (
                  <div className="manualEditorFileLinkInputWrap">
                    <Input
                      type="text"
                      value={linkItem || ''}
                      placeholder="파일 URL을 입력해주세요"
                      onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, `COMP_OPTION.URL.${itemIdx}`, e.target.value)}
                    />
                    <Button onClick={() => handleRemoveCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, `COMP_OPTION.URL.${itemIdx}`)}>-</Button>
                  </div>
                ))}
              </div>
              <Button onClick={() => handlePushCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.URL', '')}>+</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

IndexFile.propTypes = {
  handleChangeCompValue: PropTypes.func,
  item: PropTypes.object,
  selectedComponentIdx: PropTypes.number,
  handlePushCompValue: PropTypes.func,
  handleRemoveCompValue: PropTypes.func,
};

IndexFile.defaultProps = {
  handleChangeCompValue: () => false,
  item: {},
  selectedComponentIdx: 0,
  handlePushCompValue: () => false,
  handleRemoveCompValue: () => false,
};

export default IndexFile;
