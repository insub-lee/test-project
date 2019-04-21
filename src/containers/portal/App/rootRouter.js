import React, { PureComponent } from 'react';
import Page from '../../../components/Page';
import { Layout, Spin } from 'antd';
import PropTypes from 'prop-types';

const {
    Content,
} = Layout;

class RootRouter extends PureComponent {
    render() {
        const {
          setMyMenuData,
          selectedApp,
          isUnreadCnt,
          isSpinnerShow,
          execPage,
          execMenu,
          show,
          onReload,
          setIsSpinnerShow,
          view,
          isPreviewPage,
        } = this.props;
        const styleSpinner = { margin: 'auto', width: '100%', padding: '20%', position: 'absolute', zIndex: '100' };
        if (view === 'Mobile' || view === 'Tablet') {
          styleSpinner.height = '100vh';
          styleSpinner.paddingTop = '70%';
        }
        return (
          <div>
            {
              <div className={setMyMenuData.APP_YN === 'Y' ? '' : 'gridWrapper'}>
                  <Content
                    className="portalContent"
                    style={{
                      flexShrink: '0',
                    }}
                  >
                    <Spin size="large" style={styleSpinner} spinning={isSpinnerShow} />
                    <Page
                      columns={selectedApp}
                      setMyMenuData={setMyMenuData}
                      setIsSpinnerShow={setIsSpinnerShow}
                      isPreviewPage={isPreviewPage}

                      isUnreadCnt={isUnreadCnt}
                      execPage={execPage}
                      execMenu={execMenu}
                      show={show}
                      onReload={onReload}
                    />
                  </Content>
              </div>
            }
          </div>
        );
    }
}

RootRouter.propTypes = {
  setMyMenuData: PropTypes.object.isRequired,
  selectedApp: PropTypes.array.isRequired,
  isSpinnerShow: PropTypes.bool.isRequired,
  execPage: PropTypes.func.isRequired,
  execMenu: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  setIsSpinnerShow: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  isPreviewPage: PropTypes.bool.isRequired,
};

export default RootRouter
