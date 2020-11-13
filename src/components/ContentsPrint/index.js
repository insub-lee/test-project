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
        return CusotmFooter;
      case 'magnachip':
        return <img src={magnachipLogo} alt="MagnaChip" />;
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
    const { buttonName, children, useFooter, footerType, handleBeforePrint, handleAfterPrint } = this.props;
    return (
      <>
        <ReactToPrint
          removeAfterPrint
          trigger={() => <StyledButton className="btn-gray btn-sm btn-first">{buttonName}</StyledButton>}
          content={this.reactToPrintContent}
          onAfterPrint={handleAfterPrint}
          onBeforePrint={handleBeforePrint}
        />
        <div style={{ display: 'none' }}>
          <PrintStyled ref={this.setComponentRef}>
            <div>
              <section>{children && children}</section>
              {useFooter ? <footer>{this.renderFooter(footerType)}</footer> : ''}
            </div>
          </PrintStyled>
        </div>
      </>
    );
  }
}

ContentsPrint.propTypes = {
  buttonName: PropTypes.string,
  children: PropTypes.any,
  useFooter: PropTypes.bool,
  footerType: PropTypes.string,
  CusotmFooter: PropTypes.any,
  handleBeforePrint: PropTypes.func,
  handleAfterPrint: PropTypes.func,
};

ContentsPrint.defaultProps = {
  buttonName: '인쇄',
  children: undefined,
  useFooter: true,
  footerType: 'default',
  CusotmFooter: () => '',
  handleBeforePrint: () => false,
  handleAfterPrint: () => false,
};

export default ContentsPrint;
