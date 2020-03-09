import React from 'react';

import ProcSetting from './procsetting';
import ApiSetting from './apiSetting';
import ModalSetting from './modalSetting';

export const OptionInfos = {
  procsetting: { renderer: property => <ProcSetting {...property} /> },
  apiSetting: { renderer: property => <ApiSetting {...property} /> },
  modalSetting: { renderer: property => <ModalSetting {...property} /> },
};
