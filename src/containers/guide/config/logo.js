import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <div className="devGuideLogoWrapper">
      <h3>
        <Link to="/guide">
          {/* {'DEV GUIDE'} */}
          SK하이닉스 포털 사이트 개발 가이드
        </Link>
      </h3>
    </div>
  );
}
