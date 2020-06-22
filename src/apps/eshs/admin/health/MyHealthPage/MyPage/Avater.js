import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const AvaterTableStyled = styled.div`
  table {
    border: 0;
    border-spacing: 0;
    width: 100%;

    td {
      position: relative;
      padding: 0;
    }
  }
`;

class Avater extends Component {
  componentDidMount() {}

  render() {
    const { avaterImgs } = this.props;
    return (
      <AvaterTableStyled>
        <table>
          <thead>
            <tr>
              <th>건강상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td height={1}></td>
            </tr>
            <tr>
              <td
                style={
                  avaterImgs.GENDER === 'm'
                    ? {
                        // 남자(style 다르게 적용시 이런식으로 구분 하시면 됩니다.)
                        backgroundImage: `url(${avaterImgs.head})`,
                        width: '353px',
                        height: '113px',
                        backgroundRepeat: 'no-repeat',
                      }
                    : {
                        // 여자
                        backgroundImage: `url(${avaterImgs.head})`,
                        width: '353px',
                        height: '128px',
                        backgroundRepeat: 'no-repeat',
                      }
                }
              >
                {/* 이렇게도 가능 */}
                <div style={{ width: '353px', height: avaterImgs.GENDER === 'm' ? '113px' : '128px', position: 'relative', left: '0px', top: '0px' }}>
                  <div
                    style={{
                      width: '103px',
                      height: '31px',
                      position: 'absolute',
                      left: '10px',
                      top: '10px',
                      zIndex: '2',
                      filter: 'Alpha(Opacity=100) revealTrans(transition=23,duration=0.5) blendTrans(duration=0.5)',
                    }}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${avaterImgs.signal})`,
                        backgroundRepeat: 'no-repeat',
                        width: '103px',
                        height: '31px',
                        position: 'absolute',
                        left: '10px',
                        top: '10px',
                        zIndex: '2',
                        filter: 'Alpha(Opacity=100) revealTrans(transition=23,duration=0.5) blendTrans(duration=0.5)',
                      }}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td
                colSpan={2}
                style={{
                  width: '353px',
                  height: avaterImgs.GENDER === 'm' ? '118px' : '94px',
                  backgroundImage: `url(${avaterImgs.body})`,
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${avaterImgs.gan})`,
                    backgroundRepeat: 'no-repeat',
                    width: '121px',
                    height: '72px',
                    position: 'absolute',
                    left: avaterImgs.GENDER === 'm' ? '85px' : '93px',
                    top: avaterImgs.GENDER === 'm' ? '16px' : '-4px',
                    zIndex: '2',
                    filter: 'Alpha(Opacity=100) revealTrans(transition=23,duration=0.5) blendTrans(duration=0.5)',
                  }}
                ></div>
                <div
                  style={{
                    backgroundImage: `url(${avaterImgs.goji})`,
                    backgroundRepeat: 'no-repeat',
                    width: '141px',
                    height: '26px',
                    position: 'absolute',
                    left: '130px',
                    top: '74px',
                    zIndex: '3',
                    filter: 'Alpha(Opacity=100) revealTrans(transition=23,duration=0.5) blendTrans(duration=0.5)',
                  }}
                ></div>
                <div
                  style={{
                    backgroundImage: `url(${avaterImgs.dang})`,
                    backgroundRepeat: 'no-repeat',
                    width: '88px',
                    height: '78px',
                    position: 'absolute',
                    left: avaterImgs.GENDER === 'm' ? '220px' : '230px',
                    top: avaterImgs.GENDER === 'm' ? '10px' : '-10px',
                    zIndex: '1',
                    filter: 'Alpha(Opacity=100) revealTrans(transition=23,duration=0.5) blendTrans(duration=0.5)',
                  }}
                ></div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ width: '353px', height: '219px', backgroundImage: `url(${avaterImgs.leg})`, backgroundRepeat: 'no-repeat' }}></td>
            </tr>
          </tbody>
        </table>
      </AvaterTableStyled>
    );
  }
}

Avater.propTypes = {
  avaterImgs: PropTypes.object,
};
Avater.defaultProps = {
  avaterImgs: {},
};
export default Avater;
