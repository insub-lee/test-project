import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Spin } from 'antd';

import Page from '../../../components/Page';

const { Content } = Layout;

const RootRouter = ({
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
}) => {
  const styleSpinner = { margin: 'auto', width: '100%', padding: '20%', position: 'absolute', zIndex: '100' };
  if (view === 'Mobile' || view === 'Tablet') {
    styleSpinner.height = '100vh';
    styleSpinner.paddingTop = '70%';
  }
  return (
    <div>
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
    </div>
  );
};

RootRouter.propTypes = {
  setMyMenuData: PropTypes.object.isRequired,
  selectedApp: PropTypes.array.isRequired,
  isSpinnerShow: PropTypes.bool.isRequired,
  execPage: PropTypes.func,
  execMenu: PropTypes.func,
  onReload: PropTypes.func,
  show: PropTypes.func,
  setIsSpinnerShow: PropTypes.func.isRequired,
  view: PropTypes.string,
  isPreviewPage: PropTypes.bool.isRequired,
};

RootRouter.defaultProps = {
  show: () => {},
  execPage: () => {},
  execMenu: () => {},
  onReload: () => {},
  view: '',
};

export default RootRouter
