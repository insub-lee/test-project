import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const AvaterTableStyled = styled.div`
  table {
    border: 0;
    border-spacing: 0;
    width: 100%;
  }
`;

class Avater extends Component {
  componentDidMount() {}

  render() {
    const { avaterImgs } = this.props;
    console.debug('avaterImgs -- ', avaterImgs);
    return (
      <AvaterTableStyled>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td height={1}></td>
            </tr>
            <tr>
              <td style={{ backgroundImage: `url(${avaterImgs.head})`, width: '353', height: '113' }}>
                <div style={{ width: '353px', height: '113px', position: 'relative', left: '0px', top: '0px' }}>
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
              <td colSpan={2} style={{ width: '353px', height: '118px', backgroundImage: `url(${avaterImgs.body})` }}>
                <div
                  style={{
                    backgroundImage: `url(${avaterImgs.gan})`,
                    width: '121px',
                    height: '72px',
                    position: 'absolute',
                    left: '85px',
                    top: '16px',
                    zIndex: '2',
                    filter: 'Alpha(Opacity=100) revealTrans(transition=23,duration=0.5) blendTrans(duration=0.5)',
                  }}
                ></div>
                <div
                  style={{
                    backgroundImage: `url(${avaterImgs.goji})`,
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
                    width: '88px',
                    height: '78px',
                    position: 'absolute',
                    left: '220px',
                    top: '10px',
                    zIndex: '1',
                    filter: 'Alpha(Opacity=100) revealTrans(transition=23,duration=0.5) blendTrans(duration=0.5)',
                  }}
                ></div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ width: '353px', height: '219px', backgroundImage: `url(${avaterImgs.leg})` }}></td>
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
