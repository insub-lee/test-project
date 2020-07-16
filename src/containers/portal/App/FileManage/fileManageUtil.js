import React from 'react';
import * as feed from 'components/Feedback/functions';
import { FileExcelOutlined, FilePptOutlined, FileWordOutlined, FilePdfOutlined, FileImageOutlined, FileZipOutlined, FileTextOutlined } from '@ant-design/icons';

const getFileSize = size => {
  let value = Number.isNaN(Number(size)) ? 0 : Number(size);
  const div = value > 10485760 ? 10240 : 1024; // 10MB 이상 단위
  let count = 0;
  const unit = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  while (value >= div) {
    value /= 1024;
    count += 1;
  }
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unit[count]}`;
};

const fileDownload = fileSeq => {
  window.location.href = `/down/file/${Number(fileSeq)}`;
};

const confirmDownload = (e, fileSeq, fileName) => {
  e.stopPropagation();
  feed.showConfirm(`${fileName} 파일을 다운로드 받으시겠습니까?`, '', () => fileDownload(fileSeq));
};

const getFileIcon = ext => {
  const style = { fontSize: '32px' };
  switch (String(ext).toUpperCase()) {
    case 'JPG':
    case 'JPEG':
    case 'PNG':
    case 'BMP':
    case 'GIF':
      return <FileImageOutlined title={ext} style={style} />;
    case 'XLS':
    case 'XLSX':
      return <FileExcelOutlined title={ext} style={style} />;
    case 'PPT':
    case 'PPTX':
      return <FilePptOutlined title={ext} style={style} />;
    case 'DOC':
    case 'DOCX':
      return <FileWordOutlined title={ext} style={style} />;
    case 'PDF':
      return <FilePdfOutlined title={ext} style={style} />;
    case 'ZIP':
    case 'ZIPX':
    case '7Z':
    case 'TAR':
    case 'GZIP':
      return <FileZipOutlined title={ext} style={style} />;
    default:
      return <FileTextOutlined title={ext} style={style} />;
  }
};

export { getFileSize, fileDownload, confirmDownload, getFileIcon };
