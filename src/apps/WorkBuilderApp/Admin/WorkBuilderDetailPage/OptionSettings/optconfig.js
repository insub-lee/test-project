import React from 'react';
import ProcSetting from './procsetting';
import ApiSetting from './apiSetting';
import ModalSetting from './modalSetting';
import FileSaveSetting from './fileSaveSetting';
import ChangeViewSetting from './changeViewSetting';
import OnRowClickSetting from './onRowClickSetting';
import ExcelDownloadSetting from './excelDownloadSetting';
import DeleteDataListSetting from './deleteDataListSetting';

export const OptionInfos = {
  procsetting: { renderer: property => <ProcSetting {...property} /> },
  fileSaveSetting: { renderer: property => <FileSaveSetting {...property} /> },
  apiSetting: { renderer: property => <ApiSetting {...property} /> },
  modalSetting: { renderer: property => <ModalSetting {...property} /> },
  changeViewSetting: { renderer: property => <ChangeViewSetting {...property} /> },
  onRowClickSetting: { renderer: property => <OnRowClickSetting {...property} /> },
  excelDownloadSetting: { renderer: property => <ExcelDownloadSetting {...property} /> },
  deleteDataListSetting: { renderer: property => <DeleteDataListSetting {...property} /> },
};
