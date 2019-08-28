import React from 'react';
import { Input, Radio, Button } from 'antd';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Upload from 'components/FormStuff/Upload';

const IndexFile = ({ item, selectedComponentIdx, handleChangeCompValue }) => (
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
            <div>
              <span>파일링크 : </span>
              <Input
                type="text"
                value={item.COMP_OPTION.URL || ''}
                placeholder="파일 URL을 입력해주세요"
                onChange={e => handleChangeCompValue(item.MUAL_TAB_IDX, item.MUAL_TABCOMP_IDX, 'COMP_OPTION.URL', e.target.value)}
              />
              <Button onClick={() => console.debug('aaa')}>+</Button>
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
};

IndexFile.defaultProps = {
  handleChangeCompValue: () => false,
  item: {},
  selectedComponentIdx: 0,
};

export default IndexFile;
