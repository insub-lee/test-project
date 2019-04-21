import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Page from 'components/Page';

// 현재 사용하지 않는 컴포넌트 같음
class MyFirstGrid extends PureComponent {
  render() {
    const {
      setMyMenuData,
      selectedApp,
      execMenu,
      show,
      isUnreadCnt,
      view,
      onReload,
      setIsSpinnerShow,
      isPreviewPage
    } = this.props;

    return (
      <div>
        {
          selectedApp ?
            <Page
              columns={selectedApp}
              setMyMenuData={setMyMenuData}
              setIsSpinnerShow={setIsSpinnerShow}
              isPreviewPage={isPreviewPage}

              isUnreadCnt={isUnreadCnt}

              onReload={onReload}
              execMenu={execMenu}
              show={show}
              
              view={view}
            />
          :
            <div />
        }
      </div>
    );
  }
}

Page.propTypes = {
  columns: PropTypes.array.isRequired,
  setMyMenuData: PropTypes.object,
  selectedApp: PropTypes.array,
  setIsSpinnerShow: PropTypes.func.isRequired,
  isPreviewPage: PropTypes.bool,
};

export default MyFirstGrid;
