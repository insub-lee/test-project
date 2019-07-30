import React from 'react';
import { Input, Radio } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AntRadiobox from 'containers/portal/components/uielements/radiobox.style';
import { BtnDkGray, BtnLgtGray } from 'containers/portal/components/uielements/buttons.style';
import selectors from '../selectors';
import * as actions from '../actions';

import StyleCategoryManageForm from './StyleCategoryManageForm';

const RadioGroup = AntRadiobox(Radio.Group);

const CategoryInfoView = ({ mode, categoryInfo, handleChangeCategoryItem, saveCategoryInfo, handleChangeViewMode }) => (
  <div>
    <div className="categoryContents">
      <h4>카테고리 기본정보</h4>
      <StyleCategoryManageForm>
        <table className="adminTbl categoryTbl">
          <tbody>
            <tr>
              <th className="required">
                <label htmlFor="v2">분류명</label>
              </th>
              <td>
                <Input
                  id="v2"
                  value={categoryInfo.get('CATEGORY_NAME')}
                  onChange={e => handleChangeCategoryItem('CATEGORY_NAME', e.target.value)}
                  readOnly={mode === 'V'}
                />
              </td>
            </tr>
            <tr>
              <th className="required">
                <label htmlFor="v3">표시여부</label>
              </th>
              <td>
                <RadioGroup
                  onChange={e => handleChangeCategoryItem('DISPLAY_YN', e.target.value)}
                  value={categoryInfo.get('DISPLAY_YN') || 'Y'}
                  readOnly={mode === 'V'}
                >
                  <Radio value="Y" disabled={mode === 'V'}>
                    표시
                  </Radio>
                  <Radio value="N" disabled={mode === 'V'}>
                    미표시
                  </Radio>
                </RadioGroup>
              </td>
            </tr>
          </tbody>
        </table>
      </StyleCategoryManageForm>
    </div>
    <div className="buttonWrapper">
      <React.Fragment>
        {/* <BtnLgtGray onClick={() => handleChangeViewMode(null, 'V')}>닫기</BtnLgtGray> */}
        <BtnDkGray onClick={saveCategoryInfo}>저장</BtnDkGray>
      </React.Fragment>
    </div>
  </div>
);

CategoryInfoView.propTypes = {
  handleChangeViewMode: PropTypes.func,
  handleChangeCategoryItem: PropTypes.func,
  saveCategoryInfo: PropTypes.func,
  mode: PropTypes.string,
  categoryInfo: PropTypes.object,
};

CategoryInfoView.defaultProps = {
  handleChangeViewMode: () => false,
  handleChangeCategoryItem: () => false,
  saveCategoryInfo: () => false,
  mode: '',
  categoryInfo: {},
};

const mapStateToProps = createStructuredSelector({
  mode: selectors.makeSelectMode(),
  categoryInfo: selectors.makeSelectCategoryInfo(),
});

const mapDispatchToProps = dispatch => ({
  handleChangeViewMode: (node, flag) => dispatch(actions.changeViewMode(node, flag)),
  handleChangeCategoryItem: (key, value) => dispatch(actions.changeCategoryInfo(key, value)),
  saveCategoryInfo: () => dispatch(actions.saveCategoryInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryInfoView);
