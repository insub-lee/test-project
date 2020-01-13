import React from 'react';

import ProcSetting from './procsetting';
import ApiSetting from './apiSetting';

export const OptionInfos = {
  procsetting: { renderer: property => <ProcSetting {...property} /> },
  apiSetting: { renderer: property => <ApiSetting {...property} /> },
};
