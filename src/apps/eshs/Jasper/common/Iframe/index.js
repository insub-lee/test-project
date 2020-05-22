import React from 'react';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

const Iframe = (title, src) => (
  <StyledHtmlTable className="tableWrapper">
    <iframe title={title} style={{ width: '100%' }} src={src}></iframe>
  </StyledHtmlTable>
);

export default React.memo(Iframe);
