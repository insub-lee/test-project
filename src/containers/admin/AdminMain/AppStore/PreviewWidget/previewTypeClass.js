import styled from 'styled-components';
import typeC from 'images/bizstore/widget-typeC.png';
import typeE1 from 'images/bizstore/widget-typeE1.png';
import typeE2 from 'images/bizstore/widget-typeE2.png';
import typeE3 from 'images/bizstore/widget-typeE3.png';
import typeI from 'images/bizstore/widget-typeI.png';
import typeL1 from 'images/bizstore/widget-typeL1.png';
import typeL2 from 'images/bizstore/widget-typeL2.png';
import typeM1 from 'images/bizstore/widget-typeM1.png';
import typeM2 from 'images/bizstore/widget-typeM2.png';
import typeT1 from 'images/bizstore/widget-typeT1.png';
import typeT2 from 'images/bizstore/widget-typeT2.png';

import iconSizeOption from 'images/common/icon-size-option.png';

const PreviewTypeClass = styled.div`

&.typeI {
  height: 100%;
  padding: 0 30px 25px;

  .backgroundPattern {
    height: 100%;
    background: url(${typeI}) repeat 0 0;
  }
}

// 타임라인형 -- 목록형으로
&.typeT {
  height: 100%;
  padding: 0 13px 12px;

  .backgroundPattern {
    height: 100%;
    background-image: url(${typeT1}), url(${typeT2});
    background-repeat: repeat, repeat-y;
    background-position: 0 0;
    background-size: 100% 51px, 30px 51px;
  }
}

// 목록형
&.typeL {
  height: 100%;
  padding: 3px 14px 30px;
  
  .backgroundPattern {
    height: 100%;
    background-image: url(${typeL1}), url(${typeL2});
    background-repeat: repeat-y;
    background-position: 0 0;
    background-size: 100% 124px, 210px 124px;
  }
}

// 기타(외부정보)
&.typeE {
  height: 100%;
  padding: 3px 10px 16px 10px;

  .backgroundPattern {
    height: 100%;
    background-image: url(${typeE1}), url(${typeE2}), url(${typeE3});
    background-repeat: repeat-y;
    background-position: 0 0, 0 0, 154px 0;
    background-size: 9px 138px, 154px 138px, 80% 138px;
  }
}

// 차트형
&.typeC {
  height: 100%;

  .backgroundPattern {
    height: 100%;
    background: url(${typeC}) no-repeat 50% 50%;
  }
}

// 배너형
&.typeM {
  height: 100%;
  padding: 0 10px 7px 10px;

  .backgroundPattern {
    height: 100%;
    background-image: url(${typeM2}), url(${typeM1});
    background-repeat: repeat-y, repeat;
    background-position: 50% 0, 0 0;
  }
}

// 크기 조절 버튼 
&:hover {
  .sizeOption {
    opacity: 1;
  }
}

.sizeOption {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 25px;
  height: 25px;
  background: url(${iconSizeOption}) no-repeat 50% 50%;
  opacity: 0;
}
`;

export default PreviewTypeClass;
