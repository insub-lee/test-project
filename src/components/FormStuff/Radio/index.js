import { Radio } from 'antd';
import WithDirection from 'components/WithDirection';
import { RadioWrapper, RadioGroupWrapper } from './Wrapper';

const { Group } = Radio;

const WDStyledRadio = RadioWrapper(Radio);
const StyledRadio = WithDirection(WDStyledRadio);

const WdRadioGroup = RadioGroupWrapper(Group);
const RadioGroup = WithDirection(WdRadioGroup);

export default StyledRadio;
export { RadioGroup };
