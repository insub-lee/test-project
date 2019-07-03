import React from 'react';

import Input, { Textarea } from 'components/FormStuff/Input';
import InputNumber from 'components/FormStuff/InputNumber';
import { CheckboxGroup } from 'components/FormStuff/Checkbox';
import { RadioGroup } from 'components/FormStuff/Radio';
import Select from 'components/FormStuff/Select';
import TimePicker from 'components/FormStuff/TimePicker';
import Uploader from 'components/FormStuff/Uploader';
import AgGrid from 'components/FormStuff/Grid/AgGrid';
import DatePicker, { DateMonthPicker, DateRangePicker, DateWeekPicker } from 'components/FormStuff/DatePicker';

// Custom
import UserSearchSelect from 'components/FormStuff/Custom/UserSearchSelect';
import ProcessInfoSelector from 'components/FormStuff/Custom/ProcessInfoSelector';

export const formStuffRenderer = {
  text: formStuff => <Input {...formStuff.property} />,
  number: formStuff => <InputNumber {...formStuff.property} />,
  textarea: formStuff => <Textarea {...formStuff.property} />,
  checkbox: formStuff => <CheckboxGroup {...formStuff.property} />,
  radio: formStuff => <RadioGroup {...formStuff.property} />,
  select: formStuff => <Select {...formStuff.property} />,
  grid: formStuff => <AgGrid {...formStuff.property} />,
  'time-picker': formStuff => <TimePicker {...formStuff.property} />,
  uploader: formStuff => <Uploader {...formStuff.property} />,
  'date-picker': formStuff => <DatePicker {...formStuff.property} />,
  'month-picker': formStuff => <DateMonthPicker {...formStuff.property} />,
  'range-picker': formStuff => <DateRangePicker {...formStuff.property} />,
  'week-picker': formStuff => <DateWeekPicker {...formStuff.property} />,
  'user-search-select': formStuff => <UserSearchSelect {...formStuff.property} />,
  'process-info': formStuff => <ProcessInfoSelector {...formStuff.property} />,
};

const includedOptions = [
  'text',
  'number',
  'textarea',
  'checkbox',
  'checkboxGroup',
  'radio',
  'radioGroup',
  'select',
  'grid',
  'time-picker',
  'uploader',
  'date-picker',
  'month-picker',
  'range-picker',
  'week-picker',
  'user-search-select',
  'process-info',
];
export const settingsWith = ['Box', ...includedOptions];
