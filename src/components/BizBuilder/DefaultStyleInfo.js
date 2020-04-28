import StyledDefaultMdcs from 'commonStyled/MdcsStyled/Wrapper/StyledDefaultMdcs';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';

export const DefaultStyleInfo = stylePath => {
  switch (stylePath) {
    case 'MdcsStyled/Wrapper/StyledDefaultMdcs':
      return StyledDefaultMdcs;
    default:
      return StyledViewDesigner;
  }
};
