import React from 'react';

import ProcSetting from './procsetting';

export const OptionInfos = {
  procsetting: { renderer: property => <ProcSetting {...property} /> },
};
