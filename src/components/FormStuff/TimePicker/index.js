import { TimePicker } from 'antd';
import WithDirection from 'components/WithDirection';
import { TimePickerWrapper } from './Wrapper';

const WDStyledTimePicker = TimePickerWrapper(TimePicker);
const StyledTimePicker = WithDirection(WDStyledTimePicker);

export default StyledTimePicker;
