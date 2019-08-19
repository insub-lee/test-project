import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import Detail from './detail';
import SearchWidget from './searchWidget';

export default class helperWidget extends PureComponent {
  render() {
    const {
 detail, widgetSize, toggle, searchClick, searchWord 
} = this.props;

    return (
      <Row type="flex" justify="center">
        <Col span={24} className="widget">
          <SearchWidget onClick={searchClick} />
          <Detail item={detail} toggle={toggle} searchWord={searchWord} />
        </Col>
      </Row>
    );
  }
}
helperWidget.defaultProps = {
  widgetSize: { width: '5', height: '220px' },
};
