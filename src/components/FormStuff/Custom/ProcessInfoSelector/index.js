import React from 'react';
import { Descriptions } from 'antd';

import TimePicker from 'components/FormStuff/TimePicker';
import { DateRangePicker } from 'components/FormStuff/DatePicker';
import { RadioGroup } from 'components/FormStuff/Radio';
import { CheckboxGroup } from 'components/FormStuff/Checkbox';
import Input, { Textarea } from 'components/FormStuff/Input';

const options1 = [{ label: '화기작업', value: '00' }, { label: '일반위험작업', value: '01' }];

const options2 = [
  { label: '방사선', value: '00' },
  { label: '중량물', value: '01' },
  { label: '밀폐공간', value: '02' },
  { label: '고소', value: '03' },
  { label: '전기', value: '04' },
  { label: '굴착', value: '05' },
];

const ProcessInfoSelector = () => (
  <Descriptions bordered border size="small" column={1}>
    <Descriptions.Item label="작업업체">업체명 [서약서 번호]</Descriptions.Item>
    <Descriptions.Item label="주관작업">
      <RadioGroup options={options1} />
    </Descriptions.Item>
    <Descriptions.Item label="보충작업">
      <CheckboxGroup options={options2} />
    </Descriptions.Item>
    <Descriptions.Item label="작업명">
      <Input />
    </Descriptions.Item>
    <Descriptions.Item label="작업내용">
      <Textarea />
    </Descriptions.Item>
    <Descriptions.Item label="작업동">
      <Input />
    </Descriptions.Item>
    <Descriptions.Item label="작업장소">
      <Input placeholder="상세히 작성할 것" />
    </Descriptions.Item>
    <Descriptions.Item label="작업기간">
      <DateRangePicker />
    </Descriptions.Item>
    <Descriptions.Item label="작업시간">
      <TimePicker />
    </Descriptions.Item>
    <Descriptions.Item label="파일첨부" span={4} />
  </Descriptions>
);

export default ProcessInfoSelector;
