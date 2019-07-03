import { Select } from 'antd';
import WithDirection from 'components/WithDirection';
import { SelectWrapper } from './Wrapper';

const WDStyledSelect = SelectWrapper(Select);
const StyledSelect = WithDirection(WDStyledSelect);

export default StyledSelect;
