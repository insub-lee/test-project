import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';
import * as actions from './actions';

class items extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getWidgetInfo();
  }

  HandleCategorieChange = (PRNT_ID) => {
    this.props.getDetail(PRNT_ID);

    this.resetKeyword();
  };
  render() {
    const { SHOW_PARENT } = TreeSelect;
    const result = [];
    let tempData = {};
    const { item } = this.props;
    let first = -1;
    let second = -1;
    const groupItem = item.map((query) => {
      let styled;
      const LVL = query.get('LVL');
      const BIZGRP_ID = query.get('BIZGRP_ID');
      const NAME_KOR = query.get('NAME_KOR');
      switch (LVL) {
        case 1:
          second = -1;
          first += 1;
          styled = {
            cursor: 'pointer',
            textIndent: `${LVL}em`,
            fontWeight: 'bold',
            fontSize: '20px',
          };
          tempData = {
            title: NAME_KOR,
            key: BIZGRP_ID,
            value: BIZGRP_ID,
            LVL,
            children: [],
          };
          result.push(tempData);
          break;
        case 2:
          second += 1;
          styled = { cursor: 'pointer', textIndent: `${LVL}em`, fontWeight: 'bold' };
          tempData = {
            title: NAME_KOR,
            key: BIZGRP_ID,
            value: BIZGRP_ID,
            children: [],
          };
          result[first].children.push(tempData);
          break;
        case 3:
          styled = { textIndent: `${LVL}em` };
          tempData = {
            title: NAME_KOR,
            key: BIZGRP_ID,
            value: BIZGRP_ID,
            disabled: true,
          };
          result[first].children[second].children.push(tempData);
          break;
        default:
      }

      return (
        <li style={styled} role="presentation">
          {NAME_KOR}
        </li>
      );
    });

    return (
      <div>
        <TreeSelect
          treeData={result}
          onChange={this.HandleCategorieChange}
          treeCheckable
          showCheckedStrategy={SHOW_PARENT}
          searchPlaceholder="카테고리를 설정해주세요"
          style={{ width: '200px', marginLeft: '20px' }}
        />
        <ul>{groupItem}</ul>
      </div>
    );
  }
}
items.propTypes = {
  item: PropTypes.object,
  onCategorieChange: PropTypes.func,
};
Widget.defaultProps = {
  categorie: [],
};
const mapStateToProps = createStructuredSelector({
  categorie: selectors.makeSelectWidget(),
  detail: selectors.makeSelectDetail(),
});
const mapDispatchToProps = dispatch => ({
  getWidgetInfo: () => dispatch(actions.getWidgetInfo()),
  getDetail: PRNT_ID => dispatch(actions.getDetail(PRNT_ID)),
});
const withReducer = injectReducer({ key: 'apps-Widget', reducer });
const withSaga = injectSaga({ key: 'apps-Widget', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(items);
