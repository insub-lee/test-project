import { InputNumber } from 'antd';
import WithDirection from 'components/WithDirection';
import { InputNumberWrapper } from './Wrapper';

const WDStyledInput = InputNumberWrapper(InputNumber);
const StyledInputNumber = WithDirection(WDStyledInput);

export default StyledInputNumber;
