import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select, Row, Col } from 'antd';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledSearchWrap from 'components/CommonStyled/StyledSearchWrap';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleSearchClick = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { handleSearchClick } = this;
    return (
      <StyledViewDesigner>
        <Sketch>
          <StyledSearchWrap>
            <span className="alignLeft input-label">화학물 추가</span>
            <Input.Search className="search-item input-width160" placeHolder="검색" onClick={handleSearchClick} />
          </StyledSearchWrap>
          <div className="data-grid">
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                SAP NO.
              </Col>
              <Col span={4} className="col-input">
                <Input />
              </Col>
              <Col span={2} className="col-label">
                CAS NO.
              </Col>
              <Col span={4} className="col-input">
                <Input />
              </Col>
              <Col span={2} className="col-label">
                화학물질명_국문
              </Col>
              <Col span={4} className="col-input">
                <Input />
              </Col>
              <Col span={2} className="col-label">
                화학물질명_영문
              </Col>
              <Col span={4} className="col-input">
                <Input />
              </Col>
            </Row>
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                화학물질명_SAP
              </Col>
              <Col span={4} className="col-input">
                <Input />
              </Col>
              <Col span={2} className="col-label">
                관용명 및 이명
              </Col>
              <Col span={4} className="col-input">
                <Input />
              </Col>
              <Col span={2} className="col-label">
                수입구분
              </Col>
              <Col span={4} className="col-input">
                <Select className="col-select" />
              </Col>
            </Row>
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                공급업체
              </Col>
              <Col span={4} className="col-input">
                <Select className="col-select" />
              </Col>
              <Col span={2} className="col-label">
                함량(%) 표현값
              </Col>
              <Col span={4} className="col-input">
                <InputNumber className="col-input-number" />
              </Col>
              <Col span={2} className="col-label">
                함량(%) 정량
              </Col>
              <Col span={4} className="col-input">
                <InputNumber className="col-input-number" />
              </Col>
              <Col span={2} className="col-label">
                단위
              </Col>
              <Col span={4} className="col-input">
                <Input />
              </Col>
            </Row>
            <Row className="data-grid-row">
              <Col span={2} className="col-label">
                단위환산1
              </Col>
              <Col span={4} className="col-input">
                <Input />
              </Col>
              <Col span={2} className="col-label">
                단위환산2
              </Col>
              <Col span={4} className="col-input">
                <Input />
              </Col>
              <Col span={2} className="col-label">
                kg환산계수 {/* (단위환산1 * 단위환산2) */}
              </Col>
              <Col span={4} className="col-input">
                <div />
              </Col>
            </Row>
          </div>
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

List.propTypes = {};
List.defaultProps = {};

export default List;
