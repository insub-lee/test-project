import React from 'react';
import PropTypes from 'prop-types';
import StyledFooter from './StyledFooter';
import Copyright from './Copyright';
import FooterMenu from './FooterMenu';

class Footer extends React.Component {
  getMarginLeftFix = () => {
    const {
      dockIconType,
      view,
    } = this.props;

    switch (view) {
      case 'DesktopWide':
        if (dockIconType === 'MAX') {
          return '-874px';
        }
        return '-850px';
      case 'Desktop':
        if (dockIconType === 'MAX') {
          return '-710px';
        }
        return '-685px';
      case 'DesktopNarrow':
        if (dockIconType === 'MAX') {
          return '-545px';
        }
        return '-520px';
      case 'Tablet':
        // 태블릿, 모바일의 경우 독이 무조건 아래에 존재하므로 독 고정 없음

        // 윈도우 넓이가 1025 보다 작으면 그리드 양 옆 마진값이 줄어들어 별도의 처리를 해줌
        if (window.innerWidth < 1025) {
          return '-345px';
        }
        return '-355px';
      default:
        return 'calc(100% - 20px)';
    }
  };

  getMarginLeftUnfix = () => {
    const {
      view,
    } = this.props;

    // 독 고정이 아닐 경우 독아이템 크기 상관 없음
    switch (view) {
      case 'DesktopWide':
        return '-830px';
      case 'Desktop':
        return '-665px';
      case 'DesktopNarrow':
        return '-500px';
      case 'Tablet':
        // 윈도우 넓이가 1025 보다 작으면 그리드 양 옆 마진값이 줄어들어 별도의 처리를 해줌
        if (window.innerWidth < 1025) {
          return '-325px';
        }
        return '-335px';
      default:
        return 'calc(100% - 20px)';
    }
  };

  render() {
    const {
      dockFixedYn,
    } = this.props;

    return (
      <StyledFooter
        marginLeft={dockFixedYn === 'Y' ? this.getMarginLeftFix() : this.getMarginLeftUnfix()}
      >
        <div>
          <FooterMenu />
          <Copyright />
        </div>
      </StyledFooter>
    );
  }
}

Footer.propTypes = {
  dockFixedYn: PropTypes.string,
  dockIconType: PropTypes.string,
  view: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  dockFixedYn: undefined,
  dockIconType: undefined,
};

export default Footer;
