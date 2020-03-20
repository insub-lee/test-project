import React from 'react';

import ProcSetting from './procsetting';
import ApiSetting from './apiSetting';
import ModalSetting from './modalSetting';
import FileSaveSetting from './fileSaveSetting';
export const OptionInfos = {
  procsetting: { renderer: property => <ProcSetting {...property} /> },
  fileSaveSetting: { renderer: property => <FileSaveSetting {...property} /> },
  apiSetting: { renderer: property => <ApiSetting {...property} /> },
  modalSetting: { renderer: property => <ModalSetting {...property} /> },
};
