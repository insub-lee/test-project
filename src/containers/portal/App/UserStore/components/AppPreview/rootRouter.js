import React from 'react';
import { Layout } from 'antd';
// import PropTypes from 'prop-types';
import Apps from '../../../../../../apps';
import Page from '../Page';
const { Content } = Layout;

class RootRouter extends React.Component {
  render() {
    const { setMyMenuData, selectedApp, isUnreadCnt, closeSetting, applySkin, set, managerInfo } = this.props;
    const setBizHome = {};
    return (
      <div>
        {selectedApp ? (
          <div>
            {setMyMenuData.APP_ID === -1 ? (
              <div className="gridWrapper">
                {set === false ? (
                  <Content
                    className="portalContent"
                    style={{
                      flexShrink: '0',
                    }}
                  >
                    <Apps setMyMenuData={setMyMenuData} selectedApp={selectedApp} setBizHome={setBizHome} isUnreadCnt={isUnreadCnt} />
                  </Content>
                ) : (
                  <Content
                    className="portalContent"
                    style={{
                      flexShrink: '0',
                    }}
                  />
                )}
              </div>
            ) : (
              <div>
                {set === false ? (
                  <Content
                    className="portalContent"
                    style={{
                      flexShrink: '0',
                    }}
                  >
                    <Page columns={selectedApp} setMyMenuData={setMyMenuData} />
                  </Content>
                ) : (
                  <Content
                    className="portalContent"
                    style={{
                      flexShrink: '0',
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="gridWrapper">
            {set === false ? (
              <Content
                className="portalContent"
                style={{
                  flexShrink: '0',
                }}
              >
                <Apps setMyMenuData={setMyMenuData} selectedApp={selectedApp} setBizHome={setBizHome} isUnreadCnt={isUnreadCnt} />
              </Content>
            ) : (
              <Content
                className="portalContent"
                style={{
                  flexShrink: '0',
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

RootRouter.propTypes = {};

export default RootRouter;
