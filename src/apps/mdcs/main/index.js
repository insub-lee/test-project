import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <div className="main">
        <div className="grid">
          <div className="grid2">
            <div className="user_wrap">
              <button type="button" className="user">
                <span className="user_txt1">MY INFO</span>
                <img src="./MDCS_files/user.png" alt="유저" className="user_img" />
                <span className="user_txt2">Hong Gil Dong</span>
                <span className="user_txt3">기획조정실 / 대리 / 06-09876</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
