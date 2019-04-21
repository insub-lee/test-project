import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import ModalStyle from '../appSetting/StyleWidgetSetting';

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { content, item } = this.props;

    return (
      <ModalStyle>
        <div className="userSettingWrapper">
          <h2
            className="Header"
            style={{
                width: '100%',
                height: 55,
                borderBottom: '1px solid #222222',
                color: '#222222',
                fontSize: 18,
                  }}
          >
            {item.title} 상세
            <Button className="modalClose" onClick={this.props.unvisible} />
          </h2>
          <div className="main" style={{ marginBottom: 50 }}>
            <img
              src={content[0].image}
              alt={content[0].title}
              width="50px"
              height="50px"
            />
          서비스 바로가기입니다
          </div>
          <div className="list">
            <p>서비스 바로가기 리스트</p>
            {
                content.map(list => (
                  <div key={list.title} style={{ display: 'inline-block', width: 150 }}>
                    <img
                      src={list.image}
                      alt={list.title}
                      width="20px"
                      height="20px"
                    />{list.title}
                  </div>
                ))
              }
          </div>
        </div>
      </ModalStyle>
    );
  }
}

DetailPage.propTypes = {
  content: PropTypes.object.isRequired,
  unvisible: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default DetailPage;
