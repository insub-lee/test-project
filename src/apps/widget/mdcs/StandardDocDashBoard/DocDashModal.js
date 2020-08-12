import React, { Component } from 'react';
import { Modal } from 'antd';
import moment from 'moment';
import StyledModalWrapper from 'apps/mdcs/styled/Modals/StyledModalWrapper';
import ExcelDownLoad from 'components/ExcelDownLoad';
import ModalView from './ModalView';
import ModalList from './ModalList';
import CoverView from './CoverView';

const AntdModal = StyledModalWrapper(Modal);
const excelColumns = [
  {
    title: '종류',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: 'NO',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: 'REV',
    width: { wpx: 30 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: 'Effect Date',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: 'Title',
    width: { wpx: 300 },
    style: { alignment: { horizontal: 'left' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '기안부서',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
  {
    title: '기안자',
    width: { wpx: 100 },
    style: { alignment: { horizontal: 'center' }, font: { sz: '10' }, fill: { patternType: 'solid', fgColor: { rgb: 'CCCCCC' } } },
  },
];

const fields = [
  { field: 'FULLPATHSTR', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'DOCNUMBER', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'VERSION', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'END_DTTM', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
  { field: 'TITLE', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
  { field: 'REG_DEPT_NAME', style: { alignment: { horizontal: 'left' }, font: { sz: '10' } } },
  { field: 'REG_USER_NAME', style: { alignment: { horizontal: 'center' }, font: { sz: '10' } } },
];

class DocDashModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {
      viewType,
      workSeq,
      taskSeq,
      visible,
      closeBtnFunc,
      widgetTitle,
      coverView,
      onCloseCoverView,
      clickCoverView,
      onClickRow,
      listData,
      listVisible,
      closeListBtnFunc,
    } = this.props;
    console.debug('listData', listData);
    return (
      <>
        <AntdModal className="modalWrapper modalTechDoc modalCustom" visible={visible} footer={null} width={800} onCancel={closeBtnFunc} destroyOnClose>
          <>
            <div className="pop_tit">{widgetTitle}</div>
            <div className="pop_con">
              <ModalView viewType={viewType} workSeq={workSeq} taskSeq={taskSeq} closeBtnFunc={closeBtnFunc} clickCoverView={clickCoverView} {...this.props} />
            </div>
          </>
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          visible={coverView.visible || false}
          footer={null}
          width={800}
          okButtonProps={null}
          onCancel={onCloseCoverView}
          destroyOnClose
        >
          <div className="pop_tit">표지 보기</div>
          <div className="SearchContentLayer">
            <CoverView coverView={coverView} onCloseCoverView={onCloseCoverView} />
          </div>
        </AntdModal>
        <AntdModal
          className="modalWrapper modalTechDoc modalCustom"
          visible={listVisible}
          footer={null}
          width={1000}
          onCancel={closeListBtnFunc}
          destroyOnClose
        >
          <>
            <div className="pop_tit">{widgetTitle}</div>
            <div className="pop_con_pad20">
              <div style={{ width: '100%', textAlign: 'right', marginBottom: '10px' }}>
                <ExcelDownLoad
                  key="excelDownLoad"
                  isBuilder={false}
                  fileName={`검색결과 (${moment().format('YYYYMMDD')})`}
                  className="workerExcelBtn"
                  title="Excel 파일로 저장"
                  btnSize="btn-sm"
                  sheetName=""
                  columns={excelColumns}
                  fields={fields}
                  submitInfo={false}
                  dataSetBind={listData.map(f => ({ ...f, VERSION: f.VERSION.split('.')[0] }))}
                />
              </div>
              <ModalList onClickRow={onClickRow} closeBtnFunc={closeListBtnFunc} listData={listData} />
            </div>
          </>
        </AntdModal>
      </>
    );
  }
}
export default DocDashModal;
