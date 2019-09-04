import React, { PureComponent } from 'react';
import ScrollBar from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import Detail from './detail';
import SearchWidget from './searchWidget';
export default class helperWidget extends PureComponent {
  state = {
    searchWord: '',
  };

  handlerSearch = searchWord => {
    this.setState({
      searchWord,
    });
  };

  render() {
    const { detail, linkData } = this.props;
    const result = [];
    let first = -1;
    /* 트리데이터생성 */
    detail.map(query => {
      let tempData = {};
      const LVL = query.get('LVL');
      const BIZGRP_ID = query.get('BIZGRP_ID');
      const NAME_KOR = query.get('NAME_KOR');
      let parentProps = [];
      let childProps = {};
      switch (LVL) {
        case 2:
          first += 1;
          parentProps = linkData.children.filter(item => item.BIZGRP_ID === BIZGRP_ID);
          tempData = {
            title: NAME_KOR,
            key: BIZGRP_ID,
            value: BIZGRP_ID,
            children: [],
            linkProp: parentProps[0],
          };
          result.push(tempData);
          break;
        case 3:
          childProps = result[first].linkProp.children.filter(item => item.BIZGRP_ID === BIZGRP_ID);
          tempData = {
            title: NAME_KOR,
            key: BIZGRP_ID,
            value: BIZGRP_ID,
            children: [],
            linkProp: childProps[0],
          };
          result[first].children.push(tempData);
          break;
        default:
      }
      return result;
    });

    return (
      <div className="wrapper">
        <SearchWidget searchWord={this.state.searchWord} onSearch={this.handlerSearch} />
        <ScrollBar style={{ width: '100%', height: '100%' }} autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <div className="widget">
            <Detail item={detail} treeData={result} searchWord={this.state.searchWord} />
          </div>
        </ScrollBar>
      </div>
    );
  }
}
helperWidget.propTypes = {
  detail: PropTypes.object,
  linkData: PropTypes.object,
};
