import { Checkbox } from 'antd';
import WithDirection from 'components/WithDirection';
import { CheckWrapper, CheckBoxGroupWrapper } from './Wrapper';

const { Group } = Checkbox;

const WDStyledCheck = CheckWrapper(Checkbox);
const StyledCheck = WithDirection(WDStyledCheck);

const WdCheckboxGroup = CheckBoxGroupWrapper(Group);
const CheckboxGroup = WithDirection(WdCheckboxGroup);

export default StyledCheck;
export { CheckboxGroup };
