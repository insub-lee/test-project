import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';
import { Row, Col, Divider } from 'antd';
import request from 'utils/request';
import history from 'utils/history';
import Styled from './Styled';

class NoaccidentWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    request({
      method: 'POST',
      url: `/api/eshs/v1/common/noAccident`,
      data: { PARAM: { type: 'GET_STATUS' } },
    }).then(({ response }) => {
      if (response?.result !== null) {
        const { result } = response;
        this.initCallback(result);
      }
    });
  };

  initCallback = result => {
    this.setState({
      info: result || {},
    });
  };

  render() {
    const { item } = this.props;
    const { info } = this.state;
    const { size } = item;
    return (
      <Styled>
        {size !== '1X1' ? (
          <div style={{ padding: '20px' }}>
            <div className="info-line">
              <h1 className="widget-sub-title">무재해 시간 : 안전은 생명입니다.</h1>
            </div>
            <div className="noacc-contents-wrap">
              <Row>
                <Col span={6} order={1}>
                  <Divider orientation="left" className="site">
                    {info.AREA_1}
                  </Divider>
                  <div className="noacc-status">
                    <p>{`시작일 : ${info.NO_ACCIDENT_DT_1}`}</p>
                    <p>{`달성시간 : ${info.TOTAL_1} 시간`}</p>
                    <p>{`달성률 : ${info.RATE_1} %`}</p>
                  </div>
                </Col>
                <Col span={6} order={2}>
                  <Divider orientation="left" className="site">
                    {info.AREA_3}
                  </Divider>
                  <div className="noacc-status">
                    <p>{`시작일 : ${info.NO_ACCIDENT_DT_3}`}</p>
                    <p>{`달성시간 : ${info.TOTAL_3} 시간`}</p>
                    <p>{`달성률 : ${info.RATE_3} %`}</p>
                  </div>
                </Col>
                <Col span={6} order={3}>
                  <Divider orientation="left" className="site">
                    {info.AREA_2}
                  </Divider>
                  <div className="noacc-status">
                    <p>{`시작일 : ${info.NO_ACCIDENT_DT_2}`}</p>
                    <p>{`달성시간 : ${info.TOTAL_2} 시간`}</p>
                    <p>{`달성률 : ${info.RATE_2} %`}</p>
                  </div>
                </Col>
                <Col span={6} order={4}>
                  <Divider orientation="left" className="site">
                    바로가기
                  </Divider>
                  <div className="noacc-status">
                    <a href="javascrip:void(0);" onClick={() => history.push('/apps/eshs/admin/safety/noAccident/status')}>
                      <div className="title-area">
                        <span className="item-cont">
                          <SendOutlined /> 무재해 현황
                        </span>
                      </div>
                    </a>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        ) : (
          <>
            <Divider orientation="left" className="site">
              <a className="link-type2" href="javascrip:void(0);" onClick={() => history.push('/apps/eshs/admin/safety/noAccident/status')}>
                <SendOutlined /> 무재해시간 현황
              </a>
            </Divider>
            <div className="noacc-status">
              <p className="line-p">{`구미 : ${info.TOTAL_1} 시간 | ${info.RATE_1} % 달성`}</p>
              <p className="line-p">{`청주 : ${info.TOTAL_3} 시간 | ${info.RATE_3} % 달성`}</p>
              <p className="line-p">{`서울 : ${info.TOTAL_2} 시간 | ${info.RATE_2} % 달성`}</p>
            </div>
            <div className="foot-contents">
              <h1>안전은 생명입니다.</h1>
            </div>
          </>
        )}
      </Styled>
    );
  }
}

NoaccidentWidget.propTypes = {
  item: PropTypes.object,
};

NoaccidentWidget.defaultProps = {};

export default NoaccidentWidget;
