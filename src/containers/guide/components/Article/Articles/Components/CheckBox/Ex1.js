import React from 'react';
import { Checkbox } from '../../../Abstraction/portalComponents';

const CheckboxGroup = Checkbox.Group;
const App = () => {
  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false },
  ];
  return (
    <div>
      <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
      <br /><br />
      <CheckboxGroup options={options} defaultValue={['Pear']} onChange={onChange} />
      <br /><br />
      <CheckboxGroup options={optionsWithDisabled} disabled defaultValue={['Apple']} onChange={onChange} />
    </div>
  );
};


const code = `import { Checkbox } from '../../../Abstraction/portalComponents';

const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];

ReactDOM.render(
  <div>
    <CheckboxGroup options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
    <br /><br />
    <CheckboxGroup options={options} defaultValue={['Pear']} onChange={onChange} />
    <br /><br />
    <CheckboxGroup options={optionsWithDisabled} disabled defaultValue={['Apple']} onChange={onChange} />
  </div>,
  mountNode);`;

const title = '-Checkbox group';

const details = '배열을 사용한 체크박스 그룹 생성 예제입니다.';

export { App, code, title, details };
