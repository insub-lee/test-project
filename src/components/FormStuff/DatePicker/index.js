import { DatePicker } from 'antd';
import WithDirection from 'components/WithDirection';
import { DatePickerWrapper, MonthPickerWrapper, RangePickerWrapper, WeekPickerWrapper } from './Wrapper';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const WDStyledDatePicker = DatePickerWrapper(DatePicker);
const StyledDatePicker = WithDirection(WDStyledDatePicker);

const WDStyledMonthPicker = MonthPickerWrapper(MonthPicker);
const DateMonthPicker = WithDirection(WDStyledMonthPicker);

const WDStyledRangePicker = RangePickerWrapper(RangePicker);
const DateRangePicker = WithDirection(WDStyledRangePicker);

const WDStyledWeekPicker = WeekPickerWrapper(WeekPicker);
const DateWeekPicker = WithDirection(WDStyledWeekPicker);

export default StyledDatePicker;
export { DateMonthPicker, DateRangePicker, DateWeekPicker };
