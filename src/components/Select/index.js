import { Select } from 'antd';
import { AntSelect } from './StyleSelect';
import WithDirection from '../../config/withDirection';

const WDSelect = AntSelect(Select);
const isoSelect = WithDirection(WDSelect);
const SelectOption = Select.Option;

export default isoSelect;
export { SelectOption };
