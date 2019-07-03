import { Upload } from 'antd';
import WithDirection from 'components/WithDirection';
import { UploaderWrapper } from './Wrapper';

const WDStyledUploader = UploaderWrapper(Upload);
const StyledUploader = WithDirection(WDStyledUploader);

export default StyledUploader;
