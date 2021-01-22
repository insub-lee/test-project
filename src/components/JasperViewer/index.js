import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PDFViewer from 'pdf-viewer-reactjs';
import printJS from 'print-js';
import { v4 as uuid } from 'uuid';
import { Button, Spin, Tooltip, Dropdown, Menu } from 'antd';
import { DownloadOutlined, PrinterOutlined } from '@ant-design/icons';
import CustomNavigation from './customNavigation';
import Styled from './Styled';

// 재스퍼 리포트서버에서 제공되는 export Format
const exports = [
  { LABEL: 'PDF', FORMAT: 'pdf' },
  { LABEL: 'Excel', FORMAT: 'xls' },
  { LABEL: 'CSV', FORMAT: 'CSV' },
  { LABEL: 'DOCX', FORMAT: 'DOCX' },
  { LABEL: 'RTF', FORMAT: 'RTF' },
  { LABEL: 'ODT', FORMAT: 'ODT' },
  { LABEL: 'ODS', FORMAT: 'ODS' },
  { LABEL: 'XLSX', FORMAT: 'XLSX' },
  { LABEL: 'PPTX', FORMAT: 'PPTX' },
];

class JasperViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      pdf: undefined,
      isError: false,
    };
  }

  componentDidMount = () => {
    this.getPDF();
  };

  // get Report(PDF)
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
      .catch(() => this.setState({ isLoaded: true, isError: true }));
  };

  // Viewer Print
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

  // 내보내기 func
  export = val => {
    const url = new URL(this.props?.src.replace('.html', `.${val}`));
    window.location.href = url?.pathname + url?.search;
  };

  // 내보내기 리스트
  menu = () => {
    const { exportFormats } = this.props;
    let formats = exports;
    if (exportFormats !== '') {
      const userFormats = exportFormats.split(',');
      formats = exports.filter(item => userFormats.includes(item.FORMAT));
    }
    return (
      <Menu onClick={item => this.export(item.key)}>
        {formats.map(item => (
          <Menu.Item key={item.FORMAT}>
            <span>{item.LABEL}</span>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  // Navigation 기본옵션 메뉴
  basicContents = [
    <Tooltip title="다운로드" className="option">
      <Dropdown overlay={this.menu} placement="bottomCenter">
        <Button type="dashed" shape="circle" size="small" key={uuid()}>
          <DownloadOutlined style={{ color: '#000000' }} />
        </Button>
      </Dropdown>
    </Tooltip>,
    <Tooltip title="인쇄" className="option">
      <Button type="dashed" shape="circle" size="small" onClick={() => this.printPDF(this.state?.pdf)} key={uuid()}>
        <PrinterOutlined style={{ color: '#000000' }} />
      </Button>
    </Tooltip>,
  ];

  // User가 Prop (customContents = JSX element)를 추가하였을때 기본 옵션 앞쪽에 추가 유저 제공
  optionContents = () => {
    const { customContents } = this.props;
    const basicOption = this.basicContents;
    if (customContents) {
      basicOption.unshift(customContents);
    }
    return basicOption;
  };

  render() {
    const { isLoaded, isError, pdf } = this.state;
    return (
      <Styled>
        <div className="cover-view-jasper">
          {isLoaded && !isError ? (
            <div className="pdf-viewer-wrap">
              <PDFViewer
                document={{
                  url: pdf,
                }}
                navbarOnTop
                css="customViewer"
                navigation={navigatorProps => CustomNavigation({ ...navigatorProps, optionContents: this.optionContents })}
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
  exportFormats: PropTypes.string,
  customContents: PropTypes.any,
};
JasperViewer.defaultProps = {
  src: '',
  exportFormats: 'pdf,PPTX,xls',
};

export default JasperViewer;