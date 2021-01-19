import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PDFViewer from 'pdf-viewer-reactjs';
import printJS from 'print-js';
import { Button, Spin } from 'antd';
import { DownloadOutlined, PrinterOutlined  } from '@ant-design/icons';
import CustomNavigation from './customNavigation';
import Styled from './Styled';

class JasperViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      pdf: undefined,
      isError: false,
    };
  }

  reportRef = React.createRef();

  componentDidMount = () => {
    this.getPDF();
  };

  getPDF = async () => {
    const pdf = new URL(this.props?.src.replace('html', 'pdf'));
    axios({
      url: pdf?.pathname + pdf?.search,
      method: 'GET',
      responseType: 'blob',
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        this.setState({ pdf: url, isLoaded: true });
      })
      .catch(err => this.setState({ isLoaded: true, isError: true }));
  };

  printPDF = blob => {
    try {
      const isIE11 = !!(window.navigator && window.navigator.msSaveOrOpenBlob); // or however you want to check it
      if (isIE11) {
        window.navigator.msSaveOrOpenBlob(blob, 'documents.pdf');
      }
      printJS({
        printable: blob,
        type: 'pdf',
        base64: false,
      });
    } catch (e) {
      console.debug('error', e);
    }
  };

  render() {
    const { isLoaded, isError, pdf } = this.state;
    const pdfDown = new URL(this.props?.src.replace('html', 'pdf'));
    return (
      <Styled>
        <div className="cover-view-jasper">
          {isLoaded && !isError ? (
            <div className="pdf-viewer-wrap">
              <div className="viewer-option-group">
                <Button className="optionBtn" type="dashed" shape="circle" size="small">
                  <a href={pdfDown} download>
                    <DownloadOutlined style={{ color: '#000000' }} />
                  </a>
                </Button>
                <Button className="optionBtn" type="dashed" shape="circle" size="small" onClick={() => this.printPDF(pdf)}>
                  <PrinterOutlined style={{ color: '#000000' }} />
                </Button>
              </div>
              <PDFViewer
                document={{
                  url: pdf,
                }}
                navbarOnTop
                css="customViewer"
                navigation={CustomNavigation}
              />
            </div>
          ) : (
            <>
              {!isError ? (
                <Spin spinning={!isLoaded} tip="Report 불러오는중.." style={{ margin: '10px' }}></Spin>
              ) : (
                <div style={{ margin: '10px' }}>리포트 호출에 실패하였습니다.</div>
              )}
            </>
          )}
        </div>
      </Styled>
    );
  }
}

JasperViewer.propTypes = {
  src: PropTypes.string,
};
JasperViewer.defaultProps = {
  src: '',
};

export default JasperViewer;
