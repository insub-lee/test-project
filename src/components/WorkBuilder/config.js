import React from 'react';
import moment from 'moment';

import Input, { Textarea } from 'components/FormStuff/Input';
import InputNumber from 'components/FormStuff/InputNumber';
import { CheckboxGroup } from 'components/FormStuff/Checkbox';
import { RadioGroup } from 'components/FormStuff/Radio';
import Select from 'components/FormStuff/Select';
import TimePicker from 'components/FormStuff/TimePicker';
import AgGrid from 'components/FormStuff/Grid/AgGrid';
import DatePicker, { DateMonthPicker, DateRangePicker, DateWeekPicker } from 'components/FormStuff/DatePicker';
import DropZone from 'components/FormStuff/Upload/DropZone';
import RichTextEditor from 'components/FormStuff/RichTextEditor';
import Upload from 'components/FormStuff/Upload';
import MaskDiv from 'components/FormStuff/MaskDiv';
import { froalaEditorConfig } from 'components/FormStuff/config';

// Custom
import UserSelector from 'components/FormStuff/UserSearchSelector';
import ProcessInfoSelector from 'components/FormStuff/Custom/ProcessInfoSelector';

export const defaultFormStuffs = {
  text: {
    label: 'Input',
    icon: 'fa fa-edit fa-3x',
    previewRenderer: formStuff => (
      <MaskDiv>
        <Input {...formStuff.property} />
      </MaskDiv>
    ),
    renderer: ({ formStuff, saveTempContents }) => {
      const { property } = formStuff;
      return property.readOnly ? <p>{property.defaultValue}</p> : <Input {...property} />;
    },
  },
  number: {
    label: 'Number',
    icon: 'fa fa-edit fa-3x',
    previewRenderer: formStuff => (
      <MaskDiv>
        <InputNumber {...formStuff.property} />
      </MaskDiv>
    ),
    renderer: ({ formStuff, saveTempContents }) => {
      const { property } = formStuff;
      return property.readOnly ? <p>{property.defaultValue}</p> : <InputNumber {...property} />;
    },
  },
  textarea: {
    label: 'Textarea',
    icon: 'fa fa-edit fa-3x',
    previewRenderer: formStuff => (
      <MaskDiv>
        <Textarea {...formStuff.property} />
      </MaskDiv>
    ),
    renderer: ({ formStuff, saveTempContents }) => {
      const { property } = formStuff;
      return property.readOnly ? <p>{property.defaultValue}</p> : <Textarea {...property} />;
    },
  },
  // checkbox: {
  //   label: 'Checkbox',
  //   icon: 'fa fa-edit fa-3x',
  //   previewRenderer: formStuff => (
  //     <MaskDiv>
  //       <CheckboxGroup {...formStuff.property} />
  //     </MaskDiv>
  //   ),
  //   renderer: ({ formStuff, saveTempContents }) => <CheckboxGroup {...formStuff.property} />,
  // },
  // radio: {
  //   label: 'Radio',
  //   icon: 'fa fa-edit fa-3x',
  //   previewRenderer: formStuff => (
  //     <MaskDiv>
  //       <RadioGroup {...formStuff.property} />
  //     </MaskDiv>
  //   ),
  //   renderer: ({ formStuff, saveTempContents }) => <RadioGroup {...formStuff.property} />,
  // },
  // select: {
  //   label: 'Select',
  //   icon: 'fa fa-list fa-3x',
  //   previewRenderer: formStuff => (
  //     <MaskDiv>
  //       <Select {...formStuff.property} />
  //     </MaskDiv>
  //   ),
  //   renderer: ({ formStuff, saveTempContents }) => <Select {...formStuff.property} />,
  // },
  grid: {
    label: 'Grid',
    icon: 'fa fa-edit fa-3x',
    previewRenderer: formStuff => (
      <MaskDiv>
        <AgGrid {...formStuff.property} />
      </MaskDiv>
    ),
    renderer: ({ formStuff, saveTempContents }) => <AgGrid {...formStuff.property} />,
  },
  'rich-text-editor': {
    label: 'Rich Text Editor',
    icon: 'fa fa-file-text-o fa-3x',
    previewRenderer: formStuff => (
      <MaskDiv>
        <RichTextEditor {...formStuff.property} config={froalaEditorConfig} />
      </MaskDiv>
    ),
    renderer: ({ formStuff, saveTempContents, workSeq, taskSeq }) => <RichTextEditor {...formStuff.property} contSeq={formStuff.CONT_SEQ} config={froalaEditorConfig} saveTempContents={saveTempContents} workSeq={workSeq} taskSeq={taskSeq} />,
  },
  'file-upload': {
    label: 'File',
    icon: 'fa fa-upload fa-3x',
    previewRenderer: formStuff => (
      <MaskDiv>
        <Upload {...formStuff.property} />
      </MaskDiv>
    ),
    renderer: ({ formStuff, saveTempContents, workSeq, taskSeq }) => <Upload {...formStuff.property} contSeq={formStuff.CONT_SEQ} saveTempContents={saveTempContents} workSeq={workSeq} taskSeq={taskSeq} />,
  },
  // 'image-upload': {
  //   label: 'Image Upload',
  //   icon: 'fa fa-file-image-o fa-3x',
  //   previewRenderer: formStuff => (
  //     <MaskDiv>
  //       <Upload {...formStuff.property} />
  //     </MaskDiv>
  //   ),
  //   renderer: ({ formStuff, saveTempContents, workSeq, taskSeq }) => <Upload {...formStuff.property} contSeq={formStuff.CONT_SEQ} saveTempContents={saveTempContents} />,
  // },
  'time-picker': {
    label: 'Time Picker',
    icon: 'fa fa-clock-o fa-3x',
    previewRenderer: formStuff => (
      <MaskDiv>
        <TimePicker {...formStuff.property} />
      </MaskDiv>
    ),
    renderer: ({ formStuff, saveTempContents }) => <TimePicker {...formStuff.property} />,
  },
  'date-picker': {
    label: 'Date Picker',
    icon: 'fa fa-calendar fa-3x',
    previewRenderer: formStuff => (
      <MaskDiv>
        <DatePicker {...formStuff.property} />
      </MaskDiv>
    ),
    renderer: ({ formStuff, saveTempContents }) => {
      const { property } = formStuff;
      return property.readOnly ? (
        <p>{property.defaultValue}</p>
      ) : (
        <DatePicker
          {...property}
          defaultValue={property.format ? moment(property.defaultValue, property.format) : moment(property.defaultValue)}
          disabled={property.readOnly}
        />
      );
      // return property.readOnly ? (
      //   <p>{property.format ? moment(property.defaultValue, property.format) : moment(property.defaultValue)}</p>
      // ) : (
      //   <DatePicker
      //     {...property}
      //     defaultValue={property.format ? moment(property.defaultValue, property.format) : moment(property.defaultValue)}
      //     disabled={property.readOnly}
      //   />
      // );
    },
  },
  // 'week-picker': {
  //   label: 'Week Picker',
  //   icon: 'fa fa-calendar fa-3x',
  //   previewRenderer: formStuff => (
  //     <MaskDiv>
  //       <DateWeekPicker {...formStuff.property} />
  //     </MaskDiv>
  //   ),
  //   renderer: ({ formStuff, saveTempContents }) => <DateWeekPicker {...formStuff.property} />,
  // },
  // 'month-picker': {
  //   label: 'Month Picker',
  //   icon: 'fa fa-calendar fa-3x',
  //   previewRenderer: formStuff => (
  //     <MaskDiv>
  //       <DateMonthPicker {...formStuff.property} />
  //     </MaskDiv>
  //   ),
  //   renderer: ({ formStuff, saveTempContents }) => <DateMonthPicker {...formStuff.property} />,
  // },
  'range-picker': {
    label: 'Range Picker',
    icon: 'fa fa-calendar fa-3x',
    previewRenderer: formStuff => (
      <MaskDiv>
        <DateRangePicker {...formStuff.property} />
      </MaskDiv>
    ),
    renderer: ({ formStuff, saveTempContents }) => <DateRangePicker {...formStuff.property} />,
  },
};

export const customFormStuffs = {
  user: {
    label: 'User',
    icon: 'fa fa-user fa-3x',
    previewRenderer: formStuff => (
      <MaskDiv>
        <UserSelector {...formStuff.property} mode="multiple" />
      </MaskDiv>
    ),
    renderer: ({ formStuff, saveTempContents }) => <UserSelector {...formStuff.property} mode="multiple" contSeq={formStuff.CONT_SEQ} />,
  },
  'process-info': {
    label: 'Process Info',
    icon: 'fa fa-cube fa-3x',
    previewRenderer: formStuff => (
      <MaskDiv>
        <ProcessInfoSelector {...formStuff.property} />
      </MaskDiv>
    ),
    renderer: ({ formStuff, saveTempContents }) => <ProcessInfoSelector {...formStuff.property} contSeq={formStuff.CONT_SEQ} />,
  },
};

export const allFormStuffs = {
  ...defaultFormStuffs,
  ...customFormStuffs,
};

const includedOptions = Object.keys(defaultFormStuffs).concat(Object.keys(customFormStuffs));

export const settingsWith = ['Box', ...includedOptions];
