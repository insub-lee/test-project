import { Input } from 'antd';
import WithDirection from 'components/WithDirection';
import { InputWrapper, InputGroupWrapper, InputSearchWrapper, TextAreaWrapper } from './Wrapper';

const { Search, TextArea, Group } = Input;

const WDStyledInput = InputWrapper(Input);
const StyledInput = WithDirection(WDStyledInput);

const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = WithDirection(WDInputGroup);

const WDInputSearch = InputSearchWrapper(Search);
const InputSearch = WithDirection(WDInputSearch);

const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = WithDirection(WDTextarea);

export default StyledInput;
export { InputSearch, InputGroup, Textarea };
