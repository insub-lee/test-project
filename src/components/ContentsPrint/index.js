import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import StyledAntdButton from 'components/BizBuilder/styled/Buttons/StyledAntdButton';
import PrintStyled from './printStyled';
import magnachipLogo from './magnachip_print_logo.png';

const StyledButton = StyledAntdButton(Button);

class ContentsPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderFooter = type => {
    const { CusotmFooter } = this.props;

    switch (type) {
      case 'custom':
        return <footer>{CusotmFooter}</footer>;
      case 'magnachip':
        return (
          <footer>
            <img src={magnachipLogo} alt="MagnaChip" />
          </footer>
        );
      case 'keyfoundry':
        return '키파운드리';
      default:
        return '';
    }
  };

  setComponentRef = ref => {
    this.printContents = ref;
  };

  reactToPrintContent = () => this.printContents;

  render() {
    const { children, useFooter, footerType, handleBeforePrint, handleAfterPrint } = this.props;
    return (
      <>
        <ReactToPrint
          removeAfterPrint
          trigger={() => <StyledButton className="btn-primary btn-sm btn-first">인쇄</StyledButton>}
          content={this.reactToPrintContent}
          onAfterPrint={handleAfterPrint}
          onBeforePrint={handleBeforePrint}
        />
        <div style={{ display: 'none' }}>
          <PrintStyled ref={this.setComponentRef}>
            {children && children}
            {useFooter && this.renderFooter(footerType)}
          </PrintStyled>
        </div>
      </>
    );
  }
}

ContentsPrint.propTypes = {
  children: PropTypes.any,
  useFooter: PropTypes.bool,
  footerType: PropTypes.string,
  CusotmFooter: PropTypes.any,
  handleBeforePrint: PropTypes.func,
  handleAfterPrint: PropTypes.func,
};

ContentsPrint.defaultProps = {
  children: undefined,
  useFooter: true,
  footerType: 'default',
  CusotmFooter: () => '',
  handleBeforePrint: () => false,
  handleAfterPrint: () => false,
};

export default ContentsPrint;
