import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import NoResult from './noResult';
class detail extends PureComponent {
  render() {
    const { item, searchWord } = this.props;

    let noMap;
    if (item.length === 0) {
      noMap = <NoResult searchWord={searchWord}></NoResult>;
      return noMap;
    }

    const group = item.map(query => {
      const LVL = query.get('LVL');
      const NAME_KOR = query.get('NAME_KOR');
      let result;

      switch (LVL) {
        case 2:
          result = <h3 className="manulTitle">{NAME_KOR}</h3>;
          break;
        case 3:
          result = <Col span={10}>{NAME_KOR}</Col>;
          break;
        default:
      }

      return <div>{result}</div>;
    });
    return (
      <div className="groupWrap">
        {noMap}
        {group}
      </div>
    );
  }
}
detail.propTypes = {
  item: PropTypes.array,
  searchWord: PropTypes.string,
};
export default detail;
